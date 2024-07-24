import { Starfield } from "./starfield.js";

export class Game {
    canvas: HTMLCanvasElement;
    starfield: Starfield;
    
    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas
        this.starfield = new Starfield(canvas)
    }

    start() {
        this.starfield.start();
    }
}