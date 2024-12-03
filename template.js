import { readFileSync } from "fs";
import { it, get, _Set } from "../../lib";
let input = readFileSync(process.argv[2], "utf8");
let lines = input.lines();

lines
.print()
