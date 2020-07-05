from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.views.generic.base import View
from .models import *
import traceback
import json
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator


class StationView(View):

    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super(StationView, self).dispatch(request, *args, **kwargs)

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
                print("Shift Data:", data)

            response = data_array

        except Exception:
            traceback.print_exc()
            response = {'Error': 'Could not find station data'}

        return JsonResponse(response, safe=False)

    def post(self, request):
        try:
            station_name = request.POST.get('new_stationName')  # Refer using the name attribute of the html tag
            current_manpower = 0  # Set it to zero because it doesn't have any manpower yet
            required_manpower = request.POST.get('new_requiredManpower')

            station = Station(
                station_name=station_name,
                current_manpower=current_manpower,
                required_manpower=required_manpower
            )
            station.save()
            response = {'Success': 'Station data saved successfully'}

        except Exception:
            traceback.print_exc()
            response = {'Error': 'Cannot save station data'}

        return JsonResponse(response)

    def delete(self, request):
        try:
            station_id = request.GET.get("StationId")
            station = Station.objects.get(id=station_id)
            station.delete()

            response = {'Success': f'Station data for station id {station_id} successfully'}
        except Exception:
            traceback.print_exc()
            response = {'Error': 'Cannot delete station data'}

        return JsonResponse(response)


class StageView(View):
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super(StageView, self).dispatch(request, *args, **kwargs)

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

            response = data_array
        except Exception:
            traceback.print_exc()
            response = {'Error': 'Could not find Stage data'}

        return JsonResponse(response, safe=False)

    def post(self, request):
        try:
            stage_name = request.POST.get("new_stageName")
            skill_level = request.POST.get("new_skillLevel")

            stage = Stage(
                stage_name=stage_name,
                skill_level=skill_level
            )
            stage.save()
            response = {'Success': 'Stage data saved successfully'}
        except Exception:
            traceback.print_exc()

            response = {'Error': 'Cannot save Stage data'}

        return JsonResponse(response)

    def delete(self, request):
        try:
            stage_id = request.GET.get("StageId")
            stage = Stage.objects.get(id=stage_id)
            stage.delete()

            response = {'Success': f'Stage data for Stage id {stage_id} successfully'}
        except Exception:
            traceback.print_exc()
            response = {'Error': 'Cannot delete Stage data'}

        return JsonResponse(response)


class ShiftView(View):
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super(ShiftView, self).dispatch(request, *args, **kwargs)

    def get(self, request):
        try:
            data_array = []
            shift_data = Shift.objects.all()

            for data in shift_data:
                output_json = {
                    'ShiftId': data.id,
                    'ShiftName': data.shift_name,
                    'StartTime': str(data.start_time),
                    'EndTime': str(data.end_time)

                }
                data_array.append(output_json)

            response = data_array
        except Exception:
            traceback.print_exc()
            response = {'Error': 'Could not find Shift data'}

        return JsonResponse(response, safe=False)

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
            response = {'Success': 'Shift data saved successfully'}

        except Exception:
            traceback.print_exc()
            response = {'Error': 'Cannot save Shift data'}

        return JsonResponse(response)

    def delete(self, request):
        try:
            shift_id = request.GET.get("ShiftId")
            shift = Shift.objects.get(id=shift_id)
            shift.delete()

            response = {'Success': f'Shift data for shift id {shift_id} successfully'}
        except Exception:
            traceback.print_exc()
            response = {'Error': 'Cannot delete Shift data'}

        return JsonResponse(response)


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
                    'ShiftId': employee_data.current_shift.id,
                    'ShiftName': str(employee_data.current_shift.shift_name),
                    'WeeklyOff': str(employee_data.weekly_off),
                    'StageId': employee_data.current_stage.id,
                    'StageName': employee_data.current_stage.stage_name,
                    'SkillLevel': employee_data.current_stage.skill_level
                }

                response = dictionary
            except Exception:
                traceback.print_exc()
                response = {'Error': 'Could not get Employee data!'}
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
                        'ShiftId': employee.current_shift.id,
                        'ShiftName': str(employee.current_shift.shift_name),
                        'WeeklyOff': str(employee.weekly_off),
                        'StageId': employee.current_stage.id,
                        'StageName': employee.current_stage.stage_name,
                        'SkillLevel': employee.current_stage.skill_level
                    }
                    data_array.append(dictionary)
                print(data_array)
                response = data_array
            except Exception:
                traceback.print_exc()
                response = {'Error': 'Could not get Employee data!'}
        return JsonResponse(response, safe=False)

    def post(self, request):
        try:
            payload = json.loads(request.body)
            print(json.dumps(payload, indent=4))

            token = payload['new_token']
            name = payload['new_name']
            gender = payload['new_gender']
            station_id = payload['new_stationId']
            print(station_id)
            mobile = payload['new_contact']
            # doj = payload('new_doj')
            current_station = Station.objects.get(id=station_id)
            # station = Station.objects.get(station_name = _station_name)
            language_preference = 'English'  # payload['new_language']
            created_by = 'Some Name 1'  # payload['CreatedBy']
            is_admin = True  # payload['new_isAdmin']
            weekly_off = 'Sunday'  # payload['new_weeklyOff']
            shift_id = payload["new_shiftId"]
            current_shift = Shift.objects.get(id=shift_id)
            stage_id = payload["new_stageId"]
            current_stage = Stage.objects.get(id=stage_id)
            emp = Employee(
                token=token,
                name=name,
                gender=gender,
                mobile=mobile,
                # doj = DateField(doj),
                current_station=current_station,
                language_preference=language_preference,
                created_by=created_by,
                is_admin=is_admin,
                current_shift=current_shift,
                weekly_off=weekly_off,
                current_stage=current_stage
            )
            emp.save()

            all_stations = Station.objects.all()
            stage_0 = Stage.objects.get(skill_level=0)  # Edit for initial skill level

            for each_station in all_stations:
                employee_skill = EmployeeSkill(
                    employee=emp,
                    station=each_station,
                    stage=stage_0,
                )
                employee_skill.save()

            update_employee_skill = EmployeeSkill.objects.get(employee=emp, station=current_station)
            update_employee_skill.stage = current_stage
            update_employee_skill.save()

        except Exception:
            traceback.print_exc()
            response = {'Error': 'Employee could not be added!'}
            return JsonResponse(response)
        return HttpResponseRedirect('/adminview/employee')

    def delete(self, request):
        try:
            emp_token = request.GET.get("EmpToken")
            employee = Employee.objects.get(token=emp_token)
            employee.delete()

        except Exception:
            traceback.print_exc()
            return JsonResponse({"Error": "Could not delete Employee Data"})

        return JsonResponse({"Success": "Employee deleted successfully"})


class EmployeeSkillView(View):
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super(EmployeeSkillView, self).dispatch(request, *args, **kwargs)

    def get(self, request):
        try:
            employee_skill_data = EmployeeSkill.objects.all()
            data_array = []
            for employee_skill in employee_skill_data:
                employee_skill_id = employee_skill.id
                employee_token = employee_skill.employee.token
                employee_name = employee_skill.employee.name
                station_id = employee_skill.station.id
                station_name = employee_skill.station.station_name
                stage_id = employee_skill.stage.id
                skill_level = employee_skill.stage.skill_level
                acquired_on = employee_skill.acquired_on

                data = {
                    "EmployeeSkillId": employee_skill_id,
                    "EmpToken": employee_token,
                    "EmpName": employee_name,
                    "StationId": station_id,
                    "StationName": station_name,
                    "StageId": stage_id,
                    "SkillLevel": skill_level,
                    "AcquiredOn": acquired_on
                }

                data_array.append(data)

            response = data_array
        except Exception:
            traceback.print_exc()
            response = {'Error': 'Could not get Employee Skill data!'}

        return JsonResponse(response, safe=False)

    def post(self, request):
        try:
            payload = json.loads(request.body)
            print(json.dumps(payload, indent=4))

            emp_token = payload["EmpToken"]
            employee = Employee.objects.get(token=emp_token)
            station_id = payload["StationId"]
            station = Station.objects.get(id=station_id)
            stage_id = payload["StageId"]
            stage = Stage.objects.get(id=stage_id)
            # acquired_on = payload["AcquiredOn"]
            employee_skill = EmployeeSkill(
                employee=employee,
                stage=stage,
                station=station
            )
            employee_skill.save()
            response = {'Success': 'EmployeeSkill data saved successfully'}

        except Exception:
            traceback.print_exc()
            response = {'Error': 'Cannot save EmployeeSkill data'}

        return JsonResponse(response)

    def put(self, request):
        try:
            payload = json.loads(request.body)
            print(json.dumps(payload, indent=4))

            emp_token = payload["EmpToken"]
            employee = Employee.objects.get(token=emp_token)
            station_id = payload["StationId"]
            station = Station.objects.get(id=station_id)
            employee_skill = EmployeeSkill.objects.get(employee=employee, station=station)
            stage_id = payload["StageId"]
            new_stage = Stage.objects.get(id=stage_id)
            employee_skill.stage = new_stage
            employee_skill.save()

            response = {'Success': f'EmployeeSkill data updated for Emp Token {emp_token} successfully!'}
        except Exception:
            traceback.print_exc()
            response = {'Error': f'Cannot update EmployeeSkill data for Emp Token {emp_token}'}

        return JsonResponse(response)



class TestView(View):
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super(TestView, self).dispatch(request, *args, **kwargs)

    def get(self, request):
        try:
            data_array = []
            test_header_data = TestHeader.objects.all()
            for test_header in test_header_data:
                output_json = {
                    "TestHeaderId": test_header.id,
                    "StationId": test_header.station.id,
                    "StationName": test_header.station.station_name,
                    "StageId": test_header.stage.id,
                    "StageName": test_header.stage.stage_name,
                    "SkillLevel": test_header.stage.skill_level,
                    "Title": test_header.test_title,
                    "Questions": test_header.no_of_questions,  # fixed typo from: no_of_quetion to: no_of_question
                    "Time": test_header.test_time,
                    "Marks": test_header.max_marks
                }
                data_array.append(output_json)
                print(test_header)

            response = data_array
        except Exception:
            traceback.print_exc()
            response = {'Error': 'Could not find Test Header data!'}
        return JsonResponse(response, safe=False)

    def post(self, request):
        try:
            payload = json.loads(request.body)
            print(json.dumps(payload, indent=4))

            test_title = payload['Title']
            station_id = payload["StationId"]
            station = Station.objects.get(id=station_id)
            stage_id = payload["StageId"]
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
                correct_option = question_details['Correct']
                test_question = TestQuestions(
                    test=test_header,
                    question_number=question_number,
                    question=question,
                    option_1=option_1,
                    option_2=option_2,
                    option_3=option_3,
                    option_4=option_4,
                    correct_option=correct_option,
                )
                test_question.save()
                print("TEST QUESTION ID:", test_question)
        except Exception:
            traceback.print_exc()
            return JsonResponse({'Error': 'Test Details could not be added!'})

        return HttpResponseRedirect('/adminview/test')

    def delete(self, request):
        try:
            test_header_id = request.GET.get("TestHeaderId")
            test_header = TestHeader.objects.get(id=test_header_id)
            test_header.delete()  # Check if this deletes questions in TestQuestions table (on_delete=models.CASCADE)

        except Exception:
            traceback.print_exc()
            return JsonResponse({"Error": "Could not delete Employee Data"})

        return JsonResponse({"Success": "Employee deleted successfully"})


class TrainingView(View):
    def get(self, request):
        try:
            data_array = []
            training_data = Training.objects.all()

            for data in training_data:
                output_json = {
                    'TraineeToken': data.trainee.token,
                    'TraineeName': data.trainee.name,
                    'StageId': data.stage.id,
                    'StageName': data.stage.stage_name,
                    'SkillLevel': data.stage.skill_level,
                    'TrainingStage': data.training_stage,
                    'ShiftOfficerName': data.shift_officer,
                    'TrainerName': data.trainer,
                    'Date': data.date
                }
                data_array.append(output_json)

            print(data_array)
            response = data_array

        except Exception:
            traceback.print_exc()
            response = {'Error': 'Training data not found'}

        return JsonResponse(response, safe=False)

    def post(self, request):
        try:
            payload = json.loads(request.data)
            print(json.dumps(payload, indent=4))

            trainee_token = payload["TraineeToken"]
            trainee = Employee.objects.get(token=trainee_token)
            stage_id = payload["StageId"]
            _stage_name = payload["StageName"]
            _skill_level = payload["SkillLevel"]
            stage = Stage.objects.get(id=stage_id)
            training_stage = payload["TrainingStage"]
            shift_officer = payload["ShiftOfficerName"]
            trainer = payload["TrainerName"]
            date = payload["Date"]

            training = Training(
                trainee=trainee,
                stage=stage,
                training_stage=training_stage,
                shift_officer=shift_officer,
                trainer=trainer,
                date=date
            )

            training.save()
            response = {'Success': 'Training data saved successfully'}

        except Exception:
            traceback.print_exc()
            response = {'Error': 'Cannot save data'}
        return JsonResponse(response)
