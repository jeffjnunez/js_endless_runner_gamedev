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
            this.x = 0;
            this.y = this.gameHeight - this.height;
            this.xSpeed = 0.0; //0.2;
            this.ySpeed = 0.0;
            this.weight = 0.5; // for vertical movement, gravity
            this.xFrame = 0;
            this.numFrames = 9;
            this.frameInterval = 60;
            this.frameTime = 0;
            this.anims = {
                run: {
                    numFrames: 9,
                    spriteIdxY: 0,
                },
                jump: {
                    numFrames: 6,
                    spriteIdxY: 1,
                },
            };
            this.currAnim = 'run';
        }

        update(dT, input) {
            // horizontal movement
            if (input.keys.includes('ArrowRight') && !input.keys.includes('ArrowLeft')) {
                this.xSpeed = 0.8;
            }
            else if (input.keys.includes('ArrowLeft') && !input.keys.includes('ArrowRight')) {
                this.xSpeed = -0.8;
            }
            else {
                this.xSpeed = 0.0;
            }
            this.x += this.xSpeed * dT;
            // bound horizontal movement to the game canvas
            if (this.x < 0) {
                this.x = 0;
            }
            else if (this.x > this.gameWidth - this.width) {
                this.x = this.gameWidth - this.width;
            }

            // vertical movement
            if (!this.onGround()) {
                this.ySpeed += this.weight;
            }
            else {
                if (input.keys.includes('ArrowUp') && !input.keys.includes('ArrowDown')) {
                    this.ySpeed = -20.0;
                    this.currAnim = 'jump';
                    this.frame = 0;
                }
                else {
                    this.ySpeed = 0.0;
                    this.currAnim = 'run';
                    this.frame = 0;
                }
            }
            this.y += this.ySpeed;
            // bound vertical movement to the game canvas
            if (this.y > this.gameHeight - this.height) {
                this.y = this.gameHeight - this.height;
            }
            // else if (this.x > this.gameWidth - this.width) {
            //     this.x = this.gameWidth - this.width;
            // }

            this.frameTime += dT;
            if (this.frameTime > this.frameInterval) {
                this.frameTime -= this.frameInterval;

                this.xFrame++;
                if (this.xFrame > this.anims[this.currAnim].numFrames - 1) {
                    this.xFrame = 0;
                }
            }
        }

        draw(context) {
            context.fillStyle = 'white';
            context.fillRect(this.x, this.y, this.width, this.height);

            context.drawImage(
                this.image,
                this.xFrame * this.spriteWidth,
                this.anims[this.currAnim].spriteIdxY * this.spriteHeight,
                this.spriteWidth,
                this.spriteHeight,
                this.x,
                this.y,
                this.width,
                this.height
            );
        }

        onGround() {
            return this.y >= this.gameHeight - this.height;
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

        player.update(dT, input);
        player.draw(ctx);
        requestAnimationFrame(animate);
    };

    const input = new InputHandler();
    const player = new Player(canvas.width, canvas.height);
    animate(0);


});