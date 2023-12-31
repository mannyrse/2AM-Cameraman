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

// Draggable windows

function dragWindow(event, windowId) {
    var windowElement = document.getElementById(windowId);
    var posX = event.clientX, posY = event.clientY;

    document.onmousemove = function(event) {
        var dx = posX - event.clientX;
        var dy = posY - event.clientY;
        posX = event.clientX;
        posY = event.clientY;

        // Calculate new position
        var newTop = windowElement.offsetTop - dy;
        var newLeft = windowElement.offsetLeft - dx;

        // Get the window's dimensions
        var windowWidth = windowElement.offsetWidth;
        var windowHeight = windowElement.offsetHeight;

        // Get the viewport's dimensions
        var maxWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        var maxHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

        // Constrain the window within the bounds of the viewport
        if (newLeft < 0) newLeft = 0;
        if (newTop < 0) newTop = 0;
        if (newLeft + windowWidth > maxWidth) newLeft = maxWidth - windowWidth;
        if (newTop + windowHeight > maxHeight) newTop = maxHeight - windowHeight;

        // Apply the new position
        windowElement.style.top = newTop + "px";
        windowElement.style.left = newLeft + "px";
    };

    document.onmouseup = function() {
        document.onmousemove = null;
        document.onmouseup = null;
    };
}

// Resize Windows

function initResize(event, windowId) {
    event.preventDefault();
    var windowElement = document.getElementById(windowId);
    var startX = event.clientX;
    var startY = event.clientY;
    var startWidth = parseInt(document.defaultView.getComputedStyle(windowElement).width, 10);
    var startHeight = parseInt(document.defaultView.getComputedStyle(windowElement).height, 10);

    document.documentElement.addEventListener('mousemove', doDrag, false);
    document.documentElement.addEventListener('mouseup', stopDrag, false);

    function doDrag(event) {
        windowElement.style.width = (startWidth + event.clientX - startX) + "px";
        windowElement.style.height = (startHeight + event.clientY - startY) + "px";
    }

    function stopDrag(event) {
        document.documentElement.removeEventListener('mousemove', doDrag, false);
        document.documentElement.removeEventListener('mouseup', stopDrag, false);
    }
}
