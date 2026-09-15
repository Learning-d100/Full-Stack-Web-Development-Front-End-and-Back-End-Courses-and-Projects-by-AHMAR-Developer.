/*
TODO : C Language Course:-
        ? 10. Operators:
            * Arithmetic Operators:
                Arithmetic operators perform arithmetic on numbers (literals or variables).
                Arithmetic operators 
                Operators are used to assign values to variables, add, subtract, multiply, divide and many more
                Thus:-;
                    Addition Operator (+)
                    Subtraction Operator (-)
                    Multiplication Operator (*)
                    Division Operator (/)
                    Modulus Operator (%)
                    Increment Operator (++)
                    Decrement Operator (--)
                    Exponentiation Operator (**)
*///* Start Coding......

// include header file
#include <stdio.h>

// main function
int main() {

    // Declare variables
    int x = 5, y = 10, z;
    
    // Print variables ( Addition, Subtraction, Multiplication, Division, Modulus, Increment, Decrement, Exponentiation )
    printf("%d + %d = %d\n", x, y, x + y);
    printf("%d - %d = %d\n", x, y, x - y);
    printf("%d * %d = %d\n", x, y, x * y);
    printf("%d / %d = %d\n", x, y, x / y);
    printf("%d %% %d = %d\n", x, y, x % y);
    ++x;
    printf("%d\n", x);
    x--;
    printf("%d", x);

    // use of return statement means that the program will end here
    return 0;

}