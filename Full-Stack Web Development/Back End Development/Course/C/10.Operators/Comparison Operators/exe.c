/*
TODO : C Language Course:-
        ? 10. Operators:
            * Comparison Operators:
                Comparison operators are used to compare two values.
                Operators are used to assign values to variables, add, subtract, multiply, divide and many more.
                Thus:-;
                    ==, !=, >, <, >=, <=
*///* Start Coding......

// include header file
#include <stdio.h>

// main function
int main() {

    // declare variables
    int x = 5, y = 10;

    // print variables
    printf("%d == %d : %d\n", x, y, x == y); // Output: 0
    printf("%d != %d : %d\n", x, y, x != y); // Output: 1
    printf("%d > %d : %d\n", x, y, x > y); // Output: 0
    printf("%d < %d : %d\n", x, y, x < y); // Output: 1
    printf("%d >= %d : %d\n", x, y, x >= y); // Output: 0
    printf("%d <= %d : %d\n", x, y, x <= y); // Output: 1

    return 0;

}