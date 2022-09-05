import Player from './player.js';
import InputHandler from './input.js';

import { drawStatusText } from './utils.js';

window.addEventListener('load', () => {
    const loading = document.getElementById('loading');
    loading.style.display = 'none';

    /** @type {HTMLCanvasElement} */
    const canvas = document.getElementById('canvas8');
    const ctx = canvas.getContext('2d');

    // canvas.width = 1400;
    // canvas.height = 720;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let lastTimestamp = 0;
    let firstAnimFrame = false;
    const animate = (timestamp) => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        player.update(input.lastKey);
        player.draw(ctx);
        drawStatusText(ctx, input, player);

        requestAnimationFrame(animate);

        // // Realign timestamp and lastTimestamp after a reset.
        // // Don't update the game logic this frame, since dT
        // // is not accurate.
        // if (firstAnimFrame) {
        //     firstAnimFrame = false;
        //     lastTimestamp = timestamp;
        //     background.draw(ctx);
        //     requestAnimationFrame(animate);
        //     return;
        // }
        // const dT = timestamp - lastTimestamp;
        // lastTimestamp = timestamp;

        // background.update(dT);
        // background.draw(ctx);
        // player.update(dT, input);
        // player.draw(ctx);
        // handleEnemies(dT);
        // displayStatusText(ctx, player);
        // if (!gameOver && !restartTriggered) {
        //     requestAnimationFrame(animate);
        // }
        // if (restartTriggered) {
        //     restartTriggered = false;
        //     restartGame();
        // }
    };

    // const input = new InputHandler();
    // const player = new Player(canvas.width, canvas.height);
    // const background = new Background(canvas.width, canvas.height);
    // animate(0);

    const player = new Player(canvas.width, canvas.height);
    player.setState(0);
    // player.draw(ctx);

    const input = new InputHandler();
    animate();
});