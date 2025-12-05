import random, statistics, sys


# Random functions
coin = random.choice(["heads", "tails"])
print(coin)

randomInt = random.randint(1,10)
print(randomInt)

cards = ["jack", "queen", "king"]
random.shuffle(cards)

for card in cards:
    print(card)

# Statistics functions
print(statistics.mean([100, 90]))

# Command line arguments
print("Hello my name is", sys.argv[1])
