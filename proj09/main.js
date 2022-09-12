import { Player } from './player.js';

window.addEventListener('load', () => {
    /** @type {HTMLCanvasElement} */
    const canvas = document.getElementById('canvas9');
    const ctx = canvas.getContext('2d');

    canvas.width = 500;
    canvas.height = 500;

    class Game {
        constructor(width, height) {
            this.width = width;
            this.height = height;
            this.player = new Player(this);
        }

        update() {

        }

        draw(context) {
            this.player.draw(context);
        }
    }

    const animate = () => {
        game.draw(ctx);
        requestAnimationFrame(animate);
    }

    const game = new Game(canvas.width, canvas.height);
    animate();
});