import { StandingLeft, StandingRight } from './state.js';

class Player {
    constructor(gameWidth, gameHeight) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.states = [new StandingLeft(this), new StandingRight(this)];
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
        this.numFrames = 12;
        this.width = this.spriteWidth;
        this.height = this.spriteHeight;
        this.x = this.gameWidth / 2 - this.width / 2;
        this.y = this.gameHeight - this.height;
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

    update(input) {
        this.currentState.handleInput(input);
    }

    setState(state) {
        this.currentState = this.states[state];
        this.currentState.enter();
    }
}

export default Player;