from django.db import models

# Create your models here.
class Employee(models.Model):
    emp_token = models.IntegerField(unique = True)
    emp_name = models.CharField(max_length=200)
    gender = models.CharField(max_length=7)
    current_station = models.CharField(default="Some station", max_length=200)
    mobile = models.CharField(max_length=12)
    doj = models.DateField(auto_now_add=True)
    language_preference = models.CharField(default="English", max_length=200)
    createdOn = models.DateField(auto_now_add=True)
    createdBy = models.CharField(default="Some Admin", max_length=200)
    isAdmin = models.BooleanField(default=True)
    objects = models.Manager()


#emp = Employee(emp_token = 12345, emp_name = 'Trial Admin', gender = 'M', current_station = 'Some weird station', mobile = '9876543210', language_preference = 'English', createdBy = 'Some stupid admin 1', isAdmin = True)
