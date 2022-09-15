const states = {
    SITTING: 0,
    RUNNING: 1,
    JUMPING: 2
};

class State {
    constructor(state, player) {
        this.state = state;
        this.player = player;
    }

    enter() {
        this.player.yFrame = this.yFrame;
    }

    // handleInput(inputKeys) {

    // }
}

export class Sitting extends State {
    constructor(player) {
        super('SITTING', player);

        this.yFrame = 5;
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

        this.yFrame = 0;
    }

    enter() {
        super.enter();
    }

    handleInput(inputKeys) {
        if (!inputKeys.includes('ArrowLeft') && !inputKeys.includes('ArrowRight')) {
            this.player.setState(states.SITTING);
        }
    }
}