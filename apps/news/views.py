from django.shortcuts import render

# Create your views here.

def index(request):
    return render(request, 'news/index.html')

def news_detail(request,news_id):
    return render(request, 'news/news_detail.html')