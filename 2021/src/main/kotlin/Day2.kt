fun part1(cmds: List<Pair<String, Int>>): Array<Int> {
    var pos = arrayOf(0, 0)
    var aim = 0
    for (cmd in cmds) {
        var dist = cmd.second
        if (cmd.first == "forward") {
            pos[0] += dist
            pos[1] += aim * dist
        } else {
            if (cmd.first == "up") dist *= -1
            aim += dist
        }
    }
    return pos
}

fun main() {
    val cmds: List<Pair<String, Int>> = readLines("Day2").map {
        val (dir, dist) = it.split(" ")
        Pair(dir, dist.toInt())
    }

    val (x, y) = part1(cmds)
    println(x * y)
}