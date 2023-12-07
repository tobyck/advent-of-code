const _ = require("../utils")
const file = _.read("input.txt")
const test = _.read("test.txt")

const input = file

let original = input.lines().map(l => +l)

let nums = original.slice()

for (let num of original) {
    let index = nums.indexOf(num)
    let target = index
    for (let _ = 0; _ < Math.abs(num); _++) {
        target += Math.sign(num)
        if (target == 0 && num < 0) {
            target--
        } else if (target == nums.length - 1 && num > 0) {
            target++
        }
    }
    target = (target % nums.length + nums.length) % nums.length
    nums.splice(index, 1)
    nums.splice(target, 0, num)
}

console.log([1000, 2000, 3000].map(n => nums[(n + nums.indexOf(0)) % nums.length]));