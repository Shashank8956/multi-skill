from django.http import HttpResponse, HttpResponseRedirect
from django.views.generic.base import View
from .models import *
import traceback
import json


class StationView(View):

    def get(self, request):
        try:
            data_array = []
            station_data = Station.objects.all()
            for data in station_data:
                output_json = {
                    'StationId': data.id,
                    'StationName': data.station_name,
                    'CurrentManpower': data.current_manpower,
                    'RequiredManpower': data.required_manpower,
                }
                data_array.append(output_json)
                #print(data)

            response = json.dumps(data_array)

        except Exception:
            traceback.print_exc()
            response = json.dumps({'Error': 'Could not find station data'})

        return HttpResponse(response, content_type='text/json')

    def post(self, request):
        try:
            station_name = request.POST.get('new_stationName')          #Refer using the name attribute of the html tag
            current_manpower = 0                                        #Set it to zero because it doesn't have any manpower yet
            required_manpower = request.POST.get('new_requiredManpower')

            station = Station(
                station_name=station_name,
                current_manpower=current_manpower,
                required_manpower=required_manpower
            )
            station.save()
            response = json.dumps({'Success': 'Station data saved successfully'})

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
                    'StageId': data.id,
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
            stage_name = request.POST.get("new_stageName")
            skill_level = request.POST.get("new_skillLevel")

            stage = Stage(
                stage_name=stage_name,
                skill_level=skill_level
            )
            stage.save()
            response = json.dumps({'Success': 'Stage data saved successfully'})
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
                    'ShiftId': data.id,
                    'ShiftName': data.shift_name,
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
            shift_name = request.POST.get("new_shiftName")
            start_time = request.POST.get("new_startTime")
            end_time = request.POST.get("new_endTime")

            shift = Shift(
                shift_name=shift_name,
                start_time=start_time,
                end_time=end_time
            )
            shift.save()
            response = json.dumps({'Success': 'Shift data saved successfully'})

        except Exception:
            traceback.print_exc()
            response = json.dumps({'Error': 'Cannot save Shift data'})

        return HttpResponse(response, content_type='text/json')


class EmployeeView(View):

    def get(self, request):
        if request.GET:
            token = request.GET.get("EmpToken")
            try:
                employee_data = Employee.objects.get(token=token)
                dictionary = {
                    'EmpToken': employee_data.token,
                    'EmpName': employee_data.name,
                    'Gender': employee_data.gender,
                    'Mobile': employee_data.mobile,
                    'DOJ': str(employee_data.doj),
                    'StationId': employee_data.current_station.id,
                    'StationName': employee_data.current_station.station_name,
                    'LanguagePreference': employee_data.language_preference,
                    'CreatedOn': str(employee_data.created_on),
                    'CreatedBy': employee_data.created_by,
                    'IsAdmin': str(employee_data.is_admin),
                    'ShiftId': employee_data.shift.id,
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
                for employee in employee_data:
                    dictionary = {
                        'EmpToken': employee.token,
                        'EmpName': employee.name,
                        'Gender': employee.gender,
                        'Mobile': employee.mobile,
                        'DOJ': str(employee.doj),
                        'StationId': employee.current_station.id,
                        'StationName': employee.current_station.station_name,
                        'LanguagePreference': employee.language_preference,
                        'CreatedOn': str(employee.created_on),
                        'CreatedBy': employee.created_by,
                        'IsAdmin': str(employee.is_admin),
                        'ShiftId': employee.shift.id,
                        'ShiftName': str(employee.shift.shift_name),
                        'WeeklyOff': str(employee.weekly_off),
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
            payload = json.loads(request.body)
            print(json.dumps(payload, indent=4))

            token = request.POST.get('new_token')
            name = request.POST.get('new_name')
            gender = request.POST.get('new_gender')
            station_id = request.POST.get('new_stationId')
            print(station_id)
            _station_name = request.POST.get('new_stationName')
            print(_station_name)
            mobile = request.POST.get('new_contact')
            # doj = request.POST.get('new_doj')
            station = Station.objects.get(id=station_id)
            #station = Station.objects.get(station_name = _station_name)
            language_preference = 'English'  # request.POST.get('new_language')
            created_by = 'Some Name 1'  # request.POST.get('CreatedBy')
            is_admin = True  # request.POST.get('new_isAdmin')
            weekly_off = 'Sunday'  # request.POST.get('new_weeklyOff')
            shift_id = request.POST.get("new_shiftId")
            _shift_name = request.POST.get('new_shiftName')
            shift = Shift.objects.get(id=shift_id)
            emp = Employee(
                token=token,
                name=name,
                gender=gender,
                mobile=mobile,
                # doj = DateField(doj),
                station=station,
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
            stage_id = payload["StageId"]
            stage = Stage.objects.get(id=stage_id)
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
                    "StationId": test_header.station.id,
                    "StationName": test_header.station.station_name,
                    "StageId": test_header.stage.id,
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
            station_id = payload["StationId"]
            _station_name = payload['StationName']
            station = Station.objects.get(id=station_id)
            stage_id = payload["stage_id"]
            _stage_name = payload['StageName']
            stage = Stage.objects.get(id=stage_id)
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
                    'Trainee': data.trainee,
                    'EmpToken': data.token,
                    'StageId': data.stage.id,
                    'StageName': data.stage.stage_name,
                    'TrainingStage': data.training_stage,
                    'ShiftOfficerId': data.shift_officer.id,
                    'ShiftOfficerName': data.shift_officer.name,
                    'TrainerId': data.trainer.id,
                    'TrainerName': data.trainer.name,
                    'Date': data.date
                }
                data_array.append(output_json)

            print(data_array)
            response = json.dumps(data_array)

        except Exception:
            traceback.print_exc()
            response = json.dumps({'Error': 'Training data not found'})

        return HttpResponse(response, content_type='text/json')

    def post(self, request):
        try:
            payload = json.loads(request.data)
            print(json.dumps(payload, indent=4))

            trainee = payload["Trainee"]
            token = payload["Token"]
            stage_id = payload["StageId"]
            _stage_name = payload["StageName"]
            stage = Stage.objects.get(id=stage_id)
            training_stage = payload["TrainingStage"]
            shift_officer_id = payload["ShiftOfficerId"]
            _shift_officer_name = payload["ShiftOfficerName"]
            shift_officer = Employee.objects.get(id=shift_officer_id)
            trainer_id = payload["TrainerId"]
            _trainer_name = payload["TrainerName"]
            trainer = Employee.objects.get(id=trainer_id)
            date = payload["Date"]

            training = Training(
                trainee=trainee,
                token=token,
                stage=stage,
                training_stage=training_stage,
                shift_officer=shift_officer,
                trainer=trainer,
                date=date
            )

            training.save()
            response = json.dumps({'Success': 'Training data saved successfully'})

        except Exception:
            traceback.print_exc()
            response = json.dumps({'Error': 'Cannot save data'})
        return HttpResponse(response, content_type="text/json")
