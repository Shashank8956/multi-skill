from django.db import models
from datetime import datetime


class Employee(models.Model):
    emp_token = models.IntegerField(unique=True)
    emp_name = models.CharField(max_length=200)
    gender = models.CharField(max_length=7)
    current_station = models.CharField(default="Some station", max_length=200)
    mobile = models.CharField(max_length=12)
    doj = models.DateField(auto_now_add=True)
    language_preference = models.CharField(default="English", max_length=200)
    created_on = models.DateField(auto_now_add=True)
    created_by = models.CharField(default="Some Admin", max_length=200)
    is_admin = models.BooleanField(default=True)
    objects = models.Manager()


class TestHeader(models.Model):
    test_title = models.CharField(max_length=200)
    test_station = models.CharField(max_length=20)
    test_stage = models.CharField(max_length=20)
    no_of_questions = models.IntegerField()
    test_time = models.IntegerField()
    max_marks = models.IntegerField()


class TestQuestions(models.Model):
    test_id = models.ForeignKey(TestHeader, on_delete=models.DO_NOTHING)
    question_number = models.IntegerField()
    question = models.CharField(max_length=500)
    option_1 = models.CharField(max_length=100)
    option_2 = models.CharField(max_length=100)
    option_3 = models.CharField(max_length=100)
    option_4 = models.CharField(max_length=100)


class Station(models.Model):
    name = models.CharField(max_length=50)
    current_manpower = models.IntegerField(default=0, blank=False)
    required_manpower = models.IntegerField()

    def __str__(self):
        return self.name


class Stage(models.Model):
    # Name = Skill, Novice = 1, Competent = 2, Proficient = 3, Expert = 4
    name = models.CharField(max_length=50)
    skill = models.IntegerField()

    def __str__(self):
        return self.name


class ResultHeader(models.Model):
    test = models.ForeignKey(TestHeader, on_delete=models.DO_NOTHING)
    employee = models.ForeignKey(Employee, on_delete=models.DO_NOTHING)
    marks_obtained = models.FloatField()
    total_marks = models.FloatField()
    status = models.CharField(max_length=4)
    test_date = models.DateField(default=datetime.now, blank=True)

    def __str__(self):
        return str(self.employee.name) + "'s " + str(self.test.station) + "'s Result"


class ResultQuestion(models.Model):
    result = models.ForeignKey(ResultHeader, on_delete=models.DO_NOTHING)
    question = models.ForeignKey(TestQuestions, on_delete=models.DO_NOTHING)
    response = models.CharField(max_length=1)

    def __str__(self):
        return str(self.result.employee.name) + "'s " + str(self.result.test.station)
        + "'s Question" + str(self.question.question_num)
