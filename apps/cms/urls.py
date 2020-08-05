#encoding: utf-8
from django.urls import path
from . import views

app_name = 'cms' #应用命名空间，在重名时做区分

urlpatterns = [
    path('login/', views.login_view,name='login'),
]