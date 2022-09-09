export const states = {
    STANDING_LEFT: 0,
    STANDING_RIGHT: 1,
    SITTING_LEFT: 2,
    SITTING_RIGHT: 3,
    RUNNING_LEFT: 4,
    RUNNING_RIGHT: 5,
    JUMPING_LEFT: 6,
    JUMPING_RIGHT: 7,
    FALLING_LEFT: 8,
    FALLING_RIGHT: 9,
};

class State {
    constructor(state, player) {
        this.state = state;
        this.player = player;
    }

    enter() {
        this.player.xFrame = 0;
        this.player.yFrame = this.yFrame;
        this.player.numXFrames = this.numXFrames;
    }
}

export class StandingLeft extends State {
    constructor(player) {
        super('STANDING_LEFT', player);
        this.yFrame = 1;
        this.numXFrames = 7;
    }

    enter() {
        super.enter();

        this.player.xSpeed = 0;
        this.y = this.startingY;
        this.ySpeed = 0;
    }

    handleInput(input) {
        if (input === 'PRESS left') {
            this.player.setState(states.RUNNING_LEFT);
        }
        else if (input === 'PRESS right') {
            this.player.setState(states.RUNNING_RIGHT);
        }
        else if (input === 'PRESS up') {
            this.player.setState(states.JUMPING_LEFT);
        }
        else if (input === 'PRESS down') {
            this.player.setState(states.SITTING_LEFT);
        }
    }
}

export class StandingRight extends State {
    constructor(player) {
        super('STANDING_RIGHT', player);
        this.yFrame = 0;
        this.numXFrames = 7;
    }

    enter() {
        super.enter();

        this.player.xSpeed = 0;
        this.y = this.startingY;
        this.ySpeed = 0;
    }

    handleInput(input) {
        if (input === 'PRESS right') {
            this.player.setState(states.RUNNING_RIGHT);
        }
        else if (input === 'PRESS left') {
            this.player.setState(states.RUNNING_LEFT);
        }
        else if (input === 'PRESS up') {
            this.player.setState(states.JUMPING_RIGHT);
        }
        else if (input === 'PRESS down') {
            this.player.setState(states.SITTING_RIGHT);
        }
    }
}

export class SittingLeft extends State {
    constructor(player) {
        super('SITTING_LEFT', player);
        this.yFrame = 9;
        this.numXFrames = 5;
    }

    enter() {
        super.enter();

        this.player.xSpeed = 0;
    }

    handleInput(input) {
        if (input === 'PRESS right') {
            this.player.setState(states.SITTING_RIGHT);
        }
        else if (input === 'RELEASE down') {
            this.player.setState(states.STANDING_LEFT);
        }
    }
}

export class SittingRight extends State {
    constructor(player) {
        super('SITTING_RIGHT', player);
        this.yFrame = 8;
        this.numXFrames = 5;
    }

    enter() {
        super.enter();

        this.player.xSpeed = 0;
    }

    handleInput(input) {
        if (input === 'PRESS left') {
            this.player.setState(states.SITTING_LEFT);
        }
        else if (input === 'RELEASE down') {
            this.player.setState(states.STANDING_RIGHT);
        }
    }
}

export class RunningLeft extends State {
    constructor(player) {
        super('RUNNING_LEFT', player);
        this.yFrame = 7;
        this.numXFrames = 9;
    }

    enter() {
        super.enter();

        this.player.xSpeed = -this.player.xMaxSpeed;
    }

    handleInput(input) {
        if (input === 'PRESS right') {
            this.player.setState(states.RUNNING_RIGHT);
        }
        else if (input === 'RELEASE left') {
            this.player.setState(states.STANDING_LEFT);
        }
        else if (input === 'PRESS up') {
            this.player.setState(states.JUMPING_LEFT);
        }
        else if (input === 'PRESS down') {
            this.player.setState(states.SITTING_LEFT);
        }
    }
}

export class RunningRight extends State {
    constructor(player) {
        super('RUNNING_RIGHT', player);
        this.yFrame = 6;
        this.numXFrames = 9;
    }

    enter() {
        super.enter();

        this.player.xSpeed = this.player.xMaxSpeed;
    }

    handleInput(input) {
        if (input === 'PRESS left') {
            this.player.setState(states.RUNNING_LEFT);
        }
        else if (input === 'RELEASE right') {
            this.player.setState(states.STANDING_RIGHT);
        }
        else if (input === 'PRESS up') {
            this.player.setState(states.JUMPING_RIGHT);
        }
        else if (input === 'PRESS down') {
            this.player.setState(states.SITTING_RIGHT);
        }
    }
}

export class JumpingLeft extends State {
    constructor(player) {
        super('JUMPING_LEFT', player);
        this.yFrame = 3;
        this.numXFrames = 7;
    }

    enter() {
        super.enter();

        this.player.xSpeed = -this.player.xMaxSpeed * 0.5;
        if (this.player.onGround()) {
            this.player.ySpeed += this.player.yJumpImpulse;
        }
    }

    handleInput(input) {
        if (this.player.onGround()) {
            this.player.setState(states.STANDING_LEFT);
        }
        else if (this.player.ySpeed > 0) {
            this.player.setState(states.FALLING_LEFT);
        }
        else if (input === 'PRESS right') {
            this.player.setState(states.JUMPING_RIGHT);
        }
    }
}

export class JumpingRight extends State {
    constructor(player) {
        super('JUMPING_RIGHT', player);
        this.yFrame = 2;
        this.numXFrames = 7;
    }

    enter() {
        super.enter();

        this.player.xSpeed = this.player.xMaxSpeed * 0.5;
        if (this.player.onGround()) {
            this.player.ySpeed += this.player.yJumpImpulse;
        }
    }

    handleInput(input) {
        if (this.player.onGround()) {
            this.player.setState(states.STANDING_RIGHT);
        }
        else if (this.player.ySpeed > 0) {
            this.player.setState(states.FALLING_RIGHT);
        }
        else if (input === 'PRESS left') {
            this.player.setState(states.JUMPING_LEFT);
        }
    }
}

export class FallingLeft extends State {
    constructor(player) {
        super('FALLING_LEFT', player);
        this.yFrame = 5;
        this.numXFrames = 7;
    }

    enter() {
        super.enter();

        this.player.xSpeed = -this.player.xMaxSpeed * 0.5;
    }

    handleInput(input) {
        if (this.player.onGround()) {
            this.player.setState(states.STANDING_LEFT);
        }
        else if (input === 'PRESS right') {
            this.player.setState(states.FALLING_RIGHT);
        }
    }
}

export class FallingRight extends State {
    constructor(player) {
        super('FALLING_RIGHT', player);
        this.yFrame = 4;
        this.numXFrames = 7;
    }

    enter() {
        super.enter();

        this.player.xSpeed = this.player.xMaxSpeed * 0.5;
    }

    handleInput(input) {
        if (this.player.onGround()) {
            this.player.setState(states.STANDING_RIGHT);
        }
        else if (input === 'PRESS left') {
            this.player.setState(states.FALLING_LEFT);
        }
    }
}

export default State;