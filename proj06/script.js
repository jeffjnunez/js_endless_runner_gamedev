window.addEventListener('load', () => {
    /** @type {HTMLCanvasElement} */
    const canvas = document.getElementById('canvas6');
    const ctx = canvas.getContext('2d');

    canvas.width = 500;
    canvas.height = 800;

    class Game {
        constructor(ctx, width, height) {
            this.ctx = ctx;
            this.width = width;
            this.height = height;
            this.enemies = [];
            this.enemyInterval = 400;
            this.enemyTimer = 0;
            this.enemyTypes = ['worm', 'ghost', 'spider'];
            this.#addNewEnemy();
        }

        update(dT) {
            this.enemyTimer += dT;
            if (this.enemyTimer > this.enemyInterval) {
                this.enemyTimer -= this.enemyInterval;
                this.#addNewEnemy();
            }

            this.enemies.forEach(enemy => enemy.update(dT));
        }

        draw() {
            this.enemies.forEach(enemy => enemy.draw());
        }

        #addNewEnemy() {
            const randomEnemyType = this.enemyTypes[Math.floor(Math.random() * this.enemyTypes.length)];
            switch (randomEnemyType) {
                case 'worm':
                    this.enemies.push(new Worm(this));
                    break;
                case 'ghost':
                    this.enemies.push(new Ghost(this));
                    break;
                case 'spider':
                    this.enemies.push(new Spider(this));
                    break;
                default:
                    break;
            }
            this.enemies = this.enemies.filter(object => !object.markedForDeletion);
            // Worms are aligned on y and ghosts are semi-transparent, so
            // this sorting is no longer required.
            // this.enemies.sort((a, b) => a.y - b.y);
        }
    }

    class Enemy {
        constructor(game) {
            this.game = game;
            this.frame = 0;
            this.numFrames = 6;
            this.frameInterval = 100;
            this.frameTimer = 0;
            this.markedForDeletion = false;
        }

        update(dT) {
            this.x -= this.xSpeed * dT;

            if (this.x < 0 - this.width) {
                this.markedForDeletion = true;
            }

            this.frameTimer += dT;
            if (this.frameTimer > this.frameInterval) {
                this.frameTimer -= this.frameInterval;

                this.frame++;
                if (this.frame > this.numFrames - 1) {
                    this.frame = 0;
                }
            }
        }

        draw() {
            this.game.ctx.drawImage(
                this.image,
                this.frame * this.spriteWidth,
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

    class Worm extends Enemy {
        constructor(game) {
            super(game);

            this.image = worm;
            this.spriteWidth = 229;
            this.spriteHeight = 171;
            this.width = this.spriteWidth * 0.5;
            this.height = this.spriteHeight * 0.5;
            this.x = this.game.width;
            this.y = this.game.height - this.height;
            this.xSpeed = Math.random() * 0.1 + 0.1;
        }
    }

    class Ghost extends Enemy {
        constructor(game) {
            super(game);

            this.image = ghost;
            this.spriteWidth = 261;
            this.spriteHeight = 209;
            this.width = this.spriteWidth * 0.5;
            this.height = this.spriteHeight * 0.5;
            this.x = this.game.width;
            this.y = Math.random() * (this.game.height * 0.6);
            this.xSpeed = Math.random() * 0.2 + 0.1;
            this.angle = Math.random() * Math.PI;
            this.angleSpeedMult = Math.random() * 0.003 + 0.003;
            this.amplitudeMult = Math.random() * 0.5 + 0.75;
        }

        update(dT) {
            super.update(dT);

            this.y += Math.sin(this.angle) * this.amplitudeMult;
            this.angle += dT * this.angleSpeedMult;
        }

        draw() {
            this.game.ctx.save();
            this.game.ctx.globalAlpha = 0.7;

            super.draw();

            this.game.ctx.restore();
        }
    }

    class Spider extends Enemy {
        constructor(game) {
            super(game);

            this.image = spider;
            this.spriteWidth = 310;
            this.spriteHeight = 175;
            this.width = this.spriteWidth * 0.4;
            this.height = this.spriteHeight * 0.4;
            this.x = Math.random() * (this.game.width - this.width);
            this.y = 0 - this.height;
            this.xSpeed = 0;
            this.ySpeed = Math.random() * 0.04 + 0.08;
            this.maxY = Math.random() * (this.game.height - 400) + 200;
        }

        update(dT) {
            super.update(dT);

            this.y += this.ySpeed * dT;

            if (this.y > this.maxY) {
                this.ySpeed *= -1;
            }

            if (this.ySpeed < 0 && this.y < 0 - this.height) {
                this.markedForDeletion = true;
            }
        }

        draw() {

            ctx.beginPath();
            ctx.moveTo(this.x + (this.width / 2), 0);
            ctx.lineTo(this.x + (this.width / 2), this.y + 10);
            ctx.stroke();

            super.draw();
        }
    }

    let lastTimestamp = 0;
    const animate = (timestamp) => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const dT = timestamp - lastTimestamp;
        lastTimestamp = timestamp;
        // some code

        game.update(dT);
        game.draw();
        requestAnimationFrame(animate);
    };

    const game = new Game(ctx, canvas.width, canvas.height);
    // animate(0);
});