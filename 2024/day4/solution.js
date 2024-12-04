import { it, get } from "../../lib"

let f = s => s.count("XMAS") + s.count("SAMX")

let o = lines.map(f).sum() + zip(...lines.map(chars())).map(x => f(x.join(""))).sum()

let d = ls => {
	let ret = []
	for (let i = 0; i < ls.length; i++) {
		ret.push(ls.map((l, r) => l[i - r]).join(""))
		if (i < ls.length - 1) ret.push(ls.rev().map((l, r) => l[ls.length - 1 - (i - r)]).join(""))
		ret.push(ls.map((l, r) => l[ls.length - 1 - (i - r)]).join(""))
		if (i < ls.length - 1) ret.push(ls.rev().map((l, r) => l[i - r]).join(""))
	}
	return ret
}

print(d(lines).map(f).sum() + o) // part 1

let t = 0
for (let r = 1; r < lines.length - 1; r++) {
	for (let c = 1; c < lines[r].length - 1; c++) {
		if (lines[r][c] == "A") {
			if (
				((lines[r-1][c-1] == "M" && lines[r+1][c+1] == "S") || (lines[r-1][c-1] == "S" && lines[r+1][c+1] == "M")) &&
				((lines[r-1][c+1] == "M" && lines[r+1][c-1] == "S") || (lines[r-1][c+1] == "S" && lines[r+1][c-1] == "M"))
			) t++;
		}
	}
}
print(t)
