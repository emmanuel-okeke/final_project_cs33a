import uuid
import datetime
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin


class MyUserManager(BaseUserManager):
	"""
	A custom user manager to deal with emails as unique identifiers for auth
	instead of usernames. The default that's used is "UserManager"
	"""
	def create_user(self, email, firstname, lastname,password=None, commit=True):
		"""
		Creates and saves a User with the given email and password.
		"""

		if not email:
			raise ValueError('The Email must be set')
		if not firstname:
			raise ValueError('Users must have a first name')
		if not lastname:
			raise ValueError('Users must have a last name')

		user = self.model(email=self.normalize_email(email),
			firstname=firstname,
			lastname=lastname)

		user.set_password(password)
		if commit:
			user.save(using=self._db)
		return user

	def create_superuser(self, email, firstname, lastname,password):
		"""
		Creates and saves a superuser with the given email and password.
		"""

		user = self.create_user(
			email,
			firstname,
			lastname,
			password=password,
			commit=False,
		)

		user.is_staff = True
		user.is_superuser = True
		user.save(using=self._db)

		
		return user

class User(AbstractBaseUser, PermissionsMixin):
	"""
	 Model to customize user object behaviour 
	"""

	# Fields 
	id = models.UUIDField(verbose_name='user id', max_length=30, primary_key=True, default=uuid.uuid4, editable=False)
	email = models.EmailField(max_length=255, unique=True)
	# password field supplied by AbstractBaseUser
	# last_login field supplied by AbstractBaseUser
	firstname = models.CharField(verbose_name='first name', max_length=30, blank=True, null=True)
	lastname = models.CharField(verbose_name='last name', max_length=150, blank=True, null=True)

	is_staff = models.BooleanField(
		verbose_name='staff status',
		default=False,
		help_text='Designates whether the user can log into this site.',
	)
	
	is_active = models.BooleanField( 
		verbose_name='active',
		default=True,
		help_text=(
			'Designates whether this user should be treated as active. '
			'Unselect this instead of deleting accounts.'
		),
	)
	# is_superuser field provided by PermissionsMixin
	# groups field provided by PermissionsMixin
	# user_permissions field provided by PermissionsMixin

	date_joined = models.DateTimeField(auto_now_add=True)

	objects = MyUserManager()

	USERNAME_FIELD = 'email'
	
	def get_full_name(self):
		"""
		Return the first_name plus the last_name, with a space in between.
		"""
		full_name = '%s %s' % (self.firstname, self.lastname)
		return full_name.strip()
	""" 
		def get_username(self):
			return self.username
	"""
	def __str__(self):
		return '{} <{}>'.format(self.get_full_name(), self.email)

	def has_perm(self, perm, obj=None):
		"Does the user have a specific permission?"
		# Simplest possible answer: Yes, always
		return True

	def has_module_perms(self, app_label):
		"Does the user have permissions to view the app `app_label`?"
		# Simplest possible answer: Yes, always
		return True

