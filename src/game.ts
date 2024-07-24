import { Starfield } from "./starfield.js";
import { InputHandler } from "./inputHandler.js";

export class Game {
    canvas: HTMLCanvasElement;
    starfield: Starfield;
    inputHandler: InputHandler;
    
    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas
        this.starfield = new Starfield(canvas)
        this.inputHandler = new InputHandler(this.starfield)
    }

    start() {
        this.starfield.start();
    }
}