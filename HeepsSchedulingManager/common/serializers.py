from django.contrib.auth.models import User
from .models import Profile
from rest_framework import serializers

class UserSerializer(serializers.HyperlinkedModelSerializer):

    role = serializers.CharField(source='profile.role')
    acuityID = serializers.CharField(source='profile.acuityID')
    acuityKey = serializers.CharField(source='profile.acuityKey')
    class Meta:
        model = User
        fields = ('id','username','email','role','acuityID','acuityKey')

    def create(self, validated_data):
        profile_data = validated_data.pop('profile',None)
        user = super(UserSerializer,self).create(validated_data)
        self.update_or_create_profile(user, profile_data)
        return user

    def update(self, instance, validated_data):
        profile_data = validated_data.pop('profile', None)
        self.update_or_create_profile(instance, profile_data)
        return super(UserSerializer, self).update(instance, validated_data)

    def update_or_create_profile(self, user, profile_data):
        # This always creates a Profile if the User is missing one;
        # change the logic here if that's not right for your app
        Profile.objects.update_or_create(user=user, defaults=profile_data)