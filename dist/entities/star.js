export class Star {
    constructor(canvasWidth, canvasHeight, maxDepth) {
        this.x = Math.random() * canvasWidth;
        this.y = Math.random() * canvasHeight;
        this.z = Math.random() * maxDepth;
    }
    update(canvasWidth, canvasHeight, maxDepth, speed) {
        this.z -= speed;
        if (this.z <= 0) {
            this.z = maxDepth;
            this.x = Math.random() * canvasWidth;
            this.y = Math.random() * canvasHeight;
        }
    }
    draw(ctx, canvasWidth, canvasHeight, sizeFactor, color) {
        let x = (this.x - canvasWidth / 2) * (canvasWidth / this.z) + canvasWidth / 2;
        let y = (this.y - canvasHeight / 2) * (canvasWidth / this.z) + canvasHeight / 2;
        let size = sizeFactor * canvasWidth / this.z;
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, 2 * Math.PI);
        ctx.fill();
    }
}
