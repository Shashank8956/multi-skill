from django.urls import path
from django.conf.urls import url
from . import views

app_name = 'adminview'

urlpatterns = [
    #path('login', views.displayLoginPage, name='login'),
      
    path('getAllEmployees', views.get_allEmployees, name="getAllEmployee"),
    
    path('dashboard', views.displayDashboard, name='dashboard'),
    
    path('employee', views.displayEmployeePage, name='employees'),
    path('<int:emp_token>', views.get_employee, name='getEmployee'),

    path('add_newEmp', views.addEmpTrial, name='add_employee'),
    
    path('test', views.displayTestPage, name='test'),
    path('testDetail', views.displayTestDetails, name='loadTestDetail'),
    
    path('addTest', views.addTestDetails, name='addTestDetail'),

    path('result', views.get_results, name='result_head_get'),
    path('result/<int:result_id>', views.get_result , name = 'a_result_head'),
    path('result/add_result_head', views.add_result, name='result_head_post'),
]