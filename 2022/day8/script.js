const utils = require("../utils")
const file = utils.read("input.txt")
const test = utils.read("test.txt")

let input = file

input = input.split("\n").map(l => l.split("").map(Number))

let isVisible = (line, treeI) => {
    if (treeI == 0 || treeI == line.length - 1) return true
    return [line.slice(0, treeI), line.slice(treeI + 1)].map(side => {
        return side.map(t => t < line[treeI]).every(Boolean)
    }).some(Boolean)
}

// 1
let count = 0
for (let [i, line] of input.entries()) {
    for (let [j, tree] of line.entries()) {
        let [row, col] = [line, input.map(l => l[j])]
        let visible = isVisible(row, j) || isVisible(col, i)
        if (visible) {
            count++
            //console.log(i, j)
        }
    }
}
console.log(count)

// 2?
let f = (line, treeI) => {
    let sides = [line.slice(0, treeI), line.slice(treeI + 1)]
    sides[0].reverse()
    return sides.map(side => {
        let ts = []
        for (let t of side) {
            ts.push(t)
            if (t >= line[treeI]) {
                break
            }
        }
        return ts.length
    })
}

let scores = []
for (let [i, line] of input.entries()) {
    for (let [j, tree] of line.entries()) {
        let [row, col] = [line, input.map(l => l[j])]
        let score = [...f(row, j), ...f(col, i)]
        console.log([...f(row, j), ...f(col, i)], tree)
        scores.push(score)
    }
    console.log("------")
}

let md = scores.map(s => s.reduce((a, b) => a * b))
let mx = Math.max(...md)
console.log(mx, scores[md.indexOf(mx)])
