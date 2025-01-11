// Function to show boot-up sequence text
function showBootUpSequence() {
  const bootUpText = [
    "Initializing system...",
    "System Information:",
    "Microsoft Windows 95",
    "4.00.950 b",
    "IE 4.0 4.72.31.10.8",
    "Pentium II(r)",
    "Loading drivers...",
    "Establishing network connection...",
    "Performing memory check...",
    "192.0MB RAM",
    "Booting operating system...",
    "Loading user interface...",
    "Manufactured and supported by:",
    "Micron Electronics, Inc.",
    "Micron Computer Systems",
  ];
  
  
  const bootUpDelay = Math.trunc(Math.random(10, 20) * 80);
  const finalDelay = 500; 
  let currentIndex = 0;

  const audio = document.getElementById('myAudio');

  const loadingTextContainer = document.querySelector('.loading-text');

  const textStyles = {
    color: '#fff',
    fontSize: '10px',
    fontFamily: 'Lucida Console, monospace, sans-serif'
  };
  
  const loadingScreen = document.querySelector('.loading-screen');
  
  // Loading screen delay
  const bootUpInterval = setInterval(() => {
    if (currentIndex < bootUpText.length) {
      const loadingText = document.createElement('p');
      loadingText.textContent = bootUpText[currentIndex];
      Object.assign(loadingText.style, textStyles);
      loadingTextContainer.appendChild(loadingText);
      currentIndex++;
    } else {
      clearInterval(bootUpInterval);
      
      // Create and append button
      const buttonText = "Start";
      const button = document.createElement('button');
      button.textContent = buttonText;
      button.classList.add('button-styles');
      button.onclick = function () {
        alert("Load time: " + bootUpDelay + " ms" + "\nThis tab plays audio on startup");
        loadingScreen.style.display = 'none';
        audio.play();
      };
      loadingTextContainer.appendChild(button);
    }
  }, bootUpDelay);
}
      
// Call the function to start the boot-up sequence when the window loads
window.addEventListener('load', showBootUpSequence);
