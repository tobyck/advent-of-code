const _ = require("../utils")
const file = _.read("input.txt")
const test = _.read("test.txt")
const util = require("util")

const input = test

let valves = Object.fromEntries(input.lines().map(line => {
    let arr = line.match(/[A-Z]{2}|\d+/g).map(v => isNaN(+v) ? v : +v)
    return [arr[0], [arr[1], arr.slice(2)]]
}))

console.log(valves);

console.log("\n-------------------\n");

let paths = [["AA", []]] // each path is [current, [[valve, timeOpened], ...]]

for (let mins = 1; mins <= 6; mins++) {
    console.time("minute " + mins)
    let newPaths = []
    for (let path of paths) {
        let [current, opened] = path
        let [rate, newTunnels] = valves[current]
        for (let tunnel of newTunnels) {
            newPaths.push([tunnel, opened.slice()])
        }
        if (rate && !opened.map(([v, _]) => v).count(current)) {
            newPaths.push([current, [...opened, [current, mins + 1]]])
        }
    }
    paths = newPaths
    console.timeEnd("minute " + mins)
}

console.log(util.inspect(paths, false, null, true));

console.log("\n-------------------\n");

let endPressures = paths.map(path => path[1].reduce((total, [valve, timeOpened]) => {
    return total + valves[valve][0] * (30 - timeOpened)
}, 0))

console.log(endPressures);

console.log(Math.max(...endPressures))