from django.contrib import admin

from .models import ResultHeader, ResultQuestion

class HeaderAdmin(admin.ModelAdmin):
    list_display = ('Test', 'Employee', 'Marks_Obtained', 'Total_Marks')
    #readonly_fields = ('Test', 'Employee', 'Marks_Obtained', 'Total_Marks')

admin.site.register(ResultHeader, HeaderAdmin)


class QuestionAdmin(admin.ModelAdmin):
    list_display = ('Result', 'Question', 'Response')
    #readonly_fields = ('Result', 'Question', 'Response')

admin.site.register(ResultQuestion, QuestionAdmin)

