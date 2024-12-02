import { readFileSync } from "fs";
import { it, get } from "../../lib";
const input = readFileSync(process.argv[2], "utf8");
let lines = input.lines();

lines = lines.droplast().map(ints())
const isSafe = r => r.map(sign()).alleq() && r.map(abs()).every(lte(3))

// part 1
lines.map(deltas()).count(isSafe).print()

// part 2
lines.count(r => r.map((_, i) => r.slice().dropnth(i)).append(r).map(deltas()).some(isSafe)).print()

/* const rows = lines.slice(0, -1).map(it.ints())

let issafe = ds => {
	if ((ds.every(d => d < 0) || ds.every(d => d >= 0)) && ds.every(d => Math.abs(d) >= 1 && Math.abs(d) <= 3)) return true;
	return false;
}

rows.countWhere(r => {
	let ns = [r]
	for (let i = 0; i < r.length; i++) {
		ns.push(r.filterOut((_, _i) => _i == i))
	}
	return ns.some(x => issafe(x.deltas()))
}).print()

/*
deltas.countWhere(ds => {
	let dss = [ds]
	for (let i = 0; i < ds.length; i++) {
		dss.push(ds.filterOut((v, _i) => _i == i))
	}
	print(dss.length)
	return dss.some(x => issafe(x))
}).print() */
