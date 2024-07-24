import { Star } from "./entities/star.js";
import { UFO } from "./entities/ufo.js";
import { Drawable } from "./utils/drawable.js";
import {levels, Level} from "./utils/levels.js";

export class Starfield {
  canvas: HTMLCanvasElement;
  maxDepth: number;
  ctx: CanvasRenderingContext2D;
  stars: Star[] = [];
  currentLevel: number;
  ufosSpawned: number = 0;

  

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d")!;
    this.currentLevel = 0;
    this.ufosSpawned = 0;

    this.maxDepth = Math.max(this.canvas.width, this.canvas.height) * 1.5;

    this.resizeCanvas();
    window.addEventListener("resize", this.resizeCanvas.bind(this));
    this.intitStars();
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
    console.log(this.maxDepth, "hello");
  }

  get currentLevelConfig(): Level {
    return levels[this.currentLevel];
  }


  intitStars() {
    this.stars = [];
    const levelConfig = this.currentLevelConfig;
    for (let i = 0; i < levelConfig.starNum; i++) {
      this.stars.push(new Star(this.canvas.width, this.canvas.height, this.maxDepth));
    }
  }

  spawnUFOs() {
    const levelConfig = this.currentLevelConfig;
    if (this.ufosSpawned < levelConfig.maxShips) {
      const ufoCount = Math.min(Math.floor(Math.random() * 3) + 1, levelConfig.maxShips - this.ufosSpawned);

      for (let i = 0; i < ufoCount; i++) {
        if (Math.random() < levelConfig.ufoChance) {
          this.stars.push(new UFO(this.canvas.width, this.canvas.height, this.maxDepth, levelConfig.ufoSize, levelConfig.ufoColor, levelConfig.ufoSpeed));
          this.ufosSpawned += 1;
          console.log(`UFO spawned! ${this.ufosSpawned}`);
        }
      }
    }
  }

  updateStars() {
    this.stars = this.stars.filter(star => {
      if(star instanceof UFO) {
        if (star.isExpired()) {
          this.ufosSpawned -= 1;
          console.log(`UFO missed! ${this.ufosSpawned}`);
          return false;
        }
        star.update(this.canvas.width, this.canvas.height, this.maxDepth);
      }
       if (star instanceof Star) {
        star.update(this.canvas.width, this.canvas.height, this.maxDepth, this.currentLevelConfig.starSpeed);
      }
      return true;
    });
  }

  drawStars() {
    const levelConfig = this.currentLevelConfig;
    for (let star of this.stars) {
        star.draw(this.ctx, this.canvas.width, this.canvas.height, levelConfig.starSize, levelConfig.starColor);
    }
  }
  
  loop(timeNow: number) {
    const levelConfig = this.currentLevelConfig;
    this.ctx.fillStyle = levelConfig.spaceColor;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.updateStars();
    this.drawStars();
    this.spawnUFOs();

    requestAnimationFrame(this.loop.bind(this));
  }

  start() {
    requestAnimationFrame(this.loop.bind(this));
  }
}
