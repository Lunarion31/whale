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

  const bootUpDelay = Math.trunc(Math.random() * 80) + 10; // generates a random delay
  const finalDelay = 500; // delay
  let currentIndex = 0;

  const audio = document.getElementById('myAudio');
  const loadingTextContainer = document.querySelector('.loading-text');
  const loadingScreen = document.querySelector('.loading-screen');

  // styles
  const textStyles = {
    color: 'whitesmoke',
    fontSize: '16px',
    fontFamily: 'IBM VGA 8x16',
  };

  // display boot text
  const displayText = () => {
    if (currentIndex < bootUpText.length) {
      const loadingText = document.createElement('p');
      loadingText.textContent = bootUpText[currentIndex];
      Object.assign(loadingText.style, textStyles);
      loadingTextContainer.appendChild(loadingText);
      currentIndex++;
    } else {
      clearInterval(bootUpInterval);

      const button = document.createElement('button');
      button.textContent = "Start";
      button.classList.add('button-styles');
      button.onclick = () => {
        alert(`Load time: ${bootUpDelay} ms\nThis tab plays audio on startup`);
        loadingScreen.style.display = 'none';
        audio.play();
      };
      loadingTextContainer.appendChild(button);
    }
  };

  const bootUpInterval = setInterval(displayText, bootUpDelay);
}

window.addEventListener('load', showBootUpSequence);