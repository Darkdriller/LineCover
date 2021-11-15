import { Engine } from './Engine.js';
import { GameScene } from "./Scenes/Game.js";
import { OptionsScene } from "./Scenes/Options.js";

const initial = 'game', args = [];

window.engine = new Engine({
    game: new GameScene,
    options: new OptionsScene
}, initial, args);