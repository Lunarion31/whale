// Helper functions
function padZero(number) {
  return number < 10 ? '0' + number : number;
}

function createWindow(title, content, className, top, left) {
  const existingWindow = document.querySelector(`.${className}`);
  if (!existingWindow) {
    const window = document.createElement('div');
    window.classList.add('window', className);
    window.style.top = `${top}px`;
    window.style.left = `${left}px`;
    window.innerHTML = `
      <div class="window-titlebar">
        <div class="window-title">${title}</div>
        <div class="window-buttons">
          <img src="static/img/minimize.png" alt="Minimize" class="window-button" onclick="minimizeWindow(this)">
          <img src="static/svg/lyt65r.svg" alt="Close" class="window-button" onclick="closeWindow(this)">
        </div>
      </div>
      <div class="window-content">${content}</div>
    `;
    document.body.appendChild(window);
    makeDraggable(window);
    addTaskbarIcon(title, `open${className.replace('-window', '')}Window`, className);
  }
}

function makeDraggable(window) {
  window.addEventListener('mousedown', startDragging);
}

function startDragging(e) {
  const window = e.target.closest('.window');
  const rect = window.getBoundingClientRect();
  const offsetX = e.clientX - rect.left;
  const offsetY = e.clientY - rect.top + 45;

  function dragWindow(event) {
    const newX = event.clientX - offsetX;
    const newY = event.clientY - offsetY;
    const maxWidth = window.parentNode.clientWidth - window.offsetWidth;
    const maxHeight = window.parentNode.clientHeight - window.offsetHeight;
    const clampedX = Math.min(Math.max(newX, 0), maxWidth);
    const clampedY = Math.min(Math.max(newY, -45), (maxHeight + 350));
    window.style.left = clampedX + "px";
    window.style.top = clampedY + "px";
  }

  function stopDragging() {
    document.removeEventListener('mousemove', dragWindow);
    document.removeEventListener('mouseup', stopDragging);
    window.style.zIndex = "";
  }

  document.addEventListener('mousemove', dragWindow);
  document.addEventListener('mouseup', stopDragging);
}

function addTaskbarIcon(label, onClickFunction, className) {
  const taskbar = document.querySelector('.taskbar');
  const taskbarButton = document.createElement('div');
  taskbarButton.classList.add('taskbar-button');
  taskbarButton.textContent = label;
  taskbarButton.onclick = () => {
    const window = document.querySelector(`.${className}`);
    if (window) {
      if (window.style.display === 'none') {
        window.style.display = '';
      }
    }
  };
  taskbar.appendChild(taskbarButton);
}

// Window-specific functions
function openTempWindow() {
  createWindow('Projects', `
    <p>Projects!</p>
    <ul>
      <li>Nothing here yet, check back later!</li>
    </ul>
  `, 'temp-window', 100, 450);
}

function openGLXGearsWindow() {
  createWindow('glxgears', `
    <img src="static/img/glxgears.gif" alt="GLXGears" draggable="false">
  `, 'glxgears-window', 150, 100);
}

// Add more window functions as needed...

// Clock and Calendar
function updateClock() {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  const meridiem = hours >= 12 ? ' PM' : ' AM';
  const formattedHours = hours % 12 || 12;
  const timeString = `${formattedHours}:${padZero(minutes)}:${padZero(seconds)}${meridiem}`;
  document.querySelector('.clock').textContent = timeString;
}

setInterval(updateClock, 1000);
updateClock();

function updateCalendar() {
  const currentDate = new Date();
  const currentDay = currentDate.getDate();
  const calendarDays = document.querySelectorAll('.calendar-day');

  calendarDays.forEach(day => {
    day.style.backgroundColor = "";
    const dayNumber = parseInt(day.textContent);
    if (dayNumber === currentDay) {
      day.style.backgroundColor = "lightblue";
    }
  });
}

// Event listeners
document.querySelector(".start-button").addEventListener("click", toggleDisplayMenu);

function toggleDisplayMenu() {
  const startDisplay = document.querySelector(".start-display");
  startDisplay.style.display = startDisplay.style.display === "none" ? "block" : "none";
}

// Konami Code
const konamiCode = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "KeyB", "KeyA"];
let konamiCodePosition = 0;

document.addEventListener('keydown', function (event) {
  if (event.code === konamiCode[konamiCodePosition]) {
    konamiCodePosition++;
    if (konamiCodePosition === konamiCode.length) {
      openKonamiWindow();
      window.open("https://www.youtube.com/watch?v=uR4g9ybkT38", "_blank");
      konamiCodePosition = 0;
    }
  } else {
    konamiCodePosition = 0;
  }
});

function openKonamiWindow() {
  createWindow('Easter Egg', `
    <img src="static/img/easteregg.gif" alt="easteregg" draggable="false">
  `, 'konami-window', 100, 100);
}