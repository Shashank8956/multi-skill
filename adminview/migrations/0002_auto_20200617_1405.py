# Generated by Django 3.0.7 on 2020-06-17 08:35

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('adminview', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='stage',
            old_name='skill',
            new_name='skills',
        ),
    ]