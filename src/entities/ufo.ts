import { Star } from "./star.js";

export class UFO extends Star {
  sizeFactor: number;
  color: string;
  speed: number;
  direction: { x: number; y: number };
  createdAt: number;

  constructor(
    canvasWidth: number,
    canvasHeight: number,
    canvasDepth: number,
    sizeFactor: number,
    color: string,
    speed: number
  ) {
    super(canvasWidth, canvasHeight, canvasDepth);
    this.sizeFactor = sizeFactor;
    this.color = color;
    this.speed = speed;
    this.direction = this.getRandomDirection();
    this.createdAt = Date.now();
  }

  getRandomDirection(): { x: number; y: number } {
    const directions = [
      { x: 1, y: 0 },
      { x: -1, y: 0 },
      { x: 0, y: 1 },
      { x: 0, y: -1 },
    ];
    return directions[Math.floor(Math.random() * directions.length)];
  }

  resetPosition(canvasWidth: number, canvasHeight: number, maxDepth: number) {
    this.x = Math.random() * canvasWidth;
    this.y = Math.random() * canvasHeight;
    this.z = maxDepth;
    this.direction = this.getRandomDirection();
  }

  update(canvasWidth: number, canvasHeight: number, maxDepth: number): boolean {
    this.z -= this.speed;
    this.x += this.direction.x * this.speed;
    this.y += this.direction.y * this.speed;

    if (this.z <= 0) {
      this.resetPosition(canvasWidth, canvasHeight, maxDepth);
    }

    if (this.x < 0) {
      this.x = canvasWidth;
    } else if (this.x > canvasWidth) {
      this.x = 0;
    }
    if (this.y < 0) {
      this.y = canvasHeight;
    } else if (this.y > canvasHeight) {
      this.y = 0;
    }

    return true; // UFO is still active
  }

  isExpired(): boolean {
    const lifeSpan = Date.now() - this.createdAt;
    return lifeSpan > 10000;
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
    ctx.font = `${size}px "Arial"`;
    ctx.fillText("🛸", x - size / 2, y + size / 2);
  }
}




