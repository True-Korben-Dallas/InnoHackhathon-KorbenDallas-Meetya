from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    email = models.EmailField(
        verbose_name='email address',
        max_length=255,
        unique=True,
    )
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=150)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'first_name', 'last_name', 'password']
    groups = models.ManyToManyField(
        'auth.Group',
        related_name='custom_user_set',
        blank=True
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='custom_user_permissions_set',
        blank=True
    )

    def __str__(self):
        return self.username


class Event(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    date = models.DateTimeField()
    location = models.CharField(max_length=200)
    creator = models.ForeignKey(User,
                                on_delete=models.CASCADE,
                                related_name='events')
    image = models.ImageField(upload_to='event_images/', blank=True, null=True)
    tags = models.CharField(max_length=500, blank=True, null=True)  # Строка для тегов

    def __str__(self):
        return self.title


class Group(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    members = models.ManyToManyField(User, through='UserGroup')

    def __str__(self):
        return self.name


class EventSubscription(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    subscribed_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'event')


class UserGroup(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    group = models.ForeignKey(Group, on_delete=models.CASCADE)
    joined_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'group')
