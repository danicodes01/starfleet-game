import { UFO } from "./ufo.js";
export class SpecialUFO extends UFO {
    constructor(canvasWidth, canvasHeight, canvasDepth, sizeFactor, color, speed) {
        super(canvasWidth, canvasHeight, canvasDepth, sizeFactor, color, speed);
    }
    draw(ctx, canvasWidth, canvasHeight) {
        let x = (this.x - canvasWidth / 2) * (canvasWidth / this.z) + canvasWidth / 2;
        let y = (this.y - canvasHeight / 2) * (canvasWidth / this.z) + canvasHeight / 2;
        let size = (this.sizeFactor * canvasWidth) / this.z;
        ctx.font = `${size}px "Press Start 2P"`;
        ctx.fillText("🦄", x - size / 2, y + size / 2);
    }
}
