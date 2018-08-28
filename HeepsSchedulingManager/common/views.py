from rest_framework.views import APIView
from rest_framework.response import Response
import requests
import json
from rest_framework import status

class AppointmentList(APIView):
    def get(self, request):
        r = requests.get('https://acuityscheduling.com/api/v1/appointments',
                               auth=requests.auth.HTTPBasicAuth('13980192', '790cf5a38c8d60b27d47cdb98a702a03'))
        response = json.loads(r.text)
        return Response(response)


class AppointmentDetail(APIView):
    def get(self, request, pk):
        requestUrl = 'https://acuityscheduling.com/api/v1/appointments/%s' % pk
        r = requests.get(requestUrl,
                         auth=requests.auth.HTTPBasicAuth('13980192', '790cf5a38c8d60b27d47cdb98a702a03'))
        response = json.loads(r.text)
        return Response(response)

class CancelAppointment(APIView):
    def put(self, request, pk):
        requestUrl = 'https://acuityscheduling.com/api/v1/appointments/%s/cancel' % pk
        r = requests.put(requestUrl,
                           auth=requests.auth.HTTPBasicAuth('13980192', '790cf5a38c8d60b27d47cdb98a702a03'),
                           data={})
        response = json.loads(r.text)
        return Response(response)

class RescheduleAppointment(APIView):
    def put(self, request, pk):
        requestUrl = 'https://acuityscheduling.com/api/v1/appointments/%s/reschedule' % pk
        r = requests.put(requestUrl,
                           auth=requests.auth.HTTPBasicAuth('13980192', '790cf5a38c8d60b27d47cdb98a702a03'),
                           data=json.dumps(request.data))
        response = json.loads(r.text)
        return Response(response)

