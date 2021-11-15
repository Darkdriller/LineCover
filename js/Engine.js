export class Engine {
    constructor(scenes, initial, args = []) {
        this.scenes = scenes;
        this.load(initial, ...args);
    }

    load(scene, ...args) {
        if (this.currentScene === scene) return;

        if (this.current) this.current.unload();

        this.current = this.scenes[scene];
        this.currentScene = scene;
        this.current.load(...args);
    }
}