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
    loadEntireList(searchTable(value));
}

function selectRow(selectedCheckBox){
    var row = selectedCheckBox.target.parentNode.parentNode;
    if(selectedCheckBox.target.checked){
        row.style.background = "#cccccc";
        deleteTestBtn.disabled = false;
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
            deleteTestBtn.disabled = true;
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
        sortedList = testJson.sort((a,b) => a[columnName] > b[columnName] ? 1 : -1);
    }else{
        column.setAttribute("data-order", "desc");
        columnText += "\u25BE";
        sortedList = testJson.sort((a,b) => a[columnName] < b[columnName] ? 1 : -1);
    }
    column.innerText = columnText;
    loadEntireList(sortedList);
}

function searchTable(value){var filterData = [];

    for(var i=0; i< testJson.length; i++){
        value = value.toLowerCase();
        var title = testJson[i].Title.toLowerCase();
        var stationName = testJson[i].StationName;
        var stageName = testJson[i].StageName;
        var time= testJson[i].Time;
        var marks = testJson[i].Marks;
        var questions = testJson[i].Questions;

        if(title.includes(value) || stageName.includes(value) || time == value || stationName.includes(value) || marks == value ||  questions == value){
            filterData.push(testJson[i]);
        }
    }

    return filterData;
}

function deleteTest(testId){
    var xhrDelete = new XMLHttpRequest();
    var deleteURL = '/adminview/testData?TestHeaderId=' + testId;
    xhrDelete.open('DELETE', deleteURL, true);
    //xhrDelete.setRequestHeader('X-CSRFToken', cookieValue);
    xhrDelete.send();
    
    xhrDelete.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            //alert(this.responseText);
        }
    };
}