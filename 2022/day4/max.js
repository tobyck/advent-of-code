const fs = require('fs')
var inp = fs.readFileSync('input.txt', 'utf8')
var num = 0;
for (var i = 0; i < inp.split("\n").length; i++) {
    var line = inp.split("\n")[i]
    var [one, two] = line.split(",")
    var [one1, one2] = one.split("-")
    var [two1, two2] = two.split("-")
    if (parseInt(one1) <= parseInt(two1)) {
        if (parseInt(one2) >= parseInt(two2)) {
            num++;
        }
    } else if (parseInt(two1) <= parseInt(one1)) {
        if (parseInt(two2) >= parseInt(one2)) {
            num++;
        }
    }
}
console.log(num)