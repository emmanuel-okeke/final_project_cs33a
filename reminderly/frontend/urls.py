
from django.urls import path, re_path
from frontend import views

urlpatterns = [
    re_path('^.*/$', views.app, name='app'),
    path('', views.app, name='app_main')
]
