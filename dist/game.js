import { Starfield } from "./starfield.js";
import { InputHandler } from "./inputHandler.js";
export class Game {
    constructor(canvas) {
        this.introComplete = false;
        this.canvas = canvas;
        this.starfield = new Starfield(canvas);
        this.inputHandler = new InputHandler(this.starfield);
        this.logoImage = new Image();
        this.logoImage.src = "/assets/images/logo.PNG";
        this.introStartTime = Date.now();
        requestAnimationFrame(this.introLoop.bind(this));
    }
    introLoop() {
        const timeNow = Date.now();
        const elapsedTime = timeNow - this.introStartTime;
        this.starfield.ctx.fillStyle = "black";
        this.starfield.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.starfield.updateStars();
        this.starfield.drawStars();
        let logoScale = 0.75;
        if (this.canvas.width <= 500) {
            logoScale = 0.4;
        }
        const logoWidth = this.logoImage.width * logoScale;
        const logoHeight = this.logoImage.height * logoScale;
        if (elapsedTime <= 2000) {
            if (this.logoImage.complete) {
                this.starfield.ctx.drawImage(this.logoImage, this.canvas.width / 2 - logoWidth / 2, this.canvas.height / 2 - logoHeight / 2, logoWidth, logoHeight);
            }
        }
        else if (elapsedTime <= 7000) {
            this.starfield.ctx.fillStyle = "white";
            this.starfield.ctx.font = "15px 'Press Start 2P'";
            this.starfield.ctx.textAlign = "center";
            this.starfield.ctx.fillText("presents ...", this.canvas.width / 2, this.canvas.height / 2 - 40);
            this.starfield.ctx.fillStyle = "purple";
            this.starfield.ctx.font = "bold 40px 'orbitron'";
            this.starfield.ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
            this.starfield.ctx.shadowOffsetX = 3;
            this.starfield.ctx.shadowOffsetY = 3;
            this.starfield.ctx.shadowBlur = 5;
            this.starfield.ctx.fillText("SPACEFLEET", this.canvas.width / 2, this.canvas.height / 2 + 40);
            this.starfield.ctx.shadowColor = "transparent";
            this.starfield.ctx.fillStyle = "white";
            this.starfield.ctx.font = "10px 'Press Start 2P'";
            this.starfield.ctx.fillText("© distort-apps", this.canvas.width / 2, this.canvas.height / 2 + 200);
        }
        if (elapsedTime > 7000) {
            this.introComplete = true;
            this.starfield.introComplete = true;
            this.starfield.start();
        }
        else {
            requestAnimationFrame(this.introLoop.bind(this));
        }
    }
    start() {
        this.starfield.start();
    }
}
