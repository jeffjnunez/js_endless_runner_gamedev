class Enemy {
    constructor(game) {
        this.game = game;
        this.xFrame = 0;
        this.yFrame = 0;
        this.animFPS = 15;
        this.frameInterval = 1000 / this.animFPS;
        this.frameTime = 0;
        this.markedForDeletion = false;
    }

    update(dT) {
        // movement
        this.x += (this.xSpeed - this.game.backgroundSpeed) * dT;
        this.y += this.ySpeed * dT;

        // sprite animations
        this.frameTime += dT;
        if (this.frameTime > this.frameInterval) {
            this.frameTime -= this.frameInterval;

            this.xFrame++;
            if (this.xFrame > this.numFrames - 1) {
                this.xFrame = 0;
            }
        }

        // delete old enemies
        if (this.x + this.width < 0) {
            this.markedForDeletion = true;
        }
    }

    draw(context) {
        if (this.game.debug) {
            context.strokeRect(this.x, this.y, this.width, this.height);
        }

        context.drawImage(
            this.image,
            this.xFrame * this.spriteWidth,
            0,
            this.spriteWidth,
            this.spriteHeight,
            this.x,
            this.y,
            this.width,
            this.height
        );
    }
}

export class FlyingEnemy extends Enemy {
    constructor(game) {
        super(game);

        this.width = 60;
        this.height = 44;
        this.image = document.getElementById('enemy_fly');
        this.numFrames = 6;
        this.spriteWidth = this.width;
        this.spriteHeight = this.height;
        this.x = this.game.width;
        this.y = Math.random() * this.game.height * 0.5;
        this.xSpeed = -1 * (Math.random() * 0.1 + 0.05);
        this.ySpeed = 0;
        this.angle = 0;
        this.angularSpeed = Math.random() * 0.01 + 0.02;
        this.amplitude = Math.random() * 0.5 + 0.75;
    }

    update(dT) {
        super.update(dT);

        this.angle += this.angularSpeed;
        this.y += Math.sin(this.angle) * this.amplitude;
    }
}

export class GroundEnemy extends Enemy {
    constructor(game) {
        super(game);

        this.width = 60;
        this.height = 87;
        this.image = document.getElementById('enemy_plant');
        this.numFrames = 2;
        this.spriteWidth = this.width;
        this.spriteHeight = this.height;
        this.x = this.game.width;
        this.y = this.game.height - this.height - this.game.groundMargin;
        this.xSpeed = 0;
        this.ySpeed = 0;
        this.animFPS = 5;
        this.frameInterval = 1000 / this.animFPS;
        // console.log(this.animFPS, this.frameInterval, this.frameTime);
    }

    // update() {
    //
    // }
}

export class ClimbingEnemy extends Enemy {
    constructor(game) {
        super(game);

        this.width = 120;
        this.height = 144;
        this.image = document.getElementById('enemy_spider');
        this.numFrames = 6;
        this.spriteWidth = this.width;
        this.spriteHeight = this.height;
        this.x = this.game.width;
        this.y = Math.random() * this.game.height * 0.5;
        this.xSpeed = 0;
        this.ySpeed = Math.random() > 0.5 ? 0.2 : -0.2;
        // this.animFPS = 5;
        // this.frameInterval = 1000 / this.animFPS;
    }

    update(dT) {
        super.update(dT);

        if (this.y < 0 || this.y > this.game.height - this.height - this.game.groundMargin) {
            this.ySpeed *= -1;
        }
    }

    draw(context) {
        super.draw(context);

        // draw web
        context.beginPath();
        context.moveTo(this.x + this.width / 2, 0);
        context.lineTo(this.x + this.width / 2, this.y + this.height / 3);
        context.stroke();
    }
}