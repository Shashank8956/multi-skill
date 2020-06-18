from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect

from django.views.decorators.csrf import csrf_exempt

from .models import Employee, ResultHeader, TestHeader, TestQuestions

import json

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
            emp = Employee.objects.get(emp_token=emp_token)
            dictionary = {'emp_token': emp.emp_token,
                          'emp_name': emp.emp_name,
                          'gender': emp.gender,
                          'mobile': emp.mobile,
                          'doj': str(emp.doj),
                          'current_station': emp.current_station,
                          'language_preference': emp.language_preference,
                          'createOn': str(emp.created_on),
                          'createdBy': emp.created_by,
                          'isAdmin': str(emp.is_admin)}


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
        current_station = payload['current_station']
        mobile_no = payload['mobile']
        date_of_joining = payload['doj']
        language_pref = payload['language_preference']
        creation_date = payload['createOn']
        created_by = payload['createdBy']
        is_admin = True
        emp = Employee(emp_token=token,
                       emp_name=name,
                       gender=gender,
                       mobile=mobile_no,
                       doj=date_of_joining,
                       current_station=current_station,
                       language_preference=language_pref,
                       create_on=creation_date,
                       created_by=created_by,
                       is_admin=is_admin)
        try:
            emp.save()
            response = json.dumps([{'Success': 'Employee added successfully!'}])
        except:
            response = json.dumps([{'Error': 'Employee could not be added!'}])
    return HttpResponse(response, content_type='text/json')


@csrf_exempt
def add_emp_trial(request):
    if request.method == 'POST':
        token = request.POST.get('new_token')
        name = request.POST.get('new_name')
        gender = request.POST.get('new_gender')
        current_station = request.POST.get('new_station')
        mobile_no = request.POST.get('new_contact')
        # dateOfJoining = request.POST.get('doj')
        language_pref = 'English'
        created_by = 'Some Name 1'
        is_admin = True
        print("Before emp: ", token)
        emp = Employee(emp_token=token,
                       emp_name=name,
                       gender=gender,
                       mobile=mobile_no,
                       # doj = DateField(dateOfJoining),
                       current_station=current_station,
                       language_preference=language_pref,
                       created_by=created_by,
                       is_admin=is_admin)
        try:
            print("Before save")
            emp.save()
            print("after save")
            # response = json.dumps([{'Success': 'Employee added successfully!'}])
        except:
            response = json.dumps([{'Error': 'Employee could not be added!'}])
    return HttpResponseRedirect('/adminview/employee')


def add_test_details(request):
    if request.method == 'POST':
        payload = json.loads(request.body)
        print(json.dumps(payload, indent=4))
        test_title = payload['title']
        test_station = payload['station']
        test_stage = payload['stage']
        no_of_questions = payload['questions']
        test_time = payload['time']
        max_marks = payload['marks']
        test_header = TestHeader(
            test_title=test_title,
            test_station=test_station,
            test_stage=test_stage,
            no_of_questions=no_of_questions,
            test_time=test_time,
            max_marks=max_marks
        )
        test_header.save()
        for question_details in payload['Question Details']:
            question_number = question_details['Question Number']
            question = question_details['Question']
            option_1 = question_details['Op1']
            option_2 = question_details['Op2']
            option_3 = question_details['Op3']
            option_4 = question_details['Op4']
            test_question = TestQuestions(
                test_id=test_header,
                question_number=question_number,
                question=question,
                option_1=option_1,
                option_2=option_2,
                option_3=option_3,
                option_4=option_4
            )
            test_question.save()
            print("TEST QUESTION ID:", test_question)

    return HttpResponseRedirect('/adminview/test')



def get_all_employees(request):
    if request.method == 'GET':
        try:
            emp = Employee.objects.all()
            print(emp)
            data_array = []
            for eachRow in emp:
                dictionary = {'emp_token': eachRow.emp_token,
                              'emp_name': eachRow.emp_name,
                              'gender': eachRow.gender,
                              'mobile': eachRow.mobile,
                              'doj': str(eachRow.doj),
                              'current_station': eachRow.current_station,
                              'language_preference': eachRow.language_preference,
                              'createOn': str(eachRow.created_on),
                              'createdBy': eachRow.created_by,
                              'isAdmin': str(eachRow.is_admin)}
                data_array.append(dictionary)
            print(data_array)
            response = json.dumps(data_array)


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
