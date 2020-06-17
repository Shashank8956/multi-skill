from django.db import models


# Create your models here.
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


"""
{
    "title": "How are you?",
    "station": "Stage 2",
    "stage": "Stage 2",
    "questions": "77",
    "time": "8587",
    "marks": "88",
    "Question Details": [
        {
            "q1": "Add details for this question",
            "Op1": "Add Option 1",
            "Op2": "Add Option 2",
            "Op3": "Add Option 1",
            "Op4": "Add Option 2"
        }
    ]
}
"""
