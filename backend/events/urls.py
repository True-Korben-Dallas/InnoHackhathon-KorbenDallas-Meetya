from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    UserViewSet,
    EventViewSet,
    GroupViewSet,
    TagViewSet,
    EventTagViewSet,
    EventSubscriptionViewSet,
    UserGroupViewSet,
)

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