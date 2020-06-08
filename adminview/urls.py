from django.urls import path
from django.conf.urls import url
from . import views

app_name = 'adminview'

urlpatterns = [
    #path('login', views.displayLoginPage, name='login'),
    path('<int:emp_token>', views.get_employee, name='getEmployee'),
    path('getAllEmployees', views.get_allEmployees, name="getAllEmployee"),
    path('dashboard', views.displayDashboard, name='dashboard'),
    path('employee', views.displayEmployeePage, name='employees'),
    path('test', views.displayTestPage, name='test'),
    path('add_newEmp', views.addEmpTrial, name='add_employee'),
    path('testDetail', views.displayTestDetails, name='loadTestDetail'),
    path('addTest', views.addTestDetails, name='addTestDetail'),
]