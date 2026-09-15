/*
TODO : C Language Course:-
        ? 12.Swtich statement:
            * Switch Statement:
                The switch statement is used to execute different blocks of code based on different conditions.
                thus:-
                    switch (expression) {
                        case value1:
                            code to run if expression is equal to value1
                            break;
                        case value2:
                            code to run if expression is equal to value2
                            break;
                        case value3:
                            code to run if expression is equal to value3
                            break;
                        default:
                            code to run if no case matches
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

/*

    uses the weekday number to calculate the weekday name: using switch statement

*/

// include header file
#include <stdio.h>

// main function
int main() {

    // declare variables
    int day;
    char *weekdays[7] = {"Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"};

    // get the day number
    printf("Enter the day number (1-7): ");

    // input from user
    scanf("%d", &day);

    // print the weekday name
    switch (day) {

        // check the day number
        case 1:
            printf("Today is %s\n", weekdays[0]);
            break;

        // check the day number
        case 2:
            printf("Today is %s\n", weekdays[1]);
            break;

        // check the day number
        case 3:
            printf("Today is %s\n", weekdays[2]);
            break;

        // check the day number
        case 4:
            printf("Today is %s\n", weekdays[3]);
            break;

        // check the day number
        case 5:
            printf("Today is %s\n", weekdays[4]);
            break;

        // check the day number
        case 6:
            printf("Today is %s\n", weekdays[5]);
            break;

        // check the day number
        case 7:
            printf("Today is %s\n", weekdays[6]);
            break;

        // check the day number
        default:
            printf("Invalid day number\n");

    }

    // use of return statement means that the program will end here
    return 0;
    
}