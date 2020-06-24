from django.views.generic.base import TemplateView
from django.urls import path
from .views import *


app_name = 'adminview'

urlpatterns = [
    path('dashboard', TemplateView.as_view(template_name='admin/dashboard.html'), name='dashboard'),
    path('employee', TemplateView.as_view(template_name='admin/employee.html'), name='employees'),
    path('test', TemplateView.as_view(template_name='admin/test.html'), name='test'),
    path('testDetail', TemplateView.as_view(template_name='admin/testDetail.html'), name='loadTestDetail'),
    path('skillPlatform', TemplateView.as_view(template_name='admin/skillPlatform.html'), name='skillPlatform'),
    path('shiftManagement', TemplateView.as_view(template_name='admin/shift.html'), name='shiftManagement'),
    path('trainingManagement', TemplateView.as_view(template_name='admin/training.html'), name='trainingManagement'),

    path('employeeData', EmployeeView.as_view(), name="employeeData"),
    path('testData', TestView.as_view(), name="testData"),
    path('stationData', StationView.as_view(), name='stationData'),
    path('stageData', StageView.as_view(), name='stageData'),
    path('shiftData', ShiftView.as_view(), name='shiftData'),
    path('employeeSkillData', EmployeeSkillView.as_view(), name='employeeSkillData'),
    path('trainingData', TrainingView.as_view(), name='trainingData')
]
