let employeeJson = [];
let stationJson = [];
let shiftJson = [];
let checkedCount = 0;


///////////////////////////// get elements /////////////////////////////
/*
//const updateSkillBtn = document.getElementById("defineEmpSkillBtn");  //?????????
//const deleteShiftButton = document.getElementById("deleteEmpBtn");  //?????????
*/

//rename these
const stationMenu = document.getElementById("id-stationMenu");
const stageMenu = document.getElementById("id-stageMenu");
const shiftMenu = document.getElementById("id-shiftMenu");

const stationModal = document.getElementById("station-modal-id");
const cancelStationBtn = document.getElementById("cancelStationBtn");
const submitStationBtn = document.getElementById("submitStationBtn");

const stageModal = document.getElementById("stage-modal-id");
const cancelStageBtn = document.getElementById("cancelStageBtn");
const submitStageBtn = document.getElementById("submitStageBtn");

const shiftModal = document.getElementById("shift-modal-id");
const cancelShiftBtn = document.getElementById("cancelShiftBtn")
const saveShiftBtn = document.getElementById("submitShiftBtn");

const stationModalDropdown = document.getElementById("new-station");
const stageModalDropdown = document.getElementById("new-stage");

const stationFilter = document.getElementById("station-filter"); 
const shiftFilter = document.getElementById("shift-filter");
const offDayFilter = document.getElementById("offday-filter");

const clearFilterBtn = document.getElementById("clearFilterBtn");

//const list = document.getElementById("list");
const listHead = document.getElementById("list_head");
const listBody = document.getElementById("list_body");


///////////////////////////////////////// initialize /////////////////
function initialize()
{
    getEmployeeData();
    getStationData();

    loadListHeader();
    eventListeners();
}

initialize();


///////////////////////////// ????????? /////////////////////////////
function eventListeners()
{
    /*submitStationBtn.addEventListener("click", loadStationModal);
    cancelStationBtn.addEventListener("click", cancelModal);

    updateSkillBtn.addEventListener("click", loadSkillModal);
    cancelShiftBtn.addEventListener("click", cancelModal);*/
    
    stationMenu.addEventListener("click", loadStationModal);
    stageMenu.addEventListener("click", loadStageModal);
    shiftMenu.addEventListener("click", loadShiftModal); 
    
    window.addEventListener("click", closeModal);
}


///////////////////////////// helper functions /////////////////////////////
function loadStationModal()
{
    console.log(stationModal);
    stationModal.style.display = "inline-block";
}

function loadStageModal()
{
    stageModal.style.display = "inline-block";
}

function loadShiftModal()
{
    shiftModal.style.display = "inline-block";
}


function cancelModal()
{
    shiftModal.style.display = "none";
    stationModal.style.display = "none";
    stageModal.style.display = "none";
    shiftModal.style.display = "none";
}

function closeModal(e)
{
    if(e.target == stationModal)    stationModal.style.display = "none";
    else if(e.target == stageModal)    stageModal.style.display = "none";
    else if(e.target == shiftModal)    shiftModal.style.display = "none";
}


///////////////////////////// json functions /////////////////////////////
function getEmployeeData() 
{
    let xhr = new XMLHttpRequest();
    
    xhr.open('GET', '/adminview/employeeData', true);
    //xhr.responseType = 'json';       //Preconverts incoming data to json
    xhr.send();
    
    xhr.onreadystatechange = function() 
    {
        if (this.readyState == 4 && this.status == 200) 
        {
            employeeJson = JSON.parse(this.responseText);
            console.log(employeeJson);
            
            loadList(employeeJson);
        }
    };
}

function getStationData() 
{
    let xhr = new XMLHttpRequest();
    
    xhr.open('GET', '/adminview/stationData', true);
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

function getShiftData() 
{
    let xhr = new XMLHttpRequest();
    
    xhr.open('GET', '/adminview/stageData', true);
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

        stationFilter.appendChild(filterChild);
    }
}

function loadShiftDropdown()
{
    for(let i = 0; i < shiftJson.length; i++)
    {
        let shiftName = shiftJson[i].ShiftName;
        if(shiftName === "Default Shift") continue;

        let filterChild = document.createElement("option");
        filterChild.id = shiftJson[i].ShiftId;
        filterChild.innerText = shiftName;
        filterChild.classList.add("select_option");

        shiftFilter.appendChild(filterChild);
    }
}

function loadList(listData)
{
    listBody.innerHTML = ""; 

    if(listData != null)
    {
            for(let i = 0; i < listData.length; i++)
            {                
                let employeeName = listData[i].EmpName;
                if(employeeName === "default") continue;
                
                let newRow = document.createElement("tr");
                let tableData = [];

                for(let i = 0; i < 7; i++)
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
                
                tableData[3].innerText = listData[i].ShiftName !== "Default Shift" ? 
                                            listData[i].ShiftName : "";
                
                tableData[4].innerText = listData[i].StationName !== "Default Station" ? 
                                            listData[i].StationName : "";

                tableData[5].innerText = listData[i].StageName !== "Default Stage" ? 
                                            listData[i].StageName : "";
                
                tableData[6].innerText = listData[i].WeeklyOff;

                
                for(let i = 0; i < 7; i++)
                {
                    newRow.appendChild(tableData[i]);
                }
                
                listBody.appendChild(newRow);
            }
        }   
}

function loadListHeader()
{
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
                        
    listHead.innerHTML += tableHeader;
}