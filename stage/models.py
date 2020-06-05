from django.db import models

from station.models import Station


class Stage(models.Model):
    Name = models.CharField(max_length = 50)
    Station = models.ForeignKey(Station, on_delete = models.DO_NOTHING)    

    def __str__(self):
        return self.Name

