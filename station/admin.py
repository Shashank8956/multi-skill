from django.contrib import admin
from .models import Station

class StationAdmin(admin.ModelAdmin):
    list_display = ('Name', 'Current_Manpower', 'Required_Manpower')
    list_link = ('Name')

admin.site.register(Station, StationAdmin)
