from django.urls import path
from django.views.generic.base import TemplateView
from . import views

app_name = 'adminview'

urlpatterns = [
    path('dashboard', TemplateView.as_view(template_name='admin/dashboard.html'), name='dashboard'),
    path('employee', TemplateView.as_view(template_name='admin/employee.html'), name='employees'),
    path('test', TemplateView.as_view(template_name='admin/test.html'), name='test'),
    path('testDetail', TemplateView.as_view(template_name='admin/testDetail.html'), name='loadTestDetail'),

    path('<int:emp_token>', views.get_employee, name='getEmployee'),
    path('getAllEmployees', views.get_all_employees, name="getAllEmployee"),
    path('add_newEmp', views.add_emp_trial, name='add_employee'),

    path('addTest', views.add_test_details, name='addTest'),

    path('result', views.get_results, name='result_head_get'),
    path('result/<int:result_id>', views.get_result, name='a_result_head'),
    path('result/add_result_head', views.add_result, name='result_head_post'),
]
