let fs = require("fs")
let input = fs.readFileSync("file.txt", "utf8")

let games = input.split("\n").map(l => {
    let [opp, you] = l.split(" ")
    opp = "ABC".indexOf(opp)
    you = "XYZ".indexOf(you)
    return [opp, you]
})

let score = (opp, you) => [3, 0, 6][(opp - you + 3) % 3]

// 1
console.log(games.map(([opp, you]) => {
    return score(opp, you) + you + 1
}).reduce((a, b) => a + b))

// 2
console.log(games.map(([opp, you]) => {
    let reqRes = [0, 3, 6][you]
    let chosen = [0, 1, 2].find(o => score(opp, o) == reqRes)
    return chosen + 1 + reqRes
}).reduce((a, b) => a + b))
