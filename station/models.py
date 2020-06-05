from django.db import models

class Station(models.Model):
    Name = models.CharField(max_length = 50)
    Current_Manpower = models.IntegerField(default = 0, blank = False)
    Required_Manpower = models.IntegerField()

    def __str__(self):
        return self.Name
 