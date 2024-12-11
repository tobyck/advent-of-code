import { it, get } from "../../lib"

const ops = ["+", "*", "||"]

const all_eqs = (nums, so_far = "") => {
	if (nums.length == 0) return so_far
	return so_far
		? ops.flatMap(o => all_eqs(nums.slice(1), so_far + o + nums[0]))
		: ops.flatMap(o => all_eqs(nums.slice(2), nums.first(2).join(o)))
}

const do_op = (a, b, op) => {
	if (op == "+") return a + b
	if (op == "*") return a * b
	if (op == "||") return num(a.str() + b.str())
}

const ev = e => {
	let ts = e.match(/\d+|[\+\*]|\|\|/g)
	let res = do_op(ts[0].int(), ts[2].int(), ts[1])
	ts.splice(0, 3)
	while (ts.length) {
		res = do_op(res, ts[1].int(), ts[0])
		ts.splice(0, 2)
	}
	return res
}

//ev("6 * 8 || 6 * 15").print()
lines.map(it.split(":").map(it.ints()))
	.filter(([a, nums]) => all_eqs(nums).some(e => ev(e) == a))
	.flatMap(get[0])
	.sum()
	.print()
