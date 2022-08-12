const canvas = document.getElementById('canvas5');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

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
        this.x = canvas.width;
        this.y = Math.random() * (canvas.height - this.height);
    }

    update(dT) {
        this.x -= this.xSpeed;

        if (this.x < 0 - this.width) {
            this.markedForDeletion = true;
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

const animate = timestamp => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let dT = timestamp - lastTimestamp; // delta time
    lastTimestamp = timestamp;
    timeToNextRaven += dT;

    if (timeToNextRaven > ravenSpawnInterval) {
        timeToNextRaven -= ravenSpawnInterval;

        ravens.push(new Raven());
    }

    ravens.forEach(raven => {
        raven.update(dT);
        raven.updateAnim(dT);
        raven.draw();
    });

    // console.log(ravens.length);

    // Remove all the ravens that are marked for delete.
    ravens = ravens.filter(raven => !raven.markedForDeletion);

    requestAnimationFrame(animate);
};

animate(0);