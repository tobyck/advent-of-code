const _ = require("../utils")
const file = _.read("input.txt")
const test = _.read("test.txt")

let input = file

let pairs = input.split("\n\n").map(pair => pair.lines().map(JSON.parse))

let isNum = x => typeof x === "number"

let cmp = (x, y) => {
    if (isNum(x) && isNum(y)) return Math.sign(x - y)
    else if (Array.isArray(x) && Array.isArray(y)) {
        let ret = 0
        for (let [i, v] of x.entries()) {
            let c = cmp(v, y[i])
            if (c) {
                ret = c
                break
            }
        }
        if (!ret) {
            if (x.length < y.length) ret = -1
            else if (x.length > y.length) ret = 1
        }
        return ret
    } else if (isNum(x)) return cmp([x], y)
    else if (isNum(y)) return cmp(x, [y])
}


// 1
console.log(pairs.map(([a, b], i) => cmp(a, b) < 0 ? i + 1 : 0).sum())

// 2
let divPackets = [[[2]], [[6]]]
pairs.push(divPackets)
let sorted = pairs.flat().sort(cmp)
console.log(divPackets.map(p => sorted.findIndex(v => _.equal(v, p)) + 1).reduce((a, b) => a * b))