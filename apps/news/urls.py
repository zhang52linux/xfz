#encoding: utf-8
from django.urls import path
from . import views

app_name = 'news'  #应用命名空间，在重名时做区分

urlpatterns = [
    path('<int:news_id>/',views.news_detail,name='news_detail'),
]