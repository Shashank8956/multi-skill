# Generated by Django 3.0.7 on 2020-06-05 10:03

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Station',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Name', models.CharField(max_length=50)),
                ('Current_Manpower', models.IntegerField(default=0)),
                ('Required_Manpower', models.IntegerField()),
            ],
        ),
    ]
