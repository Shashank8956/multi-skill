from django.db import models

from django.contrib.auth.models import User
from station.models import Station
from stage.models import Stage

from datetime import datetime
from django.http import request

class Employee(models.Model):
    Token = models.IntegerField()
    Name = models.CharField(max_length = 50)
    Gender = models.CharField(max_length = 50)
    Contact = models.CharField(max_length = 50)
    Email = models.CharField(max_length = 50, blank = True)
    Station = models.ForeignKey(Station, on_delete = models.DO_NOTHING) 
    Language_Preference = models.CharField(max_length = 50)
    Date_Of_Joining = models.DateField()
    Created_On = models.DateTimeField(default = datetime.now, blank = True)
    Created_By = models.ForeignKey(User, on_delete = models.DO_NOTHING)

    
    def __str__(self):
        return self.Name


class EmployeeSkill(models.Model):
    Employee = models.ForeignKey(Employee, on_delete = models.DO_NOTHING)
    Station = models.ForeignKey(Station, on_delete = models.DO_NOTHING)
    Stage = models.ForeignKey(Stage, on_delete = models.DO_NOTHING)
    Skill = models.IntegerField()
    Test_Date = models.DateTimeField(default = datetime.now, blank = True)

    def __str__(self):
        return self.Employee.Name