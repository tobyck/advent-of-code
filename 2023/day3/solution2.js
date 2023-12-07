const fs = require("fs");
const { _, __ } = require("../../lib");
const input = fs.readFileSync(process.argv[2], "utf8");
const lines = input.lines();

// part 1
lines.map((line, i) => arr(line.matchAll(/(\d+)/g)).map(m => [m[0], m.index]).map(num => {
    for (const y of [i - 1, i, i + 1]) {
        if (y < 0 || y > lines.length - 1) continue;
        for (const x of (num[1] - 1).to(num[1] + num[0].length)) {
            if (x < 0 || x > lines[0].length - 1) continue;
            if (lines[y][x] !== "." && !lines[y][x].isDigit()) return num[0].int();
        }
    }
})).flat(1).filter(isInt).sum().print()

// part 2
const gears = {};
lines.for((line, i) => {
    const nums = arr(line.matchAll(/(\d+)/g)).map(m => [m[0], m.index, []]);
    for (const num of nums) {
        for (const y of [i - 1, i, i + 1]) {
            if (y < 0 || y > lines.length - 1) continue;
            for (const x of (num[1] - 1).to(num[1] + num[0].length)) {
                if (x < 0 || x > lines[0].length - 1) continue;
                if (lines[y][x] === "*") gears.do([x, y], _.push(num[0].int()), [])
            }
        }
    }
})
gears.vals().filter(_.len().eq(2)).map(_.prod()).sum().print()