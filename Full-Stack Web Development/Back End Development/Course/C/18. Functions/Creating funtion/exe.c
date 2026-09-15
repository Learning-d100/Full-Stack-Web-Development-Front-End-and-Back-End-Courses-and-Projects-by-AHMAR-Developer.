/*
TODO : C Language Course:-
    ? 18.Functions:
        * Creating Function:
            A function is a block of code that performs a specific task and can be reused in your program.
            * Syntax:-
                "void functionName() {
                * code to be executed
                }"
*///* Start Coding......

/*

    * Print Hello World using fucntion

*/

// header files
#include <stdio.h>

// create a fucntion
void printHelloWorld() {

    // print "Hello World!"
    printf("Hello World!");

}

// main function
int main() {

    // call function
    printHelloWorld();

    // use of return statement means that the program will end here
    return 0;

}