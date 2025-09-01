async function notifications() {
    const checkbox = document.getElementById('notifications');
    if (checkbox.checked === false) {return;}
    if (localStorage.getItem("notifications") === null || localStorage.getItem("notifications") === "false") {
        Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
            console.log("Notification permission granted.");
        }
        else if (permission === "denied") {
            checkbox.checked = false;
        } 
    });

    }
}