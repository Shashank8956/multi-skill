const empIDVar = 0;
let employeeJson = [];
let stationJson = [];
let shiftJson = [];
let stageJson = [];

let cookieValue = null;
let checkedCount = 0;


///////////////////////////// get elements /////////////////////////////
const stationMenu = document.getElementById("id-stationMenu");
const stationModal = document.getElementById("station-modal-id");
const cancelStationBtn = document.getElementById("cancelStationBtn");
const saveStationBtn = document.getElementById("submitStationBtn");

const stageMenu = document.getElementById("id-stageMenu");
const stageModal = document.getElementById("stage-modal-id");
const cancelStageBtn = document.getElementById("cancelStageBtn");
const saveStageBtn = document.getElementById("submitStageBtn");

const shiftMenu = document.getElementById("id-shiftMenu");
const shiftModal = document.getElementById("shift-modal-id");
const cancelShiftBtn = document.getElementById("cancelShiftBtn");
const saveShiftBtn = document.getElementById("submitShiftBtn");

const informationMenu = document.getElementById("id-informationMenu");
const informationModal = document.getElementById("information-modal-id");
const cancelInformationBtn = document.getElementById("cancelInformationBtn");

const informationModalName = document.getElementById("information-data-name");
const informationModalID = document.getElementById("information-data-id");
const informationModalToken = document.getElementById("information-data-token");

const informationModalDOJ = document.getElementById("information-data-doj");
const informationModalGender = document.getElementById("information-data-gender");
const informationModalLanguage = document.getElementById("information-data-language");
const informationModalMobile = document.getElementById("information-data-mobile");

const informationModalShiftID = document.getElementById("information-data-shiftID");
const informationModalShiftName = document.getElementById("information-data-shiftName");

const informationModalSkillLevel = document.getElementById("information-data-skillLevel");

const informationModalStageID = document.getElementById("information-data-stageID");
const informationModalStageName = document.getElementById("information-data-stageName");

const informationModalStationID = document.getElementById("information-data-stationID");
const informationModalStationName = document.getElementById("information-data-stationName");

const empModal = document.getElementById("emp-modal-id");
const cancelEmpBtn = document.getElementById("cancelEmpBtn");
const saveEmpBtn = document.getElementById("submitEmpBtn");

const filterStationDropdown = document.getElementById("station-filter");
const clearFilterBtn = document.getElementById("clearFilterBtn");

const empModalStationDropdown = document.getElementById("new-station");
const empModalShiftDropdown = document.getElementById("new-shift");
const empModalStageDropdown = document.getElementById("new-stage");

const addEmpBtn = document.getElementById("addEmpBtn");

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

    clearFilterBtn.disabled = true; //so that clear filter button isnt called ceaselessly
}

initialize();


///////////////////////////// ?????????   /////////////////////////////
function eventListeners()
{
    stageMenu.addEventListener("click", loadStageModal);
    stationMenu.addEventListener("click", loadStationModal);
    shiftMenu.addEventListener("click", loadShiftModal);

    //informationMenu.addEventListener("click", loadInformationModal);

    addEmpBtn.addEventListener("click", loadEmpModal);
    
    window.addEventListener("click", closeModal);
    
    cancelEmpBtn.addEventListener("click", cancelModal);
    cancelStationBtn.addEventListener("click", cancelModal);
    cancelStageBtn.addEventListener("click", cancelModal);
    cancelShiftBtn.addEventListener("click", cancelModal);

    cancelInformationBtn.addEventListener("click", cancelModal);
    
    clearFilterBtn.addEventListener("click", clearFilters);
    deleteEmpButton.addEventListener("click", deleteSelected);

    filterStationDropdown.addEventListener("change", filterData);
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
    sendData["new_weeklyOff"] = document.getElementById("new-weeklyOff").options[
                document.getElementById("new-weeklyOff").selectedIndex].value;
    
    let isAdmin = document.getElementById("new-isAdmin").options[
                document.getElementById("new-isAdmin").selectedIndex].value;
    
    if(isAdmin == "Admin") sendData["new_isAdmin"] = true;
        
    else sendData["new_isAdmin"] = false;        

    sendData["new_language"] = document.getElementById("new-language").options[
                document.getElementById("new-language").selectedIndex].value;
    
    console.log(sendData);

    sendFormData(sendData);
}

function getCookie(name)
{
    let cookieValue = null;
    
    if (document.cookie && document.cookie !== '') 
    {
        let cookies = document.cookie.split(';');

        for (let i = 0; i < cookies.length; i++) 
        {
            let cookie = cookies[i].trim();
            
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '='))
            {
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

/*function loadInformationModal()
{
    informationModal.style.display = "inline-block";
}*/

function cancelModal()
{
    empModal.style.display = "none";
    stationModal.style.display = "none";
    stageModal.style.display = "none";
    shiftModal.style.display = "none";
    informationModal.style.display = "none";
}


function filterData(event)
{
    let stationValue = this.value;
    console.log(event.target.id);

    /*
    stationValue = get value from stationDropdown and check against default
    dateValue = get value from dateFilter and check against future dates
    */

    let filterArray = [];

    for(let i = 0; i < employeeJson.length; i++)
    {
        if(employeeJson[i].StationName != stationValue) continue;
        
        else filterArray.push(employeeJson[i]);        
    }

    console.log(filterArray);

    clearFilterBtn.disabled = false;
    
    loadEntireList(filterArray);
}


function clearFilters()
{    
    filterStationDropdown.selectedIndex = 0;
    
    loadEntireList(employeeJson);
    
    clearFilterBtn.disabled = true;
}

/*function submitData()
{
    // Do some shit to send data
    //modal.style.display = "none";
    loadList();
}*/

function closeModal(e)
{
    /*if(e.target == empModal) empModal.style.display = "none";

    else if(e.target == stationModal) stationModal.style.display = "none";

    else if(e.target == stageModal) stageModal.style.display = "none";
    
    else if(e.target == shiftModal) shiftModal.style.display = "none";*/

    switch(e.target)
    {
        case empModal:
            empModal.style.display = "none";
            break;
        
        case stationModal:
            stationModal.style.display = "none";
            break;

        case stageModal:
            stageModal.style.display = "none";
            break;
        
        case shiftModal:
            shiftModal.style.display = "none";
            break;
        
        case informationModal:
            informationModal.style.display = "none";
            break;
         
         default:
            break;
    }
}

function deleteSelected()
{
    let finalList = [];

    for (let i=0; i<selectedCheckBoxList.length; i++)
    {
        if(selectedCheckBoxList[i].checked)
        {
            deleteEmployee(selectedCheckBoxList[i].id);
            selectedCheckBoxList.pop(i);
        }
    }

    checkedCount = 0;
    deleteEmpButton.disabled = true;

    getAllData();
}

function displayEmpData(event)
{/*
    let rowIdx = parseInt(event.currentTarget.id); //returns string

    console.log(employeeJson[rowIdx]);
*/
    informationModal.style.display = "inline-block";
/*
    informationModalName.innerText = employeeJson[rowIdx].EmpName;
    informationModalID.innerText = employeeJson[rowIdx].EmployeeId;
    informationModalToken.innerText = employeeJson[rowIdx].EmpToken;

    informationModalDOJ.innerText = employeeJson[rowIdx].DOJ;
    informationModalGender.innerText = employeeJson[rowIdx].Gender;
    informationModalLanguage.innerText = employeeJson[rowIdx].LanguagePreference;
    informationModalMobile.innerText = employeeJson[rowIdx].Mobile;
    
    informationModalShiftID.innerText = employeeJson[rowIdx].ShiftId;
    informationModalShiftName.innerText = employeeJson[rowIdx].ShiftName;
    
    informationModalSkillLevel.innerText = employeeJson[rowIdx].SkillLevel;
    
    informationModalStageID.innerText = employeeJson[rowIdx].StageId;
    informationModalStageName.innerText = employeeJson[rowIdx].StageName;
    
    informationModalStationID.innerText = employeeJson[rowIdx].StationId;
    informationModalStationName.innerText = employeeJson[rowIdx].StationName;*/
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

    xhr.onreadystatechange = function() //Call a function when the state changes.
    {
        if(xhr.readyState == 4 && xhr.status == 200) 
        {
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
    
    xhr.onreadystatechange = function()
    {
        if (this.readyState == 4 && this.status == 200)
        {
            let myArr = JSON.parse(this.responseText);
            
            loadList(myArr[0]);
        }
    };
}

function getAllData()
{
    //employeeJson = ;
    let xhr = new XMLHttpRequest();
    
    xhr.open('GET', '/adminview/employeeData', true);
    xhr.send();
    
    xhr.onreadystatechange = function()
    {
        if (this.readyState == 4 && this.status == 200)
        {
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
    
    xhr.onreadystatechange = function()
    {
        if (this.readyState == 4 && this.status == 200)
        {
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
    
    xhr.onreadystatechange = function()
    {
        if (this.readyState == 4 && this.status == 200)
        {
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
    
    xhr.onreadystatechange = function()
    {
        if (this.readyState == 4 && this.status == 200)
        {
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

function loadEntireList(dataArray) 
{
    empListBody.innerHTML = "";
        
    if (dataArray != null) 
    {
        let noColumns = 5;
        
        for (let i = 0; i < dataArray.length; i++) 
        {                        
            let employeeName = dataArray[i].EmpName;
            if(employeeName === "default") continue;
            
            let newRow = document.createElement("tr");
            newRow.id = i;
            newRow.addEventListener("dblclick", displayEmpData);

            let tableData = [];
            
            for (let i = 0; i < noColumns; i++) 
            {
                tableData.push(document.createElement("td"));
            }

            let newCheckBox = document.createElement("input");
            newCheckBox.type = "checkbox";
            newCheckBox.id = dataArray[i].EmpToken;
            newCheckBox.addEventListener("click", selectRow);
            tableData[0].appendChild(newCheckBox);

            tableData[1].innerText = dataArray[i].EmpToken;
            tableData[2].innerText = employeeName;
            tableData[3].innerText = dataArray[i].DOJ;
            tableData[4].innerText = dataArray[i].Mobile;

            /*tableData[5].innerText = listData[i].StationName !== "Default Station" ? 
                                listData[i].StationName : "";*/

            for (let i = 0; i < noColumns; i++) 
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
                        </tr>
                    </thead>`;
    empListHead.innerHTML += tableHeader;
}

//<th data-columnName = "StationName" data-order="desc" onclick="sortColumn(event);">Station &#x25B4</th>