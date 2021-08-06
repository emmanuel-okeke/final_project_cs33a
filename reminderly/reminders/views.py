
from django.shortcuts import render, get_object_or_404
from django.core.exceptions import PermissionDenied

from rest_framework.response import Response
from rest_framework import status, viewsets, mixins, permissions

from reminders.models import (
	Reminders,
	ReminderTags,
	ReminderFlags
)
from reminders.serializers import (
	RemindersSerializer,
	ReminderTagsSerializer,
	ReminderFlagsSerializer
)



class RemindersViewset(viewsets.ModelViewSet):
	serializer_class = RemindersSerializer 
	permission_classes = [permissions.IsAuthenticated] 

	def list(self, request):
		"""
		Filter all the reminders added by the user and return
		"""

		# Get a list of all the reminders the user has created
		user_created_reminders = list(Reminders.objects.filter(created_by=request.user))

		# Get a list of all the reminders the user has been tagged in
		user_reminder_tags = list(ReminderTags.objects.select_related('reminder').filter(tagged_user=request.user))
		reminder_objs = [tag_obj.reminder for tag_obj in user_reminder_tags]

		# Combine both lists
		reminder_objs.extend(user_created_reminders)

		# Sort the reminders in ascending order by due date
		def sort_func (reminder):
			return reminder.due_date

		sorted_reminder_objs = sorted(reminder_objs, key=sort_func)


		serializer = self.serializer_class(sorted_reminder_objs, many=True, context={'request': request})
		return Response(serializer.data)


	def create(self, request):
		"""
		Creates a new reminder and returns the reminder data
		"""

		# Validate the data passed in
		serializer = self.serializer_class(data=request.data, context={'request': request})
		serializer.is_valid(raise_exception=True)

		serializer.save(created_by=request.user)
		
		return Response(serializer.data)


	def retrieve(self, request, pk=None):
		raise PermissionDenied()


	def update(self, request, pk=None):
		raise PermissionDenied()


	def partial_update(self, request, pk=None):
		"""
		Updates the reminder 
		"""
		
		queryset = Reminders.objects.filter(id=pk, created_by=request.user)
		reminder = get_object_or_404(queryset)

		# Make sure only the user who created a reminder can update it it
		if  (reminder.created_by == request.user):

			serializer = self.serializer_class(reminder, request.data, partial=True, context={'request': request})
			serializer.is_valid(raise_exception=True)
			serializer.save()

			return Response(serializer.data)
		else:
			return Response(status=status.HTTP_400_BAD_REQUEST)


	def destroy(self, request, pk=None):
		"""
		Get the requested reminder from the db then delete it
		"""

		queryset = Reminders.objects.filter(id=pk, created_by=request.user)
		reminder = get_object_or_404(queryset)

		# Make sure only the user who created a reminder can delete it
		if  (reminder.created_by == request.user):
			reminder.delete()
			
			return Response(status=status.HTTP_204_NO_CONTENT)
		else:
			return Response(status=status.HTTP_400_BAD_REQUEST)



class ReminderTagsViewset(viewsets.ModelViewSet):
	serializer_class = ReminderTagsSerializer 
	permission_classes = [permissions.IsAuthenticated] 

	def list(self, request):
		raise PermissionDenied()


	def create(self, request):
		"""
		Creates a new reminder tag and returns the data
		"""

		# Validate the data passed in
		serializer = self.serializer_class(data=request.data)
		serializer.is_valid(raise_exception=True)

		# Make sure user is not trying to tag themselves
		if serializer.validated_data.get("tagged_user") == request.user.email:
			return Response(status=status.HTTP_400_BAD_REQUEST)

		# Make sure user is not being tagged twice 
		user_tagged_previously = ReminderTags.objects.filter(reminder=serializer.validated_data.get("reminder"), tagged_user__email=serializer.validated_data.get("tagged_user")).exists()
		
		if user_tagged_previously:
			return Response(status=status.HTTP_400_BAD_REQUEST)
		else:
			serializer.save(tagged_by=request.user)
			
			return Response(serializer.data)


	def retrieve(self, request, pk=None):
		raise PermissionDenied()


	def update(self, request, pk=None):
		raise PermissionDenied()


	def partial_update(self, request, pk=None):
		raise PermissionDenied()


	def destroy(self, request, pk=None):
		"""
		Get the requested reminder tag from the db then delete it.
		Return the remaining reminder tags.
		"""

		queryset = ReminderTags.objects.filter(id=pk)
		reminder_tag = get_object_or_404(queryset)

		# Make sure only the user who created it or a tagged user can delete a tag
		if (reminder_tag.tagged_by == request.user or reminder_tag.tagged_user == request.user):
			reminder_tag.delete()

			return Response(status=status.HTTP_204_NO_CONTENT)
		else:
			return Response(status=status.HTTP_400_BAD_REQUEST)



class ReminderFlagsViewset(viewsets.ModelViewSet):
	serializer_class = ReminderFlagsSerializer 
	permission_classes = [permissions.IsAuthenticated] 

	def list(self, request):
		raise PermissionDenied()


	def create(self, request):
		"""
		Creates a new reminder flag and returns the data
		"""

		# Validate the data passed in
		serializer = self.serializer_class(data=request.data)
		serializer.is_valid(raise_exception=True)

		# Make sure reminder is not already flagged by this user
		flag_exists = ReminderFlags.objects.filter(reminder=serializer.validated_data.get("reminder"), flagged_by=request.user).exists()

		if flag_exists:
			return Response(status=status.HTTP_400_BAD_REQUEST)
		else:
			serializer.save(flagged_by=request.user)
			
			return Response(serializer.data)


	def retrieve(self, request, pk=None):
		raise PermissionDenied()


	def update(self, request, pk=None):
		raise PermissionDenied()


	def partial_update(self, request, pk=None):
		raise PermissionDenied()


	def destroy(self, request, pk=None):
		"""
		Get the requested reminder flag from the db then deletes it.
		"""

		queryset = ReminderFlags.objects.filter(reminder=pk, flagged_by=request.user)
		reminder_tag = get_object_or_404(queryset)
		reminder_tag.delete()

		return Response(status=status.HTTP_204_NO_CONTENT)