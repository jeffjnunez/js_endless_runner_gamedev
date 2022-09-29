export class UI {
    constructor(game) {
        this.game = game;
        this.fontSize = 30;
        this.fontFamily = 'Bangers';
        this.fontFamilyGameOver = 'Creepster';
    }

    draw(context) {
        context.save();

        context.shadowOffsetX = 2;
        context.shadowOffsetY = 2;
        context.shadowColor = 'white';
        context.shadowBlur = 0;

        context.font = this.fontSize + 'px ' + this.fontFamily;
        context.textAlign = 'left';
        context.fillStyle = this.game.fontColor;

        // score
        context.fillText(
            'Score: ' + this.game.score,
            20,
            50
        );

        // timer
        context.font = this.fontSize * 0.8 + 'px ' + this.fontFamily;
        context.fillText(
            'Time: ' + (this.game.time * 0.001).toFixed(1),
            20,
            80
        );

        // game over messages
        if (this.game.gameOver) {
            context.textAlign = 'center';
            context.font = this.fontSize * 2 + 'px ' + this.fontFamilyGameOver;

            if (this.game.victory) {
                this.drawVictoryText(context);
            }
            else {
                this.drawDefeatText(context);
            }
        }

        context.restore();
    }

    drawVictoryText(context) {
        context.fillText(
            'Congratulations',
            this.game.width * 0.5,
            this.game.height * 0.45
        );
        context.font = this.fontSize * 0.8 + 'px ' + this.fontFamily;
        context.fillText(
            'You Win!',
            this.game.width * 0.5,
            this.game.height * 0.55
        );
    }

    drawDefeatText(context) {
        context.fillText(
            'You Lose',
            this.game.width * 0.5,
            this.game.height * 0.45
        );
        context.font = this.fontSize * 0.8 + 'px ' + this.fontFamilyGameOver;
        context.fillText(
            'Please try again',
            this.game.width * 0.5,
            this.game.height * 0.55
        );
    }
}