const _ = require("../utils")
const file = _.read("input.txt")
const test = _.read("test.txt")

let input = file

let heightMap = input.lines().map(l => l.chars())

let start = [
    heightMap.find(l => l.includes("S")).indexOf("S"),
    heightMap.findIndex(l => l.includes("S"))
]

let end = [
    heightMap.find(l => l.includes("E")).indexOf("E"),
    heightMap.findIndex(l => l.includes("E"))
]

heightMap = heightMap.map(l => l.map(c => "SE".includes(c) ? 25 : c.charCodeAt(0) - 97))

let heightAt = (hMap, vec) => hMap?.[vec[1]]?.[vec[0]]

let shortestPath = (hMap, start, end) => {
    let queue = [[start, 0]] // each element is [vectorItGotTo, pathLength]
    let visited = { [start]: 0 }

    while (queue.length) {
        let [pos, length] = queue.shift()

        if (end in visited) {
            return visited[end]
        }

        let validMoves = [
            [pos[0] + 1, pos[1]],
            [pos[0] - 1, pos[1]],
            [pos[0], pos[1] + 1],
            [pos[0], pos[1] - 1]
        ].filter(m => heightAt(hMap, m) - 1 <= heightAt(hMap, pos) && !(m in visited))

        for (let vec of validMoves) {
            queue.push([vec, length + 1])
            visited[vec] = length + 1
        }
    }
}

// 1
console.log(shortestPath(heightMap, start, end))

// 2
hm = input.lines().map(l => l.chars().map(c => "SE".includes(c) ? 0 : c.charCodeAt(0) - 97))
let startPoints = hm
    .flatMap((r, y, a) => y == 0 || y == a.length - 1 ? r.map((c, x) => [x, y]) : [[0, y], [r.length - 1, y]])
    .filter(v => heightAt(hm, v) == 0)
console.log(startPoints.map(p => shortestPath(heightMap, p, end)).reduce((a, b) => Math.min(a, b)));