import { getInput, it, get, _Set } from "../../lib"
let { input, lines, chars } = getInput()

let v = set()

const f = cs => {
	let p = vec()
	v.add(p)
	for (const c of cs) {
		switch (c) {
			case "^": p.up(); break;
			case ">": p.right(); break;
			case "<": p.left(); break;
			case "v": p.down(); break;
		}
		v.add(p)
	}
}

f(chars.everyn(2))
f(chars.everyn(2, 1))

v.size.print()
