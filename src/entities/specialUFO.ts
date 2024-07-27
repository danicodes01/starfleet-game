import { UFO } from "./ufo.js";

export class SpecialUFO extends UFO {
  constructor(
    canvasWidth: number,
    canvasHeight: number,
    canvasDepth: number,
    sizeFactor: number,
    color: string,
    speed: number
  ) {
    super(canvasWidth, canvasHeight, canvasDepth, sizeFactor, color, speed);
  }


  draw(ctx: CanvasRenderingContext2D, canvasWidth: number, canvasHeight: number) {
    let x = (this.x - canvasWidth / 2) * (canvasWidth / this.z) + canvasWidth / 2;
    let y = (this.y - canvasHeight / 2) * (canvasWidth / this.z) + canvasHeight / 2;
    let size = (this.sizeFactor * canvasWidth) / this.z;
    ctx.font = `${size}px "Press Start 2P"`;
    ctx.fillText("🦄", x - size / 2, y + size / 2);
  }
}

