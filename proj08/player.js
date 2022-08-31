class Player {
    constructor(gameWidth, gameHeight) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.states = [];
        this.currentState = this.states[0];
        this.image = document.getElementById('dogImage');
        this.imageColumns = 9;
        this.imageRows = 12;
        this.spriteWidth = this.image.width / this.imageColumns;
        this.spriteHeight = this.image.height / this.imageRows;
        console.log(this.image.width, this.imageColumns, this.spriteWidth);
        console.log(this.image.height, this.imageRows, this.spriteHeight);
        this.frame = 0;
        this.numFrames = 12;
        this.width = this.spriteWidth;
        this.height = this.spriteHeight;
        this.x = 0;
        this.y = 0;
    }

    draw(context) {
        context.drawImage(
            this.image,
            this.frame * this.spriteWidth,
            0 * this.spriteHeight,
            this.spriteWidth,
            this.spriteHeight,
            this.x,
            this.y,
            this.width,
            this.height
        );
    }
}

export default Player;