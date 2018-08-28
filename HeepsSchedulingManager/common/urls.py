from django.conf.urls import url
from .appointments import *
from .authorizations import LoginUser, LogoutUser, RegisterUser, ListUsers, UsersDetail, CurrentUser, ResetUserPassword
from .stripe import Charges


urlpatterns = [
    url(r'^appointments/$', AppointmentList.as_view()),
    url(r'^appointments/(?P<pk>[0-9]+)/$', AppointmentDetail.as_view()),
    url(r'^appointments/(?P<pk>[0-9]+)/cancel/$', CancelAppointment.as_view()),
    url(r'^appointments/(?P<pk>[0-9]+)/reschedule/$', RescheduleAppointment.as_view()),
    url(r'^appointments/availability/$',AvailabilityList.as_view()),
    url(r'^appointments/types/$',AppointmentTypesList.as_view()),
    url(r'^blocks/$',Blocks.as_view()),
    url(r'^blocks/(?P<pk>[0-9]+)/$',BlocksDetail.as_view()),
    url(r'^calendars/$',CalendarList.as_view()),
    url(r'^charges/$',Charges.as_view()),
    url(r'^users/login/$', LoginUser.as_view()),
    url(r'^users/logout/$',LogoutUser.as_view()),
    url(r'^users/register/$',RegisterUser.as_view()),
    url(r'^users/$',ListUsers.as_view()),
    url(r'^users/(?P<pk>[0-9]+)/$',UsersDetail.as_view()),
    url(r'users/current/',CurrentUser.as_view()),
    url(r'users/reset-password/$',ResetUserPassword.as_view()),

]