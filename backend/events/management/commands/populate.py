import random
from faker import Faker
from django.core.management.base import BaseCommand
from events.models import User, Group, Tag, Event, EventTag
from django.contrib.auth.hashers import make_password

fake = Faker()

class Command(BaseCommand):
    help = 'Populate the database with random data'

    def handle(self, *args, **kwargs):
        # Создание рандомных пользователей
        users = []
        for _ in range(10):  # Создаем 10 пользователей
            user = User(
                username=fake.user_name(),
                email=fake.email(),
                password=make_password('password'),  # Установка пароля
                first_name=fake.first_name(),
                last_name=fake.last_name(),
            )
            users.append(user)
        User.objects.bulk_create(users)
        self.stdout.write(self.style.SUCCESS('Successfully created users'))

        # Создание рандомных групп
        groups = []
        for _ in range(5):  # Создаем 5 групп
            group = Group(
                name=fake.company(),
                description=fake.catch_phrase(),
            )
            groups.append(group)
        Group.objects.bulk_create(groups)
        self.stdout.write(self.style.SUCCESS('Successfully created groups'))

        # Создание рандомных тегов
        tags = []
        for _ in range(10):  # Создаем 10 тегов
            tag = Tag(name=fake.word())
            tags.append(tag)
        Tag.objects.bulk_create(tags)
        self.stdout.write(self.style.SUCCESS('Successfully created tags'))

        # Создание рандомных событий
        events = []
        for _ in range(20):  # Создаем 20 событий
            event = Event(
                title=fake.sentence(),
                description=fake.text(),
                date=fake.date_time_this_year(),
                location=fake.city(),
                creator=random.choice(users),
                image='event_images/default.jpg'  # Убедитесь, что у вас есть изображение по умолчанию
            )
            events.append(event)
        Event.objects.bulk_create(events)
        self.stdout.write(self.style.SUCCESS('Successfully created events'))

        # Связывание событий с тегами
        for event in events:
            event_tags = random.sample(tags, random.randint(1, 3))  # Случайно выбираем 1-3 тега для каждого события
            for tag in event_tags:
                EventTag.objects.create(event=event, tag=tag)

        self.stdout.write(self.style.SUCCESS('Successfully created event tags'))