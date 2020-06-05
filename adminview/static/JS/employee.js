const addEmpBtn = document.getElementById("addEmpBtn");
const modal = document.getElementById("emp-modal-id");
const cancelBtn = document.getElementById("cancelNewBtn")
const saveBtn = document.getElementById("submitNewBtn");
const clearFilterBtn = document.getElementById("clearFilterBtn");
const empList = document.getElementById("id_EmpList");


initialize();

function initialize(){
    getData();
    eventListeners();
    //loadList();
    getAllData();
}

function eventListeners(){
    addEmpBtn.addEventListener("click", loadModal);
    window.addEventListener("click", closeModal);
    cancelBtn.addEventListener("click", cancelModal);
    saveBtn.addEventListener("click", submitData);
    clearFilterBtn.addEventListener("click", clearFilters);
}

function clearFilters(){
    console.log("Clear filters!!");
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://127.0.0.1:8000/adminview/12345');
    xhr.send();
}

function loadModal(){
    modal.style.display = "inline-block";
}

function cancelModal(){
    modal.style.display = "none";
}

function submitData(){
    /* Do some shit to send data */
    
    modal.style.display = "none";
    loadList();
}

function closeModal(e){
    if(e.target == modal)
        modal.style.display = "none";
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
    console.log(listData);
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

            console.log(listData.emp_token);
            console.log(listData.emp_name);
            console.log(listData.doj);
            console.log(listData.mobile);
            console.log(listData.current_station);

            for(let i=0; i<6; i++){
                newRow.appendChild(tableData[i]);
            }

            empList.appendChild(newRow);
    }
}

function loadEntireList(listData){
    console.log(listData);
    console.log(listData.length);
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

                console.log(listData[i].emp_token);
                console.log(listData[i].emp_name);
                console.log(listData[i].doj);
                console.log(listData[i].mobile);
                console.log(listData[i].current_station);

                for(let i=0; i<6; i++){
                    newRow.appendChild(tableData[i]);
                }

                empList.appendChild(newRow);
            }
        }
}
