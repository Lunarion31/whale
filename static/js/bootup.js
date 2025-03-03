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

  const bootUpDelay = Math.trunc(Math.random() * 80) + 10; // Random delay between 10ms and 90ms
  const finalDelay = 500; // Delay before showing the "Start" button
  let currentIndex = 0;

  const audio = document.getElementById('myAudio');
  const loadingTextContainer = document.querySelector('.loading-text');
  const loadingScreen = document.querySelector('.loading-screen');

  // Styles for boot-up text
  const textStyles = {
    color: '#fff',
    fontSize: '10px',
    fontFamily: 'Lucida Console, monospace, sans-serif',
  };

  // Function to display boot-up text
  const displayText = () => {
    if (currentIndex < bootUpText.length) {
      const loadingText = document.createElement('p');
      loadingText.textContent = bootUpText[currentIndex];
      Object.assign(loadingText.style, textStyles);
      loadingTextContainer.appendChild(loadingText);
      currentIndex++;
    } else {
      clearInterval(bootUpInterval);

      // Add "Start" button
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

  // Start the boot-up sequence
  const bootUpInterval = setInterval(displayText, bootUpDelay);
}

// Trigger boot-up sequence when the page loads
window.addEventListener('load', showBootUpSequence);