const fs = require("fs");
const { _, __ } = require("../../lib");
const input = fs.readFileSync(process.argv[2], "utf8");

const sections = input.split("\n\n")
const seeds = sections[0].words().slice(1).map(Number)

const seedRanges = [];
for (let i = 0; i < seeds.length; i += 2) {
    seedRanges.push([seeds[i], seeds[i + 1]])
}

const genMap = nums => {
    const map = {}
    for (const line of nums) {
        const [dest, src, len] = line.words().map(Number)
        map[src + " " + (src + len - 1)] = dest + " " + (dest + len - 1)
    }
    return map
}

const getFromMap = (map, n) => {
    for (const [to, from] of map.entries()) {
        const [toS, toE] = to.words().map(Number)
        if (n >= toS && n <= toE) {
            const i = n - toS;
            return from.words().map(Number)[0] + i
        }
    }
    return n
}

const getS = n => sections[n].lines().slice(1)

const loc = seed => {
    const maps = 1 .to(sections.length - 1).map(getS).map(genMap)
    return maps.reduce((acc, map) => getFromMap(map, acc), seed);
}

// p1
// seeds.map(location).min().print()

// p2

// agghhhhhhhhh

//seedRanges[1][0].to(seedRanges[1][0] + seedRanges[0][1]).map(loc).deltas().print()