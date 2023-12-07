import kotlin.math.pow

fun part1(lines: List<String>): Int {
    val width = lines[0].length
    var freqs = Array(width) { arrayOf(0, 0) }

    for (line in lines) {
        line.forEachIndexed { index, digit ->
            freqs[index][digit.digitToInt()]++
        }
    }

    val n = freqs.map { it.indexOf(it.max()) }.joinToString("").toInt(2)
    return n * (n xor (2.0.pow(width.toDouble()) - 1).toInt())
}

fun getFreqs(lines: List<String>): Array<Array<Int>> {
    val width = lines[0].length
    var freqs = Array(width) { arrayOf(0, 0) }

    for (line in lines) {
        line.forEachIndexed { index, digit ->
            freqs[index][digit.digitToInt()]++
        }
    }

    return freqs
}

fun part2(lines: List<String>): Int {
    var linesCopy = ArrayList(lines)

    var i = 0
    var freqs: Array<Array<Int>>
    while (linesCopy.size > 1) {
        freqs = getFreqs(linesCopy)
        linesCopy.removeIf { it[i].digitToInt() == freqs[i].lastIndexOf(freqs[i].max()) }
        i++
    }

    return linesCopy[0].toInt(2)
}

fun main() {
    val lines = readLines("Day3")
   // println(part1(lines))
    println(part2(lines))
}