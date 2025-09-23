let user = "";
let autorefresh; let autosave; let autoclear;
const socket = new WebSocket("ws://" + location.hostname);
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
    autorefresh = localStorage.getItem("autoRefresh") === "true";
    autosave = localStorage.getItem("autoSave") === "true";
    autoclear = localStorage.getItem("autoClear") === "true";
    if (localStorage.getItem("saveInStorage") === "true") {
        document.getElementById("messages").innerHTML = localStorage.getItem("save");
    }
    localStorage.setItem("saveInStorage","false");
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
    if (autoclear) {
        document.getElementById("inputText").value = "";
    }
}
function sendImage() {
    let contents = document.getElementById("inputText").value;
    let image = prompt("Enter link for image");
    if (image === null) {return;}
    contents = contents + '<img src="' + image + '" alt="image">';
    let array = JSON.stringify([user,contents]);
    socket.send(array);
    if (autoclear) {
       document.getElementById("inputText").value = "";
    }
}
socket.onmessage = function(event) {
    document.getElementById("messages").innerHTML = event.data + '<br>' + document.getElementById("messages").innerHTML;
}
socket.onclose = function(event) {
    document.getElementById("status").innerHTML = "🔴";
    if (autorefresh) {
        saveFunc();
        window.location.reload();
    }
}
socket.onopen = function(event) {
    document.getElementById("status").innerHTML = "🟢";
}
function settings() {
    window.open("/settings", "_blank");
}
function clearMessages() {
    let result = confirm("Are you sure you want to clear previous messages?");
    if (result) {document.getElementById("messages").innerHTML = "";}
}

const statusText = document.getElementById('status');
const hoverImage = document.querySelector('.hover-image');
hoverImage.style.display = 'none';
statusText.addEventListener('mouseenter', () => {
    hoverImage.style.display = 'block';
});
statusText.addEventListener('mouseleave', () => {
    hoverImage.style.display = 'none';
});
function saveFunc() {
    localStorage.setItem("save",document.getElementById("messages").innerHTML);
    localStorage.setItem("saveInStorage","true");
}
window.addEventListener('beforeunload', function (e) {
    if (autosave) {
        saveFunc();
    }
});