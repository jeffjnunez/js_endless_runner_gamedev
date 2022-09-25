class Particle {
    constructor(game) {
        this.game = game;
        this.markedForDeletion = false;
    }

    update(dT) {
        this.x -= this.xSpeed + this.game.backgroundSpeed;
        this.y -= this.ySpeed;

        this.size *= 0.97;
        if (this.size < 0.5) {
            this.markedForDeletion = true;
        }
    }

    // draw() {

    // }
}

export class Dust extends Particle {
    constructor(game, x, y) {
        super(game);

        this.size = Math.random() * 4 + 4;
        this.x = x;
        this.y = y;
        this.xSpeed = Math.random();
        this.ySpeed = Math.random();
        this.color = 'black';
    }

    draw(context) {
        context.beginPath();
        context.arc(
            this.x,
            this.y,
            this.size,
            0,
            Math.PI * 2
        );
        context.fillStyle = this.color;
        context.fill();
    }
}

export class Splash extends Particle {
    constructor(game, x, y) {

    }
}

export class Fire extends Particle {
    constructor(game, x, y) {

    }
}