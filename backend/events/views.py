from rest_framework import viewsets
from rest_framework.permissions import AllowAny, IsAuthenticated

from .models import (Event, EventSubscription, EventTag, Group, Tag, User,
                     UserGroup)
from .serializers import (EventSerializer, EventSubscriptionSerializer,
                          EventTagSerializer, GroupSerializer, TagSerializer,
                          UserGroupSerializer, UserSerializer)


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)


class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer

    def get_permissions(self):
        if self.action == 'list':
            return [AllowAny()]  # Разрешить для list
        return [IsAuthenticated()]


class GroupViewSet(viewsets.ModelViewSet):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes = [IsAuthenticated]


class TagViewSet(viewsets.ModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer

    def get_permissions(self):
        if self.action == 'list':
            return [AllowAny()]  # разрешить для list
        return [IsAuthenticated()]


class EventTagViewSet(viewsets.ModelViewSet):
    queryset = EventTag.objects.all()
    serializer_class = EventTagSerializer
    permission_classes = [IsAuthenticated]


class EventSubscriptionViewSet(viewsets.ModelViewSet):
    queryset = EventSubscription.objects.all()
    serializer_class = EventSubscriptionSerializer
    permission_classes = [IsAuthenticated]


class UserGroupViewSet(viewsets.ModelViewSet):
    queryset = UserGroup.objects.all()
    serializer_class = UserGroupSerializer
    permission_classes = [IsAuthenticated]
