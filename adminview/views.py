from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from django.views.decorators.csrf import csrf_exempt
from .models import Employee
import json

# Create your views here.

def display_login_page(request):
    return render(request, 'login.html')

def display_dashboard(request):
    return render(request, 'admin/dashboard.html')

def display_employee_page(request):
    return render(request, 'admin/employee.html')

def display_test_page(request):
    return render(request, 'admin/test.html')

def display_test_details(request):
    return render(request, 'admin/testDetail.html')

def get_employee(request, emp_token):
    if request.method == 'GET':
        try:
            emp = Employee.objects.get(emp_token = emp_token)
            dictionary = {'emp_token': emp.emp_token,
                            'emp_name': emp.emp_name,
                            'gender': emp.gender,
                            'mobile': emp.mobile,
                            'doj': str(emp.doj),
                            'current_station': emp.current_station,
                            'language_preference': emp.language_preference,
                            'createOn': str(emp.createdOn),
                            'createdBy': emp.createdBy,
                            'isAdmin': str(emp.isAdmin)}

            response = json.dumps([dictionary])

        except:
            response = json.dumps([{'Error': 'Could not get data!'}])
    return HttpResponse(response, content_type='text/json')


@csrf_exempt
def add_employee(request):
    response = json.dumps([{}])
    if request.method == 'POST':
        payload = json.loads(request.body)
        token = payload['emp_token']
        name = payload['emp_name']
        gender = payload['gender']
        currentStation = payload['current_station']
        mobileNo = payload['mobile']
        dateOfJoining = payload['doj']
        language_pref = payload['language_preference']
        creationDate = payload['createOn']
        createdby = payload['createdBy']
        isAdmin = True
        emp = Employee(emp_token = token,
                        emp_name = name,
                        gender = gender,
                        mobile = mobileNo,
                        doj = dateOfJoining,
                        current_station = currentStation,
                        language_preference = language_pref,
                        createOn = creationDate,
                        createdBy = createdby,
                        isAdmin = isAdmin)
        try:
            emp.save()
            response = json.dumps([{'Success': 'Employee added successfully!'}])
        except:
            response = json.dumps([{'Error': 'Employee could not be added!'}])
    return HttpResponse(response, content_type='text/json')


@csrf_exempt
def add_emp_trial(request):
    #response = json.dumps([{}])
    #print(request.POST.get('new_token',''))
    #print(request.POST.get('new_name',''))
    #print(request.POST.get('new_gender',''))
    #print(request.POST.get('new_contact',''))
    #print(request.POST.get('new_station',''))
    #print(request.POST.get('new_doj',''))

    if request.method == 'POST':
        token = request.POST.get('new_token')
        name = request.POST.get('new_name')
        gender = request.POST.get('new_gender')
        currentStation = request.POST.get('new_station')
        mobileNo = request.POST.get('new_contact')
        #dateOfJoining = request.POST.get('doj')
        language_pref = 'English'
        createdby = 'Some Name 1'
        isAdmin = True
        print("Before emp: ", token)
        emp = Employee(emp_token = token,
                        emp_name = name,
                        gender = gender,
                        mobile = mobileNo,
                        #doj = DateField(dateOfJoining),
                        current_station = currentStation,
                        language_preference = language_pref,
                        createdBy = createdby,
                        isAdmin = isAdmin)
        try:
            print("Before save")
            emp.save()
            print("after save")
            #response = json.dumps([{'Success': 'Employee added successfully!'}])
        except:
            response = json.dumps([{'Error': 'Employee could not be added!'}])
    return HttpResponseRedirect('/adminview/employee')

# TO BE EDITED

def add_test_details(request):
    if request.method == 'POST':
        payload = json.loads(request.body)
        print(payload['title'])
        """
       {"title":"How are you?","station":"Stage 1","stage":"Stage 1","questions":"545653165","time":"2512435","marks":"553365546","Question Details":[{"q1":"How the fuck you?","Op1":"Good Nigga","Op2":"Fynnn","Op3":"Good Nigga","Op4":"Fynnn"}]} 
    """
    return HttpResponseRedirect('/adminview/test')

def get_all_employees(request):
    if request.method == 'GET':
        try:
            emp = Employee.objects.all()
            print(emp)
            dataArray = []
            for eachRow in emp:
                dictionary = {'emp_token': eachRow.emp_token,
                                'emp_name': eachRow.emp_name,
                                'gender': eachRow.gender,
                                'mobile': eachRow.mobile,
                                'doj': str(eachRow.doj),
                                'current_station': eachRow.current_station,
                                'language_preference': eachRow.language_preference,
                                'createOn': str(eachRow.createdOn),
                                'createdBy': eachRow.createdBy,
                                'isAdmin': str(eachRow.isAdmin)}
                dataArray.append(dictionary)
            print(dataArray)
            response = json.dumps(dataArray)

        except:
            response = json.dumps([{'Error': 'Could not get data!'}])
    return HttpResponse(response, content_type='text/json')
