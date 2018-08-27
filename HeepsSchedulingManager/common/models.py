from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

class Profile(models.Model):
    # OWNER = 1
    # ADMINISTRATOR = 2
    # EMPLOYEE = 3
    # ROLE_CHOICES = (
    #     (OWNER, 'Owner'),
    #     (ADMINISTRATOR, 'Administrator'),
    #     (EMPLOYEE, 'Employee'),
    # ROLE_CHOICES = ('Owner','Admin','Employee',)
    # )
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    role = models.CharField(null=True, blank=True, max_length=50)
    acuityID = models.CharField(max_length=50, null=True)
    acuityKey = models.CharField(max_length=200, null=True)

    @receiver(post_save, sender=User)
    def create_user_profile(sender, instance, created, **kwargs):
        if created:
            Profile.objects.create(user=instance)

    @receiver(post_save, sender=User)
    def save_user_profile(sender, instance, **kwargs):
        instance.profile.save()
