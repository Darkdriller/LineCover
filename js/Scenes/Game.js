import { Scene } from './Scene.js';
import { Game } from '../Game.js';
import { Spot } from '../Spot.js';

const width = 960, height = 600;

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

        this.initializeGrid();
        this.events = [];
        document
            .getElementById('settings')
            .addEventListener('click', () => window.engine.load('options'));
        document
            .getElementById('refresh')
            .addEventListener('click', () => {
                this.game.canvas.removeEventListener('click', this.events[0]);
                this.game.gameOver = true;
                this.initializeGrid();
                this.game = new Game(width, height, this.grid);

                this.events[0] = this.game.onClick.bind(this.game);
                this.game.canvas.addEventListener('click', this.events[0]);
            });
    }

    initializeGrid() {
        const { rows, cols } = window.game;
        this.grid = Array(cols)
            .fill(null)
            .map((_, i) => Array(rows)
                .fill(null)
                .map((_, j) => new Spot(i, j, width / cols, height / rows)));
        this.addNeighbors();
    }

    addNeighbors() {
        this.grid.forEach(col => col.forEach(spot => spot.addNeighbors(this.grid)));
    }

    load(diagonalChange = false, gridChanged = false) {
        super.load();
        this.grid.forEach(col => col.forEach(spot => spot.clear()));
        if (diagonalChange) this.addNeighbors();
        if (gridChanged) this.initializeGrid();
        this.game = new Game(width, height, this.grid);

        this.events[0] = this.game.onClick.bind(this.game);
        this.game.canvas.addEventListener('click', this.events[0]);
    }

    unload() {
        super.unload(-1);
        this.game.canvas.removeEventListener('click', this.events[0]);
        this.game.gameOver = true;
        this.game = null;
    }
}