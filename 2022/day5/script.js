const utils = require("../utils")
const file = utils.read("input.txt")

const [drawing, cmds] = file.split("\n\n")

const stacks = []

for (let i = 1; i < 9 * 4; i += 4) {
    let lines = drawing.split("\n")
    stacks.push((lines.pop() && lines).map(l => l[i]).filter(c => c != " "))
}

for (let cmd of cmds.split("\n")) {
    cmd = cmd.match(/\d+/g).map(Number)
    stacks[cmd[2] - 1].unshift(...stacks[cmd[1] - 1].splice(0, cmd[0]))
}

console.log(stacks.map(s => s[0]).join(""))