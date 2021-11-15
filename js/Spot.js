export class Spot {
    constructor(x, y, width, height) {
        this.f = 0;
        this.g = 0;
        this.h = 0;

        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.wall = Math.random() < 0.3;

        this.neighbors = [];
    }

    draw(ctx, color) {
        const { x, y, width: w, height: h } = this;
        if (this.wall) color = 'black';

        ctx.save();
        ctx.beginPath()
        ctx.fillStyle = color;
        ctx.ellipse(x * w + w / 2, y * h + h / 2, w / 3, h / 3, 0, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
        ctx.restore();
    }

    drawLine(ctx) {
        const { x, y, width: w, height: h } = this;
        ctx.lineTo(x * w + w / 2, y * h + h / 2);
    }

    addNeighbors(grid) {
        const { x, y } = this;

        if (x < grid.length - 1) this.neighbors.push(grid[x + 1][y]);
        if (x > 0) this.neighbors.push(grid[x - 1][y]);
        if (y < grid[0].length - 1) this.neighbors.push(grid[x][y + 1]);
        if (y > 0) this.neighbors.push(grid[x][y - 1]);

        if (window.game.enableDiagonal) {
            // diagonals
            if (x > 0 && y > 0) this.neighbors.push(grid[x - 1][y - 1]);
            if (x < grid.length - 1 && y > 0) this.neighbors.push(grid[x + 1][y - 1]);
            if (x > 0 && y < grid[0].length - 1) this.neighbors.push(grid[x - 1][y + 1]);
            if (x < grid.length - 1 && y < grid[0].length - 1) this.neighbors.push(grid[x + 1][y + 1]);
        }
    }

    clear() {
        this.f = 0;
        this.g = 0;
        this.h = 0;
        this.previous = null;
    }

    isDiagonal(spot) {
        return Math.abs(this.x - spot.x) === 1 && Math.abs(this.y - spot.y) === 1;
    }
}