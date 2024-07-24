export interface Drawable {
    draw(
      ctx: CanvasRenderingContext2D,
      canvasWidth: number,
      canvasHeight: number,
      sizeFactor?: number,
      color?: string
    ): void;
    update?(
      canvasWidth: number,
      canvasHeight: number,
      maxDepth: number,
      speed?: number
    ): void;
  }
  