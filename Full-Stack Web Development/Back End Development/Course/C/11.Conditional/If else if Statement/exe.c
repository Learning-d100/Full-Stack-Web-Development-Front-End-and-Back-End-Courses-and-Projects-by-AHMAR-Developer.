/*
TODO : C Language Course:-
        ? 11.Conditional:
            * else-if Statement:
                The else-if statement is used to execute a block of code if a certain condition is true.
                If the condition is false, the block of code is skipped.
                The else-if statement is similar to the if statement, but it is used to specify multiple conditions.
                Thus:-;
                    if (condition) {
                        
                    }
                    else if (condition) {
                        
                    }
                    else if (condition) {
                        
                    }
                    else {
                        
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

/* 
    Print "Good day" if the time is less than 18
    Print "Good evening" if the time is greater than or equal to 18
    Print "Good night" otherwise.

*/

// include header file
#include <stdio.h>

// main function
int main() {

    // declare variables
    int time = 20;

    // if condition
    if (time < 18) {

        // print message
        printf("Good day.\n");

    }

    // else if condition
    else if (time >= 18) {

        // print message
        printf("Good evening.\n");

    }

    // else condition
    else {

        // print message
        printf("Good night.\n");

    }

    // use of return statement means that the program will end here
    return 0;

}