import { Scene } from './Scene.js';

export class OptionsScene extends Scene {
    constructor() {
        super('options');

        document
            .querySelector('.close-options')
            .addEventListener('click', () => window.engine.load('game'));
    }
}