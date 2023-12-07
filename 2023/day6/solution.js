const fs = require("fs");
const { _, __ } = require("../../lib");
const input = fs.readFileSync(process.argv[2], "utf8");

const races = zip(...input.lines().map(_.nums())) // p1
const races2 = zip(...input.lines().map(_.replace(/\s/g, "").nums())) // p2

races2.map(([t, d]) => 1 .to(t).map(i => (t - i) * i).filter(_.gt(d)).len()).prod().print()