const _ = require("../utils")
const file = _.read("input.txt")
const test = _.read("test.txt")

let input = file

let monkeys = input.split("\n\n").map(monkey => {
    let lines = monkey.split("\n")
    return {
        items: lines[1].split(": ")[1].split(", ").map(BigInt),
        operation: new Function("old", "return" + lines[2].split(": ")[1].split("=")[1].replace(/(\d+)/g, "$1n")),
        divisTest: BigInt(lines[3].split(": ")[1].split(" ")[2]),
        trueThrow: +lines[4].trim().split(" ")[5],
        falseThrow: +lines[5].trim().split(" ")[5],
        inspected: 0
    }
})

let modulus = monkeys.map(m => m.divisTest).reduce((a, b) => a * b)

for (let i = 0; i < 10000; i++) {
    for (let i = 0; i < monkeys.length; i++) {
        let monkey = monkeys[i]
        let itemsCopy = monkey.items.slice()
        for (var j = 0; j < itemsCopy.length; j++) {
            let newVal = monkey.operation(itemsCopy[j]) % modulus
            itemsCopy[j] = newVal
            if (itemsCopy[j] % monkey.divisTest == 0) {
                monkeys[monkey.trueThrow].items.push(newVal)
            } else {
                monkeys[monkey.falseThrow].items.push(newVal)
            }
            monkey.items.shift()
        }
        monkey.inspected += j
    }
}

console.log(monkeys.map(m => m.inspected).sort((a, b) => a - b).slice(-2).reduce((a, b) => a * b))