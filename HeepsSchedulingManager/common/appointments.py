from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from django.contrib.auth.models import User
from django.conf import settings

import requests
import json

class AppointmentList(APIView):
    def get(self, request):
        if request.user.is_authenticated:
            r = requests.get('https://acuityscheduling.com/api/v1/appointments',
                                   auth=requests.auth.HTTPBasicAuth(request.user.profile.acuityID, request.user.profile.acuityKey))
            response = json.loads(r.text)
            return Response(response)
        else:
            return Response({
                'status': 'unauthorized',
                'message': 'user is not admin'},
                status = status.HTTP_401_UNAUTHORIZED)

    def post(self, request):
        if request.user.is_authenticated:
            r = requests.post('https://acuityscheduling.com/api/v1/appointments',
                                   auth=requests.auth.HTTPBasicAuth(request.user.profile.acuityID, request.user.profile.acuityKey),
                                   data=json.dumps(request.data))
            response = json.loads(r.text)
            return Response(response)
        else:
            return Response({
                'status': 'unauthorized',
                'message': 'user is not admin'},
                status = status.HTTP_401_UNAUTHORIZED)

class AppointmentDetail(APIView):
    def get(self, request, pk):
        requestUrl = 'https://acuityscheduling.com/api/v1/appointments/%s' % pk
        r = requests.get(requestUrl,
                         auth=requests.auth.HTTPBasicAuth(request.user.profile.acuityID, request.user.profile.acuityKey))
        response = json.loads(r.text)
        return Response(response)

class AppointmentTypesList(APIView):
    def get(self,request):
        requestUrl = 'https://acuityscheduling.com/api/v1/appointment-types'
        r = requests.get(requestUrl,
                         auth=requests.auth.HTTPBasicAuth(request.user.profile.acuityID,
                                                          request.user.profile.acuityKey))
        response = json.loads(r.text)
        return Response(response)

class AvailabilityList(APIView):
    def post(self, request):
        date = request.data.get("date");
        typeId = request.data.get("type")
        # calendar = request.data.get('calendar')

        if request.user.is_authenticated:
            r = requests.get(f'https://acuityscheduling.com/api/v1/availability/times?appointmentTypeID={typeId}&date={date}',
                                   auth=requests.auth.HTTPBasicAuth(request.user.profile.acuityID, request.user.profile.acuityKey))
            response = json.loads(r.text)
            return Response(response)
        else:
            return Response({
                'status': 'unauthorized',
                'message': 'user is not admin'},
                status = status.HTTP_401_UNAUTHORIZED)


class CancelAppointment(APIView):
    def put(self, request, pk):
        requestUrl = 'https://acuityscheduling.com/api/v1/appointments/%s/cancel' % pk
        r = requests.put(requestUrl,
                           auth=requests.auth.HTTPBasicAuth(request.user.profile.acuityID, request.user.profile.acuityKey),
                           data={})
        response = json.loads(r.text)
        return Response(response)

class RescheduleAppointment(APIView):
    def put(self, request, pk):
        requestUrl = 'https://acuityscheduling.com/api/v1/appointments/%s/reschedule' % pk
        r = requests.put(requestUrl,
                           auth=requests.auth.HTTPBasicAuth(request.user.profile.acuityID, request.user.profile.acuityKey),
                           data=json.dumps(request.data))
        response = json.loads(r.text)
        return Response(response)