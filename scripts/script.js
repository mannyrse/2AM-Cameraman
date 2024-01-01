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

    windowElement.classList.add('opening'); // Add the opening class to start the animation
    windowElement.style.display = "block";

    windowElement.addEventListener('animationend', () => {
        windowElement.classList.remove('opening'); // Remove the class after the animation
    });
}


function closeWindow(windowId) {
    var windowElement = document.getElementById(windowId);
    windowElement.classList.add('closing'); // Trigger the closing animation

    setTimeout(function() {
        windowElement.style.display = 'none'; 
        windowElement.classList.remove('closing'); 
    }, 500); // Match this duration with your CSS animation duration
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
    var startWidth = windowElement.clientWidth;
    var startHeight = windowElement.clientHeight;

    document.documentElement.addEventListener('mousemove', doDrag, false);
    document.documentElement.addEventListener('mouseup', stopDrag, false);

    var minWidth = 300;
    var minHeight = 300;

    function doDrag(event) {
        var newWidth = startWidth + event.clientX - startX;
        var newHeight = startHeight + event.clientY - startY;

        // Adjusting the new dimensions to account for scrollable content
        newWidth = Math.max(newWidth, minWidth);
        newHeight = Math.max(newHeight, minHeight);

        windowElement.style.width = newWidth + "px";
        windowElement.style.height = newHeight + "px";
    }

    function stopDrag(event) {
        document.documentElement.removeEventListener('mousemove', doDrag, false);
        document.documentElement.removeEventListener('mouseup', stopDrag, false);
    }
}

// Call this function whenever the window content is scrolled
function onWindowScroll(windowId) {
    var windowElement = document.getElementById(windowId);
    var resizeHandle = windowElement.querySelector('.resize-handle');

    // Adjust the handle position based on the scroll
    var scrollBottom = windowElement.scrollTop + windowElement.clientHeight;
    var scrollRight = windowElement.scrollLeft + windowElement.clientWidth;

    resizeHandle.style.top = (scrollBottom - resizeHandle.offsetHeight) + 'px';
    resizeHandle.style.left = (scrollRight - resizeHandle.offsetWidth) + 'px';
}

// Add scroll event listener to the window
function addScrollListener(windowId) {
    var windowElement = document.getElementById(windowId);
    windowElement.addEventListener('scroll', function() {
        onWindowScroll(windowId);
    });
}

// Initialize this for each window
addScrollListener('window1');
addScrollListener('window2');
addScrollListener('window3');
// Repeat for other windows as needed
