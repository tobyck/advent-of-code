const _ = require("../utils")
const file = _.read("input.txt")
const test = _.read("test.txt")

let input = test

let vecsBetween = (a, b) => {
    if (a[0] == b[0]) {
        return _.range(a[1], b[1]).map(y => [a[0], y]).slice(1)
    } else if (a[1] == b[1]) {
        return _.range(a[0], b[0]).map(x => [x, a[1]]).slice(1)
    }
}

let hasVec = (a, b) => a.some(v => v[0] == b[0] && v[1] == b[1])

let rocks = input.lines()
    .map(p => p.split(" -> ").map(v => v.split(",").map(Number)))
    .flatMap(s => s.slice(1).reduce((vecs, vec) => {
        return vecs.concat(vecsBetween(vecs[vecs.length - 1], vec))
    }, [s[0]]))

let lowestY = Math.max(...rocks.map(r => r[1])) + 2
/* 
let render = []

// render rocks with # and everything else with .
for (let y = 0; y < lowestY; y++) {
    render[y] = []
    for (let x = 0; x < maxX; x++) {
        render[y][x] = rocks.some(r => r[0] == x && r[1] == y) ? "#" : "."
    }
}

console.log(render.map(r => r.join("")).join("\n")) */

console.time("calculating")

let sandGrains = []

while (!hasVec(sandGrains, [500, 0])) {
    let [x, y] = [500, 0]
    while (true) {
        y++
        let blocked = rocks.concat(sandGrains).concat(vecsBetween([x - 2, lowestY], [x + 1, lowestY]))
        if (hasVec(blocked, [x, y])) {
            x--
            if (hasVec(blocked, [x, y])) {
                x += 2
                if (hasVec(blocked, [x, y])) {
                    console.log([x, y])
                    sandGrains.push([x - 1, y - 1])
                    break
                }
            }
        }
    }
}

console.log(sandGrains.length)

console.timeEnd("calculating")

/* let done = false

while (!done) {
    let grainPos = [500, 0]
    let prevPos = [null, null]

    while (!vecEqual(grainPos, prevPos)) {
        prevPos = grainPos.slice()

        let moveAttempts = [
            [grainPos[0], grainPos[1] + 1],
            [grainPos[0] - 1, grainPos[1] + 1],
            [grainPos[0] + 1, grainPos[1] + 1]
        ]

        let bottom = vecsBetween([grainPos[0] - 2, lowestY], [grainPos[0] + 1, lowestY])

        grainPos = moveAttempts.find(v => !rocks.concat(sandGrains).concat(bottom).some(r => vecEqual(v, r))) || grainPos

        if (sandGrains.some(s => vecEqual(s, [500, 0]))) {
            done = true
            break
        }
    }

    if (!done) sandGrains.push(grainPos)
}

console.log(sandGrains.length)
console.timeEnd("calculating") */