date=$(date +%-d)
mkdir day$date
cd $_

touch input.txt
touch test.txt

echo 'const _ = require("../utils")
const file = _.read("input.txt")
const test = _.read("test.txt")

const input = test
' > script.js