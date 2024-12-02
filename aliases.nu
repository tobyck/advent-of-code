alias test_msg = print "====== TEST INPUT ======"
alias full_msg = print "====== FULL INPUT ======";

def aoct [] { test_msg; bun solution.js test.txt }
def aocf [] { full_msg; bun solution.js input.txt }

def aocwt [] { test_msg; bun --watch solution.js test.txt }
def aocwf [] { full_msg; bun --watch solution.js input.txt }

def aocb [] { aoct; aocf }
