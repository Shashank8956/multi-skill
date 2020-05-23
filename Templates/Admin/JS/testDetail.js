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

let questionNoArray = [];
let questionTextArray = [];
let questionOp1Array = [];
let questionOp2Array = [];
let questionOp3Array = [];
let questionOp4Array = [];
let correctOpArray = [];
let questionCounter = 0;

for (var i = 0; i < questionCard.length; i++){
    questionCard[i].addEventListener('click', editQuestionDetails, false);
};

addQuestionButton.addEventListener("click", addQuestionToList);

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
    newQuestionNo.innerText = questionNoArray[questionNoArray.length - 1];

    let newQuestion = document.createElement("h5");             //Question Text
    newQuestion.classList.add("question");
    newQuestion.innerText = questionTextArray[questionTextArray.length - 1];

    let newQuestionRowTop = document.createElement("div");      //Top Row Div for option 1 and 2
    newQuestionRowTop.classList.add("option-row");

    let newOption1 = document.createElement("h6");              //Option 1 text
    newOption1.classList.add("option");
    newOption1.innerText = questionOp1Array[questionOp1Array.length - 1];

    let newOption2 = document.createElement("h6");              //Option 2 text
    newOption2.classList.add("option");
    newOption2.innerText = questionOp2Array[questionOp2Array.length - 1];

    let newQuestionRowBottom = document.createElement("div");   //Top Row Div for option 1 and 2
    newQuestionRowBottom.classList.add("option-row");

    let newOption3 = document.createElement("h6");              //Option 3 text
    newOption3.classList.add("option");
    newOption3.innerText = questionOp3Array[questionOp3Array.length - 1];
    
    let newOption4 = document.createElement("h6");              //Option 4 text
    newOption4.classList.add("option");
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
    
    event.stopPropagation();


    
    midPanel.style.width = "500px";
    rightPanel.style.width = "600px";
    eventNode = event.target.childNodes;                //Get all immediate child nodes of the event.target node

    console.log("Question: " + event.target.nodeName);
    console.log("Question: " + eventNode.length);
    console.log("Question: " + eventNode[0].nodeName);        //question-row
    console.log("Question: " + eventNode[1].nodeName);        //optionrowTop
    console.log("Question: " + eventNode[2].nodeName);        //optionrowBottom
    //console.log("Question: " + eventNode[3].id);
    //console.log("Question: " + eventNode[4].id);


}