import { readFileSync } from "fs";
import { it, get } from "../../lib";
const input = readFileSync(process.argv[2], "utf8");

const lists = zip(...input.lines().map(it.ssv().map(Number)).slice(0, -1))
zip(...lists.map(it.nsort())).map($$absdiff()).sum().print() // part 1
lists[0].map(n => lists[1].count(n) * n).sum().print()

/* let a = []
let b = []

for (const p of ps) {
	a.push(p[0])
	b.push(p[1])
}

a.map(n => n * b.filter(x => x == n).length).sum().print()

zip(a, b).map(([x, y]) => Math.abs(x - y)).sum().print() */
