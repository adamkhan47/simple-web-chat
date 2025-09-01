let user = "";
window.onload = function() {
    try {
        user = localStorage.getItem("username");
        if (user === null || user === undefined) {throw new Error("ok")};
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
function send() {
    let contents = document.getElementById("inputText").innerHTML;
    fetch('/send?username='+username+'&messageContents='+contents);
}