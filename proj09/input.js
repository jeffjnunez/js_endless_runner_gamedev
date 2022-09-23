export class InputHandler {
    constructor(game) {
        this.game = game;
        this.keys = [];

        this.keysToRegister = [
            'ArrowUp',
            'ArrowDown',
            'ArrowLeft',
            'ArrowRight',
            'Enter'
        ];

        this.debugKey = 'd';

        window.addEventListener('keydown', e => {
            if (this.keysToRegister.includes(e.key) && !this.keys.includes(e.key)) {
                this.keys.push(e.key);
            }
            else if (e.key === this.debugKey) {
                this.game.debug = !this.game.debug;
            }
        });

        window.addEventListener('keyup', e => {
            if (this.keysToRegister.includes(e.key)) {
                this.keys.splice(this.keys.indexOf(e.key), 1);
            }
        });
    }
}