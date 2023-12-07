const utils = require("../utils")
const file = utils.read("input.txt")
const lines = file.split("\n")

// 1
console.log(utils.sum(lines.map(line => {
    const [a, b] = line.split(",").map(e => {
        return [start, end] = e.split("-").map(Number);
    })

    if ((a[0] >= b[0] && a[1] <= b[1]) || (b[0] >= a[0] && b[1] <= a[1])) {
        return 1
    } else {
        return 0
    }
})));

// 2
console.log(utils.sum(lines.map(line => {
    const [a, b] = line.split(",").map(e => {
        return [start, end] = e.split("-").map(Number);
    })

    let ret
    if ((a[0] >= b[0] && a[0] <= b[1]) || (a[1] >= b[0] && a[1] <= b[1]) || (b[0] >= a[0] && b[0] <= a[1]) || (b[1] >= a[0] && b[1] <= a[1])) {
        ret = 1
    } else {
        ret = 0
    }

    return ret
})));