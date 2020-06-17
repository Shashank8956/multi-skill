from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect

from django.views.decorators.csrf import csrf_exempt

from .models import Employee, ResultHeader

import json


def displayLoginPage(request):
    return render(request, 'login.html')


def displayDashboard(request):
    return render(request, 'Admin/dashboard.html')


def displayEmployeePage(request):
    return render(request, 'Admin/employee.html')


def displayTestPage(request):
    return render(request, 'Admin/test.html')


def displayTestDetails(request):
    return render(request, 'Admin/testDetail.html')


def get_employee(request, emp_token):
    if request.method == 'GET':
        try:
            emp = Employee.objects.get(emp_token = 12346)
            dictionary = {
                        'emp_token': emp.emp_token,
                        'emp_name': emp.emp_name,
                        'gender': emp.gender,
                        'mobile': emp.mobile,
                        'doj': str(emp.doj),
                        'current_station': emp.current_station,
                        'language_preference': emp.language_preference,
                        'createOn': str(emp.createdOn),
                        'createdBy': emp.createdBy,
                        'isAdmin': str(emp.isAdmin)
                        }

            response = json.dumps([dictionary])

        except:
            response = json.dumps([{'Error': 'Could not get data!'}])
    return HttpResponse(response, content_type='text/json')


@csrf_exempt
def addEmployee(request):
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
def addEmpTrial(request):
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
        emp = Employee(
                    emp_token = token,
                    emp_name = name,
                    gender = gender,
                    mobile = mobileNo,
                    #doj = DateField(dateOfJoining),
                    current_station = currentStation,
                    language_preference = language_pref,
                    createdBy = createdby,
                    isAdmin = isAdmin
                    )
        try:
            print("Before save")
            emp.save()
            print("after save")
            #response = json.dumps([{'Success': 'Employee added successfully!'}])
        except:
            response = json.dumps([{'Error': 'Employee could not be added!'}])
    return HttpResponseRedirect('/adminview/employee')


def addTestDetails(request):
    if request.method == 'POST':
        payload = json.loads(request.body)
        print(payload['title'])
        
    return HttpResponseRedirect('/adminview/test')


def get_allEmployees(request):
    if request.method == 'GET':
        try:
            emp = Employee.objects.all()
            print(emp)
            dataArray = []
            for eachRow in emp:
                dictionary = {
                            'emp_token': eachRow.emp_token,
                            'emp_name': eachRow.emp_name,
                            'gender': eachRow.gender,
                            'mobile': eachRow.mobile,
                            'doj': str(eachRow.doj),
                            'current_station': eachRow.current_station,
                            'language_preference': eachRow.language_preference,
                            'createOn': str(eachRow.createdOn),
                            'createdBy': eachRow.createdBy,
                            'isAdmin': str(eachRow.isAdmin)
                            }
                dataArray.append(dictionary)
            print(dataArray)
            response = json.dumps(dataArray)

        except:
            response = json.dumps([{'Error': 'Could not get data!'}])
    return HttpResponse(response, content_type='text/json')


## Result Header Stuff

def get_results(request):

    if request.method == 'GET':
        try:
            result = ResultHeader.objects.all()
            query_data = [] # {}
            for data in result:
                temp_data = {
                            'test': data.test,
                            'employee': data.employee,
                            'marks_obtained': data.marks_obtained,
                            'total_marks': data.total_marks,
                            'test_date': data.test_date
                            }
                query_data.append(temp_data) # query_data = {**query_data, **temp_data}
            
            print(query_data)
            response = json.dumps(query_data)
        except: 
            response = json.dumps([{'Error': 'Could not get data!'}])
        
        return HttpResponse(response, content_type= 'text/json')


def get_result(request, result_id):
    if request.method == 'GET':
        try:
            query_result = ResultHeader.objects.get(pk = result_id)
            query_data = {
                            'test': query_result.test,
                            'employee': query_result.employee,
                            'marks_obtained': query_result.marks_obtained,
                            'total_marks': query_result.total_marks,
                            'test_date': query_result.test_date
                            }
                            
            print(query_data)
            response = json.dumps(query_data)
        except: 
            response = json.dumps([{'Error': 'Could not get data!'}])
        
        return render(request, 'Admin/result.html')


@csrf_exempt
def add_result(request):
    if request.method == "POST":
        payload = json.loads(request.body)
        test = payload['test']
        employee = payload['employee']
        marks_obtained = payload['marks_obtained']
        total_marks = payload['total_marks']
        test_date = payload['test_date']

        result_data = ResultHeader (
                                   test = test,
                                   employee = employee,
                                   marks_obtained = marks_obtained,
                                   total_marks = total_marks,
                                   test_date = test_date
                                   )
        
        try:
            result_data.save()
            json.dumps([{'Success': 'Result Header added'}])
        except:
            json.dumps([{'Error': 'Cannot add Result Header'}])

        return HttpResponse(response, content_type= 'text/json')