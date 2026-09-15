/*
TODO : C Language Course:-
        ? 13.Loops:
            * While Loop:
                The while loop loops through a block of code as long as a specified condition is true.
                Syntax:-
                    "while (condition) {
                    * code to be executed
                    }"
*///* Start Coding......

/*

    the code in the loop will run, over and over again, as long as a variable (i) is less than 5:

*/

// header file
#include <stdio.h>

// main function
int main() {

    // variable declaration
    int i = 1;

    // while loop
    // the code in the loop will run, over and over again, as long as a variable (i) is less than 5
    while (i <= 5) {

        // print i
        printf("%d\n", i);

        // increment i
        i++;
    }

    // use of return statement means that the program will end here
    return 0;

}