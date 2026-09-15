/*
TODO : C Language Course:-
        ? 11.Conditional:
            * Nested if Statement:
                The nested if statement is used to execute a block of code if a certain condition is true.
                If the condition is false, the block of code is skipped.
                The nested if statement is used to specify multiple conditions.
                Thus:-;
                    if (condition1) {
                        code to run if condition1 is true
                            if (condition2) {
                                    code to run if both condition1 and condition2 are true
                                        }
                                }
                You already know that C supports familiar comparison conditions from mathematics, such as:
                Less than: a < b
                Less than or equal to: a <= b
                Greater than: a > b
                Greater than or equal to: a >= b
                Equal to: a == b
                Not equal to: a != b
                You can use these conditions to perform different actions for different decisions.
                Use the else statement to specify a block of code to be executed if the condition is false.
*///* Start Coding......

// we first check if x is greater than 10. If it is, we then check if y is greater than 20:

// include header file
#include <stdio.h>

// main function
int main() {

    // declare variables
    int x = 15;
    int y = 25;
    
    // if x is greater than 10
    if (x > 10) {

        // if y is greater than 20
        if (y > 20) {

            // print "x is greater than 10 and y is greater than 20"
            printf("x is greater than 10 and y is greater than 20\n");

        }

    }
    
    // use of return statement means that the program will end here
    return 0;
    
}