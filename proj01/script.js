let playerState = 'idle';
const animSelectDropdown = document.querySelector('#animations');
animSelectDropdown.addEventListener('change', (e) => {
    playerState = e.target.value;
});

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
let gameFrame = 0;
const staggerFrames = 5; // Only update the animation every staggerFrames loops of animate().

// const spriteAnims = {
//     'idle': {
//         width: 525,
//         height: 523,
//         loc: [
//             { x: 0, y: 0 },
//             ...
//         ]
//     }
// };

const spriteAnims = [];
// The order of these objects corresponds to the actual
// ordering of the images in the source spritesheet,
// so that the idxs used in forEach loop are correct.
const animationStates = [
    {
        name: 'idle',
        frames: 7,
    },
    {
        name: 'jump',
        frames: 7,
    },
    {
        name: 'fall',
        frames: 7,
    },
    {
        name: 'run',
        frames: 9,
    },
    {
        name: 'dizzy',
        frames: 11,
    },
    {
        name: 'sit',
        frames: 5,
    },
    {
        name: 'roll',
        frames: 7,
    },
    {
        name: 'bite',
        frames: 7,
    },
    {
        name: 'ko',
        frames: 12,
    },
    {
        name: 'hurt',
        frames: 4,
    },
];

animationStates.forEach((state, idx) => {
    let animData = {
        loc: [],
    };

    for (let i = 0; i < state.frames; i++) {
        let posX = i * spriteWidth;
        let posY = idx * spriteHeight;

        animData.loc.push({x: posX, y: posY});
    }

    spriteAnims[state.name] = animData;
});

const animate = () => {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // position refers to position/"index" within the spritesheet, NOT on the canvas.
    let position = Math.floor(gameFrame / staggerFrames) % (spriteAnims[playerState].loc.length - 1);
    let frameX = spriteAnims[playerState].loc[position].x;
    let frameY = spriteAnims[playerState].loc[position].y;

    // source and destination
    // ctx.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh);
    ctx.drawImage(
        playerImage,
        frameX,
        frameY,
        spriteWidth,
        spriteHeight,
        0,
        0,
        spriteWidth,
        spriteHeight
    );

    gameFrame++;

    requestAnimationFrame(animate);
};

animate();