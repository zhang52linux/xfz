#encoding: utf-8


from django.contrib.auth import login,logout,authenticate
from django.views.decorators.http import require_POST
from .froms import LoginForm
from django.http import JsonResponse


@require_POST
def login_view(request):
    form = LoginForm(request.POST)
    if form.is_valid():
        telephone = form.cleaned_data.get('telephone')
        password = form.cleaned_data.get('password')
        remember = form.cleaned_data.get('remember')
        user = authenticate(request,username=telephone,password=password)
        if user:
            if user.is_active:
                login(request,user)
                if remember:
                    request.session.set_expiry(None)
                else:
                    request.session.set_expiry(0)
                return JsonResponse({'code':200,'message':'登录成功!','data':{}})
            else:
                return JsonResponse({'code': 404, 'message': '该账号被限制访问!', 'data': {}})
        else:
            return JsonResponse({'code': 400, 'message': '手机号或密码错误!', 'data': {}})
    else:
        errors = form.get_errors()
        return JsonResponse({'code': 400, 'message': '', 'data': errors})
