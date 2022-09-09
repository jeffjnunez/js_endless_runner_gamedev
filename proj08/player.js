import {
    StandingLeft,
    StandingRight,
    SittingLeft,
    SittingRight,
    RunningLeft,
    RunningRight,
    JumpingLeft,
    JumpingRight,
    FallingLeft,
    FallingRight
} from './state.js';

class Player {
    constructor(gameWidth, gameHeight) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.states = [
            new StandingLeft(this),   // 0
            new StandingRight(this),  // 1
            new SittingLeft(this),    // 2
            new SittingRight(this),   // 3
            new RunningLeft(this),    // 4
            new RunningRight(this),   // 5
            new JumpingLeft(this),    // 6
            new JumpingRight(this),   // 7
            new FallingLeft(this),    // 8
            new FallingRight(this),   // 9
        ];
        this.currentState = this.states[0];
        this.image = document.getElementById('dogImage');
        this.imageColumns = 9;
        this.imageRows = 12;
        this.spriteWidth = this.image.width / this.imageColumns;
        this.spriteHeight = this.image.height / this.imageRows;
        console.log(this.image.width, this.imageColumns, this.spriteWidth);
        console.log(this.image.height, this.imageRows, this.spriteHeight);
        this.xFrame = 0;
        this.yFrame = 0;
        this.numXFrames = 0;
        this.frameInterval = 60;
        this.currFrameTime = 0;
        this.width = this.spriteWidth;
        this.height = this.spriteHeight;
        this.x = this.gameWidth / 2 - this.width / 2;
        this.startingY = this.gameHeight - this.height;
        this.y = this.startingY;
        this.xSpeed = 0;
        this.xMaxSpeed = 10;
        this.ySpeed = 0;
        this.yJumpImpulse = -20;
        this.weight = 0.5;
    }

    draw(context) {
        context.drawImage(
            this.image,
            this.xFrame * this.spriteWidth,
            this.yFrame * this.spriteHeight,
            this.spriteWidth,
            this.spriteHeight,
            this.x,
            this.y,
            this.width,
            this.height
        );
    }

    update(dT, input) {
        this.currentState.handleInput(input);

        // advance current animation
        this.currFrameTime += dT;
        if (this.currFrameTime > this.frameInterval) {
            this.currFrameTime -= this.frameInterval;

            this.xFrame++;
            if (this.xFrame > this.numXFrames - 1) {
                this.xFrame = 0;
            }
        }

        // horizontal movement
        this.x += this.xSpeed;
        if (this.x <= 0) {
            this.x = 0;
        }
        else if (this.x >= this.gameWidth - this.width) {
            this.x = this.gameWidth - this.width;
        }

        // vertical movement
        this.y += this.ySpeed;
        if (!this.onGround()) {
            this.ySpeed += this.weight;
        }
        else {
            this.y = this.startingY;
            this.ySpeed = 0;
        }
    }

    setState(state) {
        this.currentState = this.states[state];
        this.currentState.enter();
    }

    onGround() {
        return this.y >= this.gameHeight - this.height;
    }
}

export default Player;