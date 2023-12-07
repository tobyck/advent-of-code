const fs = require("fs");
const { _, __ } = require("../../lib");
const input = fs.readFileSync(process.argv[2], "utf8");

const lines = input.lines()
const table = lines.map(_.split(": ")[1].split(" | ").map(_.trim().words()))

// p1
table.map(c => 2 ** (c[0].filter(x => c[1].includes(x)).length - 1)).filter(isInt).sum().print()

// p2
const copies = Array(lines.length).fill(1)
table.for((c, i) => {
    const both = c[0].filter(x => c[1].includes(x))
    for (let j = 0; j < copies[i]; j++)
        for (const k of (i + 1).to(i + both.length)) copies[k]++;
})
print(copies.sum())