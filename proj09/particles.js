class Particle {
    constructor(game) {
        this.game = game;
        this.markedForDeletion = false;
    }

    update(dT) {
        this.x -= this.xSpeed + this.game.backgroundSpeed;
        this.y -= this.ySpeed;

        this.size *= this.shrinkingFactor;
        if (this.size < this.minSize) {
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
        this.shrinkingFactor = 0.97;
        this.minSize = 0.5;
        this.x = x;
        this.y = y;
        this.xSpeed = Math.random();
        this.ySpeed = Math.random();
        this.color = 'black';
    }

    draw(context) {
        // context.globalAlpha = 1;
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
        super(game);

        this.image = document.getElementById('fire');
        this.spriteWidth = 100;
        this.spriteHeight = 90;
        this.sizeMult = Math.random() * 0.25 + 0.45;
        this.shrinkingFactor = 0.98;
        this.minSize = 0.2;
        this.size = 1; // a coefficient for width and height
        this.width = this.spriteWidth * this.sizeMult;
        this.height = this.spriteHeight * this.sizeMult;
        this.x = x;
        this.y = y;
        this.xSpeed = Math.random() * 6 - 4;
        this.ySpeed = Math.random() * 2 + 1;
        this.weight = 0.1;
        this.alpha = 1;
        this.fadingFactor = 0.0008;
    }

    update(dT) {
        super.update(dT);

        this.ySpeed -= this.weight;
        this.alpha -= this.fadingFactor * dT;
    }

    draw(context) {
        context.save();
        context.globalAlpha = Math.max(0, this.alpha);
        context.drawImage(
            this.image,
            0,
            0,
            this.spriteWidth,
            this.spriteHeight,
            this.x,
            this.y,
            this.width * this.size,
            this.height * this.size
        );
        context.restore();
    }

}

export class Fire extends Particle {
    constructor(game, x, y) {
        super(game);

        this.image = document.getElementById('fire');
        this.spriteWidth = 100;
        this.spriteHeight = 90;
        this.sizeMult = Math.random() * 0.25 + 0.45;
        this.shrinkingFactor = 0.994;
        this.minSize = 0.3;
        this.size = 1; // a coefficient for width and height
        this.width = this.spriteWidth * this.sizeMult;
        this.height = this.spriteHeight * this.sizeMult;
        this.x = x;
        this.y = y;
        this.xSpeed = 1;
        this.ySpeed = 0.4;
        this.angle = Math.random() * 180 * (Math.PI / 180);
        this.angleSpeed = Math.random() * 0.002 - 0.001;
        this.alpha = 1;
        this.fadingFactor = 0.0006;
    }

    update(dT) {
        super.update(dT);

        this.alpha -= this.fadingFactor * dT;
        this.angle += this.angleSpeed * dT;
    }

    draw(context) {
        context.save();

        context.translate(
            this.x + this.width / 2,
            this.y + this.height / 2,
        );
        context.rotate(this.angle);
        context.translate(
            (this.x + this.width / 2) * -1,
            (this.y + this.height / 2) * -1,
        );

        context.globalAlpha = Math.max(0, this.alpha);
        context.drawImage(
            this.image,
            0,
            0,
            this.spriteWidth,
            this.spriteHeight,
            this.x,
            this.y,
            this.width * this.size,
            this.height * this.size
        );

        context.restore();
    }
}