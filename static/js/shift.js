const stageMenu = document.getElementById("id-stageMenu");
const stationMenu = document.getElementById("id-stationMenu");
const shiftMenu = document.getElementById("id-shiftMenu");

const cancelStageBtn = document.getElementById("cancelStationBtn");
const submitStageBtn = document.getElementById("submitStationBtn");

const cancelStationBtn = document.getElementById("cancelStageBtn");
const submitStationBtn = document.getElementById("submitStageBtn");

const stationFilterDropdown = document.getElementById("station-filter"); 
const stationModalDropdown = document.getElementById("new-station");
const stageFilterDropdown = document.getElementById("stage-filter");
const stageModalDropdown = document.getElementById("new-stage");

const shiftList = document.getElementById("id_shiftList");
const shiftListHead = document.getElementById("id_shift_head");
const shiftListBody = document.getElementById("id_shift_body");

let employeeJson = [];
let stationJson = [];
let stageJson = [];

initialize()

function initialize(){
    loadListHeader();
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

function loadEntireList(){
    console.log(testJson);    
}

function loadListHeader(){
    let tableHeader = `
                        <tr>    
                            <th><input type="checkbox"></th>
                            <th data-columnName = "Title" data-order="desc" onclick="sortColumn(event);">Token No &#x25B4</th>
                            <th data-columnName = "StationName" data-order="desc" onclick="sortColumn(event);">Employee Name &#x25B4</th>
                            <th data-columnName = "StageName" data-order="desc" onclick="sortColumn(event);">Shift &#x25B4</th>
                            <th data-columnName = "Questions" data-order="desc" onclick="sortColumn(event);">Station Questions &#x25B4</th>
                            <th data-columnName = "Time" data-order="desc" onclick="sortColumn(event);">Skill &#x25B4</th>
                            <th data-columnName = "Marks" data-order="desc" onclick="sortColumn(event);">Weekly Off &#x25B4</th>
                        </tr>`;
    shiftListHead.innerHTML += tableHeader;
}