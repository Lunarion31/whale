 const canvas = document.getElementById("sparkleCanvas");
      const ctx = canvas.getContext("2d");
      let sparkles = [];

      
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      // sparkle class
      class Sparkle {
        constructor(x, y) {
          this.x = x;
          this.y = y;
          this.size = Math.random() * 5 + 6;
        }

        draw() {
          if (this.size > 8) {
            ctx.font = `${this.size + 13}px monospace`;
            ctx.fillStyle = "#ADD8E6";
            ctx.fillText("°", this.x, this.y);
            return;
          }
          ctx.beginPath();
          ctx.rect(this.x, this.y, this.size / 4, this.size / 4);
          ctx.fill();
        }

        update() {
          this.y = this.y + this.size / 9;

          if (this.y >= canvas.height) {
            this.y = 0;
            this.x = Math.random() * canvas.width;
          }
        }
      }

      function createSparkle() {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        return new Sparkle(x, y, 0, 0.8);
      }

      function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Update and draw sparkles
        sparkles.forEach((sparkle) => {
          sparkle.update();
          sparkle.draw();
        });

        requestAnimationFrame(animate);
      }

      sparkles = Array.from({
        length: 150
      }, () => createSparkle());
      animate();
