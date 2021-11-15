import { Scene } from './Scene.js';

export class OptionsScene extends Scene {
    constructor() {
        super('options');

        this.changes = {
            enableDiagonal: false,
            dimensions: false
        };
        this.addEventListeners();
    }

    addEventListeners() {
        const events = [
            {
                target: document.querySelector('.close-options'),
                event: 'click',
                callback: () => window.engine.load('game', this.changes.enableDiagonal, this.changes.dimensions)
            },
            {
                target: document.getElementById('rows'),
                event: 'change',
                callback: ({ target }) => {
                    window.game.rows = parseInt(target.value);
                    this.changes.dimensions = true;
                }
            },
            {
                target: document.getElementById('cols'),
                event: 'change',
                callback: ({ target }) => {
                    window.game.cols = parseInt(target.value);
                    this.changes.dimensions = true;
                }
            },
            {
                target: document.getElementById('frameRate'),
                event: 'change',
                callback: ({ target }) => window.game.frameRate = parseFloat(target.value)
            },
            {
                target: document.getElementById('diagonalCost'),
                event: 'change',
                callback: ({ target }) => window.game.diagonalCost = parseFloat(target.value)
            },
            {
                target: document.getElementById('enableDiagonal'),
                event: 'click',
                callback: ({ target }) => {
                    window.game.enableDiagonal = target.checked;
                    this.changes.enableDiagonal = true;
                }
            }
        ];

        events.forEach(({ target, event, callback }) => {
            target.addEventListener(event, callback);
        });
    }

    load() {
        super.load();
        document.getElementById('rows').value = window.game.rows;
        document.getElementById('cols').value = window.game.cols;
        document.getElementById('frameRate').value = window.game.frameRate;
        document.getElementById('diagonalCost').value = window.game.diagonalCost;
        document.getElementById('enableDiagonal').checked = window.game.enableDiagonal;
    }
}