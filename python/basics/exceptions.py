def main():
    x = get_int()
    print(f"You entered: {x}")

def get_int():
    while True:
        try:
            return int(input("Please enter an integer: "))
        except ValueError:
            print("That's not a valid integer. Please try again.")

main()