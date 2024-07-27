import { UFO } from "./ufo.js";

export class BossUFO extends UFO {
    hitsRemaining: number;
  
    constructor(
      canvasWidth: number,
      canvasHeight: number,
      canvasDepth: number,
      sizeFactor: number,
      color: string,
      speed: number,
      hitsToKill: number
    ) {
      super(canvasWidth, canvasHeight, canvasDepth, sizeFactor, color, speed);
      this.hitsRemaining = hitsToKill;
    }
  
    hit() {
      this.hitsRemaining--;
      return this.hitsRemaining <= 0;
    }
  
    isExpired(): boolean {
      return false; 
    }
  
    draw(
      ctx: CanvasRenderingContext2D,
      canvasWidth: number,
      canvasHeight: number
    ) {
      let x =
        (this.x - canvasWidth / 2) * (canvasWidth / this.z) + canvasWidth / 2;
      let y =
        (this.y - canvasHeight / 2) * (canvasWidth / this.z) + canvasHeight / 2;
      let size = (this.sizeFactor * canvasWidth) / this.z;
      ctx.font = `${size}px "Press Start 2P"`;
      ctx.fillText("👾", x - size / 2, y + size / 2);
    }
}
