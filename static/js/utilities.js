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
    loadEntireList(searchEmployeeTable(value));
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

function searchTestTable(value){
    var filterData = [];

    for(var i=0; i< testJson.length; i++){
        value = value.toLowerCase();
        var title = testJson[i].Title.toLowerCase();
        var stationName = testJson[i].StationName;
        var stageName = testJson[i].StageName;
        var time= testJson[i].Time;
        var marks = testJson[i].Marks;
        var questions = testJson[i].Questions;

        if(title.includes(value) || stageName.includes(value) || time == value || stationName.includes(value) || marks == value ||  Questions == value){
            filterData.push(testJson[i]);
        }
    }

    return filterData;
}

function searchShiftTable(value){
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

function searchSkillTable(value){
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

function searchTrainingTable(value){
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