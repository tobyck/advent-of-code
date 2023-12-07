import java.io.File

fun readLines(filepath: String) = File("src/main", "$filepath.txt").readLines()