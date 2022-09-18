import { Player } from './player.js';
import { InputHandler } from './input.js';
import { Background } from './background.js';
import { FlyingEnemy, ClimbingEnemy, GroundEnemy } from './enemies.js';

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
            this.groundMargin = 84;
            this.backgroundSpeed = 0.3;
            this.background = new Background(this);
            this.player = new Player(this);
            this.input = new InputHandler();
            this.enemies = [];
            this.enemyTimer = 0;
            this.enemyInterval = 1000;
        }

        update(dT) {
            this.background.update(dT);
            this.player.update(this.input.keys, dT);
            this.updateEnemies(dT);
        }

        draw(context) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            this.background.draw(context);
            this.player.draw(context);
            this.drawEnemies(context);
        }

        addEnemy() {
            this.enemies.push(new FlyingEnemy(this));
            // console.log(this.enemies[0]);
        }

        updateEnemies(dT) {
            this.enemyTimer += dT;
            if (this.enemyTimer > this.enemyInterval) {
                this.enemyTimer -= this.enemyInterval;

                this.addEnemy();
            }

            this.enemies.forEach(enemy => {
                enemy.update(dT);
            });
        }

        drawEnemies(context) {
            this.enemies.forEach(enemy => {
                enemy.draw(context);
            });
        }
    }

    let lastTimestamp = 0;
    const animate = (timestamp) => {
        let dT = timestamp - lastTimestamp;
        lastTimestamp = timestamp;
        game.update(dT);
        game.draw(ctx);
        requestAnimationFrame(animate);
    }

    const game = new Game(canvas.width, canvas.height);
    animate(0);
});