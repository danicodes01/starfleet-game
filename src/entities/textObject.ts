export class TextObject {
    x: number;
    y: number;
    text: string;
    color: string;
    size: number;
    duration: number;
    createdAt: number; 
  
    constructor(x: number, y: number, text: string, color: string, size: number, duration: number) {
      this.x = x;
      this.y = y;
      this.text = text;
      this.color = color;
      this.size = size;
      this.duration = duration;
      this.createdAt = Date.now();
    }
  
    draw(ctx: CanvasRenderingContext2D) {
      ctx.fillStyle = this.color;
      ctx.font = `${this.size}px "Press Start 2P"`;
      ctx.fillText(this.text, this.x, this.y);
    }
  
    isExpired() {
      return Date.now() - this.createdAt > this.duration;
    }
  }
  