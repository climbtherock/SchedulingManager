# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2017-09-09 03:07
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('common', '0003_auto_20170823_1130'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='stripeKey',
            field=models.CharField(max_length=200, null=True),
        ),
    ]
