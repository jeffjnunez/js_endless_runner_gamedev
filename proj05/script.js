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
        this.width = 100;
        this.height = 50;
        this.x = canvas.width;
        this.y = Math.random() * (canvas.height - this.height);
        this.xSpeed = Math.random() * 5 + 3;
        this.ySpeed = Math.random() * 5 - 2.5;
        this.markedForDeletion = false;
    }

    update() {
        this.x -= this.xSpeed;

        if (this.x < 0 - this.width) {
            this.markedForDeletion = true;
        }
    }

    draw() {
        ctx.fillRect(this.x, this.y, this.width, this.height);
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
        raven.update();
        raven.draw();
    });

    // console.log(ravens.length);

    // Remove all the ravens that are marked for delete.
    ravens = ravens.filter(raven => !raven.markedForDeletion);

    requestAnimationFrame(animate);
};

// animate(0);