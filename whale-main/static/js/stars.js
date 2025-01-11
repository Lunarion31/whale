      const container = document.getElementById('stars-container');
      const numStars = 150;

      function createStar() {
        const star = document.createElement('div');
        star.classList.add('star');

        // Randomly assign color
        const randomColor = Math.random();
        if (randomColor < 0.3) {
          star.classList.add('white');
        } else if (randomColor < 0.6) {
          star.classList.add('blue');
        } else {
          // other color shit
          // star.classList.add('otherColor');
        }

        star.classList.add('cross');
        star.style.left = `${Math.random() * 100}vw`;
        star.style.top = `${Math.random() * 100}vh`;
        container.appendChild(star);
      }

// meow :33333
      for (let i = 0; i < numStars; i++) {
        createStar();
      }
