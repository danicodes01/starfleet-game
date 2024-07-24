export class Game {
    canvas: HTMLCanvasElement;
    
    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas
    }

    start() {
        console.log('Game started!')
    }
}