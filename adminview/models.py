from django.db import models
from datetime import datetime


class Station(models.Model):
    station_name = models.CharField(max_length=50)
    current_manpower = models.IntegerField(default=0, blank=False)
    required_manpower = models.IntegerField()

    def __str__(self):
        return self.station_name


class Stage(models.Model):
    # Name = Skill, Novice = 1, Competent = 2, Proficient = 3, Expert = 4
    stage_name = models.CharField(max_length=50)
    skill_level = models.IntegerField()

    def __str__(self):
        return self.stage_name


class EmployeeShift(models.Model):
    shift_name = models.CharField(max_length=100)
    start_time = models.TimeField()
    end_time = models.TimeField()


class Employee(models.Model):
    emp_token = models.IntegerField(unique=True)
    emp_name = models.CharField(max_length=200)
    gender = models.CharField(max_length=7)
    current_station = models.ForeignKey(Station, on_delete=models.DO_NOTHING)
    mobile = models.CharField(max_length=12)
    doj = models.DateField(auto_now_add=True)
    language_preference = models.CharField(default="English", max_length=200)
    created_on = models.DateField(auto_now_add=True)
    created_by = models.CharField(default="Some Admin", max_length=200)
    is_admin = models.BooleanField(default=True)
    shift = models.ForeignKey(EmployeeShift, on_delete=models.DO_NOTHING)
    weekly_off = models.CharField(max_length=100)
    objects = models.Manager()

    def __str__(self):
        return "{} - {}".format(self.emp_token, self.emp_name)


class EmployeeSkill(models.Model):
    employee = models.ForeignKey(Employee, on_delete=models.DO_NOTHING)
    stage_id = models.ForeignKey(Stage, on_delete=models.DO_NOTHING)
    acquired_on = models.DateField(default=datetime.now, blank=True)

    def __str__(self):
        return str(self.result_id.employee.emp_name) + "'s " + str(stage_id.skill_level) + " level"


class TestHeader(models.Model):
    station_id = models.ForeignKey(Station, on_delete=models.DO_NOTHING)
    stage_id = models.ForeignKey(Stage, on_delete=models.DO_NOTHING)
    test_title = models.CharField(max_length=200)
    no_of_questions = models.IntegerField()
    test_time = models.IntegerField()
    max_marks = models.IntegerField()

    def __str__(self):
        return "Test Title : {}".format(self.test_title)


class TestQuestions(models.Model):
    test_id = models.ForeignKey(TestHeader, on_delete=models.DO_NOTHING)
    question_number = models.IntegerField()
    question = models.CharField(max_length=500)
    option_1 = models.CharField(max_length=100)
    option_2 = models.CharField(max_length=100)
    option_3 = models.CharField(max_length=100)
    option_4 = models.CharField(max_length=100)

    def __str__(self):
        return "Test Question: {}".format(self.question)


class ResultHeader(models.Model):
    test_id = models.ForeignKey(TestHeader, on_delete=models.DO_NOTHING)
    employee = models.ForeignKey(Employee, on_delete=models.DO_NOTHING)
    marks_obtained = models.FloatField()
    total_marks = models.FloatField()
    status = models.CharField(max_length=4)
    test_date = models.DateField(default=datetime.now, blank=True)

    def __str__(self):
        return str(self.employee.name) + "'s " + str(self.test_id.station_id.station_name) + "'s Result"


class ResultQuestion(models.Model):
    result_id = models.ForeignKey(ResultHeader, on_delete=models.DO_NOTHING)
    question_id = models.ForeignKey(TestQuestions, on_delete=models.DO_NOTHING)
    response = models.CharField(max_length=1)

    def __str__(self):
        return str(self.result_id.employee.emp_name) + "'s " + str(self.result_id.test_id.station_id.station_name)
        + "'s Question" + str(self.question_id.question_number)





