from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_protect
from django.utils.decorators import method_decorator
from django.core.mail import EmailMessage
from rest_framework.viewsets import ModelViewSet
from django.core.mail import EmailMultiAlternatives

# import django.contrib.sessions

from .serializers import UserSerializer

class ListUsers(APIView):
    def get(self, request):
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)

class UsersDetail(APIView):
    def get(self, request, pk):
        user = User.objects.get(pk=pk)
        serializer = UserSerializer(user)
        return Response(serializer.data)

class CurrentUser(APIView):
    def get(self, request):
        if request.user.is_anonymous:
            return Response({
                'status':'no user logged in',
            },status=status.HTTP_204_NO_CONTENT)
        currentUser = request.user
        serializer = UserSerializer(currentUser)
        return Response(serializer.data)

class LoginUser(APIView):

    @method_decorator(csrf_protect)
    def post(self, request):
        user = authenticate(
            username=request.data.get("username"),
            password=request.data.get("password"))

        if user is None or not user.is_active:
            return Response({
                'status':'Unauthorized',
                'message': 'Username or password incorrect'
            }, status=status.HTTP_401_UNAUTHORIZED)
        # request.session['username'] = request.data.get("username");
        login(request, user)
        return Response(UserSerializer(user).data)

class LogoutUser(APIView):
    def get(self, request):
        logout(request)
        return Response({},status=status.HTTP_204_NO_CONTENT)

class ResetUserPassword(APIView):
    def post(self,request):
        userEmail = request.data.get("email")
        message = 'Thank you for joining heepsters scheduling manager'
        html_message = '<html><body><a href="http://localhost:8000/#/reset_password"><button>Click Me</button></a></body></html>'
        mail_subject = 'Heepsters reset password link'
        to_email = userEmail
        email = EmailMultiAlternatives(mail_subject,message,to=[to_email])
        email.attach_alternative(html_message, "text/html")
        email.send()

        return Response({
            'status':'email sent',
            'message':'emailed reset password link'
        },status=status.HTTP_200_OK)

class RegisterUser(APIView):
    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")
        userEmail = request.data.get("email")


        if request.user.profile.role.lower() == 'superuser'.lower():
            user = User.objects.create_user(username, userEmail, password)
            user.profile.role = 'owner'
            user.profile.acuityID = request.data.get("acuityID")
            user.profile.acuityKey = request.data.get("acuityKey")
            user.save()
        elif request.user.profile.role.lower() == 'owner'.lower():
            user = User.objects.create_user(username, userEmail, password)
            user.profile.role = 'employee'
            user.profile.acuityID = request.user.profile.acuityID
            user.profile.acuityKey = request.user.profile.acuityKey
            user.save()
        else:
            return Response({
                'status': 'Unauthorized',
                'message': 'Unauthorized to create user'
            }, status=status.HTTP_401_UNAUTHORIZED)

        return Response({},status=status.HTTP_201_CREATED)
