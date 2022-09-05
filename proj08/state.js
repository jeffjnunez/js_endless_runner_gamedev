export const states = {
    STANDING_LEFT: 0,
    STANDING_RIGHT: 1,
    SITTING_LEFT: 2,
    SITTING_RIGHT: 3,
};

class State {
    constructor(state) {
        this.state = state;
        console.log(states);
    }
}

export class StandingLeft extends State {
    constructor(player) {
        super('STANDING_LEFT');

        this.player = player;
    }

    enter() {
        this.player.yFrame = 1;
    }

    handleInput(input) {
        if (input === 'PRESS right') {
            this.player.setState(states.STANDING_RIGHT);
        }
        else if (input === 'PRESS down') {
            this.player.setState(states.SITTING_LEFT);
        }
    }
}

export class StandingRight extends State {
    constructor(player) {
        super('STANDING_RIGHT');

        this.player = player;
    }

    enter() {
        this.player.yFrame = 0;
    }

    handleInput(input) {
        if (input === 'PRESS left') {
            this.player.setState(states.STANDING_LEFT);
        }
        else if (input === 'PRESS down') {
            this.player.setState(states.SITTING_RIGHT);
        }
    }
}

export class SittingLeft extends State {
    constructor(player) {
        super('SITTING_LEFT');

        this.player = player;
    }

    enter() {
        this.player.yFrame = 9;
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
        super('SITTING_RIGHT');

        this.player = player;
    }

    enter() {
        this.player.yFrame = 8;
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


export default State;