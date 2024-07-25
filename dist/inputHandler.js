export class InputHandler {
    constructor(starfield) {
        document.addEventListener("keydown", (e) => {
            starfield.keysPressed[e.key] = true;
            if (e.key === " ") {
                starfield.shoot(starfield.crosshair.x, starfield.crosshair.y);
            }
        });
        document.addEventListener("keyup", (e) => {
            starfield.keysPressed[e.key] = false;
        });
        // Add touch event listeners
        document.addEventListener("touchstart", (e) => {
            e.preventDefault();
            const touch = e.touches[0];
            starfield.shoot(touch.clientX, touch.clientY);
        });
        document.addEventListener("touchmove", (e) => {
            e.preventDefault();
        });
        document.addEventListener("touchend", (e) => {
            e.preventDefault();
        });
    }
}
