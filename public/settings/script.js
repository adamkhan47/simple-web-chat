
async function notifications() {
    const checkbox = document.getElementById('notifications');
    if (checkbox.checked === false) {localStorage.setItem("notifications", false); return;}
    if (localStorage.getItem("notifications") === null || localStorage.getItem("notifications") === "false") {
        Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
            console.log("Notification permission granted.");
            localStorage.setItem("notifications", true);
        }
        else if (permission === "denied") {
            checkbox.checked = false;
            alert("Notification access denied");
        } 
    });

    }
}
function autoRefresh() {
    const checkbox = document.getElementById('autorefresh');
    if (checkbox.checked === false) {
        localStorage.setItem("autoRefresh", false);
    }
    else {
        localStorage.setItem("autoRefresh", true);
    }
}
function autoSave() {
    const checkbox = document.getElementById('autorefreshautosave');
    if (checkbox.checked === false) {
        localStorage.setItem("autoRefresh", false);
    }
    else {
        localStorage.setItem("autoRefresh", true);
    }
}