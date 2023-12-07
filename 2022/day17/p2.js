const _ = require("../utils")
const file = _.read("input.txt")
const test = _.read("test.txt")

const input = test

const render = vecs => {
    for (let y = Math.max(...vecs.map(vec => vec[1])) + 1; y + 1; y--) {
        let line = ""
        for (let x = 0; x < 7; x++) {
            if (vecs.some(vec => vec[0] == x && vec[1] == y)) {
                line += "#"
            } else {
                line += "."
            }
        }
        console.log(line);
    }
}

const fallenRocks = [_.range(6).map(x => [x, 0])]

const bottomIsBlocked = () => {
    const bottom = Math.min(...fallenRocks.flat().map(vec => vec[1]))
    const top = Math.max(...fallenRocks.flat().map(vec => vec[1]))
    const queue = [[0, top + 1]]
    const visited = []
    while (queue.length) {
        const vec = queue.shift()
        if (visited.count(vec)) continue
        for (
            const adj of [
                [vec[0] - 1, vec[1]],
                [vec[0] + 1, vec[1]],
                [vec[0], vec[1] - 1],
                [vec[0], vec[1] + 1]
            ]
        ) {
            if (adj[1] < bottom) return false;
            if (
                !fallenRocks.flat().count(adj)
                && adj[0] >= 0 && adj[0] < 7
                && adj[1] <= top + 1
            ) queue.push(adj);
        }
        visited.push(vec)
    }
    return true
}

const jetMoves = input.chars()

// all the rock shapes
const rockQueue = [
    [[2, 0], [3, 0], [4, 0], [5, 0]],
    [[3, 0], [2, 1], [3, 1], [4, 1], [3, 2]],
    [[2, 0], [3, 0], [4, 0], [4, 1], [4, 2]],
    [[2, 0], [2, 1], [2, 2], [2, 3]],
    [[2, 0], [3, 0], [2, 1], [3, 1]]
]

let height = 0

const states = []

const maxRocks = 20 //1000000000000

for (let i = 0; i < maxRocks; i++) {
    // time the iteration
    console.time("iteration " + i)

    // get the next rock
    const rock = structuredClone(rockQueue)[0]

    // set the rock to that there's a 3 block gap between it and the highest rock
    while (true) {
        const lowestInRock = Math.min(...rock.map(vec => vec[1]))
        const highestInBlocked = Math.max(...fallenRocks.flat().map(vec => vec[1]))
        if (lowestInRock - highestInBlocked > 3) break
        rock.forEach(vec => vec[1]++)
    }

    // move the rock until it gets blocked
    while (true) {
        const move = jetMoves.shift()
        // shift left or right
        if (move == "<") {
            let shifted = rock.map(vec => [vec[0] - 1, vec[1]])
            if (shifted.every(vec => vec[0] >= 0 && !fallenRocks.flat().some(bVec => _.equal(vec, bVec)))) {
                rock.forEach(vec => vec[0]--)
            }
        } else {
            let shifted = rock.map(vec => [vec[0] + 1, vec[1]])
            if (shifted.every(vec => vec[0] < 7 && !fallenRocks.flat().some(bVec => _.equal(vec, bVec)))) {
                rock.forEach(vec => vec[0]++)
            }
        }

        // move down
        rock.forEach(vec => vec[1]--)

        // cycle the jet moves
        jetMoves.push(move)

        // stop if the rock is blocked
        if (rock.some(vec => fallenRocks.flat().some(bVec => _.equal(vec, bVec)))) {
            rock.forEach(vec => vec[1]++)
            break
        }
    }

    fallenRocks.push(rock)
    rockQueue.push(rockQueue.shift())

    // uncomment to speed up (only do every 500th iter or so tho)
    /* if (bottomIsBlocked()) {
        while (bottomIsBlocked()) {
            var front = fallenRocks.shift()
        }
        fallenRocks.unshift(front)
        const lowest = Math.min(...fallenRocks.flat().map(vec => vec[1]))
        fallenRocks.forEach(rock => rock.forEach(vec => vec[1] -= lowest))
    } */



    // stop the iteration timer
    console.timeEnd("iteration " + i)
}

render(fallenRocks.flat())

height += Math.max(...fallenRocks.flat().map(vec => vec[1]))

console.log(height)