import uuid
import datetime
from django.utils import timezone
from django.shortcuts import render
from rest_framework import viewsets, permissions, generics, request as rest_request, exceptions, status, mixins
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from accounts.serializers import (
	UserAccountSerializer, 
	LoginUserAccountSerializer,
	RegisterUserAccountSerializer
)
from django.core.exceptions import PermissionDenied
from django.shortcuts import get_object_or_404
from knox.models import AuthToken
from django.views.decorators.csrf import ensure_csrf_cookie
from django.utils.decorators import method_decorator

# Create your views here.
class UserAccountView(mixins.RetrieveModelMixin, viewsets.GenericViewSet):
	serializer_class = UserAccountSerializer
	queryset = get_user_model().objects.all()
	permission_classes = [permissions.IsAuthenticated] 

	def retrieve(self, request, pk=None):
		"""
		Returns the user data upon request.
		"""

		# Validates that the uuid passed is valid
		if not is_valid_uuid(pk):
			return Response(data={"error": "User ID is invalid"}, status=status.HTTP_400_BAD_REQUEST)

		# Retrieve user data back from the db and serialize
		queryset = get_user_model().objects.filter(id=pk)
		user = get_object_or_404(queryset)
		serializer = self.serializer_class(user)
		
		return Response(serializer.data)
		

class LoginUserAccountView(generics.CreateAPIView):
	serializer_class = LoginUserAccountSerializer

	@method_decorator(ensure_csrf_cookie)
	def post(self, request, *args, **kwargs):
		"""
		Logs user in with provided credentials. Decorator used
		to ensure the csrf cookie is sent everytime log in occurs.
		Returns user data and an authentication token.
		"""

		# Validate data
		serializer = self.get_serializer(data=request.data)
		serializer.is_valid(raise_exception=True)
		user = serializer.validated_data

		return Response({
			"user": UserAccountSerializer(user, context=self.get_serializer_context()).data,
			"token": AuthToken.objects.create(user)[1]
		})

		
class RegisterUserAccountView(generics.CreateAPIView):

	queryset = get_user_model().objects.all()
	serializer_class = RegisterUserAccountSerializer

	def post(self, request, *args, **kwarg):
		"""
		Registers user to db and returns the user data and an authentication token
		"""
		# Make sure email stays unique
		queryset = get_user_model().objects.filter(email=self.request.data['email'])
		if queryset.exists():
			raise exceptions.ValidationError('This User Already Exists')

		# Validate user data and save to db
		serializer = self.get_serializer(data=request.data)
		serializer.is_valid(raise_exception=True)
		user = serializer.save()

		return Response({
			'user': UserAccountSerializer(user, context=self.get_serializer_context()).data,
			'token': AuthToken.objects.create(user)[1]
		}, status=status.HTTP_201_CREATED)


def is_valid_uuid(uuid_to_test, version=4):
    """
    Check if uuid_to_test is a valid UUID.

    Parameters
    ----------
    uuid_to_test : str
    version : {1, 2, 3, 4}

    Returns
    -------
    `True` if uuid_to_test is a valid UUID, otherwise `False`.

    Examples
    --------
    >>> is_valid_uuid('c9bf9e57-1685-4c89-bafb-ff5af830be8a')
    True
    >>> is_valid_uuid('c9bf9e58')
    False
    """
    try:
        uuid_obj = uuid.UUID(uuid_to_test, version=version)
    except ValueError:
        return False

    return str(uuid_obj) == uuid_to_test