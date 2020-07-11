const searchBar = document.getElementById("searchBar");
let selectedCheckBoxList = [];

initialize()

function initialize(){
    setEventHandlers();
}

function setEventHandlers(){
    searchBar.addEventListener("keyup", searchLogic);
}

function searchLogic(e){
    var value = e.target.value;
    loadEntireList(searchEmployeeTable(value));
}

function selectRow(selectedCheckBox){
    var row = selectedCheckBox.target.parentNode.parentNode;
    if(selectedCheckBox.target.checked){
        row.style.background = "#cccccc";
        deleteEmpButton.disabled = false;
        checkedCount += 1;
        selectedCheckBoxList.push(selectedCheckBox.target);
    }else{
        if(row.rowIndex % 2 != 0){
            row.style.background = "#f2f2f2";
            row.addEventListener("mouseenter", rowHoverEnter);
            row.addEventListener("mouseleave", rowHoverLeave);
        }else{
            row.style.background = "white";
        }
        checkedCount -= 1;
        if(checkedCount == 0){
            deleteEmpButton.disabled = true;
            selectedCheckBoxList = [];
        }
    }
}

function rowHoverEnter(e){
    e.target.style.background = "#dddddd";
}

function rowHoverLeave(e){
    if(e.target.rowIndex % 2 != 0){
        e.target.style.background = "#f2f2f2";
    }else{
        e.target.style.background = "white";
    }
}

function sortColumn(e){
    let column = e.target;
    let columnName = column.getAttribute("data-columnName");
    let sortedList = [];
    let columnText = column.innerText;
    columnText = columnText.substring(0, columnText.length - 1);

    if (column.getAttribute("data-order") == "desc"){
        column.setAttribute("data-order", "asc");
        columnText += "\u25B4";
        sortedList = employeeJson.sort((a,b) => a[columnName] > b[columnName] ? 1 : -1);
    }else{
        column.setAttribute("data-order", "desc");
        columnText += "\u25BE";
        sortedList = employeeJson.sort((a,b) => a[columnName] < b[columnName] ? 1 : -1);
    }
    column.innerText = columnText;
    loadEntireList(sortedList);
}

function searchEmployeeTable(value){
    var filterData = [];

    for(var i=0; i< employeeJson.length; i++){
        value = value.toLowerCase();
        var name = employeeJson[i].EmpName.toLowerCase();
        var token = employeeJson[i].EmpToken;
        var doj = employeeJson[i].DOJ;
        var mobile = employeeJson[i].mobile;
        var StationName = employeeJson[i].StationName;

        if(name.includes(value) || token == value || doj.includes(value) || mobile == value || StationName.includes(value)){
            filterData.push(employeeJson[i]);
        }
    }

    return filterData;
}



function deleteEmployee(employeeId){
    var xhrDelete = new XMLHttpRequest();
    var deleteURL = '/adminview/employeeData?EmployeeId=' + employeeId;
    xhrDelete.open('DELETE', deleteURL, true);
    xhrDelete.setRequestHeader('X-CSRFToken', cookieValue);
    xhrDelete.send();
    
    xhrDelete.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            //alert(this.responseText);
        }
    };
}