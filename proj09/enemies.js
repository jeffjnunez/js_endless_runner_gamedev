class Enemy {
    constructor() {
        this.xFrame = 0;
        this.yFrame = 0;
        this.animFPS = 15;
        this.frameInterval = 1000 / this.animFPS;
        this.frameTime;
    }

    update(dT) {
        // movement
        this.x += this.xSpeed * dT;
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
    }

    draw(context) {
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
        super();

        this.game = game;
        this.width = 60;
        this.height = 44;
        this.spriteWidth = this.width;
        this.spriteHeight = this.height;
        this.x = this.game.width;
        this.y = Math.random() * this.game.height * 0.5;
        this.xSpeed = -0.1;
        this.ySpeed = 0;
        this.image = document.getElementById('enemy_fly');
        this.numFrames = 6;
    }

    update(dT) {
        super.update(dT);


    }
}

export class GroundEnemy extends Enemy {

}

export class ClimbingEnemy extends Enemy {

}