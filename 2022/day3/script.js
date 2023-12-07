const fs = require("fs")

const file = fs.readFileSync("f", "utf8")

const sum = arr => arr.reduce((a, b) => a + b);

const nPieces = (thing, n) => {
    const pieces = [];
    const pieceLength = Math.ceil(thing.length / n);
    for (let i = 0; pieces.length < n; i += pieceLength) {
        pieces.push(thing.slice(i, i + pieceLength));
    }
    return pieces;
}

// 1
const x = file.split("\n").map(line => {
    let comps = nPieces(line, 2);
    let shared = comps[0].split("").filter(c => comps[1].includes(c))[0];
    return "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".indexOf(shared) + 1;
});

console.log(sum(x));

// 2
const y = nPieces(file.split("\n"), file.split("\n").length / 3)

console.log(sum(y.map(group => {
    let comps = group.map(line => line.split(""));
    let shared = comps[0].filter(c => comps[1].includes(c) && comps[2].includes(c))[0];
    return "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".indexOf(shared) + 1;
})))

