// Utility Functions
function padZero(number) {
  return number < 10 ? `0${number}` : number;
}

let zIndexCounter = 1;

function makeDraggable(window) {
  window.addEventListener('mousedown', () => {
    window.style.zIndex = ++zIndexCounter;
  });

  window.addEventListener('mousedown', startDragging);
}

const windows = document.querySelectorAll('.window');
windows.forEach(window => {
  window.addEventListener('mousedown', startDragging);
});

function startDragging(e) {
  const window = e.target.closest('.window');
  const rect = window.getBoundingClientRect();
  let offsetX = e.clientX - rect.left;
  let offsetY = e.clientY - rect.top + 45;

  function dragWindow(event) {
    const newX = event.clientX - offsetX;
    const newY = event.clientY - offsetY;
    const maxWidth = window.parentNode.clientWidth - window.offsetWidth;
    const maxHeight = document.documentElement.scrollHeight - window.offsetHeight;
    const clampedX = Math.min(Math.max(newX, 0), maxWidth);
    const clampedY = Math.min(Math.max(newY, -45), (maxHeight));
    window.style.left = `${clampedX}px`;
    window.style.top = `${clampedY}px`;
  }

  function stopDragging() {
    document.removeEventListener('mousemove', dragWindow);
    document.removeEventListener('mouseup', stopDragging);
  }

  document.addEventListener('mousemove', dragWindow);
  document.addEventListener('mouseup', stopDragging);
}

// window creation
function createWindow(title, content, className, top = '100px', left = '100px') {
  const existingWindow = document.querySelector(`.${className}`);
  if (!existingWindow) {
    const window = document.createElement('div');
    window.classList.add('window', className);
    window.style.top = top;
    window.style.left = left;
    window.innerHTML = `
      <div class="window-titlebar" style="margin-left: 2px; margin-top: 28px; width: 99.8%">
        <div class="window-title" style="margin-left: 5px;">${title}</div>
        <div class="window-buttons" style="margin-right: 7px; margin-top: 3px">
          <img src="https://whale.lat/static/img/minimize.png" alt="Minimize" class="window-button" onclick="minimizeWindow(this)">
          <img src="https://whale.lat/static/svg/lyt65r.svg" alt="Close" class="window-button" onclick="closeWindow(this)">
        </div>
      </div>
      <div class="window-content" style="margin-top: 30px; border: 2px  #c8c7c7;">
        ${content}
      </div>
    `;
    document.body.appendChild(window);
    makeDraggable(window);
    addTaskbarIcon(title, `open${className.replace('-window', '')}Window`, className);
  }
}

function closeWindow(button) {
  const window = button.closest('.window');
  window.remove();
  const taskbarButtons = document.querySelectorAll('.taskbar-button');
  const windowTitle = window.querySelector('.window-title').textContent;
  taskbarButtons.forEach(taskbarButton => {
    if (taskbarButton.textContent === windowTitle) {
      taskbarButton.remove();
    }
  });
}

function minimizeWindow(button) {
  const window = button.closest('.window');
  if (window) {
    const windowRect = window.getBoundingClientRect();
    window.dataset.prevTop = windowRect.top;
    window.dataset.prevLeft = windowRect.left;
    window.style.display = 'none';
  }
}

// taskbar
let taskbarButtons = [];

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
  taskbarButtons.push(taskbarButton);
}

// window related specifics
function openTempWindow() {
  createWindow(
    'Projects',
    `
    <div class="about-content" style="display: flex; justify-content: left; align-items: flex-start; margin-top: 2px;">
      <div class="about-text" style="border: 2px inset #fff; margin-left: 2px; width: 450px; padding-right: 3px; padding-left: 3px;">
        <p>Projects!</p>
        <ul>
          <li>Percury Mercshop: <a href="https://percurymerc.shop/" target="_blank">Percury Mercshop</a></li>
        </ul>
    </div>
    `,
    'temp-window',
    '100px',
    '450px'
  );
}

function openGLXGearsWindow() {
  createWindow(
    'glxgears',
    `<img src="https://whale.lat/static/img/glxgears.gif" alt="GLXGears" draggable="false" style="max-width: 100%; height: 100%; border: 2px outset #c8c7c7;">`,
    'glxgears-window',
    '150px',
    '100px'
  );
}

function openPaperWindow() {
  createWindow(
    'paper',
    `<img src="https://whale.lat/static/img/paper.gif" alt="Paper" draggable="false" style="max-width: 100%; height: 100%; border: 2px outset #c8c7c7;">`,
    'paper-window',
    '150px',
    '100px'
  );
}

function openTuxWindow() {
  createWindow(
    'tux',
    `<img src="https://whale.lat/static/img/tux.gif" alt="Tux" draggable="false" style="max-width: 100%; height: 100%; border: 2px outset #c8c7c7;">`,
    'tux-window',
    '150px',
    '100px'
  );
}

function openCoolWindow() {
  createWindow(
    'Other',
    `
      <div class="desktop-icons">
        <div class="icon glxgears-icon" style="top: 20px; left: 20px;" onclick="openGLXGearsWindow()">
          <img src="https://whale.lat/static/img/glxgears.png" alt="GlxGears" draggable="false">
          <p>glxgears</p>
        </div>
        <div class="icon tux-icon" style="top: 20px; left: 100px;" onclick="openTuxWindow()">
          <img src="https://whale.lat/static/img/tux.png" alt="Tux" draggable="false">
          <p>tux</p>
        </div>
        <div class="icon paper-icon" style="top: 20px; left: 180px;" onclick="openPaperWindow()">
          <img src="https://whale.lat/static/img/paper.png" alt="Paper" draggable="false">
          <p>paper</p>
        </div>
      </div>
    `,
    'cool-window',
    '100px',
    '450px'
  );
}

function openAboutWindow() {
  createWindow(
    'About Me',
    `
      <div class="about-content" style="display: flex; justify-content: center; align-items: flex-start; margin-top: 4px;">
        <img src="https://whale.lat/static/img/0950ou.png" alt="About Image" draggable="false" style="max-width: 50%; height: 50%; border: 2px inset #c8c7c7;">
        <div class="about-text" style="border: 2px inset #fff;">
          <p>Hi there! I'm Lunarion. I'm a 17-year-old high-schooler who has a passion for programming. Feel free to contact me!</p>
          <button class="test-button" onclick="openContactWindow()">Contact</button>
          <button class="test-button" onclick="openProjectWindow()">Credits</button>
          <button class="test-button" onclick="openTempWindow()">Projects</button>
        </div>
      </div>
    `,
    'about-window',
    '100px',
    '100px'
  );
}

function openNotepadWindow() {
  createWindow(
    'Notepad',
    `<textarea rows="6" placeholder="Type your notes here..."></textarea>`,
    'notepad-window',
    '100px',
    '1150px'
  );
}

function openCalculatorWindow() {
  createWindow(
    'Calculator',
    `
      <input type="text" id="calcInput" readonly>
      <br>
      <button onclick="addToCalc('1')" class="calculator-button">1</button>
      <button onclick="addToCalc('2')" class="calculator-button">2</button>
      <button onclick="addToCalc('3')" class="calculator-button">3</button>
      <button onclick="addToCalc('+')" class="calculator-button">+</button>
      <br>
      <button onclick="addToCalc('4')" class="calculator-button">4</button>
      <button onclick="addToCalc('5')" class="calculator-button">5</button>
      <button onclick="addToCalc('6')" class="calculator-button">6</button>
      <button onclick="addToCalc('-')" class="calculator-button">-</button>
      <br>
      <button onclick="addToCalc('7')" class="calculator-button">7</button>
      <button onclick="addToCalc('8')" class="calculator-button">8</button>
      <button onclick="addToCalc('9')" class="calculator-button">9</button>
      <button onclick="addToCalc('*')" class="calculator-button">*</button>
      <br>
      <button onclick="addToCalc('0')" class="calculator-button">0</button>
      <button onclick="addToCalc('.')" class="calculator-button">.</button>
      <button onclick="clearCalc()" class="calculator-button">C</button>
      <button onclick="calculate()" class="calculator-button">=</button>
    `,
    'calculator-window',
    '100px',
    '800px'
  );
}

function openCalendarWindow() {
  createWindow(
    'Calendar',
    `
      <div class="calendar" style="padding: 4px;">
        <div class="calendar-day">Sun</div>
        <div class="calendar-day">Mon</div>
        <div class="calendar-day">Tue</div>
        <div class="calendar-day">Wed</div>
        <div class="calendar-day">Thu</div>
        <div class="calendar-day">Fri</div>
        <div class="calendar-day">Sat</div>
        ${Array.from({ length: 31 }, (_, i) => `<div class="calendar-day">${i + 1}</div>`).join('')}
      </div>
    `,
    'calendar-window',
    '300px',
    '800px'
  );
  updateCalendar();
}

function openContactWindow() {
  createWindow(
    'Contact',
    `
    <div class="about-content" style="display: flex; justify-content: left; align-items: flex-start; margin-top: 2px;">
      <div class="about-text" style="border: 2px inset #fff; margin-left: 2px; width: 450px; padding-right: 3px; padding-left: 3px;">
        <p>You can contact me via:</p>
        <ul>
          <li>--------yuko---------</li>
          <li>Email: <a href="mailto:yuko@slimepointe.top" target="_blank">yuko@slimepointe.top</a></li>
          <li>Discord: @yu6x</li>
          <li>Telegram: t.me/homeIandsecurity</li>
          <li>--------lunarion--------</li>
          <li>Email: <a href="mailto:lunarion31@whale.lat" target="blank">lunarion31@whale.lat</a></li>
          <li>Discord: @lunarion31</li>
          <li>Matrix: <a href="https://matrix.com/@lnarin" target="_blank">@lnarin:matrix.com</a></li>
          <li>Phone: (202)930-2508</li>
          <li>Bluesky: <a href="https://bsky.app/profile/lunarion31.bsky.social" target="_blank">Bluesky</a></li>
        </ul>
      </div>
    `,
    'contact-window',
    '100px',
    '450px'
  );
}

function openProjectWindow() {
  createWindow(
    'Credits',
    `
    <div class="about-content" style="display: flex; justify-content: center; align-items: flex-start; margin-top: 2px;">
      <div class="about-text" style="border: 2px inset #fff; margin-left: 2px; max-width: 100%; padding-right: 3px; padding-left: 3px;">
        <p>Thanks to those who helped me:</p>
        <ul>
          <li> yuko, literally made this code better. </li>
          <li> <a href="https://github.com/yu6x" target="_blank">yuko's github</a></li>
          <li> sydney, site tester. </li>
          <li> wearr, great web dev </li>
          <li> <a href="https://github.com/wearrrrr" target="_blank">wearr's github</a></li>
          <li> interpolation, made the sparkles javascript and css </li>
          <li> kxtzownsu, fix contact box and embed </li>
          <li> <a href="https://kxtz.dev" target="blank">kxtzownsu's website</a></li>
        </ul>
      </div>
    `,
    'project-window',
    '320px',
    '450px'
  );
}

function openSettingsWindow() {
  createWindow(
    'Settings',
    `
      <p>Still In Testing</p>
      <ul>
        <li> Text Info </li>
        <li> Slider one </li>
        <li> Text info </li>
        <li> Slider two </li>
        <li> Text 3 </li>
        <li> Slider 3 </li>
      </ul>
    `,
    'settings-window',
    '320px',
    '450px'
  );
}

function openChangelogWindow() {
  createWindow(
    'Changelog',
    `
    <div class="about-content" style="display: flex; justify-content: center; align-items: flex-start; margin-top: 2px;">
        <div class="about-text" style="border: 2px inset #fff; margin-left: 2px; max-width: 100%; padding-right: 3px; padding-left: 3px;">
        <p>Changelog:</p>
        <ul>
          <li>Changes this update:</li>
          <li>MASSIVE code cleanup</li>
          <li>I'm kinda tired of fixing the godforsaken drag so just deal with your window going all the way off the edge</li>
          <li>fuck that maximize button</li>
          <li>your windows now change their z position!!!!!!!!!!!!</li>
          <li>Still working on that eaglercraft thing, spritz</li> 
          <li>Past recent push: 05/25/2024 @ 3:00:24 PM Eastern Standard Time.</li>
          <li>Most recent push: 03/03/2025 @ 7:03:20 PM Eastern Standard Time
          <li>Minor patch: 09/31/2024 @ 10:34:17 PM Eastern Standard Time. </li>
        </ul>
    </div>
    `,
    'changelog-window',
    '100px',
    '100px'
  );
}

function openPeopleWindow() {
  const iconSize = 80;
  const iconsPerRow = 4;
  const padding = 18;

  const numRows = Math.ceil(peopleList.length / iconsPerRow);

  const windowWidth = iconsPerRow * iconSize + padding * 2;
  const windowHeight = numRows * iconSize + padding * 2;

  const peopleContent = `
    <div class="desktop-icons" style="display: grid; grid-template-columns: repeat(${iconsPerRow}, 1fr); gap: 10px; padding-bottom: ${padding}px;">
      ${peopleList
      .map(
        (person) => `
        <div class="icon placeholder-icon" onclick="${person.onClick}">
          <img src="${person.image}" alt="${person.name}" draggable="false" style="width: 100%; height: 100%; border: 2px inset #fff">
          <p>${person.name}</p>
        </div>
      `
      )
      .join("")}
    </div>
  `;

  createWindow(
    "People",
    peopleContent,
    "people-window",
    "100px",
    "100px",
    windowWidth,
    windowHeight
  );
}

function openScaratekWindow() {
  createWindow(
    "Scaratek",
    ` 
    <div class="about-content" style="display: flex; justify-content: center; align-items: flex-start; margin-top: 2px;">
        <img src="/static/img/scaratek.png" alt="About Image" draggable="false" style="max-width: 29%; height: 28%; border: 2px inset #c8c7c7;">
        <div class="about-text" style="border: 2px outset #fff; margin-left: 2px; max-width: 100%; padding-left: 7px;">
          <p>Wacko programmer on the Internet with a Monster addiction</p>
          <dl>
            <dt> Github: <a href="https://github.com/scaratech/" target="_blank">Github</a></dt>
            <dt>Discord: Scaratech</dt>
            <dt> Website: <a href="https://korone.cloud/" target="_blank">korone.cloud</a></dt>
          </dl>
        </div>
      </div>
      `,
    "scaratek-window",
    "100px",
    "100px"
  );
}

function openBoeingWindow() {
  createWindow(
    "Boeing747",
    ` 
    <div class="about-content" style="display: flex; justify-content: left; align-items: flex-start; margin-top: 2px;">
        <img src="/static/img/boeing.jpg" alt="About Image" draggable="false" style="max-width: 30%; height: 30%; border: 2px inset #c8c7c7;">
        <div class="about-text" style="border: 2px outset #fff; margin-left: 5px; width: 300px; height: 105px; padding: 7px;">
          <p>Skid (/s)</p>
          <dl>
            <dt>Github: <a href="https://github.com/notboeing747/" target="_blank">Github</a></dt>
            <dt>Discord: notboeing747</dt>
            <dt>Signal: @boeing.47</dt>
          </dl>
        </div>
      </div>
    `,
    "boeing-window",
    "100px",
    "100px"
  );
}

function openMaddieWindow() {
  createWindow(
    "Madjikware",
    ` 
    <div class="about-content" style="display: flex; justify-content: left; align-items: flex-start; margin-top: 2px;">
        <img src="/static/img/Maddie.jpeg" alt="About Image" draggable="false" style="max-width: 30%; height: 30%; border: 2px outset #c8c7c7;">
        <div class="about-text" style="border: 2px inset #fff; margin-left: 5px; width: 300px;">
          <p>Owner of <a href="https://stargazecollective.org/">Stargaze</a></p>
          <dl>
            <dt>Github: <a href="https://github.com/MadjikDotPng/" target="_blank">Github</a></dt>
            <dt>Discord: madjikware</dt>
            <dt>MGMT: hi@stargazecollective.org</dt>
          </dl>
        </div>
      </div>
    `,
    "maddie-window",
    "100px",
    "100px"
  );
}

function openTestWindow() {
  createWindow(
    "Test",
    ` 
    <div class="about-content" style="display: flex; justify-content: left; align-items: flex-start; margin-top: 2px;">
        <img src="/static/img/placeholder.png" alt="About Image" draggable="false" style="max-width: 30%; height: 30%; border: 2px outset #c8c7c7;">
        <div class="about-text" style="border: 2px inset #fff; margin-left: 5px; width: 300px;">
          <p>Test<a href="https://google.com/">Test</a></p>
          <dl>
          </dl>
        </div>
      </div>
    `,
    "test-window",
    "100px",
    "100px"
  );
}
// calculator
function addToCalc(value) {
  const inputField = document.getElementById('calcInput');
  inputField.value += value;
}

function clearCalc() {
  const inputField = document.getElementById('calcInput');
  inputField.value = '';
}

function calculate() {
  const inputField = document.getElementById('calcInput');
  const expression = inputField.value;
  try {
    const result = eval(expression);
    inputField.value = result;
  } catch (error) {
    inputField.value = 'Error';
  }
}

// clock
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

// calendar
function updateCalendar() {
  const currentDate = new Date();
  const currentDay = currentDate.getDate();
  const calendarDays = document.querySelector('.calendar').querySelectorAll('.calendar-day');

  calendarDays.forEach(day => {
    day.style.backgroundColor = "";
    const dayNumber = parseInt(day.textContent);
    if (dayNumber === currentDay) {
      day.style.backgroundColor = "lightblue";
    }
  });
}

// start menu
function toggleDisplayMenu() {
  const startDisplay = document.querySelector(".start-display");
  startDisplay.style.display = startDisplay.style.display === "none" ? "block" : "none";
}

document.querySelector(".start-button").addEventListener("click", toggleDisplayMenu);

// shhhhhhh
const konamiCode = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "KeyB", "KeyA"
];

let konamiCodePosition = 0;

document.addEventListener('keydown', function (event) {
  if (event.code === konamiCode[konamiCodePosition]) {
    console.log(konamiCodePosition);
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
  createWindow(
    'You found an easter egg!',
    `<img src="https://whale.lat/static/img/easteregg.gif" alt="easteregg" draggable="false" style="max-width: 100%; height: 100%; border: 2px outset #c8c7c7;">`,
    'konami-window',
    '100px',
    '100px'
  );
}
