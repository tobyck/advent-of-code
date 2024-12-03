alias test_msg = print "====== TEST INPUT ======"
alias full_msg = print "====== FULL INPUT ======";

def aot [] { test_msg; bun solution.js test.txt }
def aof [] { full_msg; bun solution.js input.txt }

def aowt [] { test_msg; bun --watch solution.js test.txt }
def aowf [] { full_msg; bun --watch solution.js input.txt }

def aoc [] { aot; aof }
