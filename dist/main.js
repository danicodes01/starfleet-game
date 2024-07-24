import { Game } from './game.js';
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.createElement('canvas');
    document.body.appendChild(canvas);
    console.log("appended canvas");
    const game = new Game(canvas);
    console.log("starting game");
    game.start();
});
