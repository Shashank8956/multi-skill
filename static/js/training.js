const stageMenu = document.getElementById("id-stageMenu");
const stationMenu = document.getElementById("id-stationMenu");
const shiftMenu = document.getElementById("id-shiftMenu");

const trainingModal = document.getElementById("training-modal-id");
const cancelEmpBtn = document.getElementById("cancelEmpBtn")
const saveEmpBtn = document.getElementById("submitEmpBtn");

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
const empModalStationDropdown = document.getElementById("new-station");
const empModalShiftDropdown = document.getElementById("new-shift");


const setTrainingBtn = document.getElementById("setTrainingBtn");
const clearFilterBtn = document.getElementById("clearFilterBtn");
const deleteEmpButton = document.getElementById("deleteEmpBtn");

const trainingList = document.getElementById("id_trainingList");
const trainingListHead = document.getElementById("id_trainingList_head");
const trainingListBody = document.getElementById("id_trainingList_body");

const empIDVar = 0;
let trainingJson = [];
let stationJson = null;
let shiftJson = null;
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
    cancelEmpBtn.addEventListener("click", cancelModal);
    cancelStationBtn.addEventListener("click", cancelModal);
    cancelStageBtn.addEventListener("click", cancelModal);
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
            //loadShiftDropdown();
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
            //loadStationDropdown();
        }
    };
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
                                <td>` + listData[i].DOJ + `</td>
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