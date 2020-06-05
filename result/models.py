from django.db import models

from question.models import TestHeader, TestQuestion
from employee.models import Employee

from datetime import datetime

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

