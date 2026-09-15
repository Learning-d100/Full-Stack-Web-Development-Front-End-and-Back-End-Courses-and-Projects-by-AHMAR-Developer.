/*
TODO : C Language Course:-
        ? 13.Loops:
                * For Loop:
                        The for statement creates a loop with 3 optional expressions:
                            * initialization
                            * condition
                            * increment
                        Syntax:-
                            "for (initialization; condition; increment) {
                            * code to be executed
                            }"
*///* Start Coding......

/*
    Use a for loop to print the numbers 0 to 4:
*/

// header file
#include <stdio.h>

// main function
int main() {

        // for loop
        // the code in the loop will run, over and over again, as long as a variable (i) is less than 5
        for (int i = 0; i < 5; i++) {

            // print i
            printf("%d\n", i);

        }

        // use of return statement means that the program will end here
        return 0;
        
}