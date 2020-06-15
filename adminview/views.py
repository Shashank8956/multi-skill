from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from django.views.decorators.csrf import csrf_exempt
from .models import Employee, TestHeader, TestQuestions
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
    # response = json.dumps([{}])
    # print(request.POST.get('new_token',''))
    # print(request.POST.get('new_name',''))
    # print(request.POST.get('new_gender',''))
    # print(request.POST.get('new_contact',''))
    # print(request.POST.get('new_station',''))
    # print(request.POST.get('new_doj',''))

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


# TO BE EDITED
"""
{
    "title": "How are you?",
    "station": "Stage 2",
    "stage": "Stage 2",
    "questions": "77",
    "time": "8587",
    "marks": "88",
    "Question Details": [
        {
            "q1": "Add details for this question",
            "Op1": "Add Option 1",
            "Op2": "Add Option 2",
            "Op3": "Add Option 1",
            "Op4": "Add Option 2"
        }
    ]
}
"""


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
        test_id = test_header.id
        print("TEST ID: ", test_id)
        for question_details in payload['Question Details']:
            question_number = question_details['Question Number']
            question = question_details['Question']
            option_1 = question_details['Op1']
            option_2 = question_details['Op2']
            option_3 = question_details['Op3']
            option_4 = question_details['Op4']
            test_question = TestQuestions(
                test_id=test_id,
                question_number=question_number,
                question=question,
                option_1=option_1,
                option_2=option_2,
                option_3=option_3,
                option_4=option_4
            )
            test_question.save()
            print("TEST QUESTION ID:", test_question.id)

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
