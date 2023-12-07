const _ = require("../utils")
const file = _.read("input.txt")
const test = _.read("test.txt")

const input = test

class Blueprint {
    constructor(oreRobotCost, clayRobotCost, obsidianRobotCost, geodeRobotCost, id) {
        this.oreRobotCost = oreRobotCost
        this.clayRobotCost = clayRobotCost
        this.obsidianRobotCost = obsidianRobotCost
        this.geodeRobotCost = geodeRobotCost

        this.oreRobots = 1
        this.clayRobots = 0
        this.obsidianRobots = 0
        this.geodeRobots = 0

        this.ore = 0
        this.clay = 0
        this.obsidian = 0
        this.geodes = 0

        this.id = id
    }

    get score() {
        return this.geodes * this.id
    }
}

let blueprints = input.lines().map((line, i) => {
    let nums = line.match(/-?\d+/g).map(Number)
    return new Blueprint(nums[1], nums[2], [nums[3], nums[4]], [nums[5], nums[6]], i + 1)
})

blueprints = blueprints.map(blueprint => {
    let queue = [blueprint]


})