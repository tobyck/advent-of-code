import { it, get } from "../../lib"

// part 1
let [rules, s2] = groups.map(it.lines().map(ints()))
s2.filter(l => {
	return l.every((n, i) => {
		return !l.slice(0, i).some(_n => !rules.filter(it[1].eq(n)).map(it[0]).includes(_n)) &&
			!l.slice(i + 1).some(_n => !rules.filter(it[0].eq(n)).map(it[1]).includes(_n))
	})
}).map(x => x[~~(x.length / 2)]).sum().print()

// part 2
const isbad = l => {
	return l.some((n, i) => {
		let a = rules.filter(it[0].eq(n)).map(it[1])
		let b = rules.filter(it[1].eq(n)).map(it[0])
		return l.slice(0, i).some(_n => a.includes(_n)) ||
			l.slice(i + 1).some(_n => b.includes(_n))
	})
}

const _sort = l => {
	while (isbad(l)) {
		for (let i = 0; i < l.length; i++) {
			let must_be_after = rules.filter(it[0].eq(l[i])).map(it[1])
			for (let j = 0; j < i; j++) {
				if (must_be_after.includes(l[j])) {
					let to_move = l[j]
					l.splice(j, 1)
					l.splice(i + 1, 0, to_move)
				}
			}
		}
	}
	return l
}

s2.filter(isbad).map(_sort)
	// .print()
	.map(x => x[~~(x.length / 2)]).sum().print()
