import { it, get } from "../../lib"

let x = input.chars().map((n, i) => {
	if (i % 2 == 1) return arr(int(n)).fill(null)
	else return arr(int(n)).fill(i / 2)
}).filter(get.length)

const has_undef = x => x.some(q => q === null)

const finished = x => {
	let seen_null = false
	let ret = []
	for (const item of x) {
		if (item == null) seen_null = true
		else {
			if (seen_null) return false
			ret.push(item)
		}
	}
	return ret
}

/* let j
l: while (j = x.findIndex(has_undef)) {
	while (has_undef(x[j])) {
		let t = x.length - 1 - x.slice().reverse().findIndex(a => a.length && !has_undef(a))
		for (let k = x[j].indexOf(null); k < x[j].length; k++) {
			let s = x[t].shift()
			if (s) {
				x[j][k] = s
			}
			else break
		}
		if (finished(x.flat(1))) break l
	}
} */

/* const arstneio = (xi, cant_fill) => {
	let c = 0
	for (const [a, i] of xi.slice(cant_fill * 2 + 1)) {
		if (has_undef(a)) c++
		if (c - 1 == cant_fill) return i
	}
}

let cant_fill = 0
while (true) {
	let xi = x.map((a, i) => [a, i])
	let j = arstneio(xi, cant_fill)
	if (!j) break
	for (const [t, i] of xi.reverse().filter(([a]) => a.length && !has_undef(a))) {
		let l = t.slice().length
		if (x[j].filter(x => x == null).length >= l) {
			let offset = x[j].indexOf(null)
			for (let k = 0; k < l; k++) {
				x[j][k + offset] = x[i][k]
				x[i][k] = null
			}
		}
		if (!x[j].some(x => x == null)) break
	}
	if (has_undef(x[j])) cant_fill++
}

let g = x.flat(1)
print(g.map(v => v ?? 0).map((v, i) => v * i).sum()) */

// print(x)

/* for (let i = 1; i < x.length - 1; i += 2) {
	for (let j = x.length - 1; j > 1; j--) {
		if (has_undef(x[j]) || x[i].filter(v => v == null).length < x[j].length) continue
		// print(x[i], x[j])
		let offset = x[i].indexOf(null)
		for (let k = 0; k < x[j].length; k++) {
			x[i][k + offset] = x[j][k]
			x[j][k] = null
		}
	}
}
*/

// print(x)

for (let i = x.length - 1; i > 1; i--) {
	if (has_undef(x[i])) continue
	let j = x.findIndex((s, k) => k < i && s.filter(v => v == null).length >= x[i].length)
	if (j != -1) {
		let offset = x[j].indexOf(null)
		for (let k = 0; k < x[i].length; k++) {
			x[j][k + offset] = x[i][k]
			x[i][k] = null
		}
	}
}

print(x.flat(1).map((v, i) => (v ?? 0) * i).sum())
