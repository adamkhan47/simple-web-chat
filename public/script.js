let user = "";
window.onload = function() {
    try {
        user = localStorage.getItem("username");
        document.getElementById("user").innerHTML = user;
    }
    catch(error) {
       setUser(); 
       console.log(error);
    }
};
function setUser() {
    let userr = prompt("Enter your username");
    if (userr === null) {return;}
    user = userr;
    localStorage.setItem("username", user);
    document.getElementById("user").innerHTML = user;
}