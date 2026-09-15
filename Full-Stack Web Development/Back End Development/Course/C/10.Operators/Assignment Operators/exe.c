/*
TODO : C Language Course:-
        ? 10. Operators:
            * Assignment Operators:
                Assignment operators are used to assign values to variables.
                Operators are used to assign values to variables, add, subtract, multiply, divide and many more.
                Thus:-;
                    =, +=, -=, *=, /=, %=, &=, |=, ^=, <<=, >>=
*///* Start Coding......

// include header file
#include <stdio.h>

// main function
int main() {

    // declare a variable
    int x = 5;
    printf("%d\n", x);
    x += 3;
    printf("%d\n", x);
    x -= 3;
    printf("%d\n", x);
    x *= 3;
    printf("%d\n", x);
    x /= 3;
    printf("%d\n", x);
    x %= 3;
    printf("%d\n", x);
    x &= 3;
    printf("%d\n", x);
    x |= 3;
    printf("%d\n", x);
    x ^= 3;
    printf("%d\n", x);
    x <<= 3;
    printf("%d\n", x);
    x >>= 3;
    printf("%d\n", x);
    return 0;

}