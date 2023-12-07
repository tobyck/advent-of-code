cals = open("calories.txt", "r").read().split("\n\n")
groups = list(map(lambda x: x.split("\n"), cals))
sums = list(map(lambda g: sum(list(map(lambda n: int(n), g))), groups))

# 1
print(max(sums))

# 2
print(sum(sorted(sums)[-3:]))