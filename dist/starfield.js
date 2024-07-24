import { Star } from "./entities/star.js";
import { UFO } from "./entities/ufo.js";
import { TextObject } from "./entities/textObject.js";
import { levels } from "./utils/levels.js";
export class Starfield {
    constructor(canvas) {
        this.stars = [];
        this.ufosSpawned = 0;
        this.keysPressed = {};
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.currentLevel = 0;
        this.ufosSpawned = 0;
        this.shipsMissed = 0;
        this.crosshair = { x: canvas.width / 2, y: canvas.height / 2 };
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
    get currentLevelConfig() {
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
        this.stars = this.stars.filter((star) => {
            if (star instanceof TextObject && star.isExpired()) {
                return false;
            }
            if (star instanceof UFO) {
                if (star.isExpired()) {
                    this.shipsMissed += 1;
                    console.log(`UFO missed. Total missed: ${this.shipsMissed}`);
                    return false;
                }
                star.update(this.canvas.width, this.canvas.height, this.maxDepth);
            }
            else if (star instanceof Star) {
                star.update(this.canvas.width, this.canvas.height, this.maxDepth, this.currentLevelConfig.starSpeed);
            }
            return true;
        });
    }
    drawStars() {
        const levelConfig = this.currentLevelConfig;
        for (let star of this.stars) {
            if (star instanceof TextObject) {
                star.draw(this.ctx);
            }
            else {
                star.draw(this.ctx, this.canvas.width, this.canvas.height, levelConfig.starSize, levelConfig.starColor);
            }
        }
    }
    drawCrosshair() {
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
    moveCrosshair() {
        const cursorSpeed = this.currentLevelConfig.cursorSpeed;
        if (this.keysPressed["a"]) {
            console.log("key pressed");
            this.crosshair.x = Math.max(0, this.crosshair.x - cursorSpeed);
        }
        if (this.keysPressed["d"]) {
            this.crosshair.x = Math.min(this.canvas.width, this.crosshair.x + cursorSpeed);
        }
        if (this.keysPressed["w"]) {
            this.crosshair.y = Math.max(0, this.crosshair.y - cursorSpeed);
        }
        if (this.keysPressed["s"]) {
            this.crosshair.y = Math.min(this.canvas.height, this.crosshair.y + cursorSpeed);
        }
    }
    loop(timeNow) {
        const levelConfig = this.currentLevelConfig;
        this.ctx.fillStyle = levelConfig.spaceColor;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.updateStars();
        this.drawStars();
        this.drawCrosshair();
        this.moveCrosshair();
        requestAnimationFrame(this.loop.bind(this));
    }
    start() {
        requestAnimationFrame(this.loop.bind(this));
    }
}
