#encoding: utf-8
from django.urls import path
from . import views

app_name = "xauth"

urlpatterns = [
    path('login/',views.login_view,name='login')
]