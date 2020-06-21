from .models import Employee, ResultHeader, TestHeader, TestQuestions
from django.http import HttpResponse, HttpResponseRedirect
from django.views.decorators.csrf import csrf_exempt
from django.views.generic.base import View
import traceback
import json


class EmployeeView(View):

    def get(self, request):
        if request.GET:
            emp_token = request.GET.get("emp_token")
            try:
                employee_data = Employee.objects.get(emp_token=emp_token)
                dictionary = {
                    'emp_token': employee_data.emp_token,
                    'emp_name': employee_data.emp_name,
                    'gender': employee_data.gender,
                    'mobile': employee_data.mobile,
                    'doj': str(employee_data.doj),
                    'current_station': employee_data.current_station,
                    'language_preference': employee_data.language_preference,
                    'createOn': str(employee_data.created_on),
                    'createdBy': employee_data.created_by,
                    'isAdmin': str(employee_data.is_admin),
                    'weeklyOff': str(employee_data.weekly_off),
                }

                response = json.dumps(dictionary)
            except Exception:
                traceback.print_exc()
                response = json.dumps({'Error': 'Could not get data!'})
        else:
            try:
                employee_data = Employee.objects.all()
                print(employee_data)
                data_array = []
                for each_row in employee_data:
                    dictionary = {
                        'emp_token': each_row.emp_token,
                        'emp_name': each_row.emp_name,
                        'gender': each_row.gender,
                        'mobile': each_row.mobile,
                        'doj': str(each_row.doj),
                        'current_station': each_row.current_station,
                        'language_preference': each_row.language_preference,
                        'createOn': str(each_row.created_on),
                        'createdBy': each_row.created_by,
                        'isAdmin': str(each_row.is_admin),
                        'weeklyOff': str(each_row.weekly_off),
                    }
                    data_array.append(dictionary)
                print(data_array)
                response = json.dumps(data_array)
            except Exception:
                traceback.print_exc()
                response = json.dumps({'Error': 'Could not get employee data!'})
        return HttpResponse(response, content_type='text/json')

    def post(self, request):
        try:
            token = request.POST.get('new_token')
            name = request.POST.get('new_name')
            gender = request.POST.get('new_gender')
            current_station = request.POST.get('new_station')
            mobile_no = request.POST.get('new_contact')
            # dateOfJoining = request.POST.get('doj')
            language_pref = 'English'
            created_by = 'Some Name 1'
            is_admin = True
            weekly_off = 'some_days'
            print("Before emp: ", token)
            emp = Employee(
                emp_token=token,
                emp_name=name,
                gender=gender,
                mobile=mobile_no,
                # doj = DateField(dateOfJoining),
                current_station=current_station,
                language_preference=language_pref,
                created_by=created_by,
                is_admin=is_admin,
                # shift = shift,
                weekly_off= weekly_off,
            )
            emp.save()
            response = json.dumps({'Success': 'Employee added successfully!'})
        except Exception:
            traceback.print_exc()
            response = json.dumps({'Error': 'Employee could not be added!'})
            return HttpResponse(response, content_type='text/json')
        return HttpResponseRedirect('/adminview/employee')


class TestView(View):

    def get(self, request):
        try:
            data_array = []
            test_header_data = TestHeader.objects.all()
            for test_header in test_header_data:
                output_json = {
                    "station": test_header.station_id,
                    "stage": test_header.stage_id,
                    "title": test_header.test_title,
                    "questions": test_header.no_of_quetions,
                    "time": test_header.test_time,
                    "marks": test_header.max_marks
                }
                data_array.append(output_json)
                print(test_header)

            response = json.dumps(data_array)
        except Exception:
            traceback.print_exc()
            response = json.dumps({'Error': 'Could not Test Header data!'})
        return HttpResponse(response, content_type='text/json')

    def post(self, request):
        try:
            payload = json.loads(request.body)
            print(json.dumps(payload, indent=4))
            test_title = payload['title']
            test_station = payload['station']  # to be edited to receive station_id FK
            test_stage = payload['stage']  # to be edited to receive stage_id FK
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
        except Exception:
            traceback.print_exc()
            return HttpResponse(json.dumps({'Error': 'Test Details could not be added!'}))

        return HttpResponseRedirect('/adminview/test')


# Result Header Stuff

def get_results(request):
    if request.method == 'GET':
        try:
            result = ResultHeader.objects.all()
            query_data = []
            for data in result:
                temp_data = {
                    'test': data.test,
                    'employee': data.employee,
                    'marks_obtained': data.marks_obtained,
                    'total_marks': data.total_marks,
                    'test_date': data.test_date
                }
                query_data.append(temp_data)
            print(query_data)
            response = json.dumps(query_data)
        except Exception:
            traceback.print_exc()
            response = json.dumps({'Error': 'Could not get data!'})
        return HttpResponse(response, content_type='text/json')


def get_result(request, result_id):
    if request.method == 'GET':
        try:
            query_result = ResultHeader.objects.get(pk=result_id)
            query_data = {
                'test': query_result.test,
                'employee': query_result.employee,
                'marks_obtained': query_result.marks_obtained,
                'total_marks': query_result.total_marks,
                'test_date': query_result.test_date
            }
            print(query_data)
            response = json.dumps(query_data)
        except Exception:
            traceback.print_exc()
            response = json.dumps({'Error': 'Could not get data!'})
        return HttpResponse(response, content_type='text/json')


@csrf_exempt
def add_result(request):
    if request.method == "POST":
        try:
            payload = json.loads(request.body)
            test = payload['test']
            employee = payload['employee']
            marks_obtained = payload['marks_obtained']
            total_marks = payload['total_marks']
            test_date = payload['test_date']

            result_data = ResultHeader(
                test=test,
                employee=employee,
                marks_obtained=marks_obtained,
                total_marks=total_marks,
                test_date=test_date
            )
            result_data.save()
        except Exception:
            traceback.print_exc()
            response = json.dumps({'Error': 'Cannot add Result Header'})
            return HttpResponse(response, content_type='text/json')
        return HttpResponseRedirect('/adminview/result')
