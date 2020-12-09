var switchButton = document.getElementById("switchBtn");
var frontSlider = document.getElementById("front_slider");
var bottomSlider = document.getElementById("bottom_slider");
var bottom_slider_title = document.getElementById("bottom_slider_title");
var infoText = document.getElementById("infoText");
var username_input = document.getElementById("username_input");
var password_input = document.getElementById("password_input");
var loginBtn = document.getElementById("loginBtn");
var isAdmin = true;

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