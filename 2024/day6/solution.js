import { it, get, _Set } from "../../lib"

let grid = lines.map(chars())

let x = grid.map((l, i) => [l, i]).filter(it[0].includes("^"))[0]
let p = vec(x[0].indexOf("^"), x[1])
let v = [p.clone()]
let d = "up"

outer: while (true) {
	if (d == "up") {
		while (grid?.[p.y - 1]?.[p.x] != "#") {
			p.up()
			if (p.y < 0) break outer
			v.push(p.clone())
		}
		d = "right"
	} else if (d == 'down') {
		while (grid?.[p.y + 1]?.[p.x] != "#") {
			p.down()
			if (p.y > grid.length - 1) break outer
			v.push(vec(p.x, p.y))
		}
		d = "left"
	} else if (d == 'left') {
		while (grid?.[p.y]?.[p.x - 1] != "#") {
			p.left()
			if (p.x < 0) break outer
			v.push(vec(p.x, p.y))
		}
		d = 'up'
	} else if (d == 'right') {
		while (grid?.[p.y]?.[p.x + 1] != "#") {
			p.right()
			if (p.x > grid[0].length - 1) break outer
			v.push(vec(p.x, p.y))
		}
		d = 'down'
	}
}

//print(v.uniq().size)

const vec_eq = (a, b) => a.x == b.x && a.y == b.y

const in_loop = list => list.uniq().size < list.length

const makes_loop = grid => {
	//print("======================")
	//print(grid.map(it.join("")).join("\n"))
	let p = vec(x[0].indexOf("^"), x[1])
	let d = "up"
	let v = [{ vec: p.clone(), dir: d }]

	while (true) {
		if (d == "up") {
			while (grid?.[p.y - 1]?.[p.x] != "#") {
				p.up()
				if (p.y < 0) return false
				if (in_loop(v)) return true
				v.push({ vec: p.clone(), dir: d })
			}
			d = "right"
		} else if (d == 'down') {
			while (grid?.[p.y + 1]?.[p.x] != "#") {
				p.down()
				if (p.y > grid.length - 1) return false
				if (in_loop(v)) return true
				v.push({ vec: p.clone(), dir: d })
			}
			d = "left"
		} else if (d == 'left') {
			while (grid?.[p.y]?.[p.x - 1] != "#") {
				p.left()
				if (p.x < 0) return false
				if (in_loop(v)) return true
				v.push({ vec: p.clone(), dir: d })
			}
			d = 'up'
		} else if (d == 'right') {
			while (grid?.[p.y]?.[p.x + 1] != "#") {
				p.right()
				if (p.x > grid[0].length - 1) return false
				if (in_loop(v)) return true
				v.push({ vec: p.clone(), dir: d })
			}
			d = 'down'
		}
	}
}


let t = 0
let u = v.uniq().arr()
for (let a of u) {
	let c = grid.map(it.slice())
	c[a.y][a.x] = "#"
	if (makes_loop(c)) t++
}
print(t)
