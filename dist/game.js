import { Starfield } from "./starfield.js";
export class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.starfield = new Starfield(canvas);
    }
    start() {
        this.starfield.start();
    }
}
