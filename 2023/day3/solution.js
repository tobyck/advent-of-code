const fs = require("fs");
const { _, __ } = require("../../lib");
const input = fs.readFileSync(process.argv[2], "utf8");
const lines = input.lines();

let total = 0

const gears = {}

for (let i = 0; i < lines.length; i++) {
    const nums = [...lines[i].matchAll(/(\d+)/g)].map(m => [m[0], m.index, []])
    l: for (const num of nums) {
        if (num[1] > 0 && lines[i][num[1] - 1] === "*") {
            gears[(num[1] - 1).toString() + "," + i] ??= []
            gears[(num[1] - 1).toString() + "," + i].push(num[0].int())
        }
        if (num[1] + num[0].length < lines[i].length - 1 && lines[i][num[1] + num[0].length] !== ".") {
            const x = gears[(num[1] + num[0].length).toString() + "," + i]
            gears[(num[1] + num[0].length).toString() + "," + i] ??= []
            gears[(num[1] + num[0].length).toString() + "," + i].push(num[0].int())
        }
        for (const y of [i - 1, i + 1]) {
            if (y < 0 || y > lines.length - 1) continue
            for (const x of (num[1] - 1).to(num[1] + num[0].length)) {
                if (x < 0 || x > lines[0].length - 1) continue
                if (lines[y][x] !== ".") {
                    gears[x + "," + y] ??= []
                    gears[x + "," + y].push(num[0].int())
                    continue l
                }
            }
        }
    }

    // p1
    /* l: for (const num of nums) {
        if (num[1] > 0 && lines[i][num[1] - 1] !== ".") {
            total += num[0].int();
        }
        if (num[1] + num[0].length < lines[i].length - 1 && lines[i][num[1] + num[0].length] !== ".") {
            total += num[0].int();
        }
        for (const y of [i - 1, i + 1]) {
            if (y < 0 || y > lines.length - 1) continue
            for (const x of (num[1] - 1).to(num[1] + num[0].length)) {
                if (x < 0 || x > lines[0].length - 1) continue
                if (lines[y][x] !== ".") {
                    total += num[0].int();
                    continue l
                }
            }
        }
    } */
}

// p2
for (const g of gears.vas()) {
    if (g.length === 2) {
        total += g.prod()
    }
}

print(total)