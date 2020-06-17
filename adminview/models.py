from django.db import models

from django.contrib.auth.models import User

from datetime import datetime

class Station(models.Model):
    name = models.CharField(max_length = 50)
    current_manpower = models.IntegerField(default = 0, blank = False)
    required_manpower = models.IntegerField()

    def __str__(self):
        return self.name


class Stage(models.Model):
    # Name = Skill, Novice = 1, Competent = 2, Proficient = 3, Expert = 4
    name = models.CharField(max_length = 50) 
    skill = models.IntegerField()   

    def __str__(self):
        return self.name


class Employee(models.Model):
    token = models.IntegerField()
    name = models.CharField(max_length = 50)
    gender = models.CharField(max_length = 50)
    contact = models.CharField(max_length = 50)
    email = models.CharField(max_length = 50, blank = True)
    station = models.ForeignKey(Station, on_delete = models.DO_NOTHING) 
    prefered_language = models.CharField(max_length = 50)
    date_of_joining = models.DateField()
    is_admin = models.BooleanField(default=True)
    created_on = models.DateTimeField(default = datetime.now, blank = True)
    created_by = models.ForeignKey(User, on_delete = models.DO_NOTHING)

    def __str__(self):
        return self.name

    # emp = Employee(emp_token = 12345, emp_name = 'Trial Admin', gender = 'M', 
    # current_station = 'Some weird station', mobile = '9876543210', 
    # language_preference = 'English', createdBy = 'Some stupid admin 1', 
    # isAdmin = True)


class EmployeeSkill(models.Model):
    employee = models.ForeignKey(Employee, on_delete = models.DO_NOTHING)
    station = models.ForeignKey(Station, on_delete = models.DO_NOTHING)
    stage = models.ForeignKey(Stage, on_delete = models.DO_NOTHING)   
    test_date = models.DateTimeField(default = datetime.now, blank = True)

    def __str__(self):
        return self.employee.name


class TestHeader(models.Model):
    title = models.TextField()
    station = models.ForeignKey(Station, on_delete = models.DO_NOTHING)
    stage = models.ForeignKey(Stage, on_delete = models.DO_NOTHING)
    total_question = models.IntegerField()
    passing_marks = models.IntegerField()
    duration = models.IntegerField()
    created_on = models.DateTimeField(default = datetime.now, blank = True)

    def __str__(self):
        return (str(self.station) + "'s Test")


class TestQuestion(models.Model):
    test = models.ForeignKey(TestHeader, on_delete = models.DO_NOTHING)
    question_num = models.IntegerField()
    question = models.TextField()
    option_a = models.CharField(max_length = 50)
    option_b = models.CharField(max_length = 50)
    option_c = models.CharField(max_length = 50)
    option_d = models.CharField(max_length = 50)
    correct_option = models.CharField(max_length = 1) #A, B, C, D

    def __str__(self):
        return (str(self.test) + "'s Question " + str(self.question_num))


class ResultHeader(models.Model):
    test = models.ForeignKey(TestHeader, on_delete = models.DO_NOTHING)
    employee = models.ForeignKey(Employee, on_delete = models.DO_NOTHING)
    marks_obtained = models.FloatField()
    total_marks = models.FloatField()
    status = models.CharField(max_length = 4)
    test_date = models.DateField(default = datetime.now, blank = True)
    
    def __str__(self):
        return str(self.employee.name) + "'s " + str(self.test.station) + "'s Result"


class ResultQuestion(models.Model):
    result = models.ForeignKey(ResultHeader, on_delete = models.DO_NOTHING)
    question = models.ForeignKey(TestQuestion, on_delete = models.DO_NOTHING)
    response = models.CharField(max_length = 1)

    def __str__(self):
        return str(self.result.employee.name) + "'s " + str(self.result.test.station)
        + "'s Question" + str(self.question.question_num)