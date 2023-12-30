// Background vidoes

let introVideo = document.getElementById("introVideo");
let secondVideo = document.getElementById("secondVideo");

introVideo.addEventListener("ended", () => {
    introVideo.style.display = "none";
    secondVideo.style.display = "block";
    secondVideo.play();
});

// Taskbar time

function updateTaskbarTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString();
    document.getElementById('taskbarTime').textContent = timeString;
}

setInterval(updateTaskbarTime, 1000);
updateTaskbarTime(); 

// Windows functions

var highestZIndex = 1000;

function openWindow(windowId) {
    var windowElement = document.getElementById(windowId);

    highestZIndex++;
    windowElement.style.zIndex = highestZIndex;

    windowElement.style.display = "block";
}

function closeWindow(windowId) {
    var windowElement = document.getElementById(windowId);
    windowElement.style.display = "none";
}
