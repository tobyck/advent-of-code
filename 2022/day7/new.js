const terminal = require("fs").readFileSync("./test.txt", "utf-8")

const fileSys = { "/": {} }
const path = []

for (const line of terminal.split("\n").map(l => l.split(" "))) {
    if (line[0] == "$") {
        if (line[1] == "cd") {
            if (line[2] == "..") path.pop()
            else path.push(line[2])
        }
    } else {
        let dir = fileSys
        for (const folder of path) {
            dir = dir[folder]
        }
        dir[line[1]] = line[0] == "dir" ? {} : +line[0]
    }
}

const dirSize = dir => {
    let ret = 0
    for (const val of Object.values(dir)) {
        ret += typeof val == "object" ? dirSize(val) : val
    }
    return ret
}

const subDirs = dir => {
    let ret = {}
    for (const [name, val] of Object.entries(dir)) {
        if (typeof val == "object") {
            ret[name] = dirSize(val)
            ret = { ...ret, ...subDirs(val) }
        }
    }
    return ret
}

console.log(Object.values(subDirs(fileSys["/"])).filter(s => s < 100000).reduce((a, b) => a + b))