import { Star } from "./entities/star.js";
import { UFO } from "./entities/ufo.js";
import { BossUFO } from "./entities/bossUFO.js";
import { TextObject } from "./entities/textObject.js";
import { Drawable } from "./utils/drawable.js";
import { levels, Level } from "./utils/levels.js";

export class Starfield {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  maxDepth: number;
  stars: Drawable[] = [];
  currentLevel: number;
  ufosSpawned: number;
  shipsMissed: number;
  shipsDestroyed: number;
  crosshair: { x: number; y: number };
  keysPressed: { [key: string]: boolean } = {};
  maxShips: number;
  levelMessage: string[] = [];
  levelMessageDuration: number;
  levelMessageStartTime: number;
  showingLevelSummary: boolean;
  summaryMessages: string[];
  summaryMessageIndex: number;
  totalPoints: number;
  levelPoints: number;
  isTouchDevice: boolean;
  introComplete: boolean = false;
  bossUFO?: BossUFO;

  laserSound: HTMLAudioElement;
  explosionSound: HTMLAudioElement;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d")!;
    this.crosshair = { x: canvas.width / 2, y: canvas.height / 2 };
    this.currentLevel = 0;
    this.ufosSpawned = 0;
    this.shipsMissed = 0;
    this.shipsDestroyed = 0;
    this.maxShips = levels[this.currentLevel].maxShips;
    this.levelMessage = [`Level ${this.currentLevel + 1} Start!`];
    this.levelMessageDuration = 3000;
    this.levelMessageStartTime = Date.now();
    this.showingLevelSummary = false;
    this.summaryMessages = [];
    this.summaryMessageIndex = 0;
    this.totalPoints = 0;
    this.levelPoints = 0;

    this.laserSound = new Audio("/assets/sounds/laser.wav");
    this.explosionSound = new Audio("/assets/sounds/explosion.wav");
    this.maxDepth = Math.max(this.canvas.width, this.canvas.height) * 1.5;

    this.isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    this.resizeCanvas();
    window.addEventListener("resize", this.resizeCanvas.bind(this));
    this.initStars();
  }

  resizeCanvas() {
    const width = window.innerWidth * 0.85;
    const height = window.innerHeight * 0.85;
    this.canvas.width = width;
    this.canvas.height = height;
    this.canvas.style.position = "absolute";
    this.canvas.style.left = `${(window.innerWidth - width) / 2}px`;
    this.canvas.style.top = `${(window.innerHeight - height) / 2}px`;
    this.maxDepth = Math.max(this.canvas.width, this.canvas.height) * 1.5;
  }

  get currentLevelConfig(): Level {
    return levels[this.currentLevel];
  }

  initStars() {
    this.stars = [];
    const levelConfig = this.currentLevelConfig;
    for (let i = 0; i < levelConfig.starNum; i++) {
      this.stars.push(new Star(this.canvas.width, this.canvas.height, this.maxDepth));
    }
  }

  getTouchPos(canvas: HTMLCanvasElement, touchEvent: TouchEvent) {
    const rect = canvas.getBoundingClientRect();
    const touch = touchEvent.touches[0];
    return {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top
    };
  }

  spawnUFOs() {
    const levelConfig = this.currentLevelConfig;
    if (levelConfig.boss && !this.bossUFO) {
      this.bossUFO = new BossUFO(
        this.canvas.width,
        this.canvas.height,
        this.maxDepth,
        levelConfig.bossUfoSize || levelConfig.ufoSize,
        levelConfig.ufoColor,
        levelConfig.ufoSpeed,
        levelConfig.bossHitsToKill || 30
      );
      this.stars.push(this.bossUFO);
    } else if (!levelConfig.boss) {
      if (this.ufosSpawned < levelConfig.maxShips) {
        const ufoCount = Math.min(
          Math.floor(Math.random() * 3) + 1,
          levelConfig.maxShips - this.ufosSpawned
        );

        for (let i = 0; i < ufoCount; i++) {
          if (Math.random() < levelConfig.ufoChance) {
            this.stars.push(
              new UFO(
                this.canvas.width,
                this.canvas.height,
                this.maxDepth,
                levelConfig.ufoSize,
                levelConfig.ufoColor,
                levelConfig.ufoSpeed
              )
            );
            this.ufosSpawned += 1;
          }
        }
      }
    }
  }

  updateStars() {
    this.stars = this.stars.filter((star) => {
      if (star instanceof TextObject && star.isExpired()) {
        return false;
      }
      if (star instanceof UFO && !(star instanceof BossUFO)) {
        if (star.isExpired()) {
          this.shipsMissed += 1;
          return false;
        }
        star.update(this.canvas.width, this.canvas.height, this.maxDepth);
      } else if (star instanceof Star) {
        star.update(
          this.canvas.width,
          this.canvas.height,
          this.maxDepth,
          this.currentLevelConfig.starSpeed
        );
      } else if (star instanceof BossUFO) {
        star.update(this.canvas.width, this.canvas.height, this.maxDepth);
      }
      return true;
    });
  }

  drawStars() {
    const levelConfig = this.currentLevelConfig;
    for (let star of this.stars) {
      if (star instanceof TextObject) {
        star.draw(this.ctx);
      } else {
        star.draw(
          this.ctx,
          this.canvas.width,
          this.canvas.height,
          levelConfig.starSize,
          levelConfig.starColor
        );
      }
    }
  }

  drawCrosshair() {
    if (this.isTouchDevice) {
      return;
    }
    this.ctx.strokeStyle = "pink";
    this.ctx.lineWidth = 2;
    this.ctx.beginPath();
    this.ctx.moveTo(this.crosshair.x - 10, this.crosshair.y);
    this.ctx.lineTo(this.crosshair.x + 10, this.crosshair.y);
    this.ctx.moveTo(this.crosshair.x, this.crosshair.y - 10);
    this.ctx.lineTo(this.crosshair.x, this.crosshair.y + 10);
    this.ctx.stroke();

    const radius = 6;
    this.ctx.strokeStyle = "pink";
    this.ctx.lineWidth = 1;
    this.ctx.beginPath();
    this.ctx.arc(this.crosshair.x, this.crosshair.y, radius, 0, 2 * Math.PI);
    this.ctx.stroke();
  }

  drawLevelMessage() {
    this.ctx.fillStyle = "white";
    this.ctx.font = "15px 'Press Start 2P'";
    this.ctx.textAlign = "center";
    const lineHeight = 40;
    this.levelMessage.forEach((message, index) => {
        this.ctx.fillText(message, this.canvas.width / 2, this.canvas.height / 2 + index * lineHeight);
    });
  }

  drawScore() {
    this.ctx.fillStyle = "white";
    this.ctx.font = "20px 'Press Start 2P'";
    this.ctx.textAlign = "left";
    this.ctx.fillText(`${this.totalPoints}`, 20, 40);
  }

  moveCrosshair() {
    const cursorSpeed = this.currentLevelConfig.cursorSpeed;
    if (this.keysPressed["a"]) {
      this.crosshair.x = Math.max(0, this.crosshair.x - cursorSpeed);
    }
    if (this.keysPressed["d"]) {
      this.crosshair.x = Math.min(
        this.canvas.width,
        this.crosshair.x + cursorSpeed
      );
    }
    if (this.keysPressed["w"]) {
      this.crosshair.y = Math.max(0, this.crosshair.y - cursorSpeed);
    }
    if (this.keysPressed["s"]) {
      this.crosshair.y = Math.min(
        this.canvas.height,
        this.crosshair.y + cursorSpeed
      );
    }
  }

  shoot(x: number, y: number) {
    this.laserSound.currentTime = 0;
    this.laserSound.play();
    for (let i = 0; i < this.stars.length; i++) {
      const star = this.stars[i];
      if (star instanceof UFO) {
        const ufo = star as UFO;
        const size = (ufo.sizeFactor * this.canvas.width) / ufo.z;
        const ufoX =
          (ufo.x - this.canvas.width / 2) * (this.canvas.width / ufo.z) +
          this.canvas.width / 2;
        const ufoY =
          (ufo.y - this.canvas.height / 2) * (this.canvas.width / ufo.z) +
          this.canvas.height / 2;

        if (
          Math.abs(ufoX - x) < size / 2 &&
          Math.abs(ufoY - y) < size / 2
        ) {
          this.explosionSound.currentTime = 0;
          this.explosionSound.play();

          if (ufo instanceof BossUFO) {
            if (ufo.hit()) {
              this.stars.splice(i, 1);
              this.bossUFO = undefined;
              this.stars[i] = new TextObject(ufoX, ufoY, "😻 +1000", "white", 20, 2000);
              this.totalPoints += 1000; // Add 1000 points for defeating the boss
              this.levelPoints += 1000;
              this.shipsDestroyed += 1; // Increment ships destroyed count
              this.endLevel(); // End the level after boss is defeated
            }
          } else {
            this.stars[i] = new TextObject(ufoX, ufoY, "😻 +100", "white", 20, 2000);
            this.totalPoints += 100;
            this.levelPoints += 100;
            this.shipsDestroyed += 1;
            this.checkLevelCompletion(); // Check level completion after destroying a ship
          }
        }
      }
    }
  }

  endLevel() {
    this.showingLevelSummary = true;
    this.summaryMessages = [
      `Level ${this.currentLevel + 1} Complete!`,
      `${this.shipsMissed} ships missed!`,
      `${this.shipsDestroyed} ships destroyed`,
      `${this.levelPoints} points!`,
    ];

    if (this.shipsMissed === 0) {
      this.summaryMessages.push("Perfect Score!");
      this.summaryMessages.push("Bonus 1000 Points!");
      this.totalPoints += 1000;
    }

    if (this.currentLevel + 1 < levels.length) {
      this.summaryMessages.push(`Next Level: ${this.currentLevel + 2}`);
    } else {
      this.summaryMessages.push("Game Over!");
    }

    this.summaryMessageIndex = 0;
    this.showNextLevelSummary();
  }

  showNextLevelSummary() {
    if (this.summaryMessageIndex < this.summaryMessages.length) {
      this.levelMessage = [this.summaryMessages[this.summaryMessageIndex]];
      this.levelMessageStartTime = Date.now();
      this.summaryMessageIndex += 1;

      setTimeout(() => this.showNextLevelSummary(), 3000);
    } else {
      this.showingLevelSummary = false;
      if (this.currentLevel + 1 < levels.length) {
        this.currentLevel += 1;
        this.levelMessage = [`Level ${this.currentLevel + 1} Start!`];
        this.levelMessageStartTime = Date.now();
        this.levelMessageDuration = 3000;
        this.ufosSpawned = 0;
        this.shipsDestroyed = 0;
        this.shipsMissed = 0;
        this.levelPoints = 0;
        this.bossUFO = undefined; // Reset boss UFO for the new level
        this.maxShips = levels[this.currentLevel].maxShips;
        this.initStars();
      } else {
        this.levelMessage = ["Game Over!"];
        this.levelMessageStartTime = Date.now();
        this.levelMessageDuration = 3000;

        setTimeout(() => {
          this.levelMessage = [`New High Score:`, `${this.totalPoints}`];
          this.levelMessageStartTime = Date.now();

          setTimeout(() => {
            this.levelMessage = ["Press Enter or Tap", "To Play Again!"];
            this.levelMessageStartTime = Date.now();
            this.levelMessageDuration = Infinity;

            const restartGame = (event: KeyboardEvent) => {
              window.removeEventListener("keydown", restartGame);
              this.resetGame();
            };

            const restartGameTouch = (event: TouchEvent) => {
              window.removeEventListener("touchstart", restartGameTouch);
              this.resetGame();
            };

            window.addEventListener("keydown", restartGame);
            window.addEventListener("touchstart", restartGameTouch);
          }, 3000);
        }, 3000);
      }
    }
  }

  resetGame() {
    this.currentLevel = 0;
    this.shipsMissed = 0;
    this.shipsDestroyed = 0;
    this.totalPoints = 0;
    this.levelPoints = 0;
    this.ufosSpawned = 0;
    this.bossUFO = undefined; // Reset boss UFO for the new game
    this.maxShips = levels[this.currentLevel].maxShips;
    this.levelMessage = [`Level ${this.currentLevel + 1} Start!`];
    this.levelMessageStartTime = Date.now();
    this.levelMessageDuration = 3000;
    this.showingLevelSummary = false;
    this.summaryMessages = [];
    this.summaryMessageIndex = 0;
    this.initStars();
    this.start();
  }

  checkLevelCompletion() {
    const levelConfig = this.currentLevelConfig;
    const totalShipsProcessed = this.shipsDestroyed + this.shipsMissed;

    if (
      (!levelConfig.boss && this.ufosSpawned >= levelConfig.maxShips && totalShipsProcessed >= levelConfig.maxShips)
    ) {
      this.endLevel();
    }
  }

  loop(timeNow: number) {
    if (!this.introComplete) return;

    const levelConfig = this.currentLevelConfig;
    this.ctx.fillStyle = levelConfig.spaceColor;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.updateStars();
    this.drawStars();
    this.drawCrosshair();
    this.drawScore();
    if (!this.isTouchDevice) {
      this.moveCrosshair();
    }

    if (!levelConfig.boss && this.ufosSpawned < this.maxShips && Date.now() - this.levelMessageStartTime > this.levelMessageDuration) {
      this.spawnUFOs();
    } else if (levelConfig.boss && !this.bossUFO && Date.now() - this.levelMessageStartTime > this.levelMessageDuration && !this.showingLevelSummary) {
      this.spawnUFOs();
    }

    if (Date.now() - this.levelMessageStartTime < this.levelMessageDuration || this.showingLevelSummary) {
      this.drawLevelMessage();
    } else {
      this.checkLevelCompletion();
    }

    requestAnimationFrame(this.loop.bind(this));
  }

  start() {
    this.levelMessageStartTime = Date.now();
    requestAnimationFrame(this.loop.bind(this));
  }
}
