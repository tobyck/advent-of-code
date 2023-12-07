const _ = require("../utils")
const file = _.read("input.txt")
const test = _.read("test.txt")

const input = file

let allSensors = input.lines().map(line => line.split(":").map(p => p.match(/-?\d+/g).map(Number)))

// 1
console.time("part 1")
let rowToCheck = 2000000

let blockedInRow = (sensors, row) => {
    let blockedYs = new Set()
    let beaconsAtRow = sensors.filter(([_, [x, y]]) => y == row).map(v => v[1][0])

    sensors.forEach(([[sx, sy], [bx, by]]) => {
        let heightFromSensor = Math.abs(sy - by) + Math.abs(sx - bx)
        let width = (heightFromSensor - (Math.abs(sy - row))) * 2 + 1
        let start = sx - Math.floor(width / 2)
        if (width > 0) {
            _.range(start, start + width - 1)
                .filter(x => !beaconsAtRow.includes(x))
                .forEach(x => blockedYs.add(x))
        }
    })

    return blockedYs
}

console.log(blockedInRow(allSensors, rowToCheck).size)

console.timeEnd("part 1")

// 2
console.time("part 2")

const maxCoord = 4000000

let sensorRanges = allSensors.map(([[sx, sy], [bx, by]]) => {
    let hFromS = Math.abs(sy - by) + Math.abs(sx - bx)
    return [[sx, sy - hFromS], [sx + hFromS, sy], [sx, sy + hFromS], [sx - hFromS, sy]]
})

let getFunc = ([x1, y1], [x2, y2]) => {
    let m = (y2 - y1) / (x2 - x1)
    let c = y1 - m * x1
    return x => m * x + c
}

let vecInArea = ([x, y], vertices) => {
    let [[ax, ay], [bx, by], [cx, cy], [dx, dy]] = vertices
    let vecInVs = false
    for (let [vx, vy] of vertices) {
        if (vx == x && vy == y) {
            vecInVs = true
            break
        }
    }
    if (
        vecInVs
        || (Math.abs(Math.atan2(ay - y, ax - x)) <= (Math.PI * 3 / 4)
            && Math.abs(Math.atan2(by - y, bx - x)) <= (Math.PI / 4)
            && Math.abs(Math.atan2(cy - y, cx - x)) >= (Math.PI / 4)
            && Math.abs(Math.atan2(dy - y, dx - x)) >= (Math.PI * 3 / 4))
    ) return true
    else return false
}

for (let [[ax, ay], [bx, by], [cx, cy], [dx, dy]] of sensorRanges) {
    let outerPerimVecs = []
    for (let x = ax; x <= bx; x++) {
        outerPerimVecs.push([x, getFunc([ax, ay - 1], [bx, by - 1])(x)]);
    }
    for (let x = bx + 1; x > cx; x--) {
        outerPerimVecs.push([x, getFunc([bx + 1, by], [cx + 1, cy])(x)]);
    }
    for (let x = cx; x >= dx; x--) {
        outerPerimVecs.push([x, getFunc([cx, cy + 1], [dx, dy + 1])(x)]);
    }
    for (let x = dx - 1; x < ax; x++) {
        outerPerimVecs.push([x, getFunc([dx - 1, dy], [ax - 1, ay])(x)]);
    }
    outerPerimVecs = outerPerimVecs.filter(([x, y]) => {
        return x >= 0 && y >= 0 && x <= maxCoord && y <= maxCoord
    })
    for (let vec of outerPerimVecs) {
        let found = false
        for (let rect of sensorRanges) {
            if (vecInArea(vec, rect)) {
                found = true
                break
            }
        }
        if (!found) {
            console.log(vec[0] * maxCoord + vec[1])
            console.timeEnd("part 2")
            process.exit()
        }
    }
}