from django.http import HttpResponseRedirect, JsonResponse
from django.views.generic.base import View
from .models import *
import traceback
import json
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from datetime import datetime


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

            return JsonResponse(data_array, safe=False)
        except Exception:
            traceback.print_exc()
            return JsonResponse({'Error': 'Could not find station data'}, status=500)

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
            all_employees = Employee.objects.all()
            stage_0 = Stage.objects.get(skill_level=0)
            for each_employee in all_employees:
                employee_skill = EmployeeSkill(
                    employee=each_employee,
                    station=station,
                    stage=stage_0,
                )
                employee_skill.save()
            return JsonResponse({'Success': f'Station data saved successfully for StationId={station.id}'})
        except Exception:
            traceback.print_exc()
            return JsonResponse({'Error': 'Cannot save station data'}, status=500)

    def delete(self, request):
        try:
            station_id = request.GET.get("StationId")
            station = Station.objects.get(id=station_id)
            station.delete()

            return JsonResponse({'Success': f'Station data for station id {station_id} successfully'})
        except Exception:
            traceback.print_exc()
            return JsonResponse({'Error': 'Cannot delete station data'}, status=500)


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

            return JsonResponse(data_array, safe=False)
        except Exception:
            traceback.print_exc()
            return JsonResponse({'Error': 'Could not find Stage data'}, status=500)

    def post(self, request):
        try:
            stage_name = request.POST.get("new_stageName")
            skill_level = request.POST.get("new_skillLevel")

            stage = Stage(
                stage_name=stage_name,
                skill_level=skill_level
            )
            stage.save()
            return JsonResponse({'Success': f'Stage data saved successfully on StageId ={stage.id}'})
        except Exception:
            traceback.print_exc()
            return JsonResponse({'Error': 'Cannot save Stage data'}, status=500)

    def delete(self, request):
        try:
            stage_id = request.GET.get("StageId")
            stage = Stage.objects.get(id=stage_id)
            stage.delete()

            return JsonResponse({'Success': f'Stage data for Stage id {stage_id} successfully'})
        except Exception:
            traceback.print_exc()
            return JsonResponse({'Error': 'Cannot delete Stage data'}, status=500)


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

            return JsonResponse(data_array, safe=False)
        except Exception:
            traceback.print_exc()
            return JsonResponse({'Error': 'Could not find Shift data'}, status=500)

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
            return JsonResponse({'Success': f'Shift data saved successfully for ShiftId:{shift.id}'})
        except Exception:
            traceback.print_exc()
            return JsonResponse({'Error': 'Cannot save Shift data'}, status=500)

    def delete(self, request):
        try:
            shift_id = request.GET.get("ShiftId")
            shift = Shift.objects.get(id=shift_id)
            shift.delete()

            return JsonResponse({'Success': f'Shift data for shift id {shift_id} successfully'})
        except Exception:
            traceback.print_exc()
            return JsonResponse({'Error': 'Cannot delete Shift data'}, status=500)


class EmployeeView(View):
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super(EmployeeView, self).dispatch(request, *args, **kwargs)

    def get(self, request):
        if request.GET:
            employee_id = request.GET.get("EmployeeId")
            try:
                employee_data = Employee.objects.get(id=employee_id)
                dictionary = {
                    'EmployeeId': employee_data.id,
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

                return JsonResponse(dictionary, safe=False)
            except Exception:
                traceback.print_exc()
                return JsonResponse({'Error': 'Could not get Employee data!'}, status=500)
        else:
            try:
                employee_data = Employee.objects.all()
                print(employee_data)
                data_array = []
                for employee in employee_data:
                    dictionary = {
                        'EmployeeId': employee.id,
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
                return JsonResponse(data_array, safe=False)
            except Exception:
                traceback.print_exc()
                return JsonResponse({'Error': 'Could not get Employee data!'}, status=500)

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
            doj = datetime.strptime(payload["new_doj"], '%Y-%m-%d').date()
            current_station = Station.objects.get(id=station_id)
            # station = Station.objects.get(station_name = _station_name)
            language_preference = payload['new_language']
            created_by = 'Some Name 1'  # payload['CreatedBy']
            is_admin = payload['new_isAdmin']
            weekly_off = payload['new_weeklyOff']
            shift_id = payload["new_shiftId"]
            current_shift = Shift.objects.get(id=shift_id)
            stage_id = payload["new_stageId"]
            current_stage = Stage.objects.get(id=stage_id)
            emp = Employee(
                token=token,
                name=name,
                gender=gender,
                mobile=mobile,
                doj = doj,
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
            training_stage = Stage.objects.get(id=1)
            training_station = Station.objects.get(id=1)
            add_training = Training(
                trainee=emp,
                training_station=training_station,
                training_stage=training_stage,
            )
            add_training.save()
            return HttpResponseRedirect('/adminview/employee')
        except Exception:
            traceback.print_exc()
            return JsonResponse({'Error': 'Employee could not be added!'}, status=500)

    def delete(self, request):
        try:
            employee_id = request.GET.get("EmployeeId")
            employee = Employee.objects.get(id=employee_id)
            employee.delete()

            return JsonResponse({"Success": f"Employee deleted successfully for EmployeeId:{employee.id}"})

        except Exception:
            traceback.print_exc()
            return JsonResponse({"Error": "Could not delete Employee Data"}, status=500)


class EmployeeSkillView(View):
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super(EmployeeSkillView, self).dispatch(request, *args, **kwargs)

    def get(self, request):
        try:
            employee_skill_data = EmployeeSkill.objects.all()
            output_dict = {}
            for employee_skill in employee_skill_data:
                employee_skill_id = employee_skill.id
                employee_id = employee_skill.employee.id
                employee_token = employee_skill.employee.token
                employee_name = employee_skill.employee.name
                station_id = employee_skill.station.id
                station_name = employee_skill.station.station_name
                stage_id = employee_skill.stage.id
                skill_level = employee_skill.stage.skill_level
                acquired_on = employee_skill.acquired_on

                data = {
                    "EmployeeSkillId": employee_skill_id,
                    "EmployeeId": employee_id,
                    "EmpToken": employee_token,
                    "EmpName": employee_name,
                    "StationId": station_id,
                    "StationName": station_name,
                    "StageId": stage_id,
                    "SkillLevel": skill_level,
                    "AcquiredOn": acquired_on
                }

                if employee_token not in output_dict.keys():
                    output_dict[employee_token] = []
                    output_dict[employee_token].append(data)
                else:
                    output_dict[employee_token].append(data)

            return JsonResponse(output_dict)
        except Exception:
            traceback.print_exc()
            return JsonResponse({'Error': 'Could not get Employee Skill data!'}, status=500)

    def put(self, request):
        try:
            payload = json.loads(request.body)
            print(json.dumps(payload, indent=4))

            employee_id = payload["EmployeeId"]
            employee = Employee.objects.get(id=employee_id)
            station_id = payload["StationId"]
            station = Station.objects.get(id=station_id)
            employee_skill = EmployeeSkill.objects.get(employee=employee, station=station)
            stage_id = payload["StageId"]
            new_stage = Stage.objects.get(id=stage_id)
            employee_skill.stage = new_stage
            employee_skill.save()

            return JsonResponse({'Success': f'EmployeeSkill data updated for Emp Token {employee_id} successfully!'})
        except Exception:
            traceback.print_exc()
            return JsonResponse({'Error': f'Cannot update EmployeeSkill data for Emp Token {employee_id}'}, status=500)


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

            return JsonResponse(data_array, safe=False)
        except Exception:
            traceback.print_exc()
            return JsonResponse({'Error': 'Could not find Test Header data!'}, status=500)

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
            return JsonResponse({'Success': 'Test details saved successfully!!'})
        except Exception:
            traceback.print_exc()
            return JsonResponse({'Error': 'Test Details could not be added!'}, status=500)

    def delete(self, request):
        try:
            test_header_id = request.GET.get("TestHeaderId")
            test_header = TestHeader.objects.get(id=test_header_id)
            test_header.delete()  # Check if this deletes questions in TestQuestions table (on_delete=models.CASCADE)
            return JsonResponse(
                {"Success": f"Test Header Data deleted successfully for Test Header Id:{test_header.id}"})

        except Exception:
            traceback.print_exc()
            return JsonResponse({"Error": "Could not delete Test Header Data"}, status=500)


class TrainingView(View):
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super(TrainingView, self).dispatch(request, *args, **kwargs)

    def get(self, request):
        try:
            data_array = []
            training_data = Training.objects.all()

            for data in training_data:
                shift_officer = Employee.objects.get(id=data.shift_officer_id)
                trainer = Employee.objects.get(id=data.trainer_id)
                output_json = {
                    'TrainingId': data.id,
                    'EmployeeId': data.trainee.id,
                    'TraineeToken': data.trainee.token,
                    'TraineeName': data.trainee.name,
                    'TraineeDOJ': data.trainee.doj,
                    'TrainingStationId': data.training_station.id,
                    'TrainingStationName': data.training_station.station_name,
                    'TrainingStageId': data.training_stage.id,
                    'TrainingSkillLevel': data.training_stage.skill_level,
                    'ShiftOfficerId': shift_officer.id,
                    'ShiftOfficerName': shift_officer.name,
                    'TrainerId': trainer.id,
                    'TrainerName': trainer.name,
                    'TrainerToken': trainer.token,
                    'Date': data.date
                }
                data_array.append(output_json)

            # print(data_array)
            return JsonResponse(data_array, safe=False)
        except Exception:
            traceback.print_exc()
            return JsonResponse({'Error': 'Training data not found'}, status=500)

    def put(self, request):
        try:
            payload = json.loads(request.body)
            print(json.dumps(payload, indent=4))

            training_id = payload["TrainingId"]
            training = Training.objects.get(id=training_id)
            new_training_station_id = payload["TrainingStationId"]
            new_training_station = Station.objects.get(id=new_training_station_id)
            new_training_stage_id = payload["TrainingStageId"]
            new_training_stage = Stage.objects.get(id=new_training_stage_id)
            new_shift_officer_id = payload["ShiftOfficerId"]
            new_trainer_id = payload["TrainerId"]
            new_date = datetime.strptime(payload["date"], '%Y-%m-%d').date()

            training.training_station = new_training_station
            training.training_stage = new_training_stage
            training.shift_officer_id = new_shift_officer_id
            training.trainer_id = new_trainer_id
            training.date = new_date

            training.save()

            return JsonResponse({'Success': f'Training data updated for id {training_id} successfully'})
        except Exception:
            traceback.print_exc()
            return JsonResponse({'Error': 'Cannot update Training data'}, status=500)

