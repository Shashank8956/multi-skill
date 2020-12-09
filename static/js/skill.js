const empIDVar = 0;
var skillJson = [];
var stationJson = [];
var shiftJson = [];

var cookieValue = null;
var checkedCount = 0;

///////////////////////////// get elements /////////////////////////////
const stageMenu = document.getElementById("id-stageMenu");
const stationMenu = document.getElementById("id-stationMenu");
const shiftMenu = document.getElementById("id-shiftMenu");

const skillModal = document.getElementById("skill-modal-id");
const cancelSkillBtn = document.getElementById("cancelSkillBtn");
const saveSkillBtn = document.getElementById("submitSkillBtn");

const stationModal = document.getElementById("station-modal-id");
const cancelStationBtn = document.getElementById("cancelStationBtn");
const saveStationBtn = document.getElementById("submitStationBtn");

const stageModal = document.getElementById("stage-modal-id");
const cancelStageBtn = document.getElementById("cancelStageBtn");
const saveStageBtn = document.getElementById("submitStageBtn");

const shiftModal = document.getElementById("shift-modal-id");
const cancelShiftBtn = document.getElementById("cancelShiftBtn");
const saveShiftBtn = document.getElementById("submitShiftBtn");

const filterStationDropdown = document.getElementById("station-filter");
const filterShiftDropdown = document.getElementById("shift-filter");
const skillModalStationDropdown = document.getElementById("skill-station");
const skillModalStageDropdown = document.getElementById("skill-stage");


const empSkillBtn = document.getElementById("defineEmpSkillBtn");
const clearFilterBtn = document.getElementById("clearFilterBtn");
const deleteEmpButton = document.getElementById("deleteEmpBtn");

const skillList = document.getElementById("id_skillList");
const skillListHead = document.getElementById("id_skill_head");
const skillListBody = document.getElementById("id_skill_body");


///////////////////////////////////////// initialize /////////////////
function initialize()
{
    eventListeners();
    
    getAllData();
    getAllStageData();
    getAllShiftData();
    getAllStationData();
    
    cookieValue = getCookie('csrftoken');
}

initialize();

///////////////////////////////////////////////////////////////////////
function eventListeners()
{
    stageMenu.addEventListener("click", loadStageModal);
    stationMenu.addEventListener("click", loadStationModal);
    shiftMenu.addEventListener("click", loadShiftModal);
    
    empSkillBtn.addEventListener("click", loadSkillModal);
    saveSkillBtn.addEventListener("click", updateSkill);
    
    cancelSkillBtn.addEventListener("click", cancelModal);
    cancelStationBtn.addEventListener("click", cancelModal);
    cancelStageBtn.addEventListener("click", cancelModal);
    cancelShiftBtn.addEventListener("click", cancelModal);
    clearFilterBtn.addEventListener("click", clearFilters);

    window.addEventListener("click", closeModal);
}

function loadSkillModal()
{
    skillModal.style.display = "inline-block";
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
    skillModal.style.display = "none";
    stationModal.style.display = "none";
    stageModal.style.display = "none";
    shiftModal.style.display = "none";
}

function closeModal(e)
{
    if(e.target == skillModal)    skillModal.style.display = "none";

    else if(e.target == stationModal)    stationModal.style.display = "none";

    else if(e.target == stageModal)    stageModal.style.display = "none";

    else if(e.target == shiftModal)    shiftModal.style.display = "none";
}

function clearFilters()
{
    console.log("Clear filters does nothing!!");
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

function prepareSkillData(listData) 
{
    let skillArray = [];

    console.log(listData);

    if (listData != null) 
    {
        for (const [key, value] of Object.entries(listData)) 
        {
            let tempDict = {};
            tempDict["EmpId"] = value[0].EmployeeId;
            tempDict["EmpToken"] = value[0].EmpToken;
            tempDict["EmpName"] = value[0].EmpName;

            let j = 0;
            while (j < value.length) 
            {
                if (value[j].StationName != "Default Station") 
                {
                    tempDict[value[j].StationName] = value[j].SkillLevel;
                }
                j++;
            }
            skillArray.push(tempDict);
        }
    }
    skillJson = skillArray;
}

function updateSkill()
{
    sendData = {};
    
    sendData["EmployeeId"] = getEmployeeIdByToken( document.getElementById("skill-token").value );
    sendData["StationId"] = stationJson[skillModalStationDropdown.selectedIndex -1].StationId;
    sendData["StageId"] = stageJson[skillModalStageDropdown.selectedIndex -1].StageId;
    
    sendFormData(sendData);
}

function getEmployeeIdByName(empName)
{
    for(let i=0; i<skillJson.length; i++)
    {
        if(skillJson[i].EmpName.toLowerCase() == empName.toLowerCase())
            return skillJson[i].EmpId;
    }
    return null;
}

function getEmployeeIdByToken(empToken)
{
    for(let i = 0; i < skillJson.length; i++)
    {
        console.log(skillJson[i].EmpToken);

        if(skillJson[i].EmpToken == empToken)
            return skillJson[i].EmpId;
    }
    return null;
}


///////////////////////////// json functions /////////////////////////////
function getAllData()
{
    let xhr = new XMLHttpRequest();
    
    xhr.open('GET', '/adminview/employeeSkillData', true);
    //xhr.responseType = 'json';            //Preconverts incoming data to json
    xhr.send();
    
    xhr.onreadystatechange = function() 
    {
        if (this.readyState == 4 && this.status == 200) 
        {
            let tempJson = JSON.parse(this.responseText);
            
            prepareSkillData(tempJson);

            loadEntireList(tempJson);
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

function getAllStationData()
{
    let xhr = new XMLHttpRequest();
    
    xhr.open('GET', '/adminview/stationData', true);
    xhr.send();
    
    xhr.onreadystatechange = function()
    {
        if (this.readyState == 4 && this.status == 200)
        {
            stationJson = JSON.parse(this.responseText);

            console.log("Station Data:" + stationJson.length);

            loadStationDropdown();

            loadListHeader();
        }
    };
}

function sendFormData(testData)
{
    let xhr = new XMLHttpRequest();
    let finalData = JSON.stringify(testData);

    console.log(finalData);

    xhr.open('PUT', '/adminview/employeeSkillData', true);
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.setRequestHeader('X-CSRFToken', cookieValue);

    xhr.onreadystatechange = function() //Call a function when the state changes.
    {
        if(xhr.readyState == 4 && xhr.status == 200) 
        {
            alert(this.responseText);
            window.location.reload();
        }
    }
    xhr.send(finalData);
}


///////////////////////////// load data into elements //////////////////////
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

        filterShiftDropdown.appendChild(filterChild);
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

        skillModalStageDropdown.appendChild(modalChild);
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
        filterChild.innerText = stationJson[i].StationName;
        filterChild.classList.add("select_option")
        
        let modalChild = filterChild.cloneNode(true);

        filterStationDropdown.appendChild(filterChild);
        skillModalStationDropdown.appendChild(modalChild);
    }
}

function loadEntireList(listData) 
{
    skillListBody.innerHTML = "";

    if (listData != null) 
    {
        let tableRow = "<tr>";
        
        for (const [key, value] of Object.entries(listData)) 
        {
            let employeeName = value[0].EmpName;

            if(employeeName === "default")    continue;
            
            
            tableRow += `<td>
                        <input type="checkbox" id=` + value[0].EmpToken + `></td>
                        <td>` + value[0].EmpToken + `</td>
                        <td>` + employeeName + `</td>`;
            
            
            for (let j = 0; j < value.length ; j++) 
            {
                if (value[j].StationName != "Default Station") 
                {
                    switch(value[j].SkillLevel)
                    {
                        case 0:
                            tableRow += `<td></td>`;
                            continue;
                        
                        case 2:
                            tableRow += `<td style="background-color: #ff9696; text-align:center;">`+
                                    value[j].SkillLevel + `</td>`;
                            continue;

                        case 4:
                            tableRow += `<td style="background-color: #f9ff61; text-align:center;">`+
                                    value[j].SkillLevel + `</td>`;
                            continue; 

                        case 6:
                            tableRow += `<td style="background-color: #90ff7d; text-align:center;">`+
                                    value[j].SkillLevel + `</td>`;
                            continue;

                        case 8:
                            tableRow += `<td style="background-color: #96ffff; text-align:center;">`+
                                    value[j].SkillLevel + `</td>`;
                            continue;

                        default:
                            continue;
                    }
                }
            }
            tableRow += "</tr>";
        }
        skillListBody.innerHTML += tableRow;
    }
}

function loadListHeader()
{
    console.log(stationJson.length);
    let tableHeader = `<tr>    
                            <th><input type="checkbox"></th>
                            <th data-columnName = "EmpToken" data-order="desc" onclick="sortColumn(event);">Token No &#x25B4</th>
                            <th data-columnName = "EmpName" data-order="desc" onclick="sortColumn(event);">Name &#x25B4</th>`;
    for(let i=0; i<stationJson.length; i++){
        if(stationJson[i].StationName != "Default Station")
            tableHeader += `<th data-columnName = "` + stationJson[i].StationName + `" data-order="desc" style="text-align:center;" onclick="sortColumn(event);">` + stationJson[i].StationName + ` &#x25B4</th>`;
    }   
        tableHeader += `</tr>`;                    
                            
    skillListHead.innerHTML += tableHeader;
}

/*
function loadEntireList(listData){
    skillListBody.innerHTML = ""; 
        if(listData!=null){
            tableRow = "<tr>";

            for(let i=0; i<listData.length; i++){
                empToken = listData[i].EmpToken;
                tableRow += `<td>
                                <input type="checkbox" id=` + listData[i].EmpToken + `></td>
                                <td>` + listData[i].EmpToken + `</td>
                                <td>` + listData[i].EmpName + `</td>`;
                let j = 0;
                while( j < listData.length){
                    if(listData[j].StationName != "Default Station" && listData[j].EmpToken == empToken){
                        tableRow += `<td>` + listData[j].SkillLevel + `</td>`
                    }
                    j++;
                }
                
                tableRow += "</tr>"
                console.log(tableRow);
                skillListBody.innerHTML = tableRow;
            }
        }
}
*/
`                          <tr>
<th><input type="checkbox"></th>    
<th>Token No</th>
<th>Name</th>
<th>M6-B Front Cover Torquing</th>
<th>M6-C Front Cover Bolts</th>
<th>M7-A ROSR torquing,pully</th>
<th>M7-B ROSR Selant Application</th>
<th>M8-B Oil Pan Torquing</th>
<th>M9-A Spill Cut-off Operation</th>
<th>M9-A FIP Back Side Bolts</th>
<th>OSA-1-A Camshaft Idler Oil Pump</th>
<th>OSA-2-A Front Cover Sub</th>
<th>PSA-A Piston Ring Insertion</th>
<th>PSA-B Con Rod Cap Removal</th>
<th>PSA-C Piston-Con Rod Subassy</th>
<th>QP1-A Qp1 Torquing</th>
</tr>`

/*
    skillJson
    templist
    for item in skillJson:
        empToken = item.EmpToken
        let i = 0
        while (i < skillJson.length)
            if skillJson[i].EmpToken == empToken:
                tempList = skillJson[i]
        for stuff in tempList:
            add stuff to table Row
        tempList.clear()
*/


/*
    {
        "111": [{StationName, SkillLevel}, {StationName, SkillLevel}],
        "112": {StationName, SkillLevel},
        "113": {StationName, SkillLevel},
    }
*/