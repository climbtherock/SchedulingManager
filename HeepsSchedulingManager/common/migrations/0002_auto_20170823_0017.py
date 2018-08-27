# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2017-08-23 06:17
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('common', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='role',
            field=models.PositiveSmallIntegerField(blank=True, choices=[(1, 'Owner'), (2, 'Administrator'), (3, 'Employee')], null=True),
        ),
    ]
