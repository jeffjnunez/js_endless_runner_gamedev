window.addEventListener('load', () => {
    /** @type {HTMLCanvasElement} */
    const canvas = document.getElementById('canvas7');
    const ctx = canvas.getContext('2d');

    canvas.width = 800;
    canvas.height = 720;

    let enemies = [];
    let score = 0;

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
            this.fps = 16;
            this.frameInterval = 1000 / this.fps;
            // this.frameInterval = 60;
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
            this.circleHitboxAdjustment = 6; // value to shrink hitbox by, for better gameplay feel
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
            /* Might not need to limit upper vertical position. */
            // else if (this.x > this.gameWidth - this.width) {
            //     this.x = this.gameWidth - this.width;
            // }

            // sprite animation
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
            context.strokeStyle = 'white';
            context.strokeRect(this.x, this.y, this.width, this.height);
            context.beginPath();
            context.arc(
                this.x + this.width / 2,
                this.y + this.height / 2 + this.circleHitboxAdjustment,
                this.width / 2 - this.circleHitboxAdjustment,
                0,
                Math.PI * 2
            );
            context.stroke();

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
        constructor(gameWidth, gameHeight) {
            this.gameWidth = gameWidth;
            this.gameHeight = gameHeight;
            this.image = document.getElementById('backgroundImage');
            this.x = 0;
            this.y = 0;
            this.width = 2400;
            this.height = 720;
            this.xSpeed = 0.3;
            this.latestXOffset = 0; // for endless scrolling
        }

        draw(context) {
            context.drawImage(
                this.image,
                this.x,
                this.y,
                this.width,
                this.height
            );

            context.drawImage(
                this.image,
                this.x + this.width - this.latestXOffset,
                this.y,
                this.width,
                this.height
            );
        }

        update(dT) {
            this.latestXOffset = this.xSpeed * dT;
            this.x -= this.latestXOffset;

            if (this.x < 0 - this.width) {
                this.x = 0;
            }
        }
    }

    class Enemy {
        constructor(gameWidth, gameHeight) {
            this.gameWidth = gameWidth;
            this.gameHeight = gameHeight;
            this.image = document.getElementById('enemyImage');
            this.width = 160;
            this.height = 119;
            this.spriteWidth = this.width;
            this.spriteHeight = this.height;
            this.x = this.gameWidth;
            this.y = this.gameHeight - this.height;
            this.xSpeed = 0.35;
            this.xFrame = 0;
            this.numFrames = 6;
            this.fps = 10;
            this.frameInterval = 1000 / this.fps;
            this.frameTime = 0;
            this.circleHitboxAdjustment = 8;
            this.markedForDeletion = false;
        }

        update(dT) {
            this.x -= this.xSpeed * dT;
            if (this.x < 0 - this.width && !this.markedForDeletion) {
                this.markedForDeletion = true;
                score++;
            }

            this.frameTime += dT;
            if (this.frameTime > this.frameInterval) {
                this.frameTime -= this.frameInterval;

                this.xFrame++;
                if (this.xFrame > this.numFrames - 1) {
                    this.xFrame = 0;
                }
            }
        }

        draw(context) {
            // collision hitbox for testing
            context.strokeStyle = 'white';
            context.strokeRect(this.x, this.y, this.width, this.height);
            context.beginPath();
            context.arc(
                this.x + this.width / 2 - 10, // custom adjustments to better fit the circle to sprite
                this.y + this.height / 2 + this.circleHitboxAdjustment + 3,
                this.width / 2 - this.circleHitboxAdjustment,
                0,
                Math.PI * 2
            );
            context.stroke();

            context.drawImage(
                this.image,
                this.xFrame * this.spriteWidth,
                0,
                this.spriteWidth,
                this.spriteHeight,
                this.x,
                this.y,
                this.width,
                this.height
            );


        }
    }

    const getRandomEnemyInterval = () => {
        return Math.random() * 1200 + 1000;
    };

    let enemyTimer = 0;
    let enemyInterval = getRandomEnemyInterval();
    const handleEnemies = dT => {
        enemyTimer += dT;
        if (enemyTimer > enemyInterval) {
            enemyTimer -= enemyInterval;
            enemyInterval = getRandomEnemyInterval();
            enemies.push(new Enemy(canvas.width, canvas.height));
            enemies = enemies.filter(enemy => !enemy.markedForDeletion);
        }

        enemies.forEach(enemy => {
            enemy.update(dT);
            enemy.draw(ctx);
        });
    };

    const displayStatusText = (context) => {
        // context.font = '40px Helvetica';
        const xPos = 20;
        const yPos = 50;
        const shadowOffset = 3;

        context.fillStyle = 'black';
        context.fillText(
            'Score: ' + score,
            xPos + shadowOffset,
            yPos + shadowOffset
        );

        context.fillStyle = 'white';
        context.fillText(
            'Score: ' + score,
            xPos,
            yPos
        );
    };

    let lastTimestamp = 0;
    const animate = (timestamp) => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const dT = timestamp - lastTimestamp;
        lastTimestamp = timestamp;

        // background.update(dT);
        background.draw(ctx);
        player.update(dT, input);
        player.draw(ctx);
        handleEnemies(dT);
        displayStatusText(ctx);
        requestAnimationFrame(animate);
    };

    const input = new InputHandler();
    const player = new Player(canvas.width, canvas.height);
    const background = new Background(canvas.width, canvas.height);
    animate(0);


});