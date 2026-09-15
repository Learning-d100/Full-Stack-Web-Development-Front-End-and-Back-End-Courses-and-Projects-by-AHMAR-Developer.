/*
TODO : C Language Course:-
        ? 11.Conditional:
            * If-else Statement:
                The if-else statement is used to execute a block of code if a certain condition is true.
                If the condition is false, the block of code is skipped.
                Thus:-;
                    if (condition) {
                        
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

//  the program checks the value of time. If it is less than 18, it prints "Good day". Otherwise, it prints "Good evening":
 
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

    // else condition
    else {

        // print message
        printf("Good evening.\n");

    }

    // use of return statement means that the program will end here
    return 0;

}