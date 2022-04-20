const Node = require('./Node.js');

class AStar {
    constructor(input, output) {
        this.input = String(input);
        this.end = String(output);

        this.openSet = new Set([new Node(this.input)]);
        this.closedSet = new Set;

        this.start();
    }

    start() {
        while (this.openSet.size) {
            const current = [...this.openSet].reduce((acc, c) => c.f < acc.f ? c : acc);

            this.path = [current];
            let temp = current;
            while (temp.previous) {
                this.path.push(temp.previous);
                temp = temp.previous;
            }
            if (current.value === this.end) break;

            this.closedSet.add(current.value);
            this.openSet.delete(current);

            current.neighbors().forEach(neighbor => {
                if (this.closedSet.has(neighbor.value)) return;
                const tempG = current.g + 1;

                let newPath = false;
                if (this.openSet.has(neighbor)) {
                    if (tempG < neighbor.g) {
                        neighbor.g = tempG;
                        newPath = true;
                    }
                } else {
                    neighbor.g = tempG;
                    this.openSet.add(neighbor);
                    newPath = true;
                }

                if (newPath) {
                    neighbor.h = this.heuristic(neighbor.value, this.end);
                    neighbor.f = neighbor.g + neighbor.h;
                    neighbor.previous = current;
                }
            });
        }

        console.log(this.path);
        console.log(`\n\nTotal number of steps: ${this.path.length - 1}`)
    }

    heuristic(node1, node2) {
        return parseInt(node1) - parseInt(node2);
    }
}

new AStar(...process.argv.slice(2));