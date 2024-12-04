import { readFileSync } from "fs";
import { it, get, _Set } from "../../lib";
let input = readFileSync(process.argv[2], "utf8");
let lines = input.lines();

let s = 0, c = 0;
for (let char of input) {
	c++
	if (char == "(") s++;
	if (char == ")") s--;
	if (s < 0) {
		print(c)
		break;
	}
}
