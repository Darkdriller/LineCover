class Node {
    constructor(num) {
        this.value = num;

        this.f = 0;
        this.g = 0;
        this.h = 0;
    }

    neighbors() {
        const n = this.value.length;
        const neighbors = [];
        for (let i = 1; i < n; i++) {
            for (let j = 1; j < n - i + 1; j++) {
                neighbors.push(
                    new Node(
                        this.value.slice(i, n - j + 1) +
                        this.value.slice(0, i) +
                        this.value.slice(n - j + 1)
                    )
                )
            }
        }
        return neighbors;
    }
}

module.exports = Node;