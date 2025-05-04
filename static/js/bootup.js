function showBootUpSequence() {
  const bootUpText = [
    "(autoplay may be required for sound)",
    "Award Modular BIOS 4.50G, An Energy Star Ally",
    "Copyright (C) 1984-95, Award Software Inc.",
    "\u00A0",
    "9/7/95",
    "\u00A0",
    "Pentium 4 CPU at 300Mhz",
    "Memory Test : 128000K OK",
    "\u00A0",
    "\u00A0",
    "Starting Windows 95...",
  ];

  const bootUpDelay = Math.trunc(1 * 550);
  const finalDelay = 500; // delay
  let currentIndex = 0;

  const audio = document.getElementById('myAudio');
  const loadingTextContainer = document.querySelector('.loading-text');
  const loadingScreen = document.querySelector('.loading-screen');
  const audio_bios = document.getElementById('bios_audio');

  audio_bios.play();

  // styles
  const textStyles = {
    color: '#a9a9a9',
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
      audio.play();

      loadingScreen.style.display = 'none';
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