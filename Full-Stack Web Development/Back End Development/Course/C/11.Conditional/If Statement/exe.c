/*
TODO : C Language Course:-
        ? 11. If Statement:
            * If Statement:
                The if statement is used to execute a block of code if a certain condition is true.
                If the condition is false, the block of code is skipped.
                Thus:-;
                    if (condition) {
                        * Block of code to be executed if condition is true
                    }
                You already know that C supports familiar comparison conditions from mathematics, such as:
                Less than: a < b
                Less than or equal to: a <= b
                Greater than: a > b
                Greater than or equal to: a >= b
                Equal to: a == b
                Not equal to: a != b
                You can use these conditions to perform different actions for different decisions.
*///* Start Coding......

// include header file
#include <stdio.h>

// main function
int main() {

    // declare variables
    int age;

    // take input from user
    printf("Enter your age: ");
    scanf("%d", &age);

    // check age
    if (age >= 18) {
        printf("You are eligible to vote.\n");
    } 

    // use of return statement means that the program will end here
    return 0;
}