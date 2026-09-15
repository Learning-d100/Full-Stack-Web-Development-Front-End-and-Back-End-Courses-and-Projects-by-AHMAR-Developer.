/*
TODO : C Language Course:-
        ? 10. Operators:
            * Logical Operators:
                Logical operators are used to determine the logic between variables or values.
                Operators are used to assign values to variables, add, subtract, multiply, divide and many more.
                Thus:-;
                    &&, ||, !
*///* Start Coding......

// include header file
#include <stdio.h>

// main function
int main() {

    // declare variables
    int x = 5, y = 10;

    // print variables
    printf("%d && %d : %d\n", x, y, x && y); // Output: 1
    printf("%d || %d : %d\n", x, y, x || y); // Output: 1
    printf("!%d : %d\n", x, !x); // Output: 0

    return 0;

}