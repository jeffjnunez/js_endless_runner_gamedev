window.addEventListener('load', () => {
    /** @type {HTMLCanvasElement} */
    const canvas = document.getElementById('canvas7');
    const ctx = canvas.getContext('2d');

    canvas.width = 800;
    canvas.height = 720;

    ctx.font = '40px Impact';

    const keysToRegister = [
        'ArrowDown',
        'ArrowUp',
        'ArrowLeft',
        'ArrowRight',
    ];

    class InputHandler {
        constructor() {
            this.keys = []; // all keys currently being pressed

            window.addEventListener('keydown', e => {
                if (keysToRegister.includes(e.key) &&
                    this.keys.indexOf(e.key) === -1)
                {
                    this.keys.push(e.key);
                }
            });

            window.addEventListener('keyup', e => {
                if (keysToRegister.includes(e.key)) {
                    this.keys.splice(this.keys.indexOf(e.key), 1);
                }
            });
        }
    }

    class Player {
        constructor(gameWidth, gameHeight) {
            this.gameWidth = gameWidth;
            this.gameHeight = gameHeight;
            this.image = playerImage;
            this.spriteWidth = 200;
            this.spriteHeight = 200;
            this.width = this.spriteWidth;
            this.height = this.spriteHeight;
            this.x = 10;
            this.y = this.gameHeight - this.height - 15;
            this.xSpeed = 0.2;
            this.frame = 0;
            this.numFrames = 9;
            this.frameInterval = 60;
            this.frameTime = 0;
            this.row = 0;
            console.log(this.image);
        }

        update(dT) {
            this.x += this.xSpeed * dT;

            this.frameTime += dT;
            if (this.frameTime > this.frameInterval) {
                this.frameTime -= this.frameInterval;

                this.frame++;
                if (this.frame > this.numFrames - 1) {
                    this.frame = 0;
                }
            }
        }

        draw(context) {
            // context.fillStyle = 'white';
            // context.fillRect(this.x, this.y, this.width, this.height);

            context.drawImage(
                this.image,
                this.frame * this.spriteWidth,
                this.row * this.spriteHeight,
                this.spriteWidth,
                this.spriteHeight,
                this.x,
                this.y,
                this.width,
                this.height
            );
        }
    }

    class Background {

    }

    class Enemy {

    }

    const handleEnemies = () => {

    }

    const displayStatusText = () => {

    }

    let lastTimestamp = 0;
    const animate = (timestamp) => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const dT = timestamp - lastTimestamp;
        lastTimestamp = timestamp;
    //     // some code

        player.update(dT);
        player.draw(ctx);
        requestAnimationFrame(animate);
    };

    const input = new InputHandler();
    const player = new Player(canvas.width, canvas.height);
    // animate(0);


});