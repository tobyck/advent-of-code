const utils = require("../utils")
const file = utils.read("input.txt")
const test = utils.read("test2.txt")

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

let tailPositions = []

let allKnots = Array(10).fill(new Vec(0, 0)) // first is head, last is tail

let makeMove = (dir, knots) => {
    let newKnots = knots.slice().map(k => k.clone())

    let h = newKnots[0]

    if (dir == "R") h.x++
    else if (dir == "L") h.x--
    else if (dir == "U") h.y--
    else if (dir == "D") h.y++

    for (let [i, knot] of newKnots.slice(1).entries()) {
        let toFollow = newKnots[i].clone()
        let toMove = newKnots[i + 1]

        if (toFollow.y == newKnots[i + 1].y) {
            if (newKnots[i + 1].x < toFollow.x) {
                newKnots[i + 1] = new Vec(toFollow.x - 1, toFollow.y)
            } else if (newKnots[i + 1].x > toFollow.x) {
                newKnots[i + 1] = new Vec(toFollow.x + 1, toFollow.y)
            }
        } else if (toFollow.x == newKnots[i + 1].x) {
            if (newKnots[i + 1].y < toFollow.y) {
                newKnots[i + 1] = new Vec(toFollow.x, toFollow.y - 1)
            } else if (newKnots[i + 1].y > toFollow.y) {
                newKnots[i + 1] = new Vec(toFollow.x, toFollow.y + 1)
            }
        } else {
            while (!newKnots[i + 1].touching(toFollow)) {
                if (newKnots[i + 1].x < toFollow.x) {
                    newKnots[i + 1].x++
                } if (newKnots[i + 1].x > toFollow.x) {
                    newKnots[i + 1].x--
                } if (newKnots[i + 1].y < toFollow.y) {
                    newKnots[i + 1].y++
                } if (newKnots[i + 1].y > toFollow.y) {
                    newKnots[i + 1].y--
                }
            }
        }
    }

    let tail = newKnots[newKnots.length - 1]
    if (!tailPositions.some(v => Vec.eq(v, tail))) {
        tailPositions.push(tail)
    }

    return newKnots
}

for (let cmd of cmds) {
    for (let i = 0; i < cmd[1]; i++) {
        allKnots = makeMove(cmd[0], allKnots)
    }
}

console.log(tailPositions, tailPositions.length)