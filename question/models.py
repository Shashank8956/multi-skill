from django.db import models

from station.models import Station
from stage.models import Stage

from datetime import datetime

class TestHeader(models.Model):
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

