from django.contrib.auth import get_user_model
from rest_framework import serializers
from reminders.models import (
	Reminders, 
	ReminderFlags, 
	ReminderTags
)

class ReminderTagsSerializer(serializers.ModelSerializer):
	"""
	Serializer for Reminder tags.
	"""

	tagged_user = serializers.SlugRelatedField(slug_field='email', queryset=get_user_model().objects.all())
	tagged_by = serializers.SlugRelatedField(slug_field='email', read_only=True)
	
	class Meta:
		model = ReminderTags
		fields = ('__all__')


class ReminderFlagsSerializer(serializers.ModelSerializer):
	"""
	Serializer for Reminder flags.
	"""

	flagged_by = serializers.SlugRelatedField(slug_field='email', read_only=True)

	class Meta:
		model = ReminderFlags
		fields = ('__all__')

class RemindersSerializer(serializers.ModelSerializer):
	"""
	Serializer for Reminders. Also sends along data about flag status and tags.
	"""

	tags = ReminderTagsSerializer(many=True, read_only=True)
	flagged = serializers.SerializerMethodField(read_only=True)
	created_by = serializers.SlugRelatedField(slug_field='email', read_only=True)
	
	class Meta:
		model = Reminders
		fields = ('__all__')


	def get_flagged(self, obj):
		"""
		Custom method field to figure out if the reminder 
		being serialized is flagged by the current user.
		"""
		
		request = self.context.get('request', None)
		flagged = ReminderFlags.objects.filter(flagged_by=request.user, reminder=obj.id).exists()

		return flagged
