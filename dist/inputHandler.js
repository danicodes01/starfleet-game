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
        document.addEventListener("touchstart", (e) => {
            e.preventDefault();
            const touch = e.touches[0];
            starfield.crosshair.x = touch.clientX;
            starfield.crosshair.y = touch.clientY;
            starfield.shoot();
        });
        document.addEventListener("touchmove", (e) => {
            e.preventDefault();
            const touch = e.touches[0];
            starfield.crosshair.x = touch.clientX;
            starfield.crosshair.y = touch.clientY;
        });
        document.addEventListener("touchend", (e) => {
            e.preventDefault();
        });
    }
}
