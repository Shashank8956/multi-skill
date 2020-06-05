from django.contrib import admin
from .models import TestHeader, TestQuestion

class HeaderAdmin(admin.ModelAdmin):
    list_display = ('Station', 'Stage', 'Total_Question', 'Passing_Percent', 'Duration')
    list_link = ()
    list_filter = ['Station', 'Stage',]
    list_per_page = 25

admin.site.register(TestHeader, HeaderAdmin)

class QuestionAdmin(admin.ModelAdmin):
    list_display = ('Test', 'Question_Num', 'Question')
    list_link = ()
    list_per_page = 25

admin.site.register(TestQuestion, QuestionAdmin)
