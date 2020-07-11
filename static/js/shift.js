const stageMenu = document.getElementById("id-stageMenu");
const stationMenu = document.getElementById("id-stationMenu");
const shiftMenu = document.getElementById("id-shiftMenu");

const stationModal = document.getElementById("station-modal-id");
const stageModal = document.getElementById("stage-modal-id");
const shiftModal = document.getElementById("shift-modal-id");

const cancelStageBtn = document.getElementById("cancelStationBtn");
const submitStageBtn = document.getElementById("submitStationBtn");

const cancelStationBtn = document.getElementById("cancelStageBtn");
const submitStationBtn = document.getElementById("submitStageBtn");

const stationFilterDropdown = document.getElementById("station-filter"); 
const stationModalDropdown = document.getElementById("new-station");
const stageFilterDropdown = document.getElementById("stage-filter");
const stageModalDropdown = document.getElementById("new-stage");

const updateSkillBtn = document.getElementById("defineEmpSkillBtn");
const clearFilterBtn = document.getElementById("clearFilterBtn");
const deleteShiftButton = document.getElementById("deleteEmpBtn");

const shiftList = document.getElementById("id_shiftList");
const shiftListHead = document.getElementById("id_shift_head");
const shiftListBody = document.getElementById("id_shift_body");

let employeeJson = [];
let stationJson = [];
let stageJson = [];
let checkedCount = 0;

initialize()

function initialize(){
    getAllData();
    loadListHeader();
    eventListeners();
}

function eventListeners(){
    stageMenu.addEventListener("click", loadStageModal);
    stationMenu.addEventListener("click", loadStationModal);
    shiftMenu.addEventListener("click", loadShiftModal);
    //updateSkillBtn.addEventListener("click", loadSkillModal);

    //submitStationBtn.addEventListener("click", loadStationModal);
    cancelStationBtn.addEventListener("click", cancelModal);
    cancelShiftBtn.addEventListener("click", cancelModal);
    //submitStageBtn.addEventListener("click", loadStageModal);
    cancelStageBtn.addEventListener("click", cancelModal);
    window.addEventListener("click", closeModal);
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
    shiftModal.style.display = "none";
    stationModal.style.display = "none";
    stageModal.style.display = "none";
    shiftModal.style.display = "none";
}

function closeModal(e){
    if(e.target == stationModal)
        stationModal.style.display = "none";
    else if(e.target == stageModal)
        stageModal.style.display = "none";
    else if(e.target == shiftModal)
        shiftModal.style.display = "none";
}

function getAllData() {
    var xhr = new XMLHttpRequest();
    
    xhr.open('GET', 'http://127.0.0.1:8000/adminview/employeeData', true);
    //xhr.responseType = 'json';            //Preconverts incoming data to json
    xhr.send();
    
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            employeeJson = JSON.parse(this.responseText);
            console.log(employeeJson);
            loadEntireList(employeeJson);
        }
    };
}

function getStationData() {
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

function getStageData() {
    var xhr = new XMLHttpRequest();
    
    xhr.open('GET', 'http://127.0.0.1:8000/adminview/stageData', true);
    xhr.send();
    
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            stageJson = JSON.parse(this.responseText);
            console.log("Staget Data:" + stageJson[0].StageId);
            loadStageDropdown();
        }
    };
}

function loadStationDropdown(){
    for(let i=0; i<stationJson.length; i++){
        childOption = document.createElement("option");
        childOption.id = stationJson[i].StationId;
        childOption.innerText = stationJson[i].StationName;
        childOption.classList.add("select_option")
        stationFilterDropdown.appendChild(childOption);
    }
    
    for(let i=0; i<stationJson.length; i++){
        childOption = document.createElement("option");
        childOption.id = stationJson[i].StationId;
        childOption.innerText = stationJson[i].StationName;
        childOption.classList.add("select_option")
        stationModalDropdown.appendChild(childOption);
    }
}

function loadStageDropdown(){
    for(let i=0; i<stageJson.length; i++){
        childOption = document.createElement("option");
        childOption.id = stageJson[i].StageId;
        childOption.innerText = stageJson[i].StageName;
        childOption.classList.add("select_option")
        stageFilterDropdown.appendChild(childOption);
    }
    
    for(let i=0; i<stageJson.length; i++){
        childOption = document.createElement("option");
        childOption.id = stageJson[i].StageId;
        childOption.innerText = stageJson[i].StageName;
        childOption.classList.add("select_option")
        stageModalDropdown.appendChild(childOption);
    }
}

function loadEntireList(listData){
    shiftListBody.innerHTML = ""; 
    if(listData!=null){
            for(let i=0; i<listData.length; i++){
                let newRow = document.createElement("tr");
                let tableData = []
                for(let i=0; i<7; i++){
                    tableData.push(document.createElement("td"));
                }

                let newCheckBox = document.createElement("input");
                newCheckBox.type = "checkbox";
                newCheckBox.id = listData[i].EmpToken;
                newCheckBox.addEventListener("click", selectRow);
                tableData[0].appendChild(newCheckBox);

                tableData[1].innerText = listData[i].EmpToken;
                tableData[2].innerText = listData[i].EmpName;
                tableData[3].innerText = listData[i].ShiftName;
                tableData[4].innerText = listData[i].StationName;
                tableData[5].innerText = listData[i].StageName;
                tableData[6].innerText = listData[i].WeeklyOff;

                for(let i=0; i<7; i++){
                    newRow.appendChild(tableData[i]);
                }
                
                shiftListBody.appendChild(newRow);
            }
        }   
}

function loadListHeader(){
    let tableHeader = `
                        <tr>    
                            <th><input type="checkbox"></th>
                            <th data-columnName = "EmpToken" data-order="desc" onclick="sortColumn(event);">Token No &#x25B4</th>
                            <th data-columnName = "EmpName" data-order="desc" onclick="sortColumn(event);">Employee Name &#x25B4</th>
                            <th data-columnName = "ShiftName" data-order="desc" onclick="sortColumn(event);">Shift &#x25B4</th>
                            <th data-columnName = "StationName" data-order="desc" onclick="sortColumn(event);">Station &#x25B4</th>
                            <th data-columnName = "SkillLevel" data-order="desc" onclick="sortColumn(event);">Skill &#x25B4</th>
                            <th data-columnName = "WeeklyOff" data-order="desc" onclick="sortColumn(event);">Weekly Off &#x25B4</th>
                        </tr>`;
    shiftListHead.innerHTML += tableHeader;
}