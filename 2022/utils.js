const fs = require("fs");

const read = addr => fs.readFileSync(addr, "utf8")

Array.prototype.sum = function () {
    return this.reduce((a, b) => a + b)
}

const range = (start, end) => {
    if (end === undefined) {
        end = start
        start = 0
    }

    // range from start to end (make it work for negatives)
    let ret = []

    if (start < end) {
        for (let i = start; i <= end; i++) {
            ret.push(i)
        }
    } else {
        for (let i = start; i >= end; i--) {
            ret.push(i)
        }
    }

    return ret
}

const isPrime = (num) => {
    const pow = (b, e, m) => {
        let ret = 1;
        for (var i = 0; i < e; i++) {
            ret *= b;
            ret %= m;
        }
        return ret;
    }

    if ((num % 2 == 0 && num > 2) || num < 2) return false;
    if ([2, 3].includes(num)) return true;

    let s = num - 1;

    for (let i = 0; i < 40; i++) {
        const a = Math.floor(Math.random() * (num - 1)) + 1;
        if ([1, -1].includes(pow(a, s, num))) {
            continue;
        } else {
            return false;
        }
    }

    return true;
}

String.prototype.chars = function () {
    return this.split("")
}

String.prototype.lines = function () {
    return this.split("\n")
}

String.prototype.words = function () {
    return this.split(" ")
}

String.prototype.charcode = function () {
    if (this.length > 1) {
        return this.chars().map(c => c.charCodeAt(0))
    } else {
        return this.charCodeAt(0)
    }
}

Array.prototype.uniquify = function (f = (a, b) => a === b) {
    return this.filter((a, i) => this.findIndex(b => f(a, b)) === i)
}

const int = x => parseInt(x)
const str = x => x.toString()

const equal = (a, b) => {
    if (a === b) {
        return true
    }

    if (Array.isArray(a) && Array.isArray(b)) {

        return a.length === b.length && a.every((v, i) => equal(v, b[i]))
    }

    if (typeof a === "object" && typeof b === "object") {
        return Object.keys(a).length === Object.keys(b).length
            && equal(Object.keys(a), Object.keys(b))
            && equal(Object.values(a), Object.values(b))
    }

    return false
}

Array.prototype.count = function (x) {
    return this.map(y => equal(x, y)).filter(x => x).length
}

const log = console.log

module.exports = {
    read,
    range,
    isPrime,
    int,
    str,
    equal,
    log
}