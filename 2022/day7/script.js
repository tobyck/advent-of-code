const utils = require("../utils")
const file = utils.read("input.txt")
const test = utils.read("test.txt")

const input = file

const fileSys = { "/": {} }
let path = []

for (const line of input.split("\n")) {
    if (line[0] == "$") {
        let cmd = line.slice(2).split(" ")
        if (cmd[0] == "cd") {
            if (cmd[1] == "/") {
                path = []
            } else if (cmd[1] == "..") {
                path.pop()
            } else {
                path.push(cmd[1])
            }
        }
    } else {
        const item = line.split(" ")
        dir = fileSys["/"]
        for (const d of path) {
            dir = dir?.[d]
        }
        if (item[0] == "dir") {
            dir[item[1]] = {}
        } else {
            dir[item[1]] = +item[0]
        }
    }
}

const dirSize = (dir) => {
    let ret = 0
    for (const item in dir) {
        if (typeof dir[item] == "number") {
            ret += dir[item]
        } else {
            ret += dirSize(dir[item])
        }
    }
    return ret
}

const getDirs = (dir) => {
    let ret = []
    for (const item in dir) {
        if (typeof dir[item] == "object") {
            ret.push(dir[item])
            ret.push(...getDirs(dir[item]))
        }
    }
    return ret
}

// 1
console.log(utils.sum(getDirs(fileSys["/"]).map(dirSize).filter(s => s < 100000)))

// 2
const total = dirSize(fileSys["/"])

const all = getDirs(fileSys).map(dirSize).sort((a, b) => a - b)

for (const s of all) {
    if (total - s < 40000000) {
        console.log(s)
        break
    }
}