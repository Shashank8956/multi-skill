let switchButton = document.getElementById("switchBtn");
let frontSlider = document.getElementById("front_slider");
let bottomSlider = document.getElementById("bottom_slider");
let isAdmin = true;

switchButton.addEventListener("click", switchPanel);

function switchPanel(){
    if(isAdmin==true){
        isAdmin = false;

        //frontSlider.style.order = 2;
        frontSlider.classList.add("flMoveRight");
        //bottomSlider.style.order = 1;
        
        console.log("Left to right");
    }else if(isAdmin==false){
        isAdmin = true;

        frontSlider.style.order = 1;
        bottomSlider.style.order = 2;
        
        console.log("Right to left");
    }
}