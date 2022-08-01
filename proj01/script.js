const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

const CANVAS_WIDTH = canvas.width = 600;
const CANVAS_HEIGHT = canvas.height = 600;

const playerImage = new Image();
playerImage.src = '../assets/shadow_dog.png';
// source image width: 6876, 12 columns; 6876 / 12 == 573,
// but final column is smaller in this particular image
const spriteWidth = 575;
const spriteHeight = 523; // 5230px / 10 rows
let frameX = 0;
let frameY = 4;
let gameFrame = 0;
const staggerFrames = 5; // Only update the animation every staggerFrames loops of animate().

const animate = () => {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    // ctx.fillRect(50, 50, 100, 100);

    // 3, 5, or 9 arguments can be passed to drawImage.
    // ctx.drawImage(playerImage, 0, 0);
    // ctx.drawImage(playerImage, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // source and destination
    // ctx.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh);
    ctx.drawImage(
        playerImage,
        frameX * spriteWidth,
        frameY * spriteHeight,
        spriteWidth,
        spriteHeight,
        0,
        0,
        spriteWidth,
        spriteHeight
    );

    if (gameFrame % 5 === 0) {
        if (frameX < 10) {
            frameX++;
        }
        else {
            frameX = 0;
        }
    }


    gameFrame++;

    requestAnimationFrame(animate);
};

animate();