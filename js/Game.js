export class Game {
    constructor(width, height, grid) {
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');

        this.canvas.width = width;
        this.canvas.height = height;

        this.dt = 1000 / window.game.frameRate;
        this.acc = 0;
        this.last = performance.now();

        this.grid = grid;
        this.start = this.end = null;
        this.openSet = new Set();
        this.closedSet = new Set();

        this.draw();
    }

    loop() {
        const now = performance.now();
        this.acc += now - this.last;
        while (this.acc > this.dt && !this.gameOver) {
            this.update();
            this.draw();
            this.acc -= this.dt;
        }

        this.last = performance.now();
        if (!this.gameOver) requestAnimationFrame(this.loop.bind(this));
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.grid.forEach(col => col.forEach(spot => spot.draw(this.ctx, 'white')));
        this.openSet.forEach(spot => spot.draw(this.ctx, '#4caf50'));
        this.closedSet.forEach(spot => spot.draw(this.ctx, '#e91e63'));

        if (this.path) {
            this.ctx.save();
            this.ctx.beginPath();
            this.ctx.lineCap = 'round';
            this.ctx.lineWidth = 7;
            this.ctx.strokeStyle = '#3f51b5';
            const { x, y, width, height } = this.path[0];
            this.ctx.moveTo(x * width + width / 2, y * height + height / 2);
            this.path.forEach(spot => spot.drawLine(this.ctx));
            this.ctx.stroke();
            this.ctx.closePath();
            this.ctx.restore();
        }
    }

    update() {
        if (this.openSet.size) {
            const current = [...this.openSet].reduce((acc, c) => c.f < acc.f ? c : acc);

            this.path = [current];
            let temp = current;
            while (temp.previous) {
                this.path.push(temp.previous);
                temp = temp.previous;
            }
            if (current === this.end) this.gameOver = true;

            this.closedSet.add(current);
            this.openSet.delete(current);

            current.neighbors.forEach(neighbor => {
                if (neighbor.wall || this.closedSet.has(neighbor)) return;
                const tempG = current.g + (current.isDiagonal(neighbor) ? window.game.diagonalCost : 1);

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
                    neighbor.h = this.heuristic(neighbor, this.end);
                    neighbor.f = neighbor.g + neighbor.h;
                    neighbor.previous = current;
                }
            });
        } else {
            this.gameOver = true;
            alert('No solution found');
        }
    }

    heuristic(a, b) {
        if (window.game.enableDiagonal)
            return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2)); // Euclidean distance - including diagonals

        return Math.abs(a.x - b.x) + Math.abs(a.y - b.y); // Manhattan distance - not considering diagonals
    }

    onClick(event) {
        const setSpot = (pos, { x, y }) => {
            this[pos] = this.grid[x][y];
            this[pos].wall = false;
        }

        if (this.gameOver) {
            this.acc = 0;
            this.openSet = new Set();
            this.closedSet = new Set();
            this.gameOver = false;
            this.start = this.end = null;
            this.path = null;
            this.grid.forEach(col => col.forEach(spot => spot.clear()));
        }

        this.grid.some(col => {
            let collision;
            col.some(spot => {
                const { x, y, width, height } = spot;

                collision = x * width < event.offsetX && event.offsetX < x * width + width &&
                    y * height < event.offsetY && event.offsetY < y * height + height;

                if (collision) {
                    if(this.start) {
                        setSpot('end', spot);
                        document.querySelector('.game-message').style.display = 'none';
                        requestAnimationFrame(this.loop.bind(this));
                    } else {
                        setSpot('start', spot);
                        this.openSet.add(this.start);
                        this.draw();
                    }

                    return true;
                }
            })

            if (collision) return true;
        });
    }
}