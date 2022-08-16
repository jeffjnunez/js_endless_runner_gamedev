window.addEventListener('load', () => {
    /** @type {HTMLCanvasElement} */
    const canvas = document.getElementById('canvas6');
    const ctx = canvas.getContext('2d');

    canvas.width = 500;
    canvas.height = 800;

    console.log(canvas.width, canvas.height);

    ctx.font = '40px Impact';


    class Game {
        constructor(ctx, width, height) {
            this.ctx = ctx;
            this.width = width;
            this.height = height;
            this.enemies = [];
            this.#addNewEnemy();
        }

        update() {
            this.enemies.forEach(enemy => enemy.update());
        }

        draw() {
            this.enemies.forEach(enemy => enemy.draw());
        }

        #addNewEnemy() {
            this.enemies.push(new Enemy(this));
        }
    }

    class Enemy {
        constructor(game) {
            this.game = game;
            this.width = 100;
            this.height = 100;
            this.x = this.game.width;
            this.y = Math.random() * (this.game.height - this.height);
        }

        update() {
            this.x--;
        }

        draw() {
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }

    let lastTimestamp = 0;
    const animate = (timestamp) => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const dT = timestamp - lastTimestamp;
        lastTimestamp = timestamp;
        // some code

        game.update();
        game.draw();
        requestAnimationFrame(animate);
    };

    const game = new Game(ctx, canvas.width, canvas.height);
    animate(0);
});