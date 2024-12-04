import { getInput, it, get, _Set } from "../../lib"
let { input, lines, chs } = getInput()

// part 1
lines.dl().count(l => 
	!"ab cd pq xy".ssv().some(it.inside(l)) &&
	l.chars().count(it.inside("aeiou")) >= 3 &&
	l.chars().map(code()).deltas().includes(0)
)

// part 2
lines.count(l =>
	l.chars().sliding().map(it.join("")).dedup().map(it.countin(l, false)).some(gte(2)) &&
	l.match(/(.).\1/)
).print()
