import { Player } from './player.js';
import { InputHandler } from './input.js';
import { Background } from './background.js';
import { FlyingEnemy, ClimbingEnemy, GroundEnemy } from './enemies.js';
import { UI } from './UI.js';

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
            this.input = new InputHandler(this);
            this.UI = new UI(this);
            this.enemies = [];
            this.particles = [];
            this.enemyTimer = 0;
            this.enemyInterval = 1000;
            this.score = 0;
            this.fontColor = 'black';
            this.debug = true;
        }

        update(dT) {
            this.background.update(dT);
            this.player.update(this.input.keys, dT);
            this.updateEnemies(dT);
            this.updateParticles(dT);
        }

        draw(context) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            this.background.draw(context);
            this.player.draw(context);
            this.drawEnemies(context);
            this.drawParticles(context);
            this.UI.draw(context);
        }

        addEnemy() {

            if (this.backgroundSpeed > 0 && Math.random() > 0.5) {
                this.enemies.push(new GroundEnemy(this));
            }
            else if (this.backgroundSpeed > 0) {
                this.enemies.push(new ClimbingEnemy(this));
            }

            this.enemies.push(new FlyingEnemy(this));


            // console.log(this.particles);
            // console.log(this.enemies);
            // if (this.enemies.length) {
                // console.log(this.enemies[0].x);
            // }
        }

        updateEnemies(dT) {
            this.enemyTimer += dT;
            if (this.enemyTimer > this.enemyInterval) {
                this.enemyTimer -= this.enemyInterval;

                this.addEnemy();
            }

            this.enemies.forEach((enemy, idx) => {
                enemy.update(dT);
                if (enemy.markedForDeletion) {
                    this.enemies.splice(idx, 1);
                }
            });
        }

        drawEnemies(context) {
            this.enemies.forEach(enemy => {
                enemy.draw(context);
            });
        }

        updateParticles(dT) {
            this.particles.forEach((particle, idx) => {
                particle.update(dT);
                if (particle.markedForDeletion) {
                    this.particles.splice(idx, 1);
                }
            });
        }

        drawParticles(context) {
            this.particles.forEach(particle => {
                particle.draw(context);
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