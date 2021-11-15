class PubSub {
    constructor() {
        this.events = [];
    }

    broadcast(event) {
        this.events[event]?.forEach(callback => callback());
    }

    on(event, callback) {
        if (!this.events[event]) this.events[event] = [];
        this.events[event].push(callback);
    }

    off(event, callback = null) {
        if (!this.events[event]) return;

        if (!callback) delete this.events[event];
        else this.events[event] = this.events[event].filter(cb => cb !== callback);
    }
}

export const events = new PubSub;