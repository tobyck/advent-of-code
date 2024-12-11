import { it, get } from "../../lib"

let grid = lines.map(chars())
let freqs = {}

for (let [y, line] of grid.entries()) {
	for (let [x, char] of line.entries()) {
		if (char == '.') continue
		freqs[char] ??= []
		freqs[char].push(vec(x, y))
	}
}

let pairs = list => {
	let ret = []
	for (let [i, item] of list.entries()) {
		ret.push(...list.filter((_, j) => j != i).map(x => [item, x]))
	}
	return ret
}

let antinodes = set()

let inbounds = v => v.x >= 0 && v.x < grid[0].length && v.y >= 0 && v.y < grid.length

// part 1
for (let nodes of Object.values(freqs)) {
	for (let pair of pairs(nodes)) {
		let xdiff = pair[0].x - pair[1].x
		let ydiff = pair[0].y - pair[1].y
		let a = pair[0].clone().add(vec(xdiff, ydiff))
		if (inbounds(a)) antinodes.add(a)
		let b = pair[1].clone().add(vec(-xdiff, -ydiff))
		if (inbounds(b)) antinodes.add(b)
	}
}

print(antinodes.size)

// part 2

let antinodes2 = set()

let compute_line = (node, xdiff, ydiff, k = 1) => {
	let antinodes = [node]
	while (inbounds(antinodes.last()))
		antinodes.push(antinodes.last().clone().add(vec(xdiff * k, ydiff * k)))
	return antinodes.filter(a => inbounds(a))
}

for (let nodes of Object.values(freqs)) {
	for (let pair of pairs(nodes)) {
		let xdiff = pair[0].x - pair[1].x
		let ydiff = pair[0].y - pair[1].y
		compute_line(pair[0], xdiff, ydiff).map(a => antinodes2.add(a))
		compute_line(pair[1], xdiff, ydiff, -1).map(a => antinodes2.add(a))
	}
}

print(antinodes2.size)
