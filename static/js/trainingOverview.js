const empIDVar = 0;
let employeeJson = null;
let stationJson = null;
let shiftJson = null;
let stageJson = null;
let cookieValue = null;
let checkedCount = 0;


///////////////////////////// get elements /////////////////////////////
const stageMenu = document.getElementById("id-stageMenu");
const stationMenu = document.getElementById("id-stationMenu");
const shiftMenu = document.getElementById("id-shiftMenu");

const empModal = document.getElementById("emp-modal-id");
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
const empModalStageDropdown = document.getElementById("new-stage");

const addEmpBtn = document.getElementById("addEmpBtn");
const clearFilterBtn = document.getElementById("clearFilterBtn");
const deleteEmpButton = document.getElementById("deleteEmpBtn");
const empList = document.getElementById("id_EmpList");
const empListHead = document.getElementById("id_EmpList_head");
const empListBody = document.getElementById("id_EmpList_body");


///////////////////////////// initialize /////////////////////////////
function initialize()
{
    //getData();
    //loadList();
    eventListeners();
        
    getAllData();
    getAllShiftData();
    getAllStageData();
    getAllStationData();
    loadListHeader();
    cookieValue = getCookie('csrftoken');
}

initialize();


///////////////////////////// ????????? /////////////////////////////
function eventListeners()
{
    stageMenu.addEventListener("click", loadStageModal);
    stationMenu.addEventListener("click", loadStationModal);
    shiftMenu.addEventListener("click", loadShiftModal);

    addEmpBtn.addEventListener("click", loadEmpModal);
    
    window.addEventListener("click", closeModal);
    
    cancelEmpBtn.addEventListener("click", cancelModal);
    cancelStationBtn.addEventListener("click", cancelModal);
    cancelStageBtn.addEventListener("click", cancelModal);
    cancelShiftBtn.addEventListener("click", cancelModal);
    
    clearFilterBtn.addEventListener("click", clearFilters);
    deleteEmpButton.addEventListener("click", deleteSelected);
}



function PrintFormData(e)
{
    let formInstance = e.target;
    let selectedItem = document.getElementById("emp-station-modal");
    let formData = new FormData( formInstance );
    let sendData = {};
    sendData["new_token"] = formData.get("new_token");
    sendData["new_name"] = formData.get("new_name");
    sendData["new_gender"] = formData.get("new_gender");
    sendData["new_contact"] = formData.get("new_contact");
    sendData["new_doj"] = formData.get("new_doj");
    sendData["new_stationId"] = stationJson[empModalStationDropdown.selectedIndex -1].StationId;
    //sendData["new_stationName"] = empModalStationDropdown.options[empModalStationDropdown.selectedIndex].value;
    sendData["new_shiftId"] = shiftJson[document.getElementById("new-shift").selectedIndex -1].ShiftId;
    //sendData["new_shiftName"] = "temp shift name";//document.getElementById("new-shift").selectedIndex.value;
    sendData["new_stageId"] = stageJson[document.getElementById("new-stage").selectedIndex -1].StageId;
    sendData["new_weeklyOff"] = document.getElementById("new-weeklyOff").options[document.getElementById("new-weeklyOff").selectedIndex].value;
    let isAdmin = document.getElementById("new-isAdmin").options[document.getElementById("new-isAdmin").selectedIndex].value;
    
    if(isAdmin == "Admin")
        sendData["new_isAdmin"] = true;
    else
        sendData["new_isAdmin"] = false;

    sendData["new_language"] = document.getElementById("new-language").options[document.getElementById("new-language").selectedIndex].value;
    console.log(sendData);
    sendFormData(sendData);
}

function getCookie(name)
{
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        let cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

function loadEmpModal()
{
    empModal.style.display = "inline-block";
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
    empModal.style.display = "none";
    stationModal.style.display = "none";
    stageModal.style.display = "none";
    shiftModal.style.display = "none";
}

function clearFilters()
{
    console.log("Clear filters does nothing!!");
}

function submitData()
{
    /* Do some shit to send data */
    //modal.style.display = "none";
    loadList();
}

function closeModal(e)
{
    if(e.target == empModal)
        empModal.style.display = "none";
    else if(e.target == stationModal)
        stationModal.style.display = "none";
    else if(e.target == stageModal)
        stageModal.style.display = "none";
    else if(e.target == shiftModal)
        shiftModal.style.display = "none";
}

function deleteSelected()
{
    let finalList = [];
    for (let i=0; i<selectedCheckBoxList.length; i++){
        if(selectedCheckBoxList[i].checked){
            deleteEmployee(selectedCheckBoxList[i].id);
            selectedCheckBoxList.pop(i);
        }
    }
    checkedCount = 0;
    deleteEmpButton.disabled = true;
    getAllData();
}


///////////////////////////// json functions /////////////////////////////
function sendFormData(testData)
{
    let xhr = new XMLHttpRequest();
    let finalData = JSON.stringify(testData);
    console.log(finalData);

    xhr.open('POST', '/adminview/employeeData', true);
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.setRequestHeader('X-CSRFToken', cookieValue);
    //console.log(cookieValue);

    xhr.onreadystatechange = function() {//Call a function when the state changes.
        if(xhr.readyState == 4 && xhr.status == 200) {
            alert(this.responseText);
        }
    }
    xhr.send(finalData);
}

function getData()
{
    let xhr = new XMLHttpRequest();
    
    xhr.open('GET', '/adminview/employeeData?'+empId, true);
    //xhr.responseType = 'json';            Preconverts incoming data to json
    xhr.send();
    
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

            let myArr = JSON.parse(this.responseText);
            loadList(myArr[0]);
        }
    };
}

function getAllData()
{
    employeeJson = [];
    let xhr = new XMLHttpRequest();
    
    xhr.open('GET', '/adminview/employeeData', true);
    xhr.send();
    
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            employeeJson = JSON.parse(this.responseText);
            console.log(employeeJson);
            loadEntireList(employeeJson);
        }
    };
}

function getAllStationData()
{
    let xhr = new XMLHttpRequest();
    
    xhr.open('GET', '/adminview/stationData', true);
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

function getAllShiftData()
{
    let xhr = new XMLHttpRequest();
    
    xhr.open('GET', '/adminview/shiftData', true);
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

function getAllStageData()
{
    let xhr = new XMLHttpRequest();
    
    xhr.open('GET', '/adminview/stageData', true);
    xhr.send();
    
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            stageJson = JSON.parse(this.responseText);
            console.log("Shift Data:" + stageJson[0].StageId);
            loadStageDropdown();
        }
    };
}


///////////////////////////// load data into elements //////////////////////
function loadList(listData)
{
    if(listData!=null){

            let newRow = document.createElement("tr");
            let tableData = []
            for(let i=0; i<6; i++){
                tableData.push(document.createElement("td"));
            }

            let newCheckBox = document.createElement("input");
            newCheckBox.type = "checkbox";
            tableData[0].appendChild(newCheckBox);

            tableData[1].innerText = listData.emp_token;
            tableData[2].innerText = listData.emp_name;
            tableData[3].innerText = listData.doj;
            tableData[4].innerText = listData.mobile;
            tableData[5].innerText = listData.current_station;

            for(let i=0; i<6; i++){
                newRow.appendChild(tableData[i]);
            }

            empList.appendChild(newRow);
    }
}

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

        filterStationDropdown.appendChild(filterChild);
        empModalStationDropdown.appendChild(modalChild);
    }
}

function loadShiftDropdown()
{
    for(let i = 0; i < shiftJson.length; i++)
    {
        let shiftName = shiftJson[i].ShiftName;
        if(shiftName === "Default Shift") continue;        
               
        let modalChild = document.createElement("option");
        modalChild.id = shiftJson[i].ShiftId;
        modalChild.innerText = shiftJson[i].ShiftName;
        modalChild.classList.add("select_option");
        
        empModalShiftDropdown.appendChild(modalChild);
    }
}

function loadStageDropdown()
{
    for(let i = 0; i < stageJson.length; i++)
    {
        let stageName = stageJson[i].StageName;
        if(stageName === "Default Stage") continue;        
                
        let modalChild = document.createElement("option");
        modalChild.id = stageJson[i].ShiftId;
        modalChild.innerText = stageJson[i].StageName;
        modalChild.classList.add("select_option");
        
        empModalStageDropdown.appendChild(modalChild);
    }
}

function loadEntireList(listData) 
{   
    empListBody.innerHTML = "";

    if (listData != null) 
    {
        for (let i = 0; i < listData.length; i++) 
        {
            let employeeName = listData[i].EmpName;
            if(employeeName === "default") continue;
            
            let newRow = document.createElement("tr");
            let tableData = []
            
            for (let i = 0; i < 6; i++) 
            {
                tableData.push(document.createElement("td"));
            }

            let newCheckBox = document.createElement("input");
            newCheckBox.type = "checkbox";
            newCheckBox.id = listData[i].EmpToken;
            newCheckBox.addEventListener("click", selectRow);
            tableData[0].appendChild(newCheckBox);

            tableData[1].innerText = listData[i].EmpToken;
            tableData[2].innerText = employeeName;
            tableData[3].innerText = listData[i].DOJ;
            tableData[4].innerText = listData[i].Mobile;

            tableData[5].innerText = listData[i].StationName !== "Default Station" ? 
                                listData[i].StationName : "";            

            for (let i = 0; i < 6; i++) 
            {
                newRow.appendChild(tableData[i]);
            }

            empListBody.appendChild(newRow);
        }
    }
}

function loadListHeader()
{
    let tableHeader = `<thead>
                        <tr>    
                            <th><input type="checkbox"></th>
                            <th data-columnName = "EmpToken" data-order="desc" onclick="sortColumn(event);">Token No &#x25B4</th>
                            <th data-columnName = "EmpName" data-order="desc" onclick="sortColumn(event);">Name &#x25B4</th>
                            <th data-columnName = "DOJ" data-order="desc" onclick="sortColumn(event);">Doj &#x25B4</th>
                            <th data-columnName = "Mobile" data-order="desc" onclick="sortColumn(event);">Contact &#x25B4</th>
                            <th data-columnName = "StationName" data-order="desc" onclick="sortColumn(event);">Station &#x25B4</th>
                        </tr>
                    </thead>`;
    empListHead.innerHTML += tableHeader;
}