file = open("test.txt")

nums = list(map(int, file.read().splitlines()))

for num in nums.copy():
    index = nums.index(num)
    dest = index + num
    # move the number to the destination and wrap around if needed
    nums.insert(dest % len(nums), nums.pop(index))

print(nums)