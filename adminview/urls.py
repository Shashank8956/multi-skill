from django.urls import path
from django.conf.urls import url
from . import views

app_name = 'adminview'

urlpatterns = [
    #path('login', views.displayLoginPage, name='login'),
    path('<int:emp_token>', views.get_employee, name='getEmployee'),
    path('getAllEmployees', views.get_all_employees, name="getAllEmployee"),
    path('dashboard', views.display_dashboard, name='dashboard'),
    path('employee', views.display_employee_page, name='employees'),
    path('test', views.display_test_page, name='test'),
    path('add_newEmp', views.add_emp_trial, name='add_employee'),
    path('testDetail', views.display_test_details, name='loadTestDetail'),
    path('addTest', views.add_test_details, name='addTestDetail'),
]
