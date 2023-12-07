const _ = require("../utils")
const file = _.read("input.txt")
const test = _.read("test.txt")

let render = vecs => {
    for (let y = Math.max(...vecs.map(vec => vec[1])); y; y--) {
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

const jetMoves = test.chars()

console.time("part 1")

const rockQueue = [
    [[2, 0], [3, 0], [4, 0], [5, 0]],
    [[3, 0], [2, 1], [3, 1], [4, 1], [3, 2]],
    [[2, 0], [3, 0], [4, 0], [4, 1], [4, 2]],
    [[2, 0], [2, 1], [2, 2], [2, 3]],
    [[2, 0], [3, 0], [2, 1], [3, 1]]
]

const blockedVecs = _.range(6).map(x => [x, 0])

for (let i = 0; i < 2022; i++) {
    console.time("iteration " + i)
    const rock = structuredClone(rockQueue)[0]

    while (true) {
        const lowestInRock = Math.min(...rock.map(vec => vec[1]))
        const highestInBlocked = Math.max(...blockedVecs.map(vec => vec[1]))
        if (lowestInRock - highestInBlocked > 3) break
        rock.forEach(vec => vec[1]++)
    }

    while (true) {
        const move = jetMoves.shift()

        if (move == "<") {
            let shifted = rock.map(vec => [vec[0] - 1, vec[1]])
            if (shifted.every(vec => vec[0] >= 0 && !blockedVecs.some(bVec => _.equal(vec, bVec)))) {
                rock.forEach(vec => vec[0]--)
            }
        } else {
            let shifted = rock.map(vec => [vec[0] + 1, vec[1]])
            if (shifted.every(vec => vec[0] < 7 && !blockedVecs.some(bVec => _.equal(vec, bVec)))) {
                rock.forEach(vec => vec[0]++)
            }
        }
        rock.forEach(vec => vec[1]--)

        jetMoves.push(move)

        if (rock.some(vec => blockedVecs.some(bVec => _.equal(vec, bVec)))) {
            rock.forEach(vec => vec[1]++)
            break
        }
    }

    blockedVecs.push(...rock)

    rockQueue.push(rockQueue.shift())

    console.timeEnd("iteration " + i)
}

render(blockedVecs)

console.log(Math.max(...blockedVecs.map(vec => vec[1])))

console.timeEnd("part 1")