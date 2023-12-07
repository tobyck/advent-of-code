const _ = require("../utils")
const file = _.read("input.txt")
const test = _.read("test.txt")

const input = file

let cubes = input.lines().map(line => line.split(",").map(Number))

let isCube = (vecs, vec) => {
    return vecs.some(cube => _.equal(cube, vec))
}

let getAdjacent = vec => {
    return [
        [vec[0] - 1, vec[1], vec[2]],
        [vec[0] + 1, vec[1], vec[2]],
        [vec[0], vec[1] - 1, vec[2]],
        [vec[0], vec[1] + 1, vec[2]],
        [vec[0], vec[1], vec[2] - 1],
        [vec[0], vec[1], vec[2] + 1]
    ]
}

let getSurfaceArea = vecs => {
    return vecs.reduce((ret, cube) => {
        return ret + getAdjacent(cube).map(vec => !isCube(vecs, vec)).sum()
    }, 0)
}

// 1

console.log(getSurfaceArea(cubes));

// 2

let [maxX, maxY, maxZ] = [0, 1, 2].map(i => Math.max(...cubes.map(cube => cube[i])) + 1)

let floodfill = start => {
    let queue = [start]
    let visited = []
    while (queue.length) {
        let vec = queue.shift()
        if (visited.some(v => _.equal(v, vec))) continue
        getAdjacent(vec).forEach(adj => {
            if (
                !isCube(cubes, adj)
                && adj[0] >= 0 && adj[0] <= maxX
                && adj[1] >= 0 && adj[1] <= maxY
                && adj[2] >= 0 && adj[2] <= maxZ
            ) queue.push(adj)
        })
        visited.push(vec)
    }
    return visited
}

let floodfilled = floodfill([0, 0, 0])

let inside = []

for (let x = 0; x <= maxX; x++) {
    for (let y = 0; y <= maxY; y++) {
        for (let z = 0; z <= maxZ; z++) {
            if (!floodfilled.some(vec => _.equal(vec, [x, y, z]))) {
                inside.push([x, y, z])
            }
        }
    }
}

console.log(getSurfaceArea(inside));