import { Game } from './game.js';

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.createElement('canvas');
    document.body.appendChild(canvas);

    const game = new Game(canvas);
    game.start();
});