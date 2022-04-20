class Node {
    constructor(num) {
        this.value = num;

        this.f = 0;
        this.g = 0;
        this.h = 0;
    }

    neighbors() {
        const neighbors = [];
        for (let i = 0; i < this.value.length - 2; i++) {
            neighbors.push(
                new Node(
                    this.value.slice(i + 1) +
                    this.value.slice(0, i + 1)
                )
            )
        }
        return neighbors;
    }
}

module.exports = Node;