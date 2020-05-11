const addEmpBtn = document.getElementById("createEmpButton");
const modal = document.getElementById("emp-modal-id");
addEmpBtn.addEventListener("click", loadModal);
window.addEventListener("click", closeModal);

function loadModal(){
    modal.style.display = "inline-block";
}

function closeModal(e){
    if(e.target == modal)
        modal.style.display = "none";
}

