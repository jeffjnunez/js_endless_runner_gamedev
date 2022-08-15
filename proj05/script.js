/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas5');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx.font = '40px Impact';


/** @type {HTMLCanvasElement} */
const collCanvas = document.getElementById('collisionCanvas');
const collCtx = collCanvas.getContext('2d');
collCanvas.width = window.innerWidth;
collCanvas.height = window.innerHeight;
// collCtx.font = '40px Impact';


let gameOver = false;
let score = 0;
let timeToNextRaven = 0;
let ravenSpawnInterval = 500; // milliseconds
let lastTimestamp = 0;

// Using let instead of const so we can reassign a filtered ravens array to the variable.
let ravens = [];

class Raven {
    constructor() {
        this.xSpeed = Math.random() * 5 + 3;
        this.ySpeed = Math.random() * 5 - 2.5;
        this.markedForDeletion = false;
        this.image = new Image();
        this.image.src = '../assets/raven.png';
        this.spriteWidth = 271;
        this.spriteHeight = 194;
        this.sizeModifier = Math.random() * 0.6 + 0.4;
        this.width = this.spriteWidth * this.sizeModifier;
        this.height = this.spriteHeight * this.sizeModifier;
        this.frame = 0;
        this.numFrames = 6;
        this.timeSinceFlap = 0;
        this.flapInterval = Math.random() * 30 + 70;
        this.randomColors = [
            Math.floor(Math.random() * 255),
            Math.floor(Math.random() * 255),
            Math.floor(Math.random() * 255)
        ];
        this.color = 'rgb(' + this.randomColors[0] + ',' + this.randomColors[1] + ',' + this.randomColors[2] + ')';
        this.x = canvas.width;
        this.y = Math.random() * (canvas.height - this.height);
    }

    update(dT) {
        this.x -= this.xSpeed;

        if (this.y < 0 || this.y > canvas.height - this.height) {
            this.ySpeed *= -1;
        }
        this.y += this.ySpeed;

        if (this.x < 0 - this.width) {
            this.markedForDeletion = true;
        }

        if (this.x < 0 - this.width) {
            gameOver = true;
        }
    }

    updateAnim(dT) {
        this.timeSinceFlap += dT;

        if (this.timeSinceFlap > this.flapInterval) {
            this.timeSinceFlap -= this.flapInterval;

            this.frame++;
            if (this.frame > this.numFrames - 1) {
                this.frame = 0;
            }
        }
    }

    draw() {
        // ctx.strokeRect(this.x, this.y, this.width, this.height);
        collCtx.fillStyle = this.color;
        collCtx.fillRect(this.x, this.y, this.width, this.height);
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

let explosions = [];

class Explosion {
    constructor(x, y, size) {
        this.markedForDeletion = false;
        this.image = new Image();
        this.image.src = '../assets/boom.png';
        this.spriteWidth = 200;
        this.spriteHeight = 179;
        this.size = size;
        this.x = x;
        this.y = y;
        this.frame = 0;
        this.numFrames = 5;
        this.sound = new Audio();
        this.sound.src = '../assets/boom6.wav';
        this.timeSinceLastFrame = 0;
        this.frameInterval = 100;
    }

    update(dT) {
        // Do nothing (for now)
    }

    updateAnim(dT) {
        if (this.frame === 0) {
            this.sound.play();
        }

        this.timeSinceLastFrame += dT;
        if (this.timeSinceLastFrame > this.frameInterval) {
            this.timeSinceLastFrame -= this.frameInterval;
            this.frame++;
            if (this.frame > this.numFrames - 1) {
                this.markedForDeletion = true;
            }
        }
    }

    draw() {
        ctx.drawImage(
            this.image,
            this.frame * this.spriteWidth,
            0,
            this.spriteWidth,
            this.spriteHeight,
            this.x,
            this.y,
            this.size,
            this.size);
    }
}

const drawScore = () => {
    ctx.fillStyle = 'black';
    ctx.fillText('Score: ' + score, 53, 78); // "drop shadow"
    ctx.fillStyle = 'white';
    ctx.fillText('Score: ' + score, 50, 75);
}

const drawGameOver = () => {
    ctx.textAlign = 'center';
    ctx.fillStyle = 'black';
    ctx.fillText(
        'GAME OVER, your score is ' + score,
        canvas.width / 2 + 3,
        canvas.height / 2 + 3
    );
    ctx.fillStyle = 'white';
    ctx.fillText(
        'GAME OVER, your score is ' + score,
        canvas.width / 2,
        canvas.height / 2
    );
}

window.addEventListener('click', (e) => {
    const detectPixelColor = collCtx.getImageData(e.x, e.y, 1, 1);
    const pc = detectPixelColor.data;

    ravens.forEach(raven => {
        if (raven.randomColors[0] === pc[0] &&
            raven.randomColors[1] === pc[1] &&
            raven.randomColors[2] === pc[2]
        ) {
            raven.markedForDeletion = true;
            score++;

            explosions.push(new Explosion(raven.x - raven.width / 8, raven.y - raven.width / 6, raven.width));
        }
    });
});

const animate = timestamp => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    collCtx.clearRect(0, 0, canvas.width, canvas.height);
    let dT = timestamp - lastTimestamp; // delta time
    lastTimestamp = timestamp;
    timeToNextRaven += dT;

    if (timeToNextRaven > ravenSpawnInterval) {
        timeToNextRaven -= ravenSpawnInterval;

        ravens.push(new Raven());

        ravens.sort((a, b) => {
            return a.sizeModifier - b.sizeModifier;
        });
    }

    drawScore();
    [...ravens, ...explosions].forEach(object => {
        object.update(dT);
        object.updateAnim(dT);
        object.draw();
    });

    // console.log(ravens.length);

    // Remove all the ravens that are marked for delete.
    ravens = ravens.filter(raven => !raven.markedForDeletion);
    explosions = explosions.filter(explosion => !explosion.markedForDeletion);

    if (!gameOver) {
        requestAnimationFrame(animate);
    }
    else {
        drawGameOver();
    }
};

animate(0);