from django.urls import path, include, re_path
from knox.views import LogoutView
from rest_framework import routers
from accounts.views import UserAccountView, LoginUserAccountView, RegisterUserAccountView

app_name = ''

# Create and use default router for ease of URL definitions
router = routers.DefaultRouter()
router.register('users', UserAccountView, basename='users')

# Register all the views to specific URLs
urlpatterns = [
    re_path('register/*$', RegisterUserAccountView.as_view(), name='register'),
    re_path('login/*$', LoginUserAccountView.as_view(), name='login'),
    re_path('logout/*$', LogoutView.as_view(), name='logout'),
    path('', include(router.urls)),
]