# Generated by Django 4.2 on 2024-12-24 15:05

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("pyramids_auth", "0001_initial"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="user",
            name="current_token_id",
        ),
        migrations.AddField(
            model_name="user",
            name="current_token_nonce",
            field=models.UUIDField(null=True),
        ),
    ]
