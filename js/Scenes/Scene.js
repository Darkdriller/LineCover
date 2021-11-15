export class Scene {
    constructor(sel) {
        this.element = document.getElementById(sel);
    }

    load() {
        this.element.style.zIndex = '20';
        this.element.style.opacity = '1';
        this.element.style.transform = 'none';
    }

    unload(dir = 1) {
        this.element.style.zIndex = '10';
        this.element.style.opacity = '0';
        this.element.style.transform = `translateY(${dir * 100}%)`;
    }
}