const stageMenu = document.getElementById("id-stageMenu");
const stationMenu = document.getElementById("id-stationMenu");
const shiftMenu = document.getElementById("id-shiftMenu");

const trainingModal = document.getElementById("emp-modal-id");
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
const filterShiftDropdown = document.getElementById("shift-filter");


const empSkillBtn = document.getElementById("defineEmpSkillBtn");
const clearFilterBtn = document.getElementById("clearFilterBtn");
const deleteEmpButton = document.getElementById("deleteEmpBtn");

const skillList = document.getElementById("id_skillList");
const skillListHead = document.getElementById("id_skill_head");
const skillListBody = document.getElementById("id_skill_body");

const empIDVar = 0;
let skillJson = [];
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
    cookieValue = getCookie('csrftoken');
}

function eventListeners(){
    stageMenu.addEventListener("click", loadStageModal);
    stationMenu.addEventListener("click", loadStationModal);
    shiftMenu.addEventListener("click", loadShiftModal);
    empSkillBtn.addEventListener("click", loadEmpModal);
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
    empModal.style.display = "inline-block";
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
    empModal.style.display = "none";
    stationModal.style.display = "none";
    stageModal.style.display = "none";
    shiftModal.style.display = "none";
}

function closeModal(e){
    if(e.target == empSkillBtn)
        empSkillBtn.style.display = "none";
    else if(e.target == stationModal)
        stationModal.style.display = "none";
    else if(e.target == stageModal)
        stageModal.style.display = "none";
    else if(e.target == shiftModal)
        shiftModal.style.display = "none";
}

function getAllData() {
    var xhr = new XMLHttpRequest();
    
    xhr.open('GET', 'http://127.0.0.1:8000/adminview/employeeSkillData', true);
    //xhr.responseType = 'json';            //Preconverts incoming data to json
    xhr.send();
    
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            skillJson = JSON.parse(this.responseText);
            console.log(skillJson);
            prepareSkillData(skillJson);
            loadEntireList(skillJson);
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
            loadShiftDropdown();
        }
    };
}

function getAllStationData() {
    var xhr = new XMLHttpRequest();
    
    xhr.open('GET', 'http://127.0.0.1:8000/adminview/stationData', true);
    xhr.send();
    
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            stationJson = JSON.parse(this.responseText);
            console.log("Station Data:" + stationJson.length);
            loadStationDropdown();
            loadListHeader();
        }
    };
}

function loadShiftDropdown(){
    for(let i=0; i<shiftJson.length; i++){
        childOption = document.createElement("option");
        childOption.id = shiftJson[i].ShiftId;
        childOption.innerText = shiftJson[i].ShiftName;
        childOption.classList.add("select_option")
        filterShiftDropdown.appendChild(childOption);
    }
}

function loadStationDropdown(){
    for(let i=0; i<stationJson.length; i++){
        childOption = document.createElement("option");
        childOption.id = stationJson[i].StationId;
        childOption.innerText = stationJson[i].StationName;
        childOption.classList.add("select_option")
        filterStationDropdown.appendChild(childOption);
    }
}

function loadListHeader(){
    console.log(stationJson.length);
    let tableHeader = `<tr>    
                            <th><input type="checkbox"></th>
                            <th data-columnName = "EmpToken" data-order="desc" onclick="sortColumn(event);">Token No &#x25B4</th>
                            <th data-columnName = "EmpName" data-order="desc" onclick="sortColumn(event);">Name &#x25B4</th>`;
    for(let i=0; i<stationJson.length; i++){
        if(stationJson[i].StationName != "Default Station")
            tableHeader += `<th data-columnName = "` + stationJson[i].StationName + `" data-order="desc" onclick="sortColumn(event);">` + stationJson[i].StationName + ` &#x25B4</th>`;
    }   
        tableHeader += `</tr>`;                    
                            
    skillListHead.innerHTML += tableHeader;
}

function prepareSkillData(listData){
    skillDict = [];

    if(listData!=null){
            for (const [key, value] of Object.entries(listData)) {
                tempDict = {};
                tempDict["EmpToken"] = value[0].EmpToken;
                tempDict["EmpName"] = value[0].EmpName;

                var j = 0;
                while( j < value.length){
                    if(value[j].StationName != "Default Station"){
                        tempDict[value[j].StationName] = value[j].SkillLevel;
                    }
                    j++;
                }
                skillDict.push(tempDict);
            }
        }
        console.log(skillDict);
}

function loadEntireList(listData){
    skillListBody.innerHTML = ""; 
    
        if(listData!=null){
            tableRow = "<tr>";
            for (const [key, value] of Object.entries(listData)) {
                tableRow += `<td>
                                <input type="checkbox" id=` + value[0].EmpToken + `></td>
                                <td>` + value[0].EmpToken + `</td>
                                <td>` + value[0].EmpName + `</td>`;
                var j = 0;
                while( j < value.length){
                    if(value[j].StationName != "Default Station"){
                        if(value[j].SkillLevel == 0)
                            tableRow += `<td style="text-align:center;">`;
                        else if(value[j].SkillLevel == 2)
                            tableRow += `<td style="background-color: #ff9696; text-align:center;">`;

                        else if(value[j].SkillLevel == 4)
                            tableRow += `<td style="background-color: #f9ff61; text-align:center;">`;
                        
                        else if(value[j].SkillLevel == 6)
                            tableRow += `<td style="background-color: #90ff7d; text-align:center;">`;
                        
                        else if(value[j].SkillLevel == 8)
                            tableRow += `<td style="background-color: #96ffff; text-align:center;">`;

                        tableRow +=  + value[j].SkillLevel + `</td>`
                    }
                    j++;
                }
                tableRow += "</tr>";
            }
            console.log(tableRow);
            skillListBody.innerHTML += tableRow;
        }
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
                var j = 0;
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
        var i = 0
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