import { it, get } from "../../lib";

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
