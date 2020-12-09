const empIDVar = 0;
var employeeJson = null;
var stationJson = null;
var shiftJson = null;
var stageJson = null;
var cookieValue = null;
var checkedCount = 0;

var trainedEmployeeData = [                        //Grouped by month, sorted by month (?)
    {"Name": "Shashank", "Trained_On": "2020-01-05"},
    {"Name": "Ashutosh", "Trained_On": "2020-01-15"},
    {"Name": "Vikram", "Trained_On": "2020-08-05"},
    {"Name": "Rohan", "Trained_On": "2020-11-22"},
    {"Name": "Shashank", "Trained_On": "2020-12-01"},    
]

var trainingYear = [                           //Distinct years
    {"Trained_On": "2020-04-01"},
    {"Trained_On": "2019-04-01"},
    {"Trained_On": "2018-04-01"},
    {"Trained_On": "2017-04-01"}
]

var RowArray = [];

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

const filterYearDropDown = document.getElementById("year-filter");


///////////////////////////// initialize /////////////////////////////
function initialize()
{
    //getData();
    //loadList();
    eventListeners();
    
    console.log(trainingYear);
    console.log(trainedEmployeeData);
    
    /*getAllData();
    getAllShiftData();
    getAllStageData();
    getAllStationData();*/
    loadListHeader();
    cookieValue = getCookie('csrftoken');

    loadYearDropdown(trainingYear);
    //loadTable(trainedEmployeeArr);
}

initialize();

/// imp ///

function loadYearDropdown(dataArray)
{
    for(let i = 0; i < dataArray.length; i++)
    {
        let trainedYear = dataArray[i].Trained_On.split("-")[0];
        //console.log(year);

        let dropDownChild = document.createElement("option");
        dropDownChild.id = "year " + trainedYear;
        dropDownChild.innerText = trainedYear;
        dropDownChild.classList.add("select_option");

        filterYearDropDown.appendChild(dropDownChild);
    }
}

function getRowWithEmptyCell(index)
{
    //console.log(index);
    
    if (RowArray.length === 0) return -1;

    for(let i = 0; i < RowArray.length; i++)
    {
        //console.log(RowArray[i] + " month " + index);
        let cell = document.getElementById(RowArray[i] + " month " + index);
        
        if(cell.textContent.trim() == "")
        {
            //console.log("Empty Component");
            return RowArray[i];
        }
    }

    return -1;
}

function getNewRowId()
{
    let newRow = document.createElement("tr");
    newRow.id = "Row " + (RowArray.length + 1);
    
    RowArray.push(newRow.id);

    newRow.innerHTML =  `
                        <td > </td>
                        <td id = "` + newRow.id + ` sno">` + RowArray.length + `</td>
                        <td id = "` + newRow.id + ` month 1"> </td>
                        <td id = "` + newRow.id + ` month 2"> </td>
                        <td id = "` + newRow.id + ` month 3"> </td>
                        <td id = "` + newRow.id + ` month 4"> </td>
                        <td id = "` + newRow.id + ` month 5"> </td>
                        <td id = "` + newRow.id + ` month 6"> </td>
                        <td id = "` + newRow.id + ` month 7"> </td>
                        <td id = "` + newRow.id + ` month 8"> </td>
                        <td id = "` + newRow.id + ` month 9"> </td>
                        <td id = "` + newRow.id + ` month 10"> </td>
                        <td id = "` + newRow.id + ` month 11"> </td>
                        <td id = "` + newRow.id + ` month 12"> </td>`;

    empListBody.appendChild(newRow);

    //console.log(newRow.id);
    return newRow.id;
}


function setCellValue(index, employeeName) 
{
    let rowIdx = getRowWithEmptyCell(index);

    //console.log(rowIdx);

    if (rowIdx === -1) 
    {
        let row = document.getElementById(getNewRowId());
        //console.log("ID: "+ row.id + " month 1");

        let cell = document.getElementById(row.id + " month " + index.toString());
        //console.log(cell);

        cell.innerText = employeeName;
    }

    else 
    {
        let row = document.getElementById(rowIdx);
        let cell = document.getElementById(row.id + " month " + index.toString());
        
        //console.log(cell);        
        cell.innerText = employeeName;
    }

}


function loadTable(dataArray)
{
    empListBody.innerHTML = "";

    for(let i = 0; i < dataArray.length; i++)
    {
        let employeeName = dataArray[i].Name;
        let month = dataArray[i].Trained_On.split("-")[1];

        switch(month)
        {
            case "1": case "01":
            {   setCellValue(1, employeeName);
                break;
            }

            case "2": case "02":
            {   setCellValue(2, employeeName);
                break;
            }

            case "3": case "03":
            {   setCellValue(3, employeeName);
                break;
            }

            case "4": case "04":
            {   setCellValue(4, employeeName);
                break;
            }

            case "5": case "05":
            {   setCellValue(5, employeeName);
                break;
            }

            case "6": case "06":
            {   setCellValue(6, employeeName);
                break;
            }

            case "7": case "07":
            {   setCellValue(7, employeeName);
                break;
            }

            case "8": case "08":
            {   setCellValue(8, employeeName);
                break;
            }

            case "9": case "09":
            {   setCellValue(9, employeeName);
                break;                
            }

            case "10":
            {   setCellValue(10, employeeName);
                break;
            }

            case "11":
            {   setCellValue(11, employeeName);
                break;
            }

            case "12":
            {   setCellValue(12, employeeName);
                break;
            }

            default:
            {   console.log("incorrect month");
                break;
            }
        }
    }
}

function filterData()
{
    loadTable(trainedEmployeeData);
}


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

    filterYearDropDown.addEventListener("change", filterData)
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
    if(listData!=null)
    {

            let newRow = document.createElement("tr");
            let tableData = [];

            for(let i=0; i<6; i++)
            {
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

            for(let i=0; i<6; i++)
            {
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
                            <th data-columnName = "SNo." data-order="desc" onclick="sortColumn(event);">S No. &#x25B4</th>
                            <th data-columnName = "January" data-order="desc" onclick="sortColumn(event);">January &#x25B4</th>
                            <th data-columnName = "Fabruary" data-order="desc" onclick="sortColumn(event);">Fabruary &#x25B4</th>
                            <th data-columnName = "March" data-order="desc" onclick="sortColumn(event);">March &#x25B4</th>
                            <th data-columnName = "April" data-order="desc" onclick="sortColumn(event);">April &#x25B4</th>
                            <th data-columnName = "May" data-order="desc" onclick="sortColumn(event);">May &#x25B4</th>
                            <th data-columnName = "June" data-order="desc" onclick="sortColumn(event);">June &#x25B4</th>
                            <th data-columnName = "July" data-order="desc" onclick="sortColumn(event);">July &#x25B4</th>
                            <th data-columnName = "August" data-order="desc" onclick="sortColumn(event);">August &#x25B4</th>
                            <th data-columnName = "September" data-order="desc" onclick="sortColumn(event);">September &#x25B4</th>
                            <th data-columnName = "October" data-order="desc" onclick="sortColumn(event);">October &#x25B4</th>
                            <th data-columnName = "November" data-order="desc" onclick="sortColumn(event);">November &#x25B4</th>
                            <th data-columnName = "December" data-order="desc" onclick="sortColumn(event);">December &#x25B4</th>
                        </tr>
                    </thead>`;
    empListHead.innerHTML += tableHeader;
}