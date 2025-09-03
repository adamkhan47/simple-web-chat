window.onload = function() {
    const checkbox1 = document.getElementById('autorefresh');
    const checkbox2 = document.getElementById('autosave');

    checkbox1.checked = localStorage.getItem("autoRefresh") === "true";
    checkbox2.checked = localStorage.getItem("autoSave") === "true";
};
function autoRefresh() {
    const checkbox = document.getElementById('autorefresh');
    if (checkbox.checked === false) {
        localStorage.setItem("autoRefresh", "false");
    }
    else {
        localStorage.setItem("autoRefresh", "true");
    }
}
function autoSave() {
    const checkbox = document.getElementById('autosave');
    if (checkbox.checked === false) {
        localStorage.setItem("autoSave", "false");
    }
    else {
        localStorage.setItem("autoSave", "true");
    }
}
function autoClear() {
    const checkbox = document.getElementById('autoclear');
    if (checkbox.checked === false) {
        localStorage.setItem("autoClear", "false");
    }
    else {
        localStorage.setItem("autoClear", "true");
    }
}