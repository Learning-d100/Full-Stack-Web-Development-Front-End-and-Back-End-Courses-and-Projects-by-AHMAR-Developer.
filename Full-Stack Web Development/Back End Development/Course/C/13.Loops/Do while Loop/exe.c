/*
TODO : C Language Course:-
        ? 13.Loops:
            * Do While Loop:
                it is a variant of the while loop. This loop will execute the code block once, before checking if the condition is true, then it will repeat the loop as long as the condition is true.
                Syntax:-
                    "do {
                    * code to be executed
                    } while (condition);"
*///* Start Coding......

/*

    the variable i starts at 10, so the condition i < 5 is false immediately - yet the do/while loop still runs once:

*/

// header file
#include <stdio.h>

// main function
int main() {

    // variable declaration
    int i = 10;

    // do-while loop
    // the code in the loop will run once, before checking if the condition is true, then it will repeat the loop as long as the condition is true
    do {

        // print i
        printf("%d\n", i);

        // increment i
        i++;

    }

    // condition
    while (i < 5);

    // use of return statement means that the program will end here
    return 0;

}