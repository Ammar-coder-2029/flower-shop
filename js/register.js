let userFname = document.getElementById("userFname")
let userLname = document.getElementById("userLname")
let email = document.getElementById("email")
let password = document.getElementById("password")
let isloggin = localStorage.setItem("isloggin", "false");
let registerForm = document.getElementById("registerForm"); 

let getemail = localStorage.getItem("email")

registerForm.addEventListener("submit", function(e) {
    e.preventDefault();
    if (getemail == email.value) {
        alert("You Have an acount!!")
        setTimeout(()=>{
            window.location = "login.html"
        },1000)
    }else{
        localStorage.setItem("userFname",userFname.value)
        localStorage.setItem("userLname",userLname.value)
        localStorage.setItem("email",email.value)
        localStorage.setItem("password",password.value)
        alert("your account created sucssefully")
        setTimeout(()=>{
            window.location = "login.html"
        },500)
        localStorage.setItem("isloggin", "true");
    } 
}
)
