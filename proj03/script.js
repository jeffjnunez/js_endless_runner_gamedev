/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas3');
const ctx = canvas.getContext('2d');

CANVAS_WIDTH = canvas.width = 500;
CANVAS_HEIGHT = canvas.height = 1000;

const numEnemies = 20;
const enemies = [];

class Enemy {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.width = 100;
        this.height = 100;
        this.speed = (Math.random() * 4) - 2; // [-2, 2]
        // this.speed = Math.floor((Math.random() * 4) - 2); // [-2, 2]
    }

    update() {
        this.x += this.speed;
        this.y += this.speed;
    }

    draw() {
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

for (let i = 0; i < numEnemies; i++) {
    enemies.push(new Enemy());
}

console.log(enemies);

const animate = () => {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    enemies.forEach(enemy => {
        enemy.update();
        enemy.draw();
    });

    requestAnimationFrame(animate);
};

// animate();