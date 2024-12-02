# as if i'm good enough at this for this script to help... lol

let now = date now | date to-record
let folder = $"($now.year)/day($now.day)"
mkdir $folder
cd $folder
touch test.txt
curl -b $"session=($env.AOC_SESSION)" $"https://adventofcode.com/2024/day/($now.day)/input" -o input.txt
cp ../../template.js solution.js
