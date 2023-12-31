// Background vidoes

let introVideo = document.getElementById("introVideo");
let secondVideo = document.getElementById("secondVideo");

introVideo.playbackRate = 1.5;

introVideo.addEventListener("ended", () => {
    introVideo.style.display = "none";
    secondVideo.style.display = "block";
    secondVideo.play();

    // Add the 'hidden-slide' class to each navigation item to start the animation
    let navItems = document.querySelectorAll('.navigation-item');
    navItems.forEach(item => {
        item.classList.add('hidden-slide');
        makeClickableAfterAnimation(item); // Make the item clickable after the animation
    });
});

// Function to add 'active' class after animation ends
function makeClickableAfterAnimation(item) {
    item.addEventListener('animationend', () => {
        item.classList.add('active');
    });
}

// Taskbar time

function updateTaskbarTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString();
    document.getElementById('taskbarTime').textContent = timeString;
}

setInterval(updateTaskbarTime, 1000);
updateTaskbarTime(); 

// Windows functionality

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

    // Define minimum dimensions for the window
    var minWidth = 300; // Minimum width in pixels
    var minHeight = 300; // Minimum height in pixels

    function doDrag(event) {
        // Calculate new dimensions
        var newWidth = startWidth + event.clientX - startX;
        var newHeight = startHeight + event.clientY - startY;

        // Apply the new dimensions if they are above the minimum size
        windowElement.style.width = newWidth > minWidth ? newWidth + "px" : minWidth + "px";
        windowElement.style.height = newHeight > minHeight ? newHeight + "px" : minHeight + "px";
    }

    function stopDrag(event) {
        document.documentElement.removeEventListener('mousemove', doDrag, false);
        document.documentElement.removeEventListener('mouseup', stopDrag, false);
    }
}

