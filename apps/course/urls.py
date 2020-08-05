#encoding: utf-8
from django.urls import path
from . import views

app_name = 'course'  #应用命名空间，在重名时做区分

urlpatterns = [
    path('',views.course_index,name='course_index'),
    path('<int:course_id>/',views.course_detail,name='course_detail'),
]