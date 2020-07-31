let testJson = [];
let stationJson = [];
let stageJson = [];
let checkedCount = 0;


///////////////////////////// get elements /////////////////////////////
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

const deleteTestBtn = document.getElementById("deleteTestBtn");
const cancelTestBtn = document.getElementById("cancelTestBtn");
const submitTestBtn = document.getElementById("submitTestBtn");

const cancelStationBtn = document.getElementById("cancelStationBtn");
const submitStationBtn = document.getElementById("submitStationBtn");

const cancelStageBtn = document.getElementById("cancelStageBtn");
const submitStageBtn = document.getElementById("submitStageBtn");

const cancelShiftBtn = document.getElementById("cancelShiftBtn");
const submitShiftBtn = document.getElementById("submitShiftBtn");

const stationFilterDropdown = document.getElementById("station-filter"); 
const stationModalDropdown = document.getElementById("new-station");
const stageFilterDropdown = document.getElementById("stage-filter");
const stageModalDropdown = document.getElementById("new-stage");

const testList = document.getElementById("id_testList");
const testListHead = document.getElementById("id_testList_head");
const testListBody = document.getElementById("id_testList_body");


///////////////////////////// get elements /////////////////////////////
function initialize()
{
    eventListeners();
    getStageData();
    getStationData();
    getTestData();
    loadListHeader();
}

initialize();


///////////////////////////// ????????? /////////////////////////////
function eventListeners()
{
    deleteTestBtn.addEventListener("click", deleteSelected);
    addTestBtn.addEventListener("click", loadTestModal);
    
    stageMenu.addEventListener("click", loadStageModal);
    stationMenu.addEventListener("click", loadStationModal);
    shiftMenu.addEventListener("click", loadShiftModal);
    
    submitTestBtn.addEventListener("click", loadTestDetail);
    cancelTestBtn.addEventListener("click", cancelModal);

    //submitStationBtn.addEventListener("click", loadStationModal);
    cancelStationBtn.addEventListener("click", cancelModal);

    //submitStageBtn.addEventListener("click", loadStageModal);
    cancelStageBtn.addEventListener("click", cancelModal);
    cancelShiftBtn.addEventListener("click", cancelModal);
    
    window.addEventListener("click", closeModal);
}

function loadTestModal()
{
    testModal.style.display = "inline-block";
}

function loadStageModal()
{
    stageModal.style.display = "inline-block";
}

function loadStationModal()
{
    stationModal.style.display = "inline-block";
}

function loadShiftModal()
{
    shiftModal.style.display = "inline-block";
}

function cancelModal()
{
    testModal.style.display = "none";
    stationModal.style.display = "none";
    stageModal.style.display = "none";
    shiftModal.style.display = "none";
}

function closeModal(e)
{
    if(e.target == testModal)
        testModal.style.display = "none";
    else if(e.target == stationModal)
        stationModal.style.display = "none";
    else if(e.target == stageModal)
        stageModal.style.display = "none";
    else if(e.target == shiftModal)
        shiftModal.style.display = "none";
}

function deleteSelected()
{
    for (var i=0; i<selectedCheckBoxList.length; i++){
        if(selectedCheckBoxList[i].checked){
            deleteTest(selectedCheckBoxList[i].id);
            selectedCheckBoxList.pop(i);
        }
    }
    checkedCount = 0;
    deleteTestBtn.disabled = true;
    getTestData();
}

function loadTestDetail() //rename
{
    //var b = "Shashank Singh"
    //url = 'http://127.0.0.1:8000/adminview/testDetail?name=' + encodeURIComponent(b);
    //document.location.href = url;
    sessionStorage.setItem('title', titleInput.value);
    sessionStorage.setItem('station', stationInput.value);
    sessionStorage.setItem('stage', stageInput.value);
    sessionStorage.setItem('questionNo', questionNo.value);
    sessionStorage.setItem('time', timeInput.value);
    sessionStorage.setItem('marks', marksInput.value);

    window.location.href = "./adminview/testDetail";
}


///////////////////////////// json functions /////////////////////////////
function getTestData()
{
    testJson = [];
    var xhr = new XMLHttpRequest();
    
    xhr.open('GET', '/adminview/testData', true);
    xhr.send();
    
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            testJson = JSON.parse(this.responseText);
            console.log(testJson);
            loadEntireList(testJson);
        }
    };
}

function getStationData()
{
    var xhr = new XMLHttpRequest();
    
    xhr.open('GET', '/adminview/stationData', true);
    //xhr.responseType = 'json';            //Preconverts incoming data to json
    xhr.send();
    
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            stationJson = JSON.parse(this.responseText);
            loadStationDropdown();
        }
    };
}

function getStageData()
{
    var xhr = new XMLHttpRequest();
    
    xhr.open('GET', '/adminview/stageData', true);
    xhr.send();
    
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            stageJson = JSON.parse(this.responseText);
            loadStageDropdown();
        }
    };
}


///////////////////////////// load data into elements //////////////////////
function loadStationDropdown()
{
    for(let i = 0; i < stationJson.length; i++)
    {
        let stationName = stationJson[i].StationName;
        if(stationName === "Default Station") continue;

        let filterChild = document.createElement("option");
        filterChild.id = stationJson[i].StationId;
        filterChild.innerText = stationName;
        filterChild.classList.add("select_option");

        let modalChild = filterChild.cloneNode(true);

        stationFilterDropdown.appendChild(filterChild);
        stationModalDropdown.appendChild(modalChild);
        
    }
}

function loadStageDropdown()
{
    for(let i = 0; i < stageJson.length; i++)
    {
        let stageName = stageJson[i].StageName;
        if(stageName === "Default Stage") continue;
        
        let filterChild = document.createElement("option");
        filterChild.id = stageJson[i].StageId;
        filterChild.innerText = stageJson[i].StageName;
        filterChild.classList.add("select_option");
        
        let modalChild = filterChild.cloneNode(true);
        
        stageFilterDropdown.appendChild(filterChild);
        stageModalDropdown.appendChild(modalChild);
    }
}

function loadEntireList(listData)
{
    testListBody.innerHTML = ""; 
    if (listData != null) 
    {
        for (let i = 0; i < listData.length; i++) 
        {
            let testTitle = listData[i].Title;
                if(testTitle === "Demo Test 1") continue; //////////////////////////////////////            
            
            let newRow = document.createElement("tr");
            let tableData = []
            
            for (let i = 0; i < 7; i++) 
            {
                tableData.push(document.createElement("td"));
            }

            let newCheckBox = document.createElement("input");
            newCheckBox.type = "checkbox";
            newCheckBox.id = listData[i].TestHeaderId;
            newCheckBox.addEventListener("click", selectRow);
            tableData[0].appendChild(newCheckBox);

            tableData[1].innerText = testTitle;

            tableData[2].innerText = listData[i].StationName !== "Default Station" ? 
                                        listData[i].StationName : "";

            tableData[3].innerText = listData[i].StageName !== "Default Stage" ? 
                                        listData[i].StageName : "";
            
            tableData[4].innerText = listData[i].Questions;
            tableData[5].innerText = listData[i].Marks;
            tableData[6].innerText = listData[i].Time;

            for (let i = 0; i < 7; i++) 
            {
                newRow.appendChild(tableData[i]);
            }

            testListBody.appendChild(newRow);
        }
    }  
}

function loadListHeader()
{
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