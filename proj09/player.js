export class Player {
    constructor(game) {
        this.game = game;
        this.image = document.getElementById('player');
        this.width = 100;
        this.height = 91.3;
        // In this project, the source spritesheet is exactly
        // the desired w/h without scaling, but we will still use
        // separate spriteW/H properties, just in case that changes.
        this.spriteWidth = this.width;
        this.spriteHeight = this.height;
        this.xFrame = 0;
        this.yFrame = 0;
        this.x = 0;
        this.y = this.game.height - this.height;
    }

    update(inputKeys) {
        if (inputKeys.includes('ArrowRight') && !inputKeys.includes('ArrowLeft')) {
            this.x++;
        }
        else if (inputKeys.includes('ArrowLeft') && !inputKeys.includes('ArrowRight')) {
            this.x--;
        }
    }

    draw(context) {
        context.fillStyle = 'red';
        context.fillRect(
            this.x,
            this.y,
            this.width,
            this.height
        );
        context.drawImage(
            this.image,
            this.xFrame * this.spriteWidth,
            this.yFrame * this.spriteHeight,
            this.spriteWidth,
            this.spriteHeight,
            this.x,
            this.y,
            this.width,
            this.height
        );
    }
}