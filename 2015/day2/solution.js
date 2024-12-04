import { readFileSync } from "fs";
import { it, get, _Set } from "../../lib";
let input = readFileSync(process.argv[2], "utf8");
let lines = input.lines();

lines.droplast().map(p => {
	/* let [l, w, h] = p.ints()
	let sides =  [2*l*w , 2*w*h , 2*h*l]
	return sides.sum() + sides.min()/2 */
	return p.ints().nsort().first(2).sum()*2 + p.ints().prod()
}).sum().print()
