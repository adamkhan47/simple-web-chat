let user = "";
const socket = new WebSocket("wss://" + location.hostname);
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
    let contents = document.getElementById("inputText").value;
    let array = JSON.stringify([user,contents]);
    socket.send(array);
}
socket.onmessage = function(event) {
    document.getElementById("messages").innerHTML = event.data + '<br>' + document.getElementById("messages").innerHTML;
}
socket.onclose = function(event) {
    document.getElementById("status").innerHTML = "🔴";
}
socket.onopen = function(event) {
    document.getElementById("status").innerHTML = "🟢";
}
function settings() {
    window.open("/settings", "_blank");
}