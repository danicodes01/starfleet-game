import { Starfield } from "./starfield.js";

export class InputHandler {
    constructor(starfield: Starfield) {
        document.addEventListener("keydown", (e) => {
            starfield.keysPressed[e.key] = true;
            if (e.key === " ") {
                starfield.shoot(starfield.crosshair.x, starfield.crosshair.y);
            }
        });

        document.addEventListener("keyup", (e) => {
            starfield.keysPressed[e.key] = false;
        });

        if (starfield.isTouchDevice) {
            document.addEventListener("touchstart", (e) => {
                e.preventDefault();
                const pos = starfield.getTouchPos(starfield.canvas, e);
                starfield.shoot(pos.x, pos.y);
            });

            document.addEventListener("touchmove", (e) => {
                e.preventDefault();
            });

            document.addEventListener("touchend", (e) => {
                e.preventDefault();
            });
        }
    }
}
