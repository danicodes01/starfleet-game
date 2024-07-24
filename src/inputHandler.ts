import { Starfield } from "./starfield.js";

export class InputHandler {
  constructor(starfield: Starfield) {
    document.addEventListener("keydown", (e) => {
      starfield.keysPressed[e.key] = true;
    });

    document.addEventListener("keyup", (e) => {
      starfield.keysPressed[e.key] = false;
    });
  }
}
