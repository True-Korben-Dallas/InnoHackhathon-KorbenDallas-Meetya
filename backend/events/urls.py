from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import (EventSubscriptionViewSet, EventTagViewSet, EventViewSet,
                    GroupViewSet, TagViewSet, UserGroupViewSet, UserViewSet)

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'events', EventViewSet)
router.register(r'groups', GroupViewSet)
router.register(r'tags', TagViewSet)
router.register(r'event-tags', EventTagViewSet)
router.register(r'subscriptions', EventSubscriptionViewSet)
router.register(r'user-groups', UserGroupViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
