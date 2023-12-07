fun part1(nums: List<Int>) = nums.windowed(2).count { (a, b) -> b > a }
fun part2(nums: List<Int>) = part1(nums.windowed(3).map { it.sum() })

fun main() {
    val nums = readLines("Day1").map { it.toInt() }
    println(part1(nums))
    println(part2(nums))
}