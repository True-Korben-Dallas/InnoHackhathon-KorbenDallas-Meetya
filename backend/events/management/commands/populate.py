import random
from django.contrib.auth.hashers import make_password
from django.core.management.base import BaseCommand
from faker import Faker

from events.models import Event, Group, User

fake = Faker()

TAG_LIST = ["tag1", "tag2", "tag3", "tag4"]

class Command(BaseCommand):
    help = 'Populate the database with random data'

    def handle(self, *args, **kwargs):
        users = []
        for _ in range(10):
            user = User(
                username=fake.user_name(),
                email=fake.email(),
                password=make_password('password'),
                first_name=fake.first_name(),
                last_name=fake.last_name(),
            )
            users.append(user)
        User.objects.bulk_create(users)
        self.stdout.write(self.style.SUCCESS('Successfully created users'))

        groups = []
        for _ in range(5):
            group = Group(
                name=fake.company(),
                description=fake.catch_phrase(),
            )
            groups.append(group)
        Group.objects.bulk_create(groups)
        self.stdout.write(self.style.SUCCESS('Successfully created groups'))

        events = []
        for _ in range(5):
            tags = random.sample(TAG_LIST, random.randint(1, 3))
            event = Event(
                title=fake.sentence(),
                description=fake.text(),
                date=fake.date_time_this_year(),
                location=fake.city(),
                creator=random.choice(users),
                image='event_images/default.jpg',
                tags=tags
            )
            events.append(event)
        Event.objects.bulk_create(events)
        self.stdout.write(self.style.SUCCESS('Successfully created events'))
