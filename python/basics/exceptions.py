def main():
    prompt = "Enter an integer: "
    x = get_int(prompt)
    print(f"You entered: {x}")

    fuelLeft = fuel()
    print(fuelLeft)

def get_int(prompt):
    while True:
        try:
            return int(input(prompt))
        except ValueError:
            print("That's not a valid integer. Please try again.")

def fuel():
    while True:
        try:
            s = input("Fraction: ").strip()
            numerator_str, denominator_str = s.split('/')

            X = int(numerator_str)
            Y = int(denominator_str)

            if Y == 0:
                raise ZeroDivisionError
            if X < 0 or Y < 0:
                continue
            if X > Y:
                continue

            percentage = round((X / Y) * 100)

        except (ValueError, ZeroDivisionError, IndexError):
            # ValueError: catches non-integer X/Y (e.g., 1.5/4 or a/b)
            # ZeroDivisionError: catches Y=0
            # IndexError: catches input not in X/Y format (e.g., '1' or '1/2/3')
            continue # Go back to start of while loop and re-prompt

        else:
            if percentage <= 1:
                return 'E'
            if percentage >= 99:
                return 'F'
            else:
                return f"{percentage}%"
            

main()