from django.urls import path, include
from reminders.views import (
    RemindersViewset,
    ReminderTagsViewset,
    ReminderFlagsViewset
)
from rest_framework import routers

# Create and use default router for ease of URL definitions
router = routers.DefaultRouter()
router.register('reminders', RemindersViewset, 'reminders')
router.register('tags', ReminderTagsViewset, 'tags')
router.register('flags', ReminderFlagsViewset, 'flags')

# Register all the views to specific URLs
urlpatterns = [
    path('', include(router.urls))
]
