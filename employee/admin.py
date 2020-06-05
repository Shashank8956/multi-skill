from django.contrib import admin
from .models import Employee, EmployeeSkill

class EmployeeAdmin(admin.ModelAdmin):
    list_display = ('Token', 'Name', 'Station', 'Date_Of_Joining', 'Contact', 'Created_On', 'Created_By')
    list_display_links = ('Token', 'Name')
    list_filter = ('Station', 'Date_Of_Joining',)
    search_fields = ('Token','Name')
    ordering = ('Token', 'Name')
    exclude = ('Created_By',)
    list_per_page = 25

    def save_model(self, request, obj, form, change):
        obj.Created_By = request.user
        print("User Added")
        super().save_model(request, obj, form, change)  


admin.site.register(Employee, EmployeeAdmin)


class EmployeeSkillAdmin(admin.ModelAdmin):
    list_display = ('Employee', 'Station', 'Stage', 'Skill', 'Test_Date')
    #readonly_fields = ['Employee', 'Station', 'Stage', 'Skill', 'Test_Date']

admin.site.register(EmployeeSkill, EmployeeSkillAdmin)

