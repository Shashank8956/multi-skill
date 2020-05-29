from django.urls import path
from . import views

app_name = 'adminview'

urlpatterns = [
    path('login', views.displayLoginPage, name='login'),
    path('dashboard', views.displayDashboard, name='dashboard'),
    path('employee', views.displayEmployeePage, name='employee'),
    path('test', views.displayTestPage, name='test'),
]