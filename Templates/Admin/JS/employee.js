const addEmpBtn = document.getElementById("addEmpBtn");
const modal = document.getElementById("emp-modal-id");
const cancelBtn = document.getElementById("cancelNewBtn")
const saveBtn = document.getElementById("submitNewBtn")

addEmpBtn.addEventListener("click", loadModal);
window.addEventListener("click", closeModal);
cancelBtn.addEventListener("click", cancelModal);
saveBtn.addEventListener("click", submitData);


function loadModal(){
    modal.style.display = "inline-block";
}

function cancelModal(){
    modal.style.display = "none";
}

function submitData(){
    /* Do some shit to send data */
    modal.style.display = "none";
}

function closeModal(e){
    if(e.target == modal)
        modal.style.display = "none";
}

