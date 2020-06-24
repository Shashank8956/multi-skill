from django.http import HttpResponse, HttpResponseRedirect
from django.views.generic.base import View
import traceback
import json

from .models import *

class StationView(View):

    def get(self, request):
        try:
            data_array = []
            station_data = Station.objects.all()
            for data in station_data:
                output_json = {
                    'StationName': data.station_name,
                    'CurrentManpower': data.current_manpower,
                    'RequiredManpower': data.required_manpower,
                }
                data_array.append(output_json)
                print(data)

            response = json.dumps(data_array)

        except Exception:
            traceback.print_exc()
            response = json.dumps({'Error': 'Could not find station data'})

        return HttpResponse(response, content_type='text/json')

    def post(self, request):
        try:
            payload = json.loads(request.body)
            print(json.dumps(payload, indent=4))

            station_name = payload['StationName']
            current_manpower = payload['CurrentManpower']
            required_manpower = payload['RequiredManpower']

            station = Station(
                station_name = station_name,
                current_manpower = current_manpower,
                required_manpower = required_manpower
            )
            station.save()

        except Exception:
            traceback.print_exc()
            response = json.dumps({'Error': 'Cannot save station data'})

        return HttpResponse(response, content_type='text/json')


class StageView(View):
    def get(self, request):
        try:
            data_array = []
            stage_data = Stage.objects.all()

            for data in stage_data:
                output_json = {
                    'StageName': data.stage_name,
                    'SkillLevel': data.skill_level
                }
                data_array.append(output_json)

            response = json.dumps(data_array)
        except Exception:
            traceback.print_exc()
            response = json.dumps({'Error': 'Could not find Stage data'})

        return HttpResponse(response, content_type='text/json')

    def post(self, request):
        try:
            payload = json.loads(request.body)
            print(json.dumps(payload, indent=4))

            stage_name = payload["StageName"]
            skill_level = payload["SkillLevel"]

            stage = Stage(
                stage_name=stage_name,
                skill_level=skill_level
            )
            stage.save()

        except Exception:
            traceback.print_exc()

            response = json.dumps({'Error': 'Cannot save Stage data'})

        return HttpResponse(response, content_type='text/json')


class ShiftView(View):
    def get(self, request):
        try:
            data_array = []
            shift_data = Shift.objects.all()

            for data in shift_data:
                output_json = {
                    'StageName': data.shift_name,
                    'StartTime': data.start_time,
                    'EndTime': data.end_time

                }
                data_array.append(output_json)

            response = json.dumps(data_array)
        except Exception:
            traceback.print_exc()
            response = json.dumps({'Error': 'Could not find Shift data'})

        return HttpResponse(response, content_type='text/json')

    def post(self, request):
        try:
            payload = json.loads(request.body)
            print(json.dumps(payload, indent=4))

            shift_name = payload["ShiftName"]
            start_time = payload["StartTime"]
            end_time = payload["EndTime"]

            shift = Shift(
                shift_name=shift_name,
                start_time=start_time,
                end_time=end_time
            )
            shift.save()

        except Exception:
            traceback.print_exc()
            response = json.dumps({'Error': 'Cannot save Shift data'})

        return HttpResponse(response, content_type='text/json')


class EmployeeView(View):

    def get(self, request):
        if request.GET:
            emp_token = request.GET.get("emp_token")
            try:
                employee_data = Employee.objects.get(emp_token=emp_token)
                dictionary = {
                    'EmpToken': employee_data.emp_token,
                    'EmpName': employee_data.emp_name,
                    'Gender': employee_data.gender,
                    'Mobile': employee_data.mobile,
                    'DOJ': str(employee_data.doj),
                    'CurrentStationName': employee_data.current_station.station_name,
                    'LanguagePreference': employee_data.language_preference,
                    'CreatedOn': str(employee_data.created_on),
                    'CreatedBy': employee_data.created_by,
                    'IsAdmin': str(employee_data.is_admin),
                    'ShiftName': str(employee_data.shift.shift_name),
                    'WeeklyOff': str(employee_data.weekly_off),
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
                        'EmpToken': each_row.emp_token,
                        'EmpName': each_row.emp_name,
                        'Gender': each_row.gender,
                        'Mobile': each_row.mobile,
                        'DOJ': str(each_row.doj),
                        'CurrentStationName': each_row.current_station.station_name,
                        'LanguagePreference': each_row.language_preference,
                        'CreatedOn': str(each_row.created_on),
                        'CreatedBy': each_row.created_by,
                        'IsAdmin': str(each_row.is_admin),
                        'ShiftName': str(each_row.shift.shift_name),
                        'WeeklyOff': str(each_row.weekly_off),
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
            emp_token = request.POST.get('EmpToken')
            name = request.POST.get('EmpName')
            gender = request.POST.get('Gender')
            station_name = request.POST.get('StationName')
            mobile_no = request.POST.get('MobileNo')
            # doj = request.POST.get('DOJ')
            current_station = Station.objects.get(station_name=station_name)
            language_preference = 'English'  # request.POST.get('LanguagePreference')
            created_by = 'Some Name 1'  # request.POST.get('CreatedBy')
            is_admin = True  # request.POST.get('IsAdmin')
            weekly_off = 'Sunday'  # request.POST.get('WeeklyOff')
            shift_name = request.POST.get('ShiftName')
            shift = Shift.objects.get(shift_name=shift_name)
            emp = Employee(
                emp_token=emp_token,
                emp_name=name,
                gender=gender,
                mobile=mobile_no,
                # doj = DateField(doj),
                current_station=current_station,
                language_preference=language_preference,
                created_by=created_by,
                is_admin=is_admin,
                shift=shift,
                weekly_off=weekly_off,
            )
            emp.save()
        except Exception:
            traceback.print_exc()
            response = json.dumps({'Error': 'Employee could not be added!'})
            return HttpResponse(response, content_type='text/json')
        return HttpResponseRedirect('/adminview/employee')


class EmployeeSkillView(View):
    def post(self, request):
        try:
            payload = json.loads(request.body)
            print(json.dumps(payload, indent=4))

            emp_token = payload["EmpToken"]
            employee = EmployeeSkill.objects.get(emp_token=emp_token)
            stage_name = payload["StageName"]
            stage = Stage.objects.get(stage_name=stage_name)
            # acquired_on = payload["AcquiredOn"]
            employee_skill = EmployeeSkill(
                employee=employee,
                stage=stage
            )
            employee_skill.save()

        except Exception:
            traceback.print_exc()
            response = json.dumps({'Error': 'Cannot save Shift data'})

        return HttpResponse(response, content_type='text/json')


class TestView(View):

    def get(self, request):
        try:
            data_array = []
            test_header_data = TestHeader.objects.all()
            for test_header in test_header_data:
                output_json = {
                    "StationName": test_header.station.station_name,
                    "StageName": test_header.stage.stage_name,
                    "Title": test_header.test_title,
                    "Questions": test_header.no_of_quetions,
                    "Time": test_header.test_time,
                    "Marks": test_header.max_marks
                }
                data_array.append(output_json)
                print(test_header)

            response = json.dumps(data_array)
        except Exception:
            traceback.print_exc()
            response = json.dumps({'Error': 'Could not find Test Header data!'})
        return HttpResponse(response, content_type='text/json')

    def post(self, request):
        try:
            payload = json.loads(request.body)
            print(json.dumps(payload, indent=4))

            test_title = payload['Title']
            station_name = payload['StationName']
            station = Station.objects.get(station_name=station_name)
            stage_name = payload['StageName']
            stage = Stage.objects.get(stage_name=stage_name)
            no_of_questions = payload['Questions']
            test_time = payload['Time']
            max_marks = payload['Marks']

            test_header = TestHeader(
                station=station,
                stage=stage,
                test_title=test_title,
                no_of_questions=no_of_questions,
                test_time=test_time,
                max_marks=max_marks
            )
            test_header.save()

            for question_details in payload['QuestionDetails']:
                question_number = question_details['QuestionNumber']
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


class TrainingView(View):

    def get(self, request):
        try:
            data_array = []
            training_data = Training.objects.all()

            for data in training_data:
                output_json = {
                    'trainee': data.trainee,
                    'token': data.token,
                    'stage_id': data.stage_id,
                    'training_stage': data.training_stage,
                    'shift_officer': data.shift_officer,
                    'trainer': data.trainer,
                    'date': data.date
                }
                data_array.append(outputjson)

            print(data_array)
            response = json.dumps(data_array)

        except Exception:
            traceback.print_exc()
            response = json.dumps({'Error': 'Training data not found'})
        
        return HttpResponse(response, content_type = 'text/json')

    def post(self, request):
        try:
            payload = json.loads(request.data)
            print(json.dumps(payload, indent = 4))

            trainee =  payload[trainee]
            token =  payload[token],
            stage_id = payload[stage_id]
            training_stage = payload[training_stage]
            shift_officer = payload[shift_officer]
            trainer = payload[trainer]
            date = payload[date]

            training = Training(
                trainee = trainee,
                token = token,
                stage_id = stage_id,
                training_stage = training_stage,
                shift_officer = shift_officer,
                trainer = trainer,
                date = date
            )

            training.save()
        
        except Exception:
            traceback.print_exc()
            response = json.dumps({'Error': 'Cannot save data'})
    
        return HttpResponse(response, content_type = "text/json")
