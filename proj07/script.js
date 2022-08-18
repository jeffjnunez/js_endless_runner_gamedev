window.addEventListener('load', () => {
    /** @type {HTMLCanvasElement} */
    const canvas = document.getElementById('canvas7');
    const ctx = canvas.getContext('2d');

    canvas.width = 800;
    canvas.height = 720;

    ctx.font = '40px Impact';


    class InputHandler {
        constructor() {
            this.keys = []; // all keys currently being pressed
            window.addEventListener('keydown', (e) => {
                console.log(e);
            });
        }
    }

    class Player {

    }

    class Background {

    }

    class Enemy {

    }

    const handleEnemies = () => {

    }

    const displayStatusText = () => {

    }

    // let lastTimestamp = 0;
    const animate = (timestamp) => {
    //     ctx.clearRect(0, 0, canvas.width, canvas.height);

    //     const dT = timestamp - lastTimestamp;
    //     lastTimestamp = timestamp;
    //     // some code

    //     game.update(dT);
    //     game.draw();
    //     requestAnimationFrame(animate);
    };

    const input = new InputHandler();
});