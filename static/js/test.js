const stageMenu = document.getElementById("id-stageMenu");
const stationMenu = document.getElementById("id-stationMenu");
const shiftMenu = document.getElementById("id-shiftMenu");

const addTestBtn = document.getElementById("addTestBtn");
const testModal = document.getElementById("test-modal-id");
const stationModal = document.getElementById("station-modal-id");
const stageModal = document.getElementById("stage-modal-id");
const shiftModal = document.getElementById("shift-modal-id");

const titleInput = document.getElementById("new-title");
const stationInput = document.getElementById("new-station");
const stageInput = document.getElementById("new-stage");
const questionNo = document.getElementById("new-questionNo");
const timeInput = document.getElementById("new-time");
const marksInput = document.getElementById("new-marks");

const cancelTestBtn = document.getElementById("cancelTestBtn");
const submitTestBtn = document.getElementById("submitTestBtn");

const cancelStageBtn = document.getElementById("cancelStationBtn");
const submitStageBtn = document.getElementById("submitStationBtn");

const cancelStationBtn = document.getElementById("cancelStageBtn");
const submitStationBtn = document.getElementById("submitStageBtn");

const stationFilterDropdown = document.getElementById("station-filter"); 
const stationModalDropdown = document.getElementById("new-station");
const stageFilterDropdown = document.getElementById("stage-filter");
const stageModalDropdown = document.getElementById("new-stage");

const testList = document.getElementById("id_testList");
const testListHead = document.getElementById("id_testList_head");
const testListBody = document.getElementById("id_testList_body");

let testJson = [];
let stationJson = [];
let stageJson = [];

initialize();

function initialize(){
    eventListeners();
    getStageData();
    getStationData();
    getTestData();
    loadListHeader();
}

function eventListeners(){
    addTestBtn.addEventListener("click", loadTestModal);
    stageMenu.addEventListener("click", loadStageModal);
    stationMenu.addEventListener("click", loadStationModal);
    shiftMenu.addEventListener("click", loadShiftModal);

    submitTestBtn.addEventListener("click", loadTestDetail);
    cancelTestBtn.addEventListener("click", closeModal);

    //submitStationBtn.addEventListener("click", loadStationModal);
    cancelStationBtn.addEventListener("click", closeModal);

    //submitStageBtn.addEventListener("click", loadStageModal);
    cancelStageBtn.addEventListener("click", closeModal);
    window.addEventListener("click", closeModal);
}

function loadTestModal(){
    testModal.style.display = "inline-block";
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

function closeModal(e){
    if(e.target == testModal)
        testModal.style.display = "none";
    else if(e.target == stationModal)
        stationModal.style.display = "none";
    else if(e.target == stageModal)
        stageModal.style.display = "none";
    else if(e.target == shiftModal)
        shiftModal.style.display = "none";
}

function loadTestDetail(){
    //var b = "Shashank Singh"
    //url = 'http://127.0.0.1:8000/adminview/testDetail?name=' + encodeURIComponent(b);
    //document.location.href = url;
    console.log("Added to session storage: " + titleInput.value);
    sessionStorage.setItem('title', titleInput.value);
    sessionStorage.setItem('station', stationInput.value);
    sessionStorage.setItem('stage', stageInput.value);
    sessionStorage.setItem('questionNo', questionNo.value);
    sessionStorage.setItem('time', timeInput.value);
    sessionStorage.setItem('marks', marksInput.value);

    window.location.href = "./adminview/testDetail";
}

function getTestData(){
    var xhr = new XMLHttpRequest();
    
    xhr.open('GET', 'http://127.0.0.1:8000/adminview/testData', true);
    xhr.send();
    
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            testJson = JSON.parse(this.responseText);
            console.log(testJson);
            loadEntireList(testJson);
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

function loadEntireList(){
    console.log(testJson);    
}

function loadListHeader(){
    let tableHeader = `<thead>
                        <tr>    
                            <th><input type="checkbox"></th>
                            <th data-columnName = "Title" data-order="desc" onclick="sortColumn(event);">Title &#x25B4</th>
                            <th data-columnName = "StationName" data-order="desc" onclick="sortColumn(event);">Station &#x25B4</th>
                            <th data-columnName = "StageName" data-order="desc" onclick="sortColumn(event);">Stage &#x25B4</th>
                            <th data-columnName = "Questions" data-order="desc" onclick="sortColumn(event);">Total Questions &#x25B4</th>
                            <th data-columnName = "Time" data-order="desc" onclick="sortColumn(event);">Passing Marks &#x25B4</th>
                            <th data-columnName = "Marks" data-order="desc" onclick="sortColumn(event);">Time &#x25B4</th>
                        </tr>
                    </thead>`;
    testListHead.innerHTML += tableHeader;
}