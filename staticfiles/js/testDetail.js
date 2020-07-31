//Element declarations
let titleInput = document.getElementById("titlebar");
let stationInput = document.getElementById("new-station");
let stageInput = document.getElementById("new-stage");
let questionNoInput = document.getElementById("new-questionNo");
let timeInput = document.getElementById("new-time");
let marksInput = document.getElementById("new-marks");

let addQuestionButton = document.getElementById("addQuestionBtn");
let questionList = document.getElementById("questionList");
let questionCard = document.getElementsByClassName("list-item-card");
let midPanel = document.getElementById("mid-panel");
let rightPanel = document.getElementById("right-panel");
let midQuestionNo = document.getElementById("id-listQuestionNo");
let rightQuestionNo = document.getElementById("right-panel-questionNo");
let rightQuestionText = document.getElementById("input-questionEdit");
let rightOp1 = document.getElementById("edit-option1");
let rightOp2 = document.getElementById("edit-option2");
let rightOp3 = document.getElementById("edit-option3");
let rightOp4 = document.getElementById("edit-option4");
let rightSaveButton = document.getElementById("saveQuestionBtn");
let resetButton = document.getElementById("resetBtn");
let cancelButton = document.getElementById("cancelTestBtn");
let submitButton = document.getElementById("createTestBtn");

const stationDropdown = document.getElementById("new-station");
const stageDropdown = document.getElementById("new-stage");

//Array declarations
let questionNoArray = [];
let questionTextArray = [];
let questionOp1Array = [];
let questionOp2Array = [];
let questionOp3Array = [];
let questionOp4Array = [];
let correctOpArray = [];
let stationJson = [];
let stageJson = [];
let questionCounter = 0;
let cookieValue = '';

initializePage();

function initializePage(){
    setEvents();
    getStageData();
    getStationData();
    hideRightPanel();
    getSessionData();
}

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

function getSessionData(){
    cookieValue = getCookie('csrftoken');
    titleInput.value = sessionStorage.getItem('title');
    questionNoInput.value = sessionStorage.getItem('questionNo');
    timeInput.value = sessionStorage.getItem('time');
    marksInput.value = sessionStorage.getItem('marks');

    for (var i = 0; i<stationDropdown.length; i++) {
        if (stationDropdown[i].value == sessionStorage.getItem('station')) {
            console.log("yes");
            stationDropdown.selectedIndex = i;
            break;
        }
    }
    for (var i = 0; i<stageDropdown.length; i++) {
        if (stageDropdown[i].value == sessionStorage.getItem('stage')) {
            stageDropdown.selectedIndex = i;
            break;
        }
    }
    //sessionStorage.clear();
}

function setEvents(){
    cancelButton.addEventListener("click", cancelTestEditing);
    submitButton.addEventListener("click", submitTestDetails);
    resetButton.addEventListener("click", resetRightPanel);
    addQuestionButton.addEventListener("click", addQuestionToList);
    rightSaveButton.addEventListener("click", saveQuestionDetails);

    for (var i = 0; i < questionCard.length; i++){
        questionCard[i].addEventListener('click', editQuestionDetails, false);
    };
}

function hideRightPanel(){
    midPanel.style.width = "55%";
    rightPanel.style.width = "20%";

    let child = rightPanel.children;
    for (var i = 0; i < child.length; i++){
        child[i].style.display = "none";
    };

}

function showRightPanel(){
    midPanel.style.width = "30%";
    rightPanel.style.width = "50%";

    let child = rightPanel.children;
    
    for (var i = 0; i < child.length; i++){ 
        child[i].style.display = "flex";
    };

}

function addQuestionToList(){
    getSessionData();
    //Data update in the arrays
    questionCounter++;
    questionNoArray.push(questionCounter);
    questionTextArray.push("Add details for this question")
    questionOp1Array.push("Add Option 1");
    questionOp2Array.push("Add Option 2");
    questionOp3Array.push("Add Option 3");
    questionOp4Array.push("Add Option 4");


    //New element creation
    let newListItem = document.createElement("li");             //New List Item
    newListItem.style.borderBottom = " solid 2px rgb(228, 227, 227)";

    let newQuestionCard = document.createElement("div");        //Question Div tag
    newQuestionCard.classList.add("list-item-card");
    newQuestionCard.addEventListener("click", editQuestionDetails);

    let newQuestionRow = document.createElement("div");         //Question Row
    newQuestionRow.classList.add("question-row");

    let newQuestionNo = document.createElement("h5");           //Question No
    newQuestionNo.classList.add("mid_questionNo");
    newQuestionNo.setAttribute("id", "id-listQuestionNo");
    newQuestionNo.innerText = questionNoArray[questionNoArray.length - 1];

    let newQuestion = document.createElement("h5");             //Question Text
    newQuestion.classList.add("question");
    newQuestion.setAttribute("id", "id-listQuestionNo");
    newQuestion.innerText = questionTextArray[questionTextArray.length - 1];

    let newQuestionRowTop = document.createElement("div");      //Top Row Div for option 1 and 2
    newQuestionRowTop.classList.add("option-row");

    let newOption1 = document.createElement("h6");              //Option 1 text
    newOption1.classList.add("option");
    newOption1.setAttribute("id", "id-listOption1");
    newOption1.innerText = questionOp1Array[questionOp1Array.length - 1];

    let newOption2 = document.createElement("h6");              //Option 2 text
    newOption2.classList.add("option");
    newOption2.setAttribute("id", "id-listOption2");
    newOption2.innerText = questionOp2Array[questionOp2Array.length - 1];

    let newQuestionRowBottom = document.createElement("div");   //Top Row Div for option 1 and 2
    newQuestionRowBottom.classList.add("option-row");

    let newOption3 = document.createElement("h6");              //Option 3 text
    newOption3.classList.add("option");
    newOption3.setAttribute("id", "id-listOption3");
    newOption3.innerText = questionOp3Array[questionOp3Array.length - 1];
    
    let newOption4 = document.createElement("h6");              //Option 4 text
    newOption4.classList.add("option");
    newOption4.setAttribute("id", "id-listOption4");
    newOption4.innerText = questionOp4Array[questionOp4Array.length - 1];
    
    //append elements to DOM
    newListItem.appendChild(newQuestionCard);
        newQuestionCard.appendChild(newQuestionRow);
            newQuestionRow.appendChild(newQuestionNo);
            newQuestionRow.appendChild(newQuestion);
        newQuestionCard.appendChild(newQuestionRowTop);
            newQuestionRowTop.appendChild(newOption1);
            newQuestionRowTop.appendChild(newOption2);
        newQuestionCard.appendChild(newQuestionRowBottom);
            newQuestionRowBottom.appendChild(newOption3);
            newQuestionRowBottom.appendChild(newOption4);
    questionList.appendChild(newListItem);
}

function editQuestionDetails(event){
    showRightPanel();
    eventNode = event.target.childNodes;                //Get all immediate child nodes of the event.target node

    rightQuestionNo.innerText = eventNode[0].childNodes[0].innerText + ". ";    //Set right panel question no
    rightQuestionText.value = eventNode[0].childNodes[1].innerText;             //Set right panel question
    rightOp1.value = eventNode[1].childNodes[0].innerText;                      //Set right panel option 1
    rightOp2.value = eventNode[1].childNodes[1].innerText;                      //Set right panel option 2
    rightOp3.value = eventNode[1].childNodes[0].innerText;                      //Set right panel option 3
    rightOp4.value = eventNode[1].childNodes[1].innerText;                      //Set right panel option 4
}

function saveQuestionDetails(){

    let questionNoIndex = parseInt(rightQuestionNo.innerText[rightQuestionNo.innerText.length - 2]);
    let insertIndex = questionNoArray.indexOf(questionNoIndex);
    
    questionTextArray[insertIndex] = rightQuestionText.value;
    questionOp1Array[insertIndex] = rightOp1.value;
    questionOp2Array[insertIndex] = rightOp2.value;
    questionOp3Array[insertIndex] = rightOp3.value;
    questionOp4Array[insertIndex] = rightOp4.value;
    //correctOpArray[insertIndex] = ;

    hideRightPanel();
    updateList();
}

function updateList(){
    let list_ul = questionList.getElementsByTagName("li");
    
    for(let i=0; i<list_ul.length; i++){
        let list_questionNo = list_ul[i].getElementsByTagName("h5");
        let list_questionText = list_ul[i].getElementsByTagName("h5");
        let list_questionOp = list_ul[i].getElementsByTagName("h6");
        //let list_correctAnswer = list_ul[0].getElementById("mid_questionNo");

        list_questionNo[0].innerText = questionNoArray[i];
        list_questionText[1].innerText = questionTextArray[i];
        list_questionOp[0].innerText = questionOp1Array[i];
        list_questionOp[1].innerText = questionOp2Array[i];
        list_questionOp[2].innerText = questionOp3Array[i];
        list_questionOp[3].innerText = questionOp4Array[i];
    }
}

function resetRightPanel(){
    rightQuestionNo.innerText = "";
    rightQuestionText.value = "";
    rightOp1.value = "";
    rightOp2.value = "";
    rightOp3.value = "";
    rightOp4.value = "";
    hideRightPanel();
}

function cancelTestEditing(){
    //Cancel test
    window.location.replace("/adminview/test");
}

function submitTestDetails(){
    //submit test
    testData = bundleDataForSend();
    saveAndCloseTestDetails(testData);
}

function saveAndCloseTestDetails(testData){
    var xhr = new XMLHttpRequest();
    var finalData = JSON.stringify(testData);
    console.log(finalData);

    xhr.open('POST', '/adminview/testData', true);
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.setRequestHeader('X-CSRFToken', cookieValue);
    console.log(cookieValue);

    xhr.onreadystatechange = function() {//Call a function when the state changes.
        if(xhr.readyState == 4 && xhr.status == 200) {
            alert(this.responseText);
            window.location.replace("/adminview/test");
        }
    }
    xhr.send(finalData);
}

function bundleDataForSend(){
    testData = {};
    questionDetails = [];

    testData["Title"] = titleInput.value;
    testData["StationId"] = stationJson[stationInput.selectedIndex -1].StationId;
    //testData["StationName"] = stationInput.options[stationInput.selectedIndex].value;
    testData["StageId"] = stageJson[stageInput.selectedIndex -1].StageId;
    //testData["StageName"] = stageInput.options[stageInput.selectedIndex].value;
    testData["Questions"] = questionNoInput.value;
    testData["Time"] = timeInput.value;
    testData["Marks"] = marksInput.value;


    for(let i = 0; i< questionTextArray.length; i++){
        tempJson = {};
        tempJson["QuestionNumber"] = questionNoArray[i];
        tempJson["Question"] = questionTextArray[i];
        tempJson["Op1"] = questionOp1Array[i];
        tempJson["Op2"] = questionOp2Array[i];
        tempJson["Op3"] = questionOp3Array[i];
        tempJson["Op4"] = questionOp4Array[i];
        tempJson["Correct"] = "Op1";//correctOpArray[i];
        
        questionDetails.push(tempJson);
    }

    testData["QuestionDetails"] = questionDetails;
    console.log(testData);
    return testData;
}

function getStationData() {
    var xhr = new XMLHttpRequest();
    
    xhr.open('GET', '/adminview/stationData', true);
    //xhr.responseType = 'json';            //Preconverts incoming data to json
    xhr.send();
    
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            stationJson = JSON.parse(this.responseText);
            loadStationDropdown();
        }
    };
}

function getStageData() {
    var xhr = new XMLHttpRequest();
    
    xhr.open('GET', '/adminview/stageData', true);
    xhr.send();
    
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            stageJson = JSON.parse(this.responseText);
            loadStageDropdown();
        }
    };
}

function loadStationDropdown(){
    for(let i=0; i<stationJson.length; i++){
        childOption = document.createElement("option");
        childOption.id = stationJson[i].StationId;
        childOption.innerText = stationJson[i].StationName;
        childOption.classList.add("select_option")
        stationDropdown.appendChild(childOption);
    }
}

function loadStageDropdown(){
    for(let i=0; i<stageJson.length; i++){
        childOption = document.createElement("option");
        childOption.id = stageJson[i].StageId;
        childOption.innerText = stageJson[i].StageName;
        childOption.classList.add("select_option")
        stageDropdown.appendChild(childOption);
    }
}