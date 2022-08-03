const canvas = document.getElementById('canvas2');
const ctx = canvas.getContext('2d');

const CANVAS_WIDTH = canvas.width = 800;
const CANVAS_HEIGHT = canvas.height = 700;

let gameSpeed = 10;

const backgroundLayer1 = new Image();
backgroundLayer1.src = '../assets/layer-1.png';
const backgroundLayer2 = new Image();
backgroundLayer2.src = '../assets/layer-2.png';
const backgroundLayer3 = new Image();
backgroundLayer3.src = '../assets/layer-3.png';
const backgroundLayer4 = new Image();
backgroundLayer4.src = '../assets/layer-4.png';
const backgroundLayer5 = new Image();
backgroundLayer5.src = '../assets/layer-5.png';

class Layer {
    constructor(image, speedModifier) {
        this.x = 0;
        this.y = 0;
        this.width = 2400;
        this.height = 700;
        this.x2 = this.width;
        this.image = image;
        this.speedModifier = speedModifier;
        this.speed = gameSpeed * this.speedModifier;
    }

    update() {
        this.speed = gameSpeed * this.speedModifier;

        if (this.x <= -this.width) {
            this.x = this.width + this.x2 - this.speed;
        }

        if (this.x2 <= -this.width) {
            this.x2 = this.width + this.x - this.speed;
        }

        this.x = Math.floor(this.x - this.speed);
        this.x2 = Math.floor(this.x2 - this.speed);
    }

    draw() {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        ctx.drawImage(this.image, this.x2, this.y, this.width, this.height);
    }
}

function animate() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    layer1.update();
    layer1.draw();
    layer2.update();
    layer2.draw();
    layer3.update();
    layer3.draw();
    layer4.update();
    layer4.draw();
    layer5.update();
    layer5.draw();

    requestAnimationFrame(animate);
}

const layer1 = new Layer(backgroundLayer1, 0.1);
const layer2 = new Layer(backgroundLayer2, 0.2);
const layer3 = new Layer(backgroundLayer3, 0.3);
const layer4 = new Layer(backgroundLayer4, 0.4);
const layer5 = new Layer(backgroundLayer5, 0.5);

// animate();