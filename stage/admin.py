from django.contrib import admin

from .models import Stage

class StageAdmin(admin.ModelAdmin):
    list_display = ('Name', 'Station')
    list_link = ('Name', 'Station')


admin.site.register(Stage, StageAdmin)
