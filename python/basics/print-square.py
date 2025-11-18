def main():
    size = int(input("Enter size for NxN square: "))

    square(size)

def square(n):
    for row in range(n):
        print('#'*n)


main()