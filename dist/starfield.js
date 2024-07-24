import { Star } from "./entities/star.js";
import { levels } from "./utils/levels.js";
export class Starfield {
    constructor(canvas) {
        this.stars = [];
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.currentLevel = 0;
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
    updateStars() {
        this.stars = this.stars.filter(star => {
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
    loop(timeNow) {
        const levelConfig = this.currentLevelConfig;
        this.ctx.fillStyle = levelConfig.spaceColor;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.updateStars();
        this.drawStars();
        requestAnimationFrame(this.loop.bind(this));
    }
    start() {
        requestAnimationFrame(this.loop.bind(this));
    }
}
