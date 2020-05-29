from django.shortcuts import render
from .models import Employee

# Create your views here.

def displayLoginPage(request):
    return render(request, 'login.html')

def displayDashboard(request):
    return render(request, 'Admin/dashboard.html')

def displayEmployeePage(request):
    return render(request, 'Admin/employee.html')

def displayTestPage(request):
    return render(request, 'Admin/test.html')