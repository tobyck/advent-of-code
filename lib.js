/*
 * THIS IS BUGGY AND NOT BEING USED
 */

import { readFileSync } from "fs";

globalThis.range = function(a, b = 0, step = 1) {
	let start = 0, end = a
	if (arguments.length > 1) {
		start = a
		end = b
	}
	const ret = [];
	for (let n = start; n < end; n += step)
		ret.push(n)
	return ret
}

// array methods

Array.prototype.rev = function() { return this.slice().reverse() };
Array.prototype.sorted = function(f) { return this.slice().sort(f) };
Array.prototype.sum = function() { return this.reduce((acc, cur) => acc + cur) };
Array.prototype.prod = function() { return this.reduce((acc, cur) => acc * cur) };
Array.prototype.first = function(n = null) { return n ? this.slice(0, n) : this[0] };
Array.prototype.last = function(n = null) { return n ? this.slice(-n) : this[this.length - 1] };
Array.prototype.nthlast = function(n) { return this[this.length - n] };
Array.prototype.dropnth = function(i) { this.splice((i % this.length + this.length) % this.length, 1); return this };
Array.prototype.droplast = function() { return this.dropnth(-1) };
Array.prototype.dl = Array.prototype.droplast
Array.prototype.len = function() { return this.length }
Array.prototype.for = Array.prototype.forEach
Array.prototype.min = function() { return Math.min(...this.filter(isnum)) }
Array.prototype.max = function() { return Math.max(...this.filter(isnum)) }
Array.prototype.print = function() { console.log(this); return this; }
Array.prototype.set = function() { return new Set(this) }
Array.prototype.nsort = function() { return this.sort((a, b) => a - b) }
Array.prototype.rsort = function() { return this.sort((a, b) => b - a) }
Array.prototype.sortby = function(f) { return this.sort((a, b) => f(a) - f(b)) }
Array.prototype.rsortby = function(f) { return this.sort((a, b) => f(b) - f(a)) }
Array.prototype.append = function(x) { this.push(x); return this }
Array.prototype.prepend = function(x) { this.unshift(x); return this }
Array.prototype.alleq = function() { return this.every(v => eq(v, this[0])) }
Array.prototype.mapi = function(f) { return this.map((_, i) => f(i)) }
Array.prototype.indicies = function() { return range(this.length) }
Array.prototype.uniq = function() { return new _Set(this) }
Array.prototype.dedup = function() { return this.uniq().arr() }

Array.prototype.sliding = function(size = 2, loop = false) {
	const x = loop ? this.concat(this.slice(0, size - 1)) : this
	return x.slice(0, -size + 1).map((_, i) => x.slice(i, i + size))
}

Array.prototype.chunks = function(size = 2) {
	const ret = []
	for (let i = 0; i < this.length; i += size) {
		ret.push(this.slice(i, i + size))
	}
	return ret
}

Array.prototype.everyn = function(n, start = 0) {
	const ret = [];
	for (let i = start; i < this.length; i += n)
		ret.push(this[i])
	return ret
}

Array.prototype.step = function(n) {
    const first = this[0];
    const last = this[this.length - 1];
    const ret = [];

    if (first < last) for (let i = first; i <= last; i += n) ret.push(i);
    else for (let i = first; i >= last; i -= n) ret.push(i);

    return ret;
}

Array.prototype.at = function(i) {
    if (isint(i)) {
        return this[((i + this.length) % this.length + this.length) % this.length];
    } else if (isarr(i) && i.every(isint)) {
        const ret = [];
        for (const index of i) ret.push(this.at(index));
        return ret;
    }
}

Array.prototype.count = function(c, multiValue = false) {
	if (typeof c === "function") return this.filter(c).length;
	else if (!multiValue) return this.filter(x => eq(x, c)).length;
	else if (Array.isArray(c)) {
		let count = 0
		for (let i = 0; i < this.length;) {
			if (eq(this.slice(i, i + c.length), c)) {
				count++
				i += c.length
			} else i++
		}
		return count
	} else {
		throw new TypeError(`Invalid arg to iterable.count: ${c}`)
	}
}

Array.prototype.filterout = function(f) {
    return this.filter((x, i, a) => !f(x, i, a));
}

Array.prototype.where = function(f) { // (not in-place)
    return this.filter((x, i, a) => f(x, i, a));
}

Array.prototype.deltas = function() {
    const ret = [];
    for (let i = 0; i < this.length - 1; i++) {
        ret.push(this[i + 1] - this[i]);
    }
    return ret;
}

// string methods

String.prototype.int = function() { return int(this) }
String.prototype.float = function() { return float(this) }
String.prototype.num = function() { return num(this) }
String.prototype.ints = function() { return this.match(/\d+/g).map(x => x.int()) }
String.prototype.floats = function() { return this.match(/\d+(\.\d+)?/g).map(x => x.float()) }
String.prototype.nums = function() { return this.match(/\d+(\.\d+)?/g).map(x => x.num()) }
String.prototype.chars = function() { return this.split("") }
String.prototype.lines = function() { return this.split("\n") }
String.prototype.uniq = function() { return this.chars().uniq() }
String.prototype.rev = function() { return this.chars().rev().join("") }
String.prototype.digits = function() { return this.split("").map(x => x.int()).filter(x => x !== null) }
String.prototype.first = function() { return this[0] }
String.prototype.last = function() { return this[this.length - 1] }
String.prototype.len = function() { return this.length }
String.prototype.at = function(i) { return this.split("").at(i) }
String.prototype.csv = function() { return this.split(",").map(x => x.trim()) }
String.prototype.ssv = function() { return this.split(/\s+/).map(x => x.trim()) }
String.prototype.words = String.prototype.ssv
String.prototype.groups = function() { return this.split("\n\n") }
String.prototype.isDigit = function() { return /^\d$/.test(this) }
String.prototype.print = function() { console.log(this.valueOf()); return this.valueOf(); }
String.prototype.code = function() { return this.charCodeAt(0) }

String.prototype.count = function(x, overlapping = true) {
	if (typeof x === "string") x = x.chars()
	return this.chars().count(x, true, overlapping)
}

// number methods

Number.prototype.to = function(n) {
    const range = [];
    for (let i = this.valueOf(); i <= n; i++) {
        range.push(i)
    }
    return range;
};

Number.prototype.downto = function(n) {
    const range = [];
    for (let i = this.valueOf(); i >= n; i--) {
        range.push(i)
    }
    return range;
};

Number.prototype.str = function() { return this.toString() }
Number.prototype.int = function() { return this.str().int() }
Number.prototype.add = function(n) { return this + n }
Number.prototype.sub = function(n) { return this - n }
Number.prototype.mul = function(n) { return this * n }
Number.prototype.div = function(n) { return this / n }
Number.prototype.mod = function(n) { return this % n }
Number.prototype.exp = function(e, m = null) {
	if (m) {
		// naive solution but it does the job
		if (m == 1) return 0
		let ret = 1
		for (let i = 0; i < e; i++)
		ret = (ret * this) % m
		return ret
	} else return this ** e
}
Number.prototype.absdiff = function(n) { return Math.abs(this - n) }
Number.prototype.floordiv = function(n) { return Math.floor(this / n) }
Number.prototype.gt = function(n) { return this.valueOf() > n }
Number.prototype.lt = function(n) { return this.valueOf() < n }
Number.prototype.gte = function(n) { return this.valueOf() >= n }
Number.prototype.lte = function(n) { return this.valueOf() <= n }
Number.prototype.odd = function() { return this.valueOf() % 2 === 1 }
Number.prototype.even = function() { return this.valueOf() % 2 === 0 }
Number.prototype.abs = function() { return Math.abs(this.valueOf()) }
Number.prototype.sqrt = function() { return Math.sqrt(this.valueOf()) }
Number.prototype.sign = function() { return Math.sign(this.valueOf()) }
Number.prototype.floor = function() { return Math.floor(this.valueOf()) }
Number.prototype.ceil = function() { return Math.ceil(this.valueOf()) }
Number.prototype.round = function() { return Math.round(this.valueOf()) }
Number.prototype.print = function() { console.log(this.valueOf()); return this.valueOf(); }

// object methods

Object.prototype.keys = function() { return Object.keys(this) }
Object.prototype.vals = function() { return Object.values(this) }
Object.prototype.entries = function() { return Object.entries(this) }
Object.prototype.map = function(f) { return Object.fromEntries(Object.entries(this).map(f)) }
Object.prototype.print = function() { console.log(this); return this; }
Object.prototype.do = function(k, f, d) {
    if (!(k in this)) this[k] = d;
    f(this[k]);
}

// set stuff

Set.prototype.len = function() { return this.size }
Set.prototype.print = function() { console.log(this); return this; }
Set.prototype.arr = function() { return [...this] }
// these should work on any iterable
Set.prototype.union = function(other) { return new Set([...this, ...other]).arr(); }
Set.prototype.intersect = function(other) { return new Set(this).arr().filter(x => other.set().has(x)); }
Set.prototype.diff = function(other) { return new Set(this).arr().filter(x => !other.set().has(x)); }

class _Set extends Set {
    constructor(iterable = []) {
		super()
        for (const item of iterable) this.add(item)
    }

    add(item) { super.add((JSON.stringify(item))) }
    has(item) { return super.has(JSON.stringify(item)) }
    delete(item) { return super.delete(JSON.stringify(item)) }

    *[Symbol.iterator]() {
		for (const item of super[Symbol.iterator]())
			yield JSON.parse(item)
    }
}

// 2d vector

class Vec {
	constructor(x = 0, y = 0) {
		this.x = x
		this.y = y
		this.str = this.toString
	}

	up(n = 1) { this.y -= n; return this }
	down(n = 1) { this.y += n; return this }
	left(n = 1) { this.x -= n; return this }
	right(n = 1) { this.x += n; return this }
	
	add(other) {
		this.x += other.x
		this.y += other.y
		return this
	}

	clone() {
		return new Vec(this.x, this.y)
	}

	get size() {
		return Math.hypot(this.x, this.y)
	}

	toString() {
		return `(${this.x}, ${this.y})`
	}

	arr() {
		return [this.x, this.y]
	}
}

globalThis.vec = (x, y) => new Vec(x, y)

// boolean methods

Boolean.prototype.not = function() { return !this.valueOf() }
Boolean.prototype.str = function() { return this.valueOf().toString() }
Boolean.prototype.int = function() { return this.valueOf() ? 1 : 0 }
Boolean.prototype.print = function() { console.log(this.valueOf()); return this.valueOf(); }

globalThis.consts = {
	alpha: "abcdefghijklmnopqrstuvwxyz",
	upperalpha: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
	digitwords: "zero one two three four five six seven eight nine".ssv()
}

globalThis.eq = (a, b) => {
    if (isarr(a) && isarr(b)) {
        if (a.len() !== b.len()) return false;
        for (let i = 0; i < a.len(); i++) {
            if (!eq(a[i], b[i])) return false;
        }
        return true;
    } else if (isstr(a) && isstr(b)) return a === b;
    else if (isnum(a) && isnum(b)) return a === b;
        
    return false;
};

globalThis.inside = (a, b) => {
	return b.includes(a)
}

globalThis.countin = (a, b, ...opts) => b.count(a, ...opts)

// type checks
globalThis.isint = Number.isInteger;
globalThis.isfloat = x => typeof x === "number" && !Number.isInteger(x);
globalThis.isnum = x => typeof x === "number";
globalThis.isarr = Array.isArray;
globalThis.isstr = x => typeof x === "string";
globalThis.type = x => typeof x

// type conversions
globalThis.int = x => parseInt(x.match(/-?\d+/));
globalThis.intbasen = (x, n) => parseInt(x, n);
globalThis.float = x => parseFloat(x.match(/-?\d+\.\d+/));
globalThis.num = x => {
    try {
        return Number(x)
    } catch {
        return null
    }
}
globalThis.bool = x => !!x;
globalThis.str = x => `${x}`;
globalThis.arr = x => isint(x) ? Array(x).fill() : Array.from(x);
globalThis.set = x => new _Set(x)

// misc
globalThis.truthy = x => ![undefined, null, false, 0, "", NaN].includes(x);
globalThis.print = (...args) => {
    console.log(...args);
    return args.length > 1 ? args : args?.[0];
};
globalThis.not = x => !x;
globalThis.zip = (...args) => {
    const ret = [];
    for (let i = 0; i < args[0].len(); i++) {
        ret.push(args.map(x => x[i]));
    }
    return ret;
}
globalThis.bfs = (start, end, neighbours) => {
    const visited = new _Set();
    const queue = [[start]];
    
    while (queue.length) {
        const path = queue.shift();
        const node = path.last();
        if (eq(node, end)) return path;
        if (visited.has(node)) continue;
        visited.add(node);
        for (const neighbour of neighbours(node)) {
            queue.push([...path, neighbour]);
        }
    }

    return null
}

// proxies

const funcChain = func => new Proxy(func, {
	get: (target, prop) => {
		if (isint(num(prop))) return funcChain(mainArg => target(mainArg)[prop])
		else return (...args) => funcChain(mainArg => {
			const soFar = target(mainArg)
			if (typeof soFar[prop] === "function") return soFar[prop](...args) 
			else return globalThis[prop](soFar, ...args)
		})
	}
});

const getterChain = func => new Proxy(func, {
	get: (target, prop) => getterChain(x => target(x)[prop])
});

const it = funcChain(x => x)
const get = getterChain(x => x)

// turn methods into functions as well

for (const type of [Number, String, Array, Set, Object])
	for (const method in type.prototype)
		if (!(method in globalThis)) {
			globalThis[method] = (...args) => funcChain(x => x[method](...args))
			globalThis["_" + method] = (x, ...rest) => x[method](...rest)
		}

// curry
for (let [name, func] of globalThis.entries()) {
    if (typeof func === "function") {
		if (name[0] === "_") name = name.slice(1)

		// first arg curried, but takes args as functions
        globalThis["$" + name] = (...funcs) => {
            return funcChain((...args) => {
                // i'm not even gonna try to explain this
                const a = [args[0], ...funcs.map(f => f(...args.slice(0, func.length)))]
                return func(...a.slice(-func.length))
            })
        }

		// takes args as a list
		globalThis["$$" + name] = () => funcChain(args => func(...args))
    }
}

globalThis.input = readFileSync(process.argv[2], "utf8").trim("\n");
globalThis.groups = input.groups()
globalThis.lines = input.lines()

export { it, get, _Set }
