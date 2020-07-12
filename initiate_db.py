import requests



# Stage Data default POST

base_url = "https://multiskill-heroku.herokuapp.com"

stage_data_url = base_url + "/adminview/stageData"

stage_data_payload = {'new_stageName': 'Default Stage',
'new_skillLevel': '0'}

files = []
headers= {}

response = requests.request("POST", stage_data_url, headers=headers, data = stage_data_payload, files = files)

print("Stage Data POST response:",response.text.encode('utf8'))



#Station Data default POST

station_data_url = base_url + "/adminview/stationData"

station_data_payload = {'new_stationName': 'Default Station',
'new_requiredManpower': '0'}
files = []
headers= {}

response = requests.request("POST", station_data_url, headers=headers, data = station_data_payload, files = files)

print("Station Data POST response:",response.text.encode('utf8'))


# Shift Data default POST

shift_data_url = base_url + "/adminview/shiftData"

shift_data_payload = {'new_shiftName': 'Default Shift',
'new_startTime': '00:00',
'new_endTime': '00:00'}
files = []
headers= {}

response = requests.request("POST", shift_data_url, headers=headers, data = shift_data_payload, files = files)

print(response.text.encode('utf8'))


# Employee Data default POST


employee_data_url = base_url + "/adminview/employeeData"

employee_data_payload = "{\n    \"new_token\": \"00000\",\n    \"new_name\": \"default\",\n    \"new_gender\": \"default\",\n    \"new_contact\": \"0000000000\",\n    \"new_doj\": \"2001-01-01\",\n    \"new_stationId\": 1,\n    \"new_shiftId\": 1,\n    \"new_stageId\": 1,\n    \"new_weeklyOff\": \"Sunday\",\n    \"new_isAdmin\": true,\n    \"new_language\": \"English\"\n}\n"
headers = {
  'Content-Type': 'application/json',
  'Cookie': 'csrftoken=vpm4FT79kiavaElb1uc70wpTfWpBP8AVJb3V9UmA6ESZd5RFcvkTdYqIkEty7BFJ'
}

response = requests.request("POST", employee_data_url, headers=headers, data = employee_data_payload)

print("Employee Data POST response:",response.text.encode('utf8'))

