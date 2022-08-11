/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas4');
const ctx = canvas.getContext('2d');
canvas.width = 500;
canvas.height = 700;

const explosions = [];
let canvasPos = canvas.getBoundingClientRect();

class Explosion {
    constructor(x, y) {
        this.image = new Image();
        this.image.src = '../assets/boom.png';
        this.frame = 0;
        this.numFrames = 5;
        this.timer = 0;
        this.spriteWidth = 200;
        this.spriteHeight = 179;
        this.width = this.spriteWidth * 0.7;
        this.height = this.spriteHeight * 0.7;
        this.x = x;
        this.y = y;
        this.angle = Math.random() * 6.2;
        this.sound = new Audio();
        this.sound.src = '../assets/boom6.wav';
    }

    update() {
        // Do nothing; position is not being updated currently.
    }

    updateAnim() {
        if (this.frame === 0) {
            this.sound.play();
        }

        this.timer++;

        if (this.timer % 10 === 0) {
            this.frame++;
        }
    }

    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);

        ctx.drawImage(
            this.image,
            this.frame * this.spriteWidth,
            0,
            this.spriteWidth,
            this.spriteHeight,
            0 - this.width / 2,
            0 - this.height / 2,
            this.width,
            this.height
        );

        ctx.restore();
    }
}

window.addEventListener('click', (e) => {
    createAnimation(e);
});

// window.addEventListener('mousemove', (e) => {
//     createAnimation(e);
// });

const createAnimation = e => {
    let posX = e.x - canvasPos.left;
    let posY = e.y - canvasPos.top;

    explosions.push(new Explosion(posX, posY));
};

let numAnimLoops = 0;
const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    explosions.forEach((explosion, idx) => {
        explosion.update();
        explosion.updateAnim();
        explosion.draw();

        if (explosion.frame > 5) {
            explosions.splice(idx, 1);
        }
    });

    requestAnimationFrame(animate);
};

animate();