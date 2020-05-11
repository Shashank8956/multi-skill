const addEmpBtn = document.getElementById("testCreateBtn");
const modal = document.getElementById("id_modal_shadow");
addEmpBtn.addEventListener("click", loadModal);
window.addEventListener("click", closeModal);

function loadModal(){
    modal.style.display = "inline-block";
}

function closeModal(e){
    if(e.target == modal)
        modal.style.display = "none";
}

