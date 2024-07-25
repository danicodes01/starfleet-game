export class InputHandler {
    constructor(starfield) {
        document.addEventListener("keydown", (e) => {
            starfield.keysPressed[e.key] = true;
            if (e.key === " ") {
                starfield.shoot();
            }
        });
        document.addEventListener("keyup", (e) => {
            starfield.keysPressed[e.key] = false;
        });
    }
}
