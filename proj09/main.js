import { Player } from './player.js';
import { InputHandler } from './input.js';

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
            this.input = new InputHandler();
        }

        update() {
            this.player.update(this.input.keys);
        }

        draw(context) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            this.player.draw(context);
        }
    }

    const animate = () => {
        game.update();
        game.draw(ctx);
        requestAnimationFrame(animate);
    }

    const game = new Game(canvas.width, canvas.height);
    animate();
});