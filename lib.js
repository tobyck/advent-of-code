/*
 * Author: Toby Connor-Kebbell
 * Date: 12/2023
 * 
 * This library provides a collection of useful functions and methods primarily 
 * for Advent of Code, but also for other tasks. Some functions have been added
 * to the prototypes of built-in objects, others are global functions which are
 * added to the globalThis object. The library also provides the _ and __
 * variables which have proxies on them to allow for tacit programming. The
 * Single underscore begins are tacit chain of functions (e.g. _.trim().words()
 * is a function which trims a string then splits it on whitespace). The double
 * underscore is for getting properties (e.g. __.items[3].name is a function
 * which accesses the name property of the 4th item in an array called "items").
 * Global functions which this library provides have two other variants besides
 * the normal one. The first is the _ variant, which is a curried version of the
 * original (i.e. _eq(3) returns a function which checks if a value equals 3).
 * The second is $, which is also curried but takes its arguments as functions.
 * For example, $eq(_.rev()) returns a function which checks if x equals x when
 * reversed: x => eq(x, x.rev()). These two variants can also be chained like
 * the tacit chains with _ and __. For example, $eq(_.rev()).str() does the same
 * thing but returns the boolean as a string instead.
 */

// array methods

Array.prototype.rev = function() { return this.slice().reverse() };
Array.prototype.sorted = function(f) { return this.slice().sort(f) };
Array.prototype.sum = function() { return this.reduce((acc, cur) => acc + cur) };
Array.prototype.prod = function() { return this.reduce((acc, cur) => acc * cur) };
Array.prototype.first = function() { return this[0] };
Array.prototype.last = function() { return this[this.length - 1] };
Array.prototype.len = function() { return this.length }
Array.prototype.for = Array.prototype.forEach
Array.prototype.uniq = function() { return [...new Set(this)] }
Array.prototype.min = function() { return Math.min(...this.filter(isNum)) }
Array.prototype.max = function() { return Math.max(...this.filter(isNum)) }
Array.prototype.print = function() { console.log(this); return this; }
Array.prototype.set = function() { return new Set(this) }

Array.prototype.step = function(n) {
    const first = this[0];
    const last = this[this.length - 1];
    const ret = [];

    if (first < last) for (let i = first; i <= last; i += n) ret.push(i);
    else for (let i = first; i >= last; i -= n) ret.push(i);

    return ret;
}

Array.prototype.at = function(i) {
    if (isInt(i)) {
        return this[((i + this.length) % this.length + this.length) % this.length];
    } else if (isArr(i) && i.every(isInt)) {
        const ret = [];
        for (const index of i) ret.push(this.at(index));
        return ret;
    }
}

Array.prototype.count = function(f) {
    return this.filter(x => f(x)).length;
}

Array.prototype.filterOut = function(f) { // (in-place)
    for (let i = 0; i < this.length; i++) {
        if (f(this[i], i, this)) {
            this.splice(i, 1);
            i--;
        }
    }
}

Array.prototype.filteredOut = function(f) { // (not in-place)
    return this.filter((x, i, a) => !f(x, i, a));
}

Array.prototype.mapInPl = function(f) {
    for (let i = 0; i < this.length; i++) {
        this[i] = f(this[i], i, this);
    }
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
String.prototype.words = function() { return this.split(/\s+/g) }
String.prototype.uniq = function() { return [...new Set(this)] }
String.prototype.rev = function() { return this.split("").rev().join("") }
String.prototype.digits = function() { return this.split("").map(x => x.int()).filter(x => x !== null) }
String.prototype.first = function() { return this[0] }
String.prototype.last = function() { return this[this.length - 1] }
String.prototype.len = function() { return this.length }
String.prototype.at = function(i) { return this.split("").at(i) }
String.prototype.count = function(x) { return this.split("").count(x) }
String.prototype.csv = function() { return this.split(",").map(x => x.trim()) }
String.prototype.isDigit = function() { return /^\d$/.test(this) }
String.prototype.print = function() { console.log(this.valueOf()); return this.valueOf(); }

// number methods

Number.prototype.to = function(n) {
    const range = [];
    for (let i = this.valueOf(); i <= n; i++) {
        range.push(i)
    }
    return range;
};

Number.prototype.downTo = function(n) {
    const range = [];
    for (let i = this.valueOf(); i >= n; i--) {
        range.push(i)
    }
    return range;
};

Number.prototype.str = function() { return this.toString() }
Number.prototype.int = function() { return this.str().int() }
Number.prototype.eq = function(n) { return this.valueOf() === n }
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

class _Set extends Set {
    constructor(iterable) {
        super(iterable);
    }

    add(item) { super.add((JSON.stringify(item))) }
    has(item) { return super.has(JSON.stringify(item)) }
    delete(item) { return super.delete(JSON.stringify(item)) }
    arr() { return [...this].map(x => JSON.parse(x)) }
    len() { return this.size }

    print() {
        console.log(this.arr());
        return this;
    }

    *[Symbol.iterator]() {
        for (const item of this) {
            yield JSON.parse(item);
        }
    }
}

// boolean methods

Boolean.prototype.not = function() { return !this.valueOf() }
Boolean.prototype.str = function() { return this.valueOf().toString() }
Boolean.prototype.int = function() { return this.valueOf() ? 1 : 0 }
Boolean.prototype.print = function() { console.log(this.valueOf()); return this.valueOf(); }

const getterProxy = (func, getter) => new Proxy(func, {
    get: getter
});

// tacit-ish stuff (fc for func chain)
globalThis.fc = func => getterProxy(
    func, 
    (target, prop) => {
        if (isInt(num(prop))) return globalThis.fc((...x) => target(...x)[prop]);
        else return (...args) => globalThis.fc((...x) => target(...x)[prop](...args));
    }
);

// similar to _ but only for getting properties
const getterChain = func => getterProxy(func, (target, prop) => getterChain(x => target(x)[prop]));

module.exports = {
    _: fc(x => x),
    __: getterChain(x => x)
};

globalThis.eq = (a, b) => {
    if (isArr(a) && isArr(b)) {
        if (a.len() !== b.len()) return false;
        for (let i = 0; i < a.len(); i++) {
            if (!eq(a[i], b[i])) return false;
        }
        return true;
    } else if (isStr(a) && isStr(b)) return a === b;
    else if (isNum(a) && isNum(b)) return a === b;
        
    return false;
};

// type checks
globalThis.isInt = Number.isInteger;
globalThis.isFloat = x => typeof x === "number" && !Number.isInteger(x);
globalThis.isNum = x => typeof x === "number";
globalThis.isArr = Array.isArray;
globalThis.isStr = x => typeof x === "string";

// type conversions
globalThis.int = x => parseInt(x);
globalThis.intBaseN = (x, n) => parseInt(x, n);
globalThis.float = x => parseFloat(x);
globalThis.num = x => {
    try {
        return Number(x)
    } catch {
        return null
    }
}
globalThis.bool = x => !!x;
globalThis.str = x => `${x}`;
globalThis.arr = x => isInt(x) ? Array(x).fill() : Array.from(x);
globalThis.set = x => new Set(x)

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
globalThis.floordiv = (a, b) => Math.floor(a / b);
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

// set operations which should work on any iterable
globalThis.union = (a, b) => new Set([...a, ...b]).arr();
globalThis.intersect = (a, b) => new Set(a).arr().filter(x => b.set().has(x));
globalThis.diff = (a, b) => new Set(a).arr().filter(x => !b.set().has(x));

// curry
for (const [name, func] of globalThis.entries()) {
    if (typeof func === "function") {
        globalThis["_" + name] = (...args) => fc(x => func(x, ...args))
        globalThis["$" + name] = (...funcs) => {
            return fc((...args) => {
                // i'm not even gonna try to explain this
                const a = [args[0], ...funcs.map(f => f(...args.slice(0, func.length)))]
                return func(...a.slice(-func.length))
            })
        }
    }
}

// tests
// let _ = fc(x => x)
// console.log(['abc', 'abba', 'kayak'].map($eq(_.rev()).str()))
// console.log([1, 2, 2, 4, 2, 4].map(_arr().fill(':)').map((x, i) => `${i} ${x}`).rev()))
// console.log([[1, 2], [3, 4]].map(_[0]))