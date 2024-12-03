import { readFileSync } from "fs";
import { it, get, _Set } from "../../lib";
let input = readFileSync(process.argv[2], "utf8");
let lines = input.lines();
/*
lines.droplast().filter(l => 
	l.chars().filter(it.inside(consts.alpha)).uniq().arr().rsortby(it.countin(l)).first(5).sort().join("") 
	== l.match(/(?<=\[)\w+(?=\])/)[0].chars().sort().join(""))
.map(it.int().abs()).sum().print() */

lines.droplast().for(x => {
	let s = x.match(/.+(?=\[)/)[0].split("-")
	let n = s.last().int()
	s = s.droplast()
	let d = s.map(y => y.chars().map(c => consts.alpha.at(consts.alpha.indexOf(c) + n)).join("")).join(" ")
	if (d.includes("north")) print(d, n)
})
