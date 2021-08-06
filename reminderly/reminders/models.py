from django.db import models
from django.contrib.auth import get_user_model



class Reminders(models.Model):
    """
    Model to store data about a reminder
    """
    created_by = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    text = models.TextField(verbose_name="reminder_text")
    created_date = models.DateField(verbose_name="created_date", auto_now_add=True)
    due_date = models.DateField(verbose_name="due_date")


class ReminderTags(models.Model):
    """
    Model to store data about reminder tags
    """

    reminder = models.ForeignKey(Reminders, on_delete=models.CASCADE, related_name="tags", related_query_name="tag")
    tagged_user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE, related_name="+", related_query_name="+")
    tagged_by = models.ForeignKey(get_user_model(), on_delete=models.CASCADE, related_name="+", related_query_name="+")


class ReminderFlags(models.Model):
    """
    Model to store data about reminder flags
    """
    
    reminder = models.ForeignKey(Reminders, on_delete=models.CASCADE, related_name="flags", related_query_name="flag")
    flagged_by = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)

