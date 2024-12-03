# as if i'm good enough at this for this script to help... lol

def --env aoc-new [year?: int, day?: int] {
	let now = date now | date to-record
	let year = match $year { null => $now.year, _ => $year }
	let day = match $day { null => $now.day, _ => $day }
	let folder = $"($year)/day($day)"
	mkdir $folder
	cd $folder
	touch test.txt
	curl -b $"session=($env.AOC_SESSION)" $"https://adventofcode.com/($year)/day/($day)/input" -o input.txt
	cp ../../template.js solution.js
}
