import { Starfield } from "./starfield.js";
import { InputHandler } from "./inputHandler.js";
export class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.starfield = new Starfield(canvas);
        this.inputHandler = new InputHandler(this.starfield);
    }
    start() {
        this.starfield.start();
    }
}
