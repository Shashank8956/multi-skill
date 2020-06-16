const stageMenu = document.getElementById("id-stageMenu");
const stationMenu = document.getElementById("id-stationMenu");

const empModal = document.getElementById("emp-modal-id");
const cancelEmpBtn = document.getElementById("cancelEmpBtn")
const saveEmpBtn = document.getElementById("submitEmpBtn");

const stationModal = document.getElementById("station-modal-id");
const cancelStationBtn = document.getElementById("cancelStationBtn")
const saveStationBtn = document.getElementById("submitStationBtn");

const stageModal = document.getElementById("stage-modal-id");
const cancelStageBtn = document.getElementById("cancelStageBtn")
const saveStageBtn = document.getElementById("submitStageBtn");

const addEmpBtn = document.getElementById("addEmpBtn");
const clearFilterBtn = document.getElementById("clearFilterBtn");
const empList = document.getElementById("id_EmpList");


initialize();

function initialize(){
    //getData();
    eventListeners();
    //loadList();
    getAllData();
}

function eventListeners(){
    stageMenu.addEventListener("click", loadStageModal);
    stationMenu.addEventListener("click", loadStationModal);
    addEmpBtn.addEventListener("click", loadEmpModal);
    window.addEventListener("click", closeModal);
    cancelEmpBtn.addEventListener("click", cancelModal);
    saveEmpBtn.addEventListener("click", submitData);
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

function cancelModal(){
    empModal.style.display = "none";
    stationModal.style.display = "none";
    stageModal.style.display = "none";
}

function submitData(){
    /* Do some shit to send data */
    modal.style.display = "none";
    loadList();
}

function closeModal(e){
    if(e.target == empModal)
        empModal.style.display = "none";
    else if(e.target == stationModal)
        stationModal.style.display = "none";
    else if(e.target == stageModal)
        stageModal.style.display = "none";
}

function getData() {
    var xhr = new XMLHttpRequest();
    
    xhr.open('GET', 'http://127.0.0.1:8000/adminview/12345', true);
    //xhr.responseType = 'json';            Preconverts incoming data to json
    xhr.send();
    
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

            var myArr = JSON.parse(this.responseText);
            loadList(myArr[0]);
        }
    };
}

function getAllData() {
    var xhr = new XMLHttpRequest();
    
    xhr.open('GET', 'http://127.0.0.1:8000/adminview/getAllEmployees', true);
    //xhr.responseType = 'json';            //Preconverts incoming data to json
    xhr.send();
    
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var myArr = JSON.parse(this.responseText);
            console.log(myArr);
            loadEntireList(myArr);
        }
    };
}


function loadList(listData) {
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

function loadEntireList(listData){
    if(listData!=null){

            for(let i=0; i<listData.length; i++){
                let newRow = document.createElement("tr");
                let tableData = []
                for(let i=0; i<6; i++){
                    tableData.push(document.createElement("td"));
                }

                let newCheckBox = document.createElement("input");
                newCheckBox.type = "checkbox";
                tableData[0].appendChild(newCheckBox);

                tableData[1].innerText = listData[i].emp_token;
                tableData[2].innerText = listData[i].emp_name;
                tableData[3].innerText = listData[i].doj;
                tableData[4].innerText = listData[i].mobile;
                tableData[5].innerText = listData[i].current_station;

                for(let i=0; i<6; i++){
                    newRow.appendChild(tableData[i]);
                }

                empList.appendChild(newRow);
            }
        }
}
