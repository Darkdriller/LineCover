const Node = require('./Node.js');

class AStar {
    constructor(input) {
        this.input = String(input);

        this.openSet = new Set([new Node(this.input)]);
        this.closedSet = new Set;

        this.start();
    }

    start() {
        const start = Date.now();
        let current = null;
        while (this.openSet.size) {
            current = [...this.openSet].reduce((acc, c) => c.f < acc.f ? c : acc);

            if (this.isEnd(current.value)) break;

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

        this.path = [current];
        let temp = current;
        while (temp?.previous) {
            this.path.push(temp.previous);
            temp = temp.previous;
        }

        console.log(this.path);
        console.log(`\nSimplified path: ${this.path.map(i => i.value).join(' -> ')}`)
        console.log(`\n\nTime taken: ${(Date.now() - start) / 1000}s`);
        console.log(`\nTotal number of steps: ${this.path.length - 1}`);
        console.log(`Input: ${this.input}\nOutput: ${this.path[0].value}`);
    }

    isEnd(value) {
        for (let i = 0; i < value.length - 1; i++) {
            if (Number(value[i]) > Number(value[i + 1]))
                return false;
        }

        return true;
    }

    heuristic(value) {
        let count = 0;
        for (let i = 0; i < value.length - 1; i++)
            // count += Number(value[i] > Number(value[i + 1])) // just normal
            // count += (Number(value[i]) > Number(value[i + 1]) ? 1 + i : 0); // constantly increasing graph
            // count += (Number(value[i]) > Number(value[i + 1]) ? 1 + 1/i : 0); // inverse
            count += (Number(value[i]) > Number(value[i + 1]) ? 1 + value.length - i : 0); // constantly decreasing graph

        return count;
    }
}

new AStar(...process.argv.slice(2));