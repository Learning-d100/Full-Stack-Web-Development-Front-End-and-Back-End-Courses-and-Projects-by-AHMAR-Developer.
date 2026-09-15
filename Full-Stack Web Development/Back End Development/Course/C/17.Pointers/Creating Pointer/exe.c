/*
TODO : C Language Course:-
    ? 17.Pointers:
        * Creating Pointer:
            A pointer is a variable that holds the address of another variable.
            * Syntax:-
                "&variableName"
            * Example:-
                int x = 5;
                int *ptr = &x;
                printf("The address of x is %p\n", ptr); // Output: 0x7ffdfbfff0d0
            * Output:-
                The address of x is 0x7ffdfbfff0d0
*///* Start Coding......

/*

    * Print the address of your age using pointer variable.

*/

// header files
#include <stdio.h>

// main function
int main() {

    // declare a variable
    int age = 20;

    // declare a pointer variable
    int *ptr = &age;

    // print the address of age
    printf("The address of age is %p\n", ptr);

    // use of return statement means that the program will end here
    return 0;

}