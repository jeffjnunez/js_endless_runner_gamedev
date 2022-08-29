window.addEventListener('load', () => {
    /** @type {HTMLCanvasElement} */
    const canvas = document.getElementById('canvas7');
    const ctx = canvas.getContext('2d');

    canvas.width = 1400;
    canvas.height = 720;

    const fullscreenButton = document.getElementById('fullscreenButton');

    let enemies = [];
    let score = 0;
    let gameOver = false;
    let restartTriggered = false; // Used to end the current anim loop before restarting game.

    ctx.font = '40px Impact';

    const keysToRegister = [
        'ArrowDown',
        'ArrowUp',
        'ArrowLeft',
        'ArrowRight',
    ];

    const resetKeys = [
        'r',
    ];

    class InputHandler {
        constructor() {
            this.keys = []; // all keys currently being pressed
            this.touchY = '';
            // min pixels for a touch to be interpreted as an intentional swipe
            this.touchThreshold = 30;

            window.addEventListener('keydown', e => {
                if (resetKeys.includes(e.key)) {
                    if (gameOver) {
                        restartGame();
                    }
                    else {
                        restartTriggered = true;
                    }
                }
                else if (keysToRegister.includes(e.key) &&
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

            window.addEventListener('touchstart', e => {
                this.touchY = e.changedTouches[0].pageY;
            });
            window.addEventListener('touchmove', e => {
                const swipeDistance = e.changedTouches[0].pageY - this.touchY;
                console.log(swipeDistance);
                if (swipeDistance < -this.touchThreshold && this.keys.indexOf('swipe up') === -1) {
                    this.keys.push('swipe up');
                }
                else if (swipeDistance > this.touchThreshold && this.keys.indexOf('swipe down') === -1) {
                    this.keys.push('swipe down');
                    if (gameOver) {
                        restartGame();
                    }
                }
            });
            window.addEventListener('touchend', e => {
                this.keys.splice(this.keys.indexOf('swipe up'), 1);
                this.keys.splice(this.keys.indexOf('swipe down'), 1);
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
            this.x = 100;
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
            // values to shrink/move hitbox by, for better gameplay feel
            this.circleHitboxAdjustmentY = 14;
            this.circleHitboxRadiusAdjustment = -18;
        }

        hitboxOriginX() {
            return this.x + this.width / 2;
        }

        hitboxOriginY() {
            return this.y + this.height / 2 + this.circleHitboxAdjustmentY;
        }

        hitboxRadius() {
            return this.width / 2 + this.circleHitboxRadiusAdjustment;
        }

        restart() {
            this.x = 100;
            this.y = this.gameHeight - this.height;

            this.ySpeed = 0.0;
            this.currAnim = 'run';
            this.frame = 0;
        }

        update(dT, input) {
            // collision detection
            enemies.forEach(enemy => {
                const dx = enemy.hitboxOriginX() - this.hitboxOriginX();
                const dy = enemy.hitboxOriginY() - this.hitboxOriginY();
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < enemy.hitboxRadius() + this.hitboxRadius()) {
                    triggerGameOver();
                }
            });

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
                if (
                    (input.keys.includes('ArrowUp') && !input.keys.includes('ArrowDown'))
                    || input.keys.indexOf('swipe up') !== -1
                ) {
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
            // debugDrawHitbox(context, this);

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

        restart() {
            this.x = 0;
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
            this.markedForDeletion = false;
            // custom adjustments to better fit the circle to sprite
            this.circleHitboxAdjustmentX = -24;
            this.circleHitboxAdjustmentY = 8;
            this.circleHitboxRadiusAdjustment = -24;
        }

        hitboxOriginX() {
            return this.x + this.width / 2 + this.circleHitboxAdjustmentX;
        }

        hitboxOriginY() {
            return this.y + this.height / 2 + this.circleHitboxAdjustmentY;
        }

        hitboxRadius() {
            return this.width / 2 + this.circleHitboxRadiusAdjustment;
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
            // debugDrawHitbox(context, this);

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

    const displayStatusText = (context, plyr) => {
        context.textAlign = 'left';
        // context.font = '40px Helvetica';
        context.font = '40px Impact';
        const xPos = 20;
        const yPos = 50;
        const shadowOffset = 3;
        const restartTextOffset = 60;

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

        if (gameOver) {
            context.textAlign = 'center';
            context.font = '90px Impact';
            context.fillStyle = 'white';
            // fake an 'outline' around the text
            context.fillText('GAME OVER', canvas.width / 2 + shadowOffset, canvas.height / 2 + shadowOffset);
            context.fillText('GAME OVER', canvas.width / 2 + shadowOffset, canvas.height / 2 - shadowOffset);
            context.fillText('GAME OVER', canvas.width / 2 - shadowOffset, canvas.height / 2 + shadowOffset);
            context.fillText('GAME OVER', canvas.width / 2 - shadowOffset, canvas.height / 2 - shadowOffset);
            context.fillStyle = 'black';
            context.fillText('GAME OVER', canvas.width / 2, canvas.height / 2);

            context.font = '50px Impact';
            context.fillText('press R or SwipeDown to restart', canvas.width / 2 + shadowOffset, canvas.height / 2 + shadowOffset + restartTextOffset);
            context.fillStyle = 'white';
            context.fillText('press R or SwipeDown to restart', canvas.width / 2, canvas.height / 2 + restartTextOffset);

        }
    };

    const toggleFullscreen = () => {
        console.log(document.fullscreenElement);
        if (!document.fullScreenElement) {
            canvas.requestFullscreen()
                .catch(err => {
                    alert(`Error, can't enable full-screen mode: ${err.message}`);
                });
        }
    };
    fullscreenButton.addEventListener('click', toggleFullscreen);

    const triggerGameOver = () => {
        gameOver = true;
        // enemies = [];
    };

    const debugDrawHitbox = (context, entity) => {
        context.strokeStyle = 'white';
        context.strokeRect(entity.x, entity.y, entity.width, entity.height);
        context.beginPath();
        context.arc(
            entity.hitboxOriginX(),
            entity.hitboxOriginY(),
            entity.hitboxRadius(),
            0,
            Math.PI * 2
        );
        context.stroke();
    }

    const restartGame = () => {
        player.restart();
        background.restart();

        enemies = [];
        score = 0;
        gameOver = false;
        // lastTimestamp = 0;
        // animate(0);
        firstAnimFrame = true;
        requestAnimationFrame(animate);
        // animate(0);
    };

    let lastTimestamp = 0;
    let firstAnimFrame = false;
    const animate = (timestamp) => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Realign timestamp and lastTimestamp after a reset.
        // Don't update the game logic this frame, since dT
        // is not accurate.
        if (firstAnimFrame) {
            firstAnimFrame = false;
            lastTimestamp = timestamp;
            background.draw(ctx);
            requestAnimationFrame(animate);
            return;
        }
        const dT = timestamp - lastTimestamp;
        lastTimestamp = timestamp;

        background.update(dT);
        background.draw(ctx);
        player.update(dT, input);
        player.draw(ctx);
        handleEnemies(dT);
        displayStatusText(ctx, player);
        if (!gameOver && !restartTriggered) {
            requestAnimationFrame(animate);
        }
        if (restartTriggered) {
            restartTriggered = false;
            restartGame();
        }
    };

    const input = new InputHandler();
    const player = new Player(canvas.width, canvas.height);
    const background = new Background(canvas.width, canvas.height);
    animate(0);


});