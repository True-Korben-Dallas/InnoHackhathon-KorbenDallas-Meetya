from rest_framework import viewsets
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.views import APIView
from rest_framework.response import Response

from django.contrib.auth import get_user_model
from .models import Event, EventSubscription, Group, UserGroup
from .serializers import EventSerializer, EventSubscriptionSerializer, GroupSerializer, UserSerializer, UserGroupSerializer 

User = get_user_model()


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
            return [AllowAny()] 
        return [IsAuthenticated()]


class GroupViewSet(viewsets.ModelViewSet):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes = [IsAuthenticated]


class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        data = request.data
        user = User.objects.create_user(
            email=data["email"],
            password=data["password"],
            username=data["username"]
        )
        user.first_name = data["first_name"]
        user.last_name = data["last_name"]
        user.save()

        refresh = RefreshToken.for_user(user)

        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        })


class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        data = request.data
        user = User.objects.filter(email=data["email"]).first()
        if user and user.check_password(data["password"]):
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            })
        return Response({"detail": "Invalid credentials"}, status=400)


class EventSubscriptionViewSet(viewsets.ModelViewSet):
    queryset = EventSubscription.objects.all()
    serializer_class = EventSubscriptionSerializer
    permission_classes = [IsAuthenticated]


class UserGroupViewSet(viewsets.ModelViewSet):
    queryset = UserGroup.objects.all()
    serializer_class = UserGroupSerializer
    permission_classes = [IsAuthenticated]

class UserProfileView(APIView):
    permission_classes = [IsAuthenticated] 

    def get(self, request):
        user = request.user 
        user_data = {
            'id': user.id,
            'username': user.username,
            'first_name': user.first_name,
            'last_name': user.last_name,
            'email': user.email,
        }
        return Response(user_data)
    