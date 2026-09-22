let email = document.getElementById("email")
let password = document.getElementById("password")
let sing_in = document.getElementById("sing_in")
let loginForm = document.getElementById("loginForm")
let isloggin = localStorage.getItem("isloggin")
let getemail = localStorage.getItem("email")
let getpassword = localStorage.getItem("password")

loginForm.addEventListener("submit", function(e){
    e.preventDefault();
    if (isloggin == "false") {
        if (getemail === email.value && getemail.trim() === email.value.trim() && getpassword === password.value && getpassword.trim() === password.value.trim()) {
            setTimeout(() => {
                window.location = "index.html"
            }, 500);
            localStorage.setItem("isloggin", "true")
        }else{
            alert("the password or email dosn't match")
        }
    }else{
        alert("You don't have account")
        setTimeout(() => {
                window.location = "register.html"
            }, 500);
    }
})