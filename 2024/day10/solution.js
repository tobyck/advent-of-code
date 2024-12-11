import "@toby_ck/tacit-js"
let input = (await Bun.file(Bun.argv[2]).text()).trim("\n")

let grid = input.lines.map(chars.map(get.int))

let trailhead_score = (grid, start_vec) => {
	let paths = [], queue = [[start_vec]]

	while (queue.len) {
		let path = queue.shift()
		let ns = path.last.neighbors
			.filter(arr.none(lt(0).or$f(gt(grid.len - 1))))
			.filter(it.at$t(grid).eq(grid.at(path.last) + 1))
		if (!ns.len) paths.push(path)
		else queue.push(...ns.map(it.concat$t(path)))
	}

	// return paths.map(get.last).filter(it.at$t(grid).eq(9)).uniq.size // p1
	return paths.filter(last.at$t(grid).eq(9)).len // p2
}

let t = 0
for (let r = 0; r < grid.len; r++)
	for (let c = 0; c < grid[0].len; c++)
		if (grid[r][c] === 0) t += trailhead_score(grid, vec(c, r))
t.pr
