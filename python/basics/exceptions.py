def main():
    prompt = "Enter an integer: "
    x = get_int(prompt)
    print(f"You entered: {x}")

    fuelLeft = fuel()
    print(fuelLeft)

    taqueria()

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
            
def taqueria():
    """
    Prompts the user for menu items, calculates and displays the running total.
    """
    menu = {
        "Baja Taco": 4.25,
        "Burrito": 7.50,
        "Bowl": 8.50,
        "Nachos": 11.00,
        "Quesadilla": 8.50,
        "Super Burrito": 8.50,
        "Super Quesadilla": 9.50,
        "Taco": 3.00,
        "Tortilla Salad": 8.00
    }

    # Normalize menu keys for case-insensitive lookup
    # Creates a dictionary where keys are lowercase item names
    normalized_menu = {item.lower(): price for item, price in menu.items()}

    total_cost = 0.0

    # The loop continues indefinitely until an EOFError is raised (Control-D)
    while True:
        try:
            # 1. Get input from the user
            item = input("Item: ").strip()

            # 2. Normalize the input for case-insensitive comparison
            normalized_item = item.lower()

            # 3. Check if the item is on the menu
            if normalized_item in normalized_menu:
                price = normalized_menu[normalized_item]
                total_cost += price

                # 4. Display the total cost formatted to two decimal places
                print(f"${total_cost:.2f}")

            # 5. Ignore input that isn't an item
            # The loop simply continues if the item is not found in the menu

        except EOFError:
            # 6. Exit the loop and the program when Control-D is pressed
            print() # Print a newline for clean output after Control-D
            break
        
        # We don't need to catch ValueError or other common exceptions 
        # because input() only raises EOFError or KeyboardInterrupt.
            

main()