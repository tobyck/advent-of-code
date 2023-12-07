const _ = require("../utils")
const file = _.read("input.txt")
const test = _.read("test.txt")

let input = file

let run = cmds => {
    let x = 1
    let xs = []
    for (let cmd of cmds) {
        if (cmd[0] == "noop") {
            xs.push(x)
        } else {
            xs.push(x, x)
            x += cmd[1]
        }
    }
    return xs
}

let cmds = input.lines().map(x => x.words()).map(([cmd, val]) => [cmd, Number(val)])

// part 1
_.log(run(cmds).map((v, i) => v * (i + 1)).filter((_, i) => [20, 60, 100, 140, 180, 220].includes(i + 1)).sum())

// part 2
let crt = []

for (let [i, x] of run(cmds).entries()) {
    if (i % 40 == 0) {
        crt.push([])
    }
    if ([x, x + 1, x + 2].includes(i % 40 + 1)) {
        crt[crt.length - 1].push("#")
    } else {
        crt[crt.length - 1].push(" ")
    }
}

_.log(crt.map(x => x.join("")).join("\n"))