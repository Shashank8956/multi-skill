from django.urls import path
from django.conf.urls import url
from . import views

app_name = 'adminview'

urlpatterns = [
    #path('login', views.displayLoginPage, name='login'),
    path('dashboard', views.displayDashboard, name='dashboard'),
    path('employee', views.displayEmployeePage, name='employees'),
    path('test', views.displayTestPage, name='test'),
]