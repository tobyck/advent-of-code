const _ = require("../utils")
const file = _.read("input.txt")
const test = _.read("test.txt")

const input = file

class Monkey {
    constructor(job, number, toWaitFor, op) {
        this.job = job
        this.number = number
        this.toWaitFor = toWaitFor
        this.op = op
    }
}

let monkeys = Object.fromEntries(input.lines().map(l => {
    let [name, info] = l.split(": ")
    let ret = [name]
    if (!isNaN(+info)) ret[1] = new Monkey("yell", +info, null, null)
    else ret[1] = new Monkey("op", null, info.match(/\w+/g), info.match(/[\+\-\*\/]/)[0])
    return ret
}).reverse())

let monkeyVal = name => {
    let monkey = monkeys[name]
    if (monkey.job == "yell") {
        return monkey.number
    } else {
        let vals = monkey.toWaitFor.map(m => `(${monkeyVal(m)})`)
        return eval(vals.join(monkey.op))
    }
}

let min = 0
let max = 1e11

while (true) {
    let mid = ~~((min + max) / 2)
    console.log(mid);
    monkeys.humn.number = mid
    monkeys.root.op = "<"
    if (monkeyVal("root")) min = mid
    else max = mid
    monkeys.root.op = "=="
    if (monkeyVal("root")) {
        console.log(mid)
        break
    }
}