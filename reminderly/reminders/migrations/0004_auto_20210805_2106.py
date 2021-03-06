# Generated by Django 3.2.6 on 2021-08-05 21:06

import uuid

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('reminders', '0003_auto_20210806_0054'),
    ]

    operations = [
        migrations.AddField(
            model_name='remindertags',
            name='tagged_by',
            field=models.ForeignKey(default=uuid.UUID("8e6a3f00-1fea-4eb3-93d5-0c3af7846016"), on_delete=django.db.models.deletion.CASCADE, related_name='+', related_query_name='+', to='accounts.user'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='remindertags',
            name='tagged_user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='+', related_query_name='+', to=settings.AUTH_USER_MODEL),
        ),
    ]
