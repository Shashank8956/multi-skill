let switchButton = document.getElementById("switchBtn");
let frontSlider = document.getElementById("front_slider");
let bottomSlider = document.getElementById("bottom_slider");
let bottom_slider_title = document.getElementById("bottom_slider_title");
let infoText = document.getElementById("infoText");
let username_input = document.getElementById("username_input");
let password_input = document.getElementById("password_input");
let loginBtn = document.getElementById("loginBtn");
let isAdmin = true;

switchButton.addEventListener("click", switchPanel);
loginBtn.addEventListener("click", Login);

function switchPanel(){
    if(isAdmin==true){

        frontSlider.classList.add("flMoveRight");
        bottomSlider.classList.add("bkMoveLeft");

        frontSlider.classList.remove("flMoveLeft");
        bottomSlider.classList.remove("bkMoveRight");

        setTimeout(changeContent, 500);
        switchButton.innerText = "Admin Login";
        infoText.innerText = "Enter the details to login as a user or click below to login as a Admin";
        isAdmin = false;
        console.log("Left to right");

    }else if(isAdmin==false){

        frontSlider.classList.add("flMoveLeft");
        bottomSlider.classList.add("bkMoveRight");

        frontSlider.classList.remove("flMoveRight");
        bottomSlider.classList.remove("bkMoveLeft");
        setTimeout(changeContent, 500);
        switchButton.innerText = "Test User";
        infoText.innerText = "Enter the details to login as an admin or click below to login as a user";
        isAdmin = true;
        console.log("Right to left");
    }
}

function changeContent(){
    if(isAdmin==false){             //Admin==false because isAdmin is set to false before calling this function due to timeout
        
        bottom_slider_title.innerText = "User Login";
        username_input.placeholder = "Token No";
        username_input.value = "";
        password_input.placeholder = "Mobile No";
        password_input.value = "";
        password_input.type = "tel";

    }else if(isAdmin==true){
        
        bottom_slider_title.innerText = "Admin Login";
        username_input.placeholder = "Username";
        username_input.value = "";
        password_input.placeholder = "Password";
        password_input.value = "";
        password_input.type = "password";
        
    }
}

function Login(){
    let username = username_input.value;
    let password = password_input.value;

    if(username.length == 0 || password.length == 0){
        alert("Please enter the details!");
    }else if(isAdmin == true && username == "admin" && password == "admin") {
        console.log("Login?");
        window.location.href = "./adminview/dashboard";
    }else if(isAdmin == false && username == "1234" && password == "1234"){
        alert("Comming Soon!");
    }else{
        alert("Invalid credentials!");
        username_input.value = "";
        password_input.value = "";
    }

    function loadDashboard() {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "https://localhost/abcd/abcd", true);
        xhr.onload = function(){
        console.log(xhr.responseText);
        }
    }
}