from django.db import models

from django.contrib.auth.models import User

from datetime import datetime

class Station(models.Model):
    Name = models.CharField(max_length = 50)
    Current_Manpower = models.IntegerField(default = 0, blank = False)
    Required_Manpower = models.IntegerField()

    def __str__(self):
        return self.Name


class Stage(models.Model):
    Name = models.CharField(max_length = 50)
    Station = models.ForeignKey(Station, on_delete = models.DO_NOTHING)    

    def __str__(self):
        return self.Name


class Employee(models.Model):
    Token = models.IntegerField()
    Name = models.CharField(max_length = 50)
    Gender = models.CharField(max_length = 50)
    Contact = models.CharField(max_length = 50)
    Email = models.CharField(max_length = 50, blank = True)
    Station = models.ForeignKey(Station, on_delete = models.DO_NOTHING) 
    Language_Preference = models.CharField(max_length = 50)
    Date_Of_Joining = models.DateField()
    Is_Admin = models.BooleanField(default=True)
    Created_On = models.DateTimeField(default = datetime.now, blank = True)
    Created_By = models.ForeignKey(User, on_delete = models.DO_NOTHING)

    def __str__(self):
        return self.Name

    #emp = Employee(emp_token = 12345, emp_name = 'Trial Admin', gender = 'M', current_station = 'Some weird station', mobile = '9876543210', language_preference = 'English', createdBy = 'Some stupid admin 1', isAdmin = True)


class EmployeeSkill(models.Model):
    Employee = models.ForeignKey(Employee, on_delete = models.DO_NOTHING)
    Station = models.ForeignKey(Station, on_delete = models.DO_NOTHING)
    Stage = models.ForeignKey(Stage, on_delete = models.DO_NOTHING)
    Skill = models.IntegerField()
    Test_Date = models.DateTimeField(default = datetime.now, blank = True)

    def __str__(self):
        return self.Employee.Name


class TestHeader(models.Model):
    Title = models.TextField()
    Station = models.ForeignKey(Station, on_delete = models.DO_NOTHING)
    Stage = models.ForeignKey(Stage, on_delete = models.DO_NOTHING)
    Total_Question = models.IntegerField()
    Passing_Percent = models.IntegerField()
    Duration = models.IntegerField()
    Created_On = models.DateTimeField(default = datetime.now, blank = True)

    def __str__(self):
        return (str(self.Station) + " Test")


class TestQuestion(models.Model):
    Test = models.ForeignKey(TestHeader, on_delete = models.DO_NOTHING)
    Question_Num = models.IntegerField()
    Question = models.TextField()
    Option_A = models.CharField(max_length = 50)
    Option_B = models.CharField(max_length = 50)
    Option_C = models.CharField(max_length = 50)
    Option_D = models.CharField(max_length = 50)
    Correct_Option = models.CharField(max_length = 1) #A, B, C, D

    def __str__(self):
        return (str(self.Test) + " Question " + str(self.Question_Num))


class ResultHeader(models.Model):
    Test = models.ForeignKey(TestHeader, on_delete = models.DO_NOTHING)
    Employee = models.ForeignKey(Employee, on_delete = models.DO_NOTHING)
    Marks_Obtained = models.FloatField()
    Total_Marks = models.FloatField()
    Test_Date = models.DateField(default = datetime.now, blank = True)
    
    def __str__(self):
        return str(self.Employee.Name) + "'s " + str(self.Test.Area) + "'s Result"


class ResultQuestion(models.Model):
    Result = models.ForeignKey(ResultHeader, on_delete = models.DO_NOTHING)
    Question = models.ForeignKey(TestQuestion, on_delete = models.DO_NOTHING)
    Response = models.CharField(max_length = 1)

    def __str__(self):
        return str(self.Result.Employee.Name) + "'s " + str(self.Result.Test.Area) + "'s Question" + str(self.Question.QuestionNum)