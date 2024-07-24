import { Drawable } from "../utils/drawable.js";

export class Star implements Drawable {
    x: number;
    y: number;
    z: number;

    constructor(canvasWidth: number, canvasHeight: number, maxDepth: number) {
        this.x = Math.random() * canvasWidth;
        this.y = Math.random() * canvasHeight;
        this.z = Math.random();
    }

    update(canvasWidth: number, canvasHeight: number, maxDepth: number, speed: number) {
        this.z -= speed;
        if (this.z <= 0) {
            this.x = Math.random() * canvasWidth;
            this.y = Math.random() * canvasHeight;
            this.z = maxDepth;
        }
    }

    draw(ctx: CanvasRenderingContext2D, canvasWidth: number, canvasHeight: number, sizeFactor: number, color: string) {
        let x = (this.x - canvasWidth / 2) * (canvasWidth / this.z) + canvasWidth / 2;
        let y = (this.y - canvasHeight / 2) * (canvasWidth / this.z) + canvasHeight / 2;
        let size = sizeFactor * canvasWidth / this.z;
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, 2 * Math.PI);
        ctx.fill();
      }
}