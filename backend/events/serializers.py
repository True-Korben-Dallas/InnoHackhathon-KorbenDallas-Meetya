from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Event, EventSubscription, Group, UserGroup

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'last_name', 'password')

    def create(self, validated_data):
        user = User(**validated_data)
        user.set_password(validated_data['password'])
        user.save()
        return user


class GroupSerializer(serializers.ModelSerializer):
    members = UserSerializer(many=True, read_only=True)

    class Meta:
        model = Group
        fields = ['id', 'name', 'description', 'members']


class EventSerializer(serializers.ModelSerializer):
    creator = UserSerializer(read_only=True)
    tags = serializers.ListField(
        child=serializers.CharField(max_length=200),
        source='tags_as_list',
        required=False
    )

    class Meta:
        model = Event
        fields = ['id', 'title', 'tags', 'description', 'date', 'location', 'creator', 'image']

    def create(self, validated_data):
        tags = validated_data.pop('tags_as_list', [])
        validated_data['tags'] = ','.join(tags)
        return super().create(validated_data)

    def update(self, instance, validated_data):
        tags = validated_data.pop('tags_as_list', [])
        instance.tags = ','.join(tags)
        return super().update(instance, validated_data)

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['tags'] = instance.tags.split(',') if instance.tags else []
        return representation


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
