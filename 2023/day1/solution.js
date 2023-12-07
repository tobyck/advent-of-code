const fs = require("fs")

const fileName = process.argv[2]
const input = fs.readFileSync(fileName, "utf8");

const lines = input.split("\n")

const vs = []
const nums = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];

for (const line of lines) {

    const _vs = Array.from(line.matchAll(new RegExp(`(?<=(${nums.join("|")}|\\d))`, "g")), m => m[1])
    console.log(_vs);
    
    if (_vs.length == 1) {
        _vs.push(_vs[0])
    }

    let num = ""

    if (nums.includes(_vs[0])) {
        num += nums.indexOf(_vs[0]) + 1
    } else {
        num += _vs[0]
    }

    if (nums.includes(_vs[_vs.length - 1])) {
        num += nums.indexOf(_vs[_vs.length - 1]) + 1
    } else {
        num += _vs[_vs.length - 1]
    }

    vs.push(parseInt(num))
}

console.log(vs.reduce((a, b) => a + b, 0));