const assert = require("assert");
const { _, isInt, isFloat, isNum, isArr, isStr, deepEqual } = require("./lib.js")

// array

assert.deepEqual([1, 2, 3].rev(), [3, 2, 1]);
assert.deepEqual([1, [2, 3], 4].rev(), [4, [2, 3], 1]);

assert.deepEqual([1, 2, 3].sorted(), [1, 2, 3]);
assert.deepEqual([1, 2, 3].sorted((a, b) => b - a), [3, 2, 1]);
assert.deepEqual([3, "a", "0"].sorted(), ["0", 3, "a"]);

assert.equal([1, 2, 3].sum(), 6);

assert.equal([1, 2, 3].prod(), 6);

assert.deepEqual(1 .to(10).step(2), [1, 3, 5, 7, 9]);
assert.deepEqual(10 .downTo(1).step(2), [10, 8, 6, 4, 2]);
assert.deepEqual(1 .to(10).step(2).step(4), [1, 5, 9]);

assert.equal([1, 2, 3].first(), 1);

assert.equal([1, 2, 3].last(), 3);

assert.equal([1, 2, 3].len(), 3);

assert.deepEqual([1, 2, 3].uniq(), [1, 2, 3]);
assert.deepEqual([1, 2, 3, 1, 2, 3].uniq(), [1, 2, 3]);

assert.equal([1, 2, 3].at(2), 3);
assert.equal([1, 2, 3].at(4), 2);
assert.equal([1, 2, 3].at(123), 1);
assert.equal([1, 2, 3].at(-1), 3);
assert.equal([1, 2, 3].at(-4), 3);
assert.equal([1, 2, 3].at(-123), 1);
assert.deepEqual([1, 2, 3].at([0, 2]), [1, 3]);
assert.deepEqual([1, 2, 3].at([4, -4]), [2, 3]);

assert.deepEqual([1, 2, 3, 1, 2, 3].count(1), 2);
assert.deepEqual([1, 2, 3, 1, 2, 3].count(4), 0);

// string

assert.equal("123".int(), 123);
assert.equal("123.456".int(), 123);

assert.equal("123.456".float(), 123.456);
assert.equal("123".float(), 123);

assert.equal("123.456".num(), 123.456);
assert.equal("123".num(), 123);

assert.deepEqual("1 2 3".ints(), [1, 2, 3]);
assert.deepEqual("1a23.5b4c".ints(), [1, 23, 5, 4]);

assert.deepEqual("1 2 3".floats(), [1, 2, 3]);
assert.deepEqual("1a23.5b4c".floats(), [1, 23.5, 4]);

assert.deepEqual("1 2 3".nums(), [1, 2, 3]);
assert.deepEqual("1a23.5b4c".nums(), [1, 23.5, 4]);

assert.deepEqual("abc".chars(), ["a", "b", "c"]);

assert.deepEqual("abc".lines(), ["abc"]);
assert.deepEqual("a\nbcd\nefgh".lines(), ["a", "bcd", "efgh"]);

assert.deepEqual("abc".words(), ["abc"]);
assert.deepEqual("these are w0rds".words(), ["these", "are", "w0rds"]);

assert.deepEqual("abc".uniq(), ["a", "b", "c"]);
assert.deepEqual("abracadabra".uniq(), ["a", "b", "r", "c", "d"]);

assert.equal("abc".rev(), "cba");

assert.deepEqual("123".digits(), [1, 2, 3]);
assert.deepEqual("123.456".digits(), [1, 2, 3, 4, 5, 6]);

assert.equal("abc".first(), "a");

assert.equal("abc".last(), "c");

assert.equal("abc".len(), 3);

assert.equal("abc".at(2), "c");
assert.equal("abc".at(4), "b");
assert.equal("abc".at(123), "a");
assert.equal("abc".at(-1), "c");
assert.equal("abc".at(-4), "c");
assert.equal("abc".at(-123), "a");
assert.deepEqual("abc".at([0, 2]), ["a", "c"]);
assert.deepEqual("abc".at([4, -4]), ["b", "c"]);

assert.deepEqual("abracadabra".count("a"), 5);

// number

assert.deepEqual(1 .to(7), [1, 2, 3, 4, 5, 6, 7]);
assert.deepEqual((-3) .to(3), [-3, -2, -1, 0, 1, 2, 3]);

assert.deepEqual(7 .downTo(1), [7, 6, 5, 4, 3, 2, 1]);
assert.deepEqual(3 .downTo(-3), [3, 2, 1, 0, -1, -2, -3]);

assert.equal(1 .eq(1), true);
assert.equal(1 .eq(2), false);

assert.equal(1 .gt(1), false);
assert.equal(1 .gt(2), false);
assert.equal(2 .gt(1), true);

assert.equal(1 .lt(1), false);
assert.equal(1 .lt(2), true);
assert.equal(2 .lt(1), false);

assert.equal(1 .gte(1), true);
assert.equal(1 .gte(2), false);
assert.equal(2 .gte(1), true);

assert.equal(1 .lte(1), true);
assert.equal(1 .lte(2), true);
assert.equal(2 .lte(1), false);

assert.equal(1 .odd(), true);
assert.equal(2 .odd(), false);

assert.equal(1 .even(), false);
assert.equal(2 .even(), true);

assert.equal(1 .abs(), 1);
assert.equal((-1) .abs(), 1);
assert.equal(0 .abs(), 0);

assert.equal(9 .sqrt(), 3);
assert.equal(16 .sqrt(), 4);

assert.equal(2 .sign(), 1);
assert.equal((-2) .sign(), -1);
assert.equal(0 .sign(), 0);

assert.equal(1.5 .floor(), 1);
assert.equal(1.1 .floor(), 1);
assert.equal(1.9 .floor(), 1);

assert.equal(1.5 .ceil(), 2);
assert.equal(1.1 .ceil(), 2);
assert.equal(1.9 .ceil(), 2);

assert.equal(1.5 .round(), 2);
assert.equal(1.1 .round(), 1);
assert.equal(1.9 .round(), 2);

assert.equal(123.4 .str(), "123.4");

// set stuff

const map = [
    [0, 1, 1, 0, 1],
    [0, 1, 0, 0, 1],
    [0, 0, 0, 1, 0],
    [1, 1, 0, 0, 1]
]

const neighbours = ([x, y]) => {
    return [
        [x + 1, y],
        [x - 1, y],
        [x, y + 1],
        [x, y - 1]
    ].filter(([x, y]) => map[y]?.[x] === 0)
}

assert.deepEqual(
    bfs([0, 0], [3, 0], neighbours), 
    [[0, 0], [0, 1], [0, 2], [1, 2], [2, 2], [2, 1], [3, 1], [3, 0]]
)

// top-level functions

assert.equal(isInt(1), true)
assert.equal(isInt(1.5), false)
assert.equal(isInt("1"), false)

assert.equal(isFloat(1), false)
assert.equal(isFloat(1.5), true)
assert.equal(isFloat("1.5"), false)

assert.equal(isNum(1), true)
assert.equal(isNum(1.5), true)
assert.equal(isNum("1.5"), false)

assert.equal(isArr([1, 2, 3]), true)
assert.equal(isArr("123"), false)
assert.equal(isArr({ 0: "a" }), false)

assert.equal(isStr("123"), true)
assert.equal(isStr(123), false)
assert.equal(isStr(["abc"]), false)

assert.equal(deepEqual(1, 1), true)
assert.equal(deepEqual(1, 2), false)
assert.equal(deepEqual(1, "1"), false)
assert.equal(deepEqual([1, 2, 3], [1, 2, 3]), true)
assert.equal(deepEqual([1, ["2", 3]], [1, ["2", 3]]), true)

// tacit stuff

