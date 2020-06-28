const searchBar = document.getElementById("searchBar");

initialize()

function initialize(){
    setEventHandlers();
}

function setEventHandlers(){
    searchBar.addEventListener("keyup", searchLogic);
}

function searchLogic(e){
    var value = e.target.value;
    console.log(value);
    
    loadEntireList(searchTable(value));
}

function searchTable(value){
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

function selectRow(selectedCheckBox){
    var row = selectedCheckBox.target.parentNode.parentNode;
    if(selectedCheckBox.target.checked){
        row.style.background = "#cccccc";
        deleteEmpButton.disabled = false;
        checkedCount += 1;
    }else{
        if(row.rowIndex % 2 != 0){
            row.style.background = "#f2f2f2";
            row.addEventListener("mouseenter", rowHoverEnter);
            row.addEventListener("mouseleave", rowHoverLeave);
        }else{
            row.style.background = "white";
        }
        checkedCount -= 1;
        if(checkedCount == 0)
            deleteEmpButton.disabled = true;
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

    if (column.getAttribute("data-order") == "desc"){
        column.setAttribute("data-order", "asc");
        console.log("first");
        sortedList = employeeJson.sort((a,b) => a[columnName] > b[columnName] ? 1 : -1);
        console.log("second");
    }else{
        column.setAttribute("data-order", "desc");
        console.log("first");
        sortedList = employeeJson.sort((a,b) => a[columnName] < b[columnName] ? 1 : -1);
        console.log("second");
    }
    loadEntireList(sortedList);
}