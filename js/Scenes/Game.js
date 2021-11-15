import { Scene } from './Scene.js';
import { Game } from '../Game.js';

export class GameScene extends Scene {
    constructor() {
        super('game');

        window.game = {
            rows: 20,
            cols: 34,
            frameRate: 2,
            diagonalCost: 1,
            enableDiagonal: true
        }

        this.events = [];
        document
            .querySelector('.options')
            .addEventListener('click', () => window.engine.load('options'));
    }

    load() {
        super.load();
        this.game = new Game();

        this.events[0] = this.game.onClick.bind(this.game);
        this.game.canvas.addEventListener('click', this.events[0]);
    }

    unload() {
        super.unload(-1);
        this.game.canvas.removeEventListener('click', this.events[0]);
        this.game = null;
    }
}