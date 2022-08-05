/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas3');
const ctx = canvas.getContext('2d');

CANVAS_WIDTH = canvas.width = 500;
CANVAS_HEIGHT = canvas.height = 1000;

const numEnemies = 20;
const enemies = [];
let gameFrame = 0;

class Enemy {
    constructor() {
        this.image = new Image();
        this.image.src = '../assets/enemy1.png';
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.speed = (Math.random() * 4) - 2; // [-2, 2]
        // this.speed = Math.floor((Math.random() * 4) - 2); // [-2, 2]
        this.spriteWidth = 293;
        this.spriteHeight = 155;
        this.width = this.spriteWidth / 2.5;
        this.height = this.spriteHeight / 2.5;
        this.frame = 0;
        this.numFrames = 6;
        this.flapSpeed = Math.floor(Math.random() * 2 + 2);
    }

    update() {
        this.x += this.speed;
        this.y += this.speed;

        if (gameFrame % this.flapSpeed === 0) {
            this.frame > this.numFrames - 2 ? this.frame = 0 : this.frame++;
        }

    }

    draw() {
        ctx.strokeRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(
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

for (let i = 0; i < numEnemies; i++) {
    enemies.push(new Enemy());
}

const animate = () => {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    enemies.forEach(enemy => {
        enemy.update();
        enemy.draw();
    });
    gameFrame++;

    requestAnimationFrame(animate);
};

animate();