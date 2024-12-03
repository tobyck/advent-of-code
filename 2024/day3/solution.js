import { readFileSync } from "fs";
import { it, get, _Set } from "../../lib";
let input = readFileSync(process.argv[2], "utf8");

// part 1
input.match(/mul\(\d+,\d+\)/g).map(ints().prod()).sum().print()

// part 2
let s = 0, e = true
input.match(/mul\(\d{1,3},\d{1,3}\)|do\(\)|don't\(\)/g).for(m => {
	if (m == "don't()") e = false
	else if (m == "do()") e = true
	else if (e) s += m.ints().prod()
})
print(s)
