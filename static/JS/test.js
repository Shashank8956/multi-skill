const addEmpBtn = document.getElementById("addTestBtn");
const modal = document.getElementById("id_modal_shadow");
const titleInput = document.getElementById("new-title");
const stationInput = document.getElementById("new-station");
const stageInput = document.getElementById("new-stage");
const questionNo = document.getElementById("new-questionNo");
const timeInput = document.getElementById("new-time");
const marksInput = document.getElementById("new-marks");

const cancelTestBtn = document.getElementById("cancelTestBtn");
const submitTestBtn = document.getElementById("submitTestBtn");

initialize();

function initialize(){
    eventListeners();
}

function eventListeners(){
    addEmpBtn.addEventListener("click", loadModal);
    submitTestBtn.addEventListener("click", loadTestDetail);
    cancelTestBtn.addEventListener("click", closeModal);
    window.addEventListener("click", closeModal);
}

function loadModal(){
    modal.style.display = "inline-block";
}

function closeModal(e){
    if(e.target == modal)
        modal.style.display = "none";
}

function loadTestDetail(){
    //var b = "Shashank Singh"
    //url = 'http://127.0.0.1:8000/adminview/testDetail?name=' + encodeURIComponent(b);
    //document.location.href = url;
    console.log("Added to session storage: " + titleInput.value);
    sessionStorage.setItem('title', titleInput.value);
    sessionStorage.setItem('station', stationInput.value);
    sessionStorage.setItem('stage', stageInput.value);
    sessionStorage.setItem('questionNo', questionNo.value);
    sessionStorage.setItem('time', timeInput.value);
    sessionStorage.setItem('marks', marksInput.value);

    window.location.href = "./adminview/testDetail";
}
