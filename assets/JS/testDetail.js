//Element declarations
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

//Array declarations
let questionNoArray = [];
let questionTextArray = [];
let questionOp1Array = [];
let questionOp2Array = [];
let questionOp3Array = [];
let questionOp4Array = [];
let correctOpArray = [];
let questionCounter = 0;

initializePage();

function initializePage(){
    setEvents();
    hideRightPanel();
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
        console.log(child[i].tagName);  
        child[i].style.display = "none";
    };

}

function showRightPanel(){
    midPanel.style.width = "30%";
    rightPanel.style.width = "50%";

    let child = rightPanel.children;
    
    for (var i = 0; i < child.length; i++){
        console.log(child[i].tagName);  
        child[i].style.display = "flex";
    };

}

function addQuestionToList(){
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
}

function submitTestDetails(){
    //submit test
}