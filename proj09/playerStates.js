import { Dust, Fire, Splash } from './particles.js';

export const states = {
    SITTING: 0,
    RUNNING: 1,
    JUMPING: 2,
    FALLING: 3,
    ROLLING: 4,
    DIVING:  5,
    HIT:     6
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
        else if (inputKeys.includes('Enter')) {
            this.player.setState(states.ROLLING);
        }
        else if (inputKeys.includes('ArrowUp')) {
            this.player.setState(states.RUNNING);
        }
    }
}

export class Running extends State {
    constructor(player) {
        super('RUNNING', player);

        this.yFrame = 3;
        this.numFrames = 9;
        this.backgroundSpeed = 0.3;
    }

    enter() {
        super.enter();
    }

    spawnDustParticle() {
        if (this.player.xFrame !== 3 && this.player.xFrame !== 6) {
            return;
        }

        // Only spawn particles during specific frames of the Running anim cycle.
        // When front feet make contact with ground, spawn near front feet.
        // When back feet make contact with ground, spawn near back feet.
        this.player.game.particles.push(new Dust(
            this.player.game,
            this.player.xFrame === 3
             ? this.player.x + this.player.width * 2 / 3
             : this.player.x + this.player.width / 3,
            this.player.y + this.player.height * 0.95
        ));
    }

    handleInput(inputKeys) {
        this.spawnDustParticle();

        if (inputKeys.includes('ArrowUp')) {
            this.player.setState(states.JUMPING);
        }
        else if (inputKeys.includes('ArrowDown')) {
            this.player.setState(states.SITTING);
        }
        else if (inputKeys.includes('Enter')) {
            this.player.setState(states.ROLLING);
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
        else if (inputKeys.includes('ArrowDown')) {
            this.player.setState(states.DIVING);
        }
        else if (inputKeys.includes('Enter')) {
            this.player.setState(states.ROLLING);
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
        else if (inputKeys.includes('ArrowDown')) {
            this.player.setState(states.DIVING);
        }
    }
}

export class Rolling extends State {
    constructor(player) {
        super('ROLLING', player);

        this.yFrame = 6;
        this.numFrames = 7;
        this.backgroundSpeed = 0.6;
    }

    enter() {
        super.enter();

        // vertical movement (jump and dive)
        if (this.player.onGround()) {
            this.player.ySpeed = this.player.yJumpImpulse;
        }
    }

    spawnFireParticle() {
        this.player.game.particles.push(new Fire(
            this.player.game,
            this.player.x + this.player.width * 0.2,
            this.player.y + this.player.height * 0.3
        ));
    }

    handleInput(inputKeys) {
        this.spawnFireParticle();

        if (inputKeys.includes('ArrowDown') && this.player.onGround()) {
            this.player.setState(states.DIVING);
        }
        else if (!inputKeys.includes('Enter')) {
            if (this.player.onGround()) {
                this.player.setState(states.RUNNING);
            }
            else {
                this.player.setState(states.FALLING);
            }
        }
        else {
            if (inputKeys.includes('ArrowUp') && this.player.onGround()) {
                this.player.ySpeed = this.player.yJumpImpulse;
            }
        }
    }
}

export class Diving extends State {
    constructor(player) {
        super('DIVING', player);

        // Diving uses same sprites as Rolling
        this.yFrame = 6;
        this.numFrames = 7;
        this.backgroundSpeed = 0;
    }

    enter() {
        super.enter();

        // diving impulse to make "smashing into ground" feel better
        this.player.ySpeed = Math.max(this.player.ySpeed, this.player.yDiveImpulse);
    }

    spawnFireParticle() {
        this.player.game.particles.push(new Fire(
            this.player.game,
            this.player.x + this.player.width * 0.2,
            this.player.y + this.player.height * 0.3
        ));
    }

    spawnSplashParticles() {
        const numSplashParticles = 30;

        for (let i = 0; i < numSplashParticles; i++) {
            this.player.game.particles.push(new Splash(
                this.player.game,
                this.player.x + this.player.width * 0.2,
                this.player.y + this.player.height * 0.5
            ));
        }
    }

    handleInput(inputKeys) {
        this.spawnFireParticle();

        if (inputKeys.includes('Enter') && this.player.onGround()) {
            this.player.setState(states.ROLLING);
            this.spawnSplashParticles();
        }
        else if (this.player.onGround()) {
            this.player.setState(states.RUNNING);
            this.spawnSplashParticles();
        }

    }
}

export class Hit extends State {
    constructor(player) {
        super('HIT', player);

        this.yFrame = 4;
        this.numFrames = 11;
        this.backgroundSpeed = 0;
        // this.numLoops = 7;
        // this.currLoops = 0;
    }

    enter() {
        super.enter();

        // diving impulse to make "smashing into ground" feel better
        this.player.ySpeed = Math.max(this.player.ySpeed, this.player.yDiveImpulse);
    }

    handleInput(inputKeys) {
        // if (this.player.xFrame >= this.numFrames - 1) {
            // this.currLoops++;
            // console.log(this.currLoops);
        // }

        // if (this.currLoops === this.numLoops) {
        if (this.player.xFrame >= this.numFrames - 1) {
            this.currLoops = 0;

            if (this.player.onGround()) {
                this.player.setState(states.RUNNING);
            }
            else {
                this.player.setState(states.FALLING);
            }
        }
        else {

        }
    }
}