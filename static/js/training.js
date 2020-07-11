const stageMenu = document.getElementById("id-stageMenu");
const stationMenu = document.getElementById("id-stationMenu");
const shiftMenu = document.getElementById("id-shiftMenu");

const trainingModal = document.getElementById("training-modal-id");
const cancelTrainingBtn = document.getElementById("cancelTrainingBtn")
const saveTrainingBtn = document.getElementById("submitTrainingBtn");

const stationModal = document.getElementById("station-modal-id");
const cancelStationBtn = document.getElementById("cancelStationBtn")
const saveStationBtn = document.getElementById("submitStationBtn");

const stageModal = document.getElementById("stage-modal-id");
const cancelStageBtn = document.getElementById("cancelStageBtn")
const saveStageBtn = document.getElementById("submitStageBtn");

const shiftModal = document.getElementById("shift-modal-id");
const cancelShiftBtn = document.getElementById("cancelShiftBtn")
const saveShiftBtn = document.getElementById("submitShiftBtn");

const filterStationDropdown = document.getElementById("station-filter");
const filterShiftDropdown = document.getElementById("shift-filter");
const modalStationDropdown = document.getElementById("training-station");
const modalStageDropdown = document.getElementById("training-stage");


const setTrainingBtn = document.getElementById("setTrainingBtn");
const clearFilterBtn = document.getElementById("clearFilterBtn");
const deleteEmpButton = document.getElementById("deleteEmpBtn");

const trainingList = document.getElementById("id_trainingList");
const trainingListHead = document.getElementById("id_trainingList_head");
const trainingListBody = document.getElementById("id_trainingList_body");

const empIDVar = 0;
let trainingJson = [];
let stationJson = [];
let shiftJson = [];
let stageJson = [];
let cookieValue = null;
let checkedCount = 0;


function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

initialize();

function initialize(){
    eventListeners();
    getAllData();
    getAllShiftData();
    getAllStageData();
    getAllStationData();
    loadListHeader();
    cookieValue = getCookie('csrftoken');
}

function eventListeners(){
    stageMenu.addEventListener("click", loadStageModal);
    stationMenu.addEventListener("click", loadStationModal);
    shiftMenu.addEventListener("click", loadShiftModal);
    setTrainingBtn.addEventListener("click", loadEmpModal);
    window.addEventListener("click", closeModal);
    cancelTrainingBtn.addEventListener("click", cancelModal);
    submitTrainingBtn.addEventListener("click", updateTrainingData);
    cancelStationBtn.addEventListener("click", cancelModal);
    cancelStageBtn.addEventListener("click", cancelModal);
    cancelShiftBtn.addEventListener("click", cancelModal);
    clearFilterBtn.addEventListener("click", clearFilters);
}

function clearFilters(){
    console.log("Clear filters does nothing!!");
}

function loadEmpModal(){
    trainingModal.style.display = "inline-block";
}

function loadStageModal(){
    stageModal.style.display = "inline-block";
}

function loadStationModal(){
    stationModal.style.display = "inline-block";
}

function loadShiftModal(){
    shiftModal.style.display = "inline-block";
}

function cancelModal(){
    trainingModal.style.display = "none";
    stationModal.style.display = "none";
    stageModal.style.display = "none";
    shiftModal.style.display = "none";
}

function closeModal(e){
    if(e.target == trainingModal)
        trainingModal.style.display = "none";
    else if(e.target == stationModal)
        stationModal.style.display = "none";
    else if(e.target == stageModal)
        stageModal.style.display = "none";
    else if(e.target == shiftModal)
        shiftModal.style.display = "none";
}

function getAllData() {
    var xhr = new XMLHttpRequest();
    
    xhr.open('GET', 'http://127.0.0.1:8000/adminview/trainingData', true);
    xhr.send();
    
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            trainingJson = JSON.parse(this.responseText);
            console.log(trainingJson);
            loadEntireList(trainingJson);
        }
    };
}

function getAllShiftData() {
    var xhr = new XMLHttpRequest();
    
    xhr.open('GET', 'http://127.0.0.1:8000/adminview/shiftData', true);
    //xhr.responseType = 'json';            //Preconverts incoming data to json
    xhr.send();
    
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            shiftJson = JSON.parse(this.responseText);
            console.log("Shift Data:" + shiftJson[0].ShiftId);
            loadShiftDropdown();
        }
    };
}

function getAllStageData() {
    var xhr = new XMLHttpRequest();
    
    xhr.open('GET', 'http://127.0.0.1:8000/adminview/stageData', true);
    xhr.send();
    
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            stageJson = JSON.parse(this.responseText);
            console.log("Stage Data:" + stageJson[0].StageId);
            loadStageDropdown();
        }
    };
}

function getAllStationData() {
    var xhr = new XMLHttpRequest();
    
    xhr.open('GET', 'http://127.0.0.1:8000/adminview/stationData', true);
    //xhr.responseType = 'json';            //Preconverts incoming data to json
    xhr.send();
    
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            stationJson = JSON.parse(this.responseText);
            console.log("Station Data:" + stationJson[0].StationId);
            loadStationDropdown();
        }
    };
}

function loadStationDropdown(){
    for(let i=0; i<stationJson.length; i++){
        childOption = document.createElement("option");
        childOption.id = stationJson[i].StationId;
        childOption.innerText = stationJson[i].StationName;
        childOption.classList.add("select_option")
        filterStationDropdown.appendChild(childOption);
    }
    
    for(let i=0; i<stationJson.length; i++){
        childOption = document.createElement("option");
        childOption.id = stationJson[i].StationId;
        childOption.innerText = stationJson[i].StationName;
        childOption.classList.add("select_option")
        modalStationDropdown.appendChild(childOption);
    }
}

function loadShiftDropdown(){
    for(let i=0; i<shiftJson.length; i++){
        childOption = document.createElement("option");
        childOption.id = shiftJson[i].ShiftId;
        childOption.innerText = shiftJson[i].ShiftName;
        childOption.classList.add("select_option")
        filterShiftDropdown.appendChild(childOption);
    }
}

function loadStageDropdown(){
    for(let i=0; i<stageJson.length; i++){
        childOption = document.createElement("option");
        childOption.id = stageJson[i].ShiftId;
        childOption.innerText = stageJson[i].StageName;
        childOption.classList.add("select_option")
        modalStageDropdown.appendChild(childOption);
    }
}

function loadEntireList(listData){
    trainingListBody.innerHTML = ""; 
    
        if(listData!=null){
            tableRow = "<tr>";
            for (var i=0; i<listData.length; i++) {
                tableRow += `<td>
                                <input type="checkbox" id=` + listData[i].TraineeToken + `></td>
                                <td>` + listData[i].TraineeToken + `</td>
                                <td>` + listData[i].TraineeName + `</td>
                                <td>` + listData[i].TraineeDOJ + `</td>
                                <td>` + listData[i].TrainingStationName + `</td>
                                <td>` + listData[i].TrainingSkillLevel + `</td>
                                <td>` + listData[i].ShiftOfficerName + `</td>
                                <td>` + listData[i].TrainerToken + `</td>
                                <td>` + listData[i].TrainerName + `</td>
                                <td>` + listData[i].Date + `</td>`;
                tableRow += "</tr>";
            }
            trainingListBody.innerHTML += tableRow;
        }
}

function loadListHeader(){
    let tableHeader = `<tr>    
                            <th><input type="checkbox"></th>
                            <th data-columnName = "EmpToken" data-order="desc" onclick="sortColumn(event);">Token No &#x25B4</th>
                            <th data-columnName = "Trainee" data-order="desc" onclick="sortColumn(event);">Name &#x25B4</th>
                            <th data-columnName = "Doj" data-order="desc" onclick="sortColumn(event);">Doj &#x25B4</th>
                            <th data-columnName = "TotalStages" data-order="desc" onclick="sortColumn(event);">No.Of Stages &#x25B4</th>
                            <th data-columnName = "TrainingStage" data-order="desc" onclick="sortColumn(event);">Training Stage &#x25B4</th>
                            <th data-columnName = "ShiftOfficerName" data-order="desc" onclick="sortColumn(event);">Shift Officer &#x25B4</th>
                            <th data-columnName = "TrainerToken" data-order="desc" onclick="sortColumn(event);">Trainer Token No &#x25B4</th>
                            <th data-columnName = "TrainerName" data-order="desc" onclick="sortColumn(event);">Trainer Name &#x25B4</th>
                            <th data-columnName = "Date" data-order="desc" onclick="sortColumn(event);">Training Date &#x25B4</th>
                        </tr>`;
    trainingListHead.innerHTML += tableHeader;
}

function updateTrainingData(){
    sendData = {};
    sendData["TrainingId"] = getTrainingId( document.getElementById("trainee-token").value );
    sendData["TrainingStationId"] = stationJson[modalStationDropdown.selectedIndex -1].StationId;
    sendData["TrainingStageId"] = stageJson[modalStageDropdown.selectedIndex -1].StageId;
    sendData["ShiftOfficerId"] = getEmployeeId( document.getElementById("trainee-name").value );
    sendData["TrainerId"] = getEmployeeId( document.getElementById("trainer-name").value );
    sendData["date"] = document.getElementById("training-date").value;
    console.log(sendData);
    sendFormData(sendData);
}

function sendFormData(testData){
    var xhr = new XMLHttpRequest();
    var finalData = JSON.stringify(testData);
    console.log(finalData);

    xhr.open('PUT', 'http://127.0.0.1:8000/adminview/trainingData', true);
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.setRequestHeader('X-CSRFToken', cookieValue);

    xhr.onreadystatechange = function() {//Call a function when the state changes.
        if(xhr.readyState == 4 && xhr.status == 200) {
            alert(this.responseText);
            window.location.reload();
        }
    }
    xhr.send(finalData);
}

function getTrainingId(empToken){
    for(var i=0; i<trainingJson.length; i++){
        if(trainingJson[i].TraineeToken == empToken)
            return trainingJson[i].TrainingId;
    }
    return null;
}

function getEmployeeId(empName){
    for(var i=0; i<trainingJson.length; i++){
        if(trainingJson[i].TraineeName.toLowerCase() == empName.toLowerCase())
            return trainingJson[i].EmployeeId;
    }
    return null;
}




/*
var formInstance = e.target; //document.getElementById("training-form-id");
    formInstance.preventDefault();
    var formData = new FormData( formInstance );
    var sendData = {};
    sendData["TrainingId"] = getTrainingId( formData.get("trainee_token") );
    sendData["TrainingStationId"] = stationJson[modalStationDropdown.selectedIndex -1].StationId;
    sendData["TrainingStageId"] = stageJson[modalStageDropdown.selectedIndex -1].StageId;
    sendData["ShiftOfficerId"] = getEmployeeId( formData.get("trainee_name") );
    sendData["TrainerId"] = getEmployeeId( formData.get("trainer_name") );
    sendData["date"] = "2025-12-31";//formData.get("training_date");
    
    alert(sendData);
*/