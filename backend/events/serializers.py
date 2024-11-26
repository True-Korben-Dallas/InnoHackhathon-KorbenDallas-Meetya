from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import (Event, EventSubscription, EventTag, Group, Tag,
                     UserGroup)


User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'last_name', 'password')

    def create(self, validated_data):
        user = User(**validated_data)
        user.set_password(validated_data['password'])  # Хэшируем пароль
        user.save()
        return user


class GroupSerializer(serializers.ModelSerializer):
    members = UserSerializer(many=True, read_only=True)

    class Meta:
        model = Group
        fields = ['id', 'name', 'description', 'members']


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['id', 'name']


class EventTagSerializer(serializers.ModelSerializer):
    tag = TagSerializer()
    class Meta:
        model = EventTag
        fields = ['event', 'tag']


class EventSerializer(serializers.ModelSerializer):
    creator = UserSerializer(read_only=True)
    tags = EventTagSerializer(many=True, read_only=True, source='eventtag_set')
    class Meta:
        model = Event
        fields = ['id', 'title', 'tags', 'description',
                  'date', 'location', 'creator', 'image']



class EventSubscriptionSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    event = EventSerializer(read_only=True)

    class Meta:
        model = EventSubscription
        fields = ['id', 'user', 'event', 'subscribed_at']


class UserGroupSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    group = GroupSerializer(read_only=True)

    class Meta:
        model = UserGroup
        fields = ['id', 'user', 'group', 'joined_at']
