import re

drawing, cmds = open("input.txt").read().split("\n\n")

stacks = zip(*[line[1::4] for line in drawing.split("\n")[:-1]])
stacks = [list("".join(stack).strip())[::-1] for stack in stacks]

for cmd in cmds.split("\n"):
    amount, start, dest = map(int, re.findall(r"\d+", cmd))
    start = stacks[start - 1]
    stacks[dest - 1].extend(start[-amount:][::-1])
    del start[-amount:]

print("".join([stack[-1] for stack in stacks]))