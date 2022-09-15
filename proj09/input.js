export class InputHandler {
    constructor() {
        this.keys = [];

        this.keysToRegister = [
            'ArrowUp',
            'ArrowDown',
            'ArrowLeft',
            'ArrowRight',
            'Enter'
        ];

        window.addEventListener('keydown', e => {
            if (this.keysToRegister.includes(e.key) && !this.keys.includes(e.key)) {
                this.keys.push(e.key);
            }
        });

        window.addEventListener('keyup', e => {
            if (this.keysToRegister.includes(e.key)) {
                this.keys.splice(this.keys.indexOf(e.key), 1);
            }
        });
    }
}