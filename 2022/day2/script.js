const fs = require("fs")

const file = fs.readFileSync("file.txt", "utf8")

const sum = arr => arr.reduce((a, b) => a + b);

const lines = file.split("\n")

const score = (op, you) => {
    let ret
    you = "ABC"["XYZ".indexOf(you)]
    if (op == you) ret = 3
    if (op == "A" && you == "B") ret = 6
    if (op == "A" && you == "C") ret = 0
    if (op == "B" && you == "A") ret = 0
    if (op == "B" && you == "C") ret = 6
    if (op == "C" && you == "A") ret = 6
    if (op == "C" && you == "B") ret = 0
    ret += "ABC".indexOf(you) + 1
    return ret
}

// 1
console.log(sum(lines.map(line => {
    const [op, you] = line.split(" ")
    return score(op, you)
})))

// 2
console.log(sum(lines.map(line => {
    const [op, you] = line.split(" ");

    const s = [0, 3, 6]["XYZ".indexOf(you)];

    let x

    if (op == "A" && s == 0) x = 3
    if (op == "A" && s == 3) x = 1
    if (op == "A" && s == 6) x = 2
    if (op == "B" && s == 0) x = 1
    if (op == "B" && s == 3) x = 2
    if (op == "B" && s == 6) x = 3
    if (op == "C" && s == 0) x = 2
    if (op == "C" && s == 3) x = 3
    if (op == "C" && s == 6) x = 1

    return s + x;
})))