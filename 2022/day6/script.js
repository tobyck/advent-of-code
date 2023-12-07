const utils = require("../utils")
const file = utils.read("f")

for (let i = 0; i < file.length; i++) {
    if (file.slice(i, i + 14).split("").filter((c, i, a) => a.indexOf(c) === i).length == 14) {
        console.log(i + 14)
        break;
    }
}