export class Starfield {
    constructor(canvas) {
        this.canvas = canvas;
        this.maxDepth = Math.max(this.canvas.width, this.canvas.height) * 1.5;
        this.resizeCanvas();
        window.addEventListener("resize", this.resizeCanvas.bind(this));
    }
    resizeCanvas() {
        const width = window.innerWidth * 0.85;
        const height = window.innerHeight * 0.85;
        this.canvas.width = width;
        this.canvas.height = height;
        this.canvas.style.position = 'absolute';
        this.canvas.style.left = `${(window.innerWidth - width) / 2}px`;
        this.canvas.style.top = `${(window.innerHeight - height) / 2}px`;
        this.maxDepth = Math.max(this.canvas.width, this.canvas.height) * 1.5;
    }
}
