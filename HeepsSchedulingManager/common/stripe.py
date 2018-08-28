from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from django.contrib.auth.models import User
from django.conf import settings

from django.views.decorators.csrf import csrf_exempt

import stripe

class Charges(APIView):
    def post(self, request):
        return Response('charged card')
