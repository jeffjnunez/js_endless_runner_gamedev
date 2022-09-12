export class Player {
    constructor(game) {
        this.game = game;
        this.width = 100;
        this.height = 91.3;
        // In this project, the source spritesheet is exactly
        // the desired w/h without scaling, but we will still use
        // separate spriteW/H properties, just in case that changes.
        this.spriteWidth = this.width;
        this.spriteHeight = this.height;
        this.x = 0;
        this.y = 100;
    }

    update() {

    }

    draw(context) {
        context.fillRect(
            this.x,
            this.y,
            this.width,
            this.height
        );
    }
}