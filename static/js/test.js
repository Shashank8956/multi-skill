const stageMenu = document.getElementById("id-stageMenu");
const stationMenu = document.getElementById("id-stationMenu");

const addTestBtn = document.getElementById("addTestBtn");
const testModal = document.getElementById("test-modal-id");
const stationModal = document.getElementById("station-modal-id");
const stageModal = document.getElementById("stage-modal-id");

const titleInput = document.getElementById("new-title");
const stationInput = document.getElementById("new-station");
const stageInput = document.getElementById("new-stage");
const questionNo = document.getElementById("new-questionNo");
const timeInput = document.getElementById("new-time");
const marksInput = document.getElementById("new-marks");

const cancelTestBtn = document.getElementById("cancelTestBtn");
const submitTestBtn = document.getElementById("submitTestBtn");

const cancelStageBtn = document.getElementById("cancelStationBtn");
const submitStageBtn = document.getElementById("submitStationBtn");

const cancelStationBtn = document.getElementById("cancelStageBtn");
const submitStationBtn = document.getElementById("submitStageBtn");

initialize();

function initialize(){
    eventListeners();
}

function eventListeners(){
    addTestBtn.addEventListener("click", loadTestModal);
    stageMenu.addEventListener("click", loadStageModal);
    stationMenu.addEventListener("click", loadStationModal);

    submitTestBtn.addEventListener("click", loadTestDetail);
    cancelTestBtn.addEventListener("click", closeModal);

    //submitStationBtn.addEventListener("click", loadStationModal);
    cancelStationBtn.addEventListener("click", closeModal);

    //submitStageBtn.addEventListener("click", loadStageModal);
    cancelStageBtn.addEventListener("click", closeModal);
    window.addEventListener("click", closeModal);
}

function loadTestModal(){
    testModal.style.display = "inline-block";
}

function loadStageModal(){
    stageModal.style.display = "inline-block";
}

function loadStationModal(){
    stationModal.style.display = "inline-block";
}

function closeModal(e){
    if(e.target == testModal)
        testModal.style.display = "none";
    else if(e.target == stationModal)
        stationModal.style.display = "none";
    else if(e.target == stageModal)
        stageModal.style.display = "none";
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
