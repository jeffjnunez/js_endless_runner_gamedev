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
        this.spriteWidth = 293;
        this.spriteHeight = 155;
        this.width = this.spriteWidth / 2.5;
        this.height = this.spriteHeight / 2.5;
        this.x = Math.random() * (canvas.width - this.width);
        this.y = Math.random() * (canvas.height - this.height);
        this.frame = 0;
        this.numFrames = 6;
        this.flapSpeed = Math.floor(Math.random() * 2 + 2);
    }

    update() {
        this.x += Math.random() * 5 - 2.5;
        this.y += Math.random() * 5 - 2.5;

        if (gameFrame % this.flapSpeed === 0) {
            this.frame > this.numFrames - 2 ? this.frame = 0 : this.frame++;
        }

    }

    draw() {
        // ctx.strokeRect(this.x, this.y, this.width, this.height);
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

// Wanders/vibrates erratically in-place
class Enemy1 extends Enemy {
    constructor() {
        super();

        this.image.src = '../assets/enemy1.png';
        this.spriteWidth = 293;
        this.spriteHeight = 155;
        this.width = this.spriteWidth / 2.5;
        this.height = this.spriteHeight / 2.5;
    }
}

// Endless horizontal movement with vertical sinewave pattern
class Enemy2 extends Enemy {
    constructor() {
        super();

        this.image.src = '../assets/enemy2.png';
        this.spriteWidth = 266;
        this.spriteHeight = 188;
        this.width = this.spriteWidth / 2.5;
        this.height = this.spriteHeight / 2.5;

        this.speed = Math.random() * 4 + 1;
        this.angle = 0; // for sine-wave movement pattern
        this.angleSpeed = Math.random() * 0.2;
        this.yAmpMult = Math.random() * 7;
    }

    update() {
        this.x -= this.speed;
        this.y += Math.sin(this.angle) * this.yAmpMult;
        this.angle += this.angleSpeed;

        if (this.x + this.width < 0) {
            this.x = canvas.width;
        }

        if (gameFrame % this.flapSpeed === 0) {
            this.frame > this.numFrames - 2 ? this.frame = 0 : this.frame++;
        }
    }
}

// Moves in (co)sinusoidal pattern
class Enemy3 extends Enemy {
    constructor() {
        super();

        this.image.src = '../assets/enemy3.png';
        this.spriteWidth = 218;
        this.spriteHeight = 177;
        this.width = this.spriteWidth / 2;
        this.height = this.spriteHeight / 2;

        this.speed = 3;
        this.angle = 0;
        this.angleSpeed = Math.random() * 2 + 0.5;
        // this.amplitude = Math.random() * 100 + 100;
    }

    update() {
        this.x = /*this.amplitude*/(canvas.width/2 - this.width / 2) * Math.sin(this.angle * Math.PI/90)
         + (canvas.width / 2)
         - (this.width / 2);
        this.y = /*this.amplitude*/(canvas.height/2 - this.height / 2) * Math.cos(this.angle * Math.PI/180)
        + (canvas.height / 2)
        - (this.height / 2);

        this.angle += this.angleSpeed;

        if (this.x + this.width < 0) {
            this.x = canvas.width;
        }

        if (gameFrame % this.flapSpeed === 0) {
            this.frame > this.numFrames - 2 ? this.frame = 0 : this.frame++;
        }
    }
}

// for (let i = 0; i < numEnemies / 2; i++) {
//     enemies.push(new Enemy1());
// }

// for (let i = 0; i < numEnemies; i++) {
//     enemies.push(new Enemy2());
// }

for (let i = 0; i < numEnemies * 4; i++) {
    enemies.push(new Enemy3());
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

// animate();