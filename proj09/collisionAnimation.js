export class CollisionAnimation {
    constructor(game, x, y) {
        this.game = game;
        this.image = document.getElementById('collisionAnimation');
        this.spriteWidth = 200;
        this.spriteHeight = 179;
        this.sizeMult = Math.random() * 0.5 + 0.25;
        this.width = this.spriteWidth * this.sizeMult;
        this.height = this.spriteHeight * this.sizeMult;
        this.x = x - this.width * 0.5;
        this.y = y - this.height * 0.5;
        this.xFrame = 0;
        this.numFrames = 5;
        this.animFPS = 10;
        this.frameInterval = 1000 / this.animFPS;
        this.frameTimer = 0;
        this.markedForDeletion = false;
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

    update(dT) {
        this.x -= this.game.backgroundSpeed * dT;

        this.frameTimer += dT;
        if (this.frameTimer > this.frameInterval) {
            this.frameTimer -= this.frameInterval;

            this.xFrame++;
            if (this.xFrame > this.numFrames - 1) {
                this.markedForDeletion = true;
            }
        }
    }
}