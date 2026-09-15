/*
TODO : C Language Course:-
        ? 13.Loops:
            * nested loop:
                A nested loop is a loop inside a loop.
                Syntax:-
                    "for (int i = 0; i < 5; i++) {
                    * for (int j = 0; j < 3; j++) {
                    * code to be executed
                    }
*///* Start Coding......

/*

    It is also possible to place a loop inside another loop. This is called a nested loop.
    The "inner loop" will be executed one time for each iteration of the "outer loop":

*/

// header file
#include <stdio.h>

// main function
int main() {

    // outer loop
    for (int i = 0; i < 5; i++) {

        // inner loop
        for (int j = 0; j < 3; j++) {

            // print i and j
            printf("i = %d, j = %d\n", i, j);
        }
    }

    // use of return statement means that the program will end here
    return 0;

}