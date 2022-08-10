/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas4');
const ctx = canvas.getContext('2d');
canvas.width = 500;
canvas.height = 700;

const explosions = [];
let canvasPos = canvas.getBoundingClientRect();

class Explosion {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.image = new Image();
        this.image.src = '../assets/boom.png';
        this.frame = 0;
        this.numFrames = 5;
        this.spriteWidth = 200;
        this.spriteHeight = 179;
        this.width = this.spriteWidth / 2;
        this.height = this.spriteHeight / 2;
    }

    update() {
        this.frame++;
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
            this.width,
            this.height
        );
    }
}

const boomTest = new Explosion(30, 70);
// console.log(boomTest.image.src);
// boomTest.draw();


const animate = () => {
    boomTest.update();
    boomTest.draw();

    requestAnimationFrame(animate);

    // console.log(boomTest.frame);
}

// animate();

window.addEventListener('click', (e) => {
    // console.log(e);
    ctx.fillStyle = 'white';
    const rectX = 40;
    const rectY = 36;
    ctx.fillRect(
        e.x - canvasPos.x - rectX * 0.5,
        e.y - canvasPos.y - rectY * 0.5,
        rectX,
        rectY
    );
});