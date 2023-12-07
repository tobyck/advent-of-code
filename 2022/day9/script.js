const utils = require("../utils")
const file = utils.read("input.txt")
const test = utils.read("test.txt")

let input = file

let cmds = input.split("\n").map(l => l.split(" ")).map(([cmd, val]) => [cmd, Number(val)])

class Vec {
    constructor(x, y) {
        this.x = x
        this.y = y
    }

    touching(other) {
        return Math.abs(this.x - other.x) <= 1 && Math.abs(this.y - other.y) <= 1
    }

    clone() {
        return new Vec(this.x, this.y)
    }

    static eq(a, b) {
        return a.x === b.x && a.y === b.y
    }
}

let positions = []

let [tail, head] = [new Vec(0, 0), new Vec(0, 0)]

let makeMove = (cmd, tail, head) => {
    let newTail = tail.clone()
    let newHead = head.clone()
    console.log(cmd)
    switch (cmd) {
        case "R": newHead.x++; break
        case "L": newHead.x--; break
        case "U": newHead.y--; break
        case "D": newHead.y++; break
    }

    if (head.y == tail.y) {
        if (tail.x < head.x) {
            newTail = new Vec(head.x - 1, head.y)
        } else if (tail.x > head.x) {
            newTail = new Vec(head.x + 1, head.y)
        }
    } else if (head.x == tail.x) {
        if (tail.y < head.y) {
            newTail = new Vec(head.x, head.y - 1)
        } else if (tail.y > head.y) {
            newTail = new Vec(head.x, head.y + 1)
        }
    } else {
        while (!newTail.touching(newHead)) {
            if (tail.x < head.x) {
                newTail.x++
            } if (tail.x > head.x) {
                newTail.x--
            } if (tail.y < head.y) {
                newTail.y++
            } if (tail.y > head.y) {
                newTail.y--
            }
        }
    }

    if (!positions.some(v => Vec.eq(v, newTail))) {
        positions.push(newTail)
    }

    return [newTail, newHead]
}

for (let cmd of cmds) {
    for (let i = 0; i < cmd[1]; i++) {
        [tail, head] = makeMove(cmd[0], tail, head)
    }
}

console.log(cmds)

console.log(positions, positions.length)