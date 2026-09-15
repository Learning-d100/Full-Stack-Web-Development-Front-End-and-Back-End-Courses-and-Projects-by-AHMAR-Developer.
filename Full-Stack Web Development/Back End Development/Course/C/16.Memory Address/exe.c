#include <stdio.h>

/*
TODO : C Language Course:-
        ? 16. Memory Address:
                * Memory Address:
                    The memory address is a unique identifier for a location in memory.
                    It is used to access the data stored in that location.
                    It is a numeric value that represents the location of the data in memory.
                * How to Get Memory Address:
                    To get the memory address of a variable, you can use the & operator.
                    The & operator returns the memory address of the variable.
                    * Syntax:-
                        "&variableName"
                    * Example:-
                        int x = 5;
                        printf("The memory address of x is %p\n", &x); // Output: 0x7ffdfbfff0d0
                    * Output:-
                        The memory address of x is 0x7ffdfbfff0d0
*///* Start Coding......

/*

    * Print the address of your age.

*/

// main function
int main() {

    // declare a variable
    int age = 20;

    // print the address of age
    printf("The address of age is %p\n", (void *)&age);

    // use of return statement means that the program will end here
    return 0;

}