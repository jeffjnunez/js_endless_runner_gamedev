const states = {
    SITTING: 0,
    RUNNING: 1,
    JUMPING: 2,
    FALLING: 3
};

class State {
    constructor(state, player) {
        this.state = state;
        this.player = player;
        this.numFrames = 0;
    }

    enter() {
        this.player.xFrame = 0;
        this.player.yFrame = this.yFrame;
        if (undefined !== this.backgroundSpeed) {
            this.player.game.backgroundSpeed = this.backgroundSpeed;
        }
    }

    // handleInput(inputKeys) {

    // }
}

export class Sitting extends State {
    constructor(player) {
        super('SITTING', player);

        this.yFrame = 5;
        this.numFrames = 5;
        this.backgroundSpeed = 0;
    }

    enter() {
        super.enter();
    }

    handleInput(inputKeys) {
        if (inputKeys.includes('ArrowLeft') || inputKeys.includes('ArrowRight')) {
            this.player.setState(states.RUNNING);
        }
    }
}

export class Running extends State {
    constructor(player) {
        super('RUNNING', player);

        this.yFrame = 3;
        this.numFrames = 9;
        this.backgroundSpeed = 3;
    }

    enter() {
        super.enter();
    }

    handleInput(inputKeys) {
        if (inputKeys.includes('ArrowUp')) {
            this.player.setState(states.JUMPING);
        }
        else if (inputKeys.includes('ArrowDown')) {
            this.player.setState(states.SITTING);
        }
    }
}

export class Jumping extends State {
    constructor(player) {
        super('JUMPING', player);

        this.yFrame = 1;
        this.numFrames = 7;
    }

    enter() {
        super.enter();

        // vertical movement (jump and dive)
        if (this.player.onGround()) {
            this.player.ySpeed = this.player.yJumpImpulse;
        }
    }

    handleInput(inputKeys) {
        if (this.player.ySpeed > 0) {
            this.player.setState(states.FALLING);
        }
    }
}

export class Falling extends State {
    constructor(player) {
        super('FALLING', player);

        this.yFrame = 2;
        this.numFrames = 7;
    }

    enter() {
        super.enter();

        // vertical movement (jump and dive)
        if (this.player.onGround()) {
            this.player.ySpeed = this.player.yJumpImpulse;
        }
    }

    handleInput(inputKeys) {
        if (this.player.onGround()) {
            this.player.setState(states.RUNNING);
        }
    }
}