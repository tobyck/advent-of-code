const fs = require("fs");
const { _, __ } = require("../../lib");

const input = fs.readFileSync(process.argv[2], "utf8");

const lines = input.lines();

const games = lines.map((line, i) => {
    const looksStrs = line.split(": ")[1].split("; ");
    const looks = looksStrs.map(lookStr => Object.fromEntries(lookStr.split(", ").map(_.words().rev())));
    return { id: i + 1, looks };
});

const [r, g, b] = 12 .to(14);

// p1
console.log(games.filter(game => {
    for (const look of game.looks) {
        if (int(look.red) > r || int(look.green) > g || int(look.blue) > b) {
            return false;
        }
    }
    return true;
}).map(__.id).sum());

// p2
console.log(games.map(game => {
    const getMax = c => Math.max(...game.looks.map(look => look[c]?.int()).filter(isInt))
    return ["red", "green", "blue"].map(getMax).prod();
}).sum())