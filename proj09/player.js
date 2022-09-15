import {
    Sitting,
    Running
} from "./playerStates.js";

export class Player {
    constructor(game) {
        this.game = game;
        this.image = document.getElementById('player');
        this.width = 100;
        this.height = 91.3;
        // In this project, the source spritesheet is exactly
        // the desired w/h without scaling, but we will still use
        // separate spriteW/H properties, just in case that changes.
        this.spriteWidth = this.width;
        this.spriteHeight = this.height;
        this.states = [
            new Sitting(this),
            new Running(this),
        ];
        this.currentState = this.states[0];
        this.currentState.enter();
        this.xFrame = 0;
        this.yFrame = 0;
        this.xSpeed = 0;
        this.xMaxSpeed = 10;
        this.ySpeed = 0;
        this.yJumpImpulse = -28;
        this.weight = 1;
        this.xStart = 100;
        this.yStart = this.game.height - this.height;
        this.x = 0;
        this.y = this.yStart;
    }

    update(inputKeys) {
        this.currentState.handleInput(inputKeys);

        // horizontal movement
        if (inputKeys.includes('ArrowRight') && !inputKeys.includes('ArrowLeft')) {
            this.xSpeed = this.xMaxSpeed;
        }
        else if (inputKeys.includes('ArrowLeft') && !inputKeys.includes('ArrowRight')) {
            this.xSpeed = -this.xMaxSpeed;
        }
        else {
            this.xSpeed = 0;
        }
        this.x += this.xSpeed;

        //horizontal boundaries
        if (this.x < 0) {
            this.x = 0;
        }
        else if (this.x > this.game.width - this.width) {
            this.x = this.game.width - this.width;
        }

        // vertical movement (jump and dive)
        if (inputKeys.includes('ArrowUp') && this.onGround()) {
            this.ySpeed = this.yJumpImpulse;
        }
        else if (!this.onGround()) {
            this.ySpeed += this.weight;
        }
        else {
            this.y = this.yStart;
            this.ySpeed = 0;
        }
        this.y += this.ySpeed;
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

    onGround() {
        return this.y >= this.game.height - this.height;
    }

    setState(stateIndex) {
        this.currentState = this.states[stateIndex];
        this.currentState.enter();
    }
}