/*
TODO : C Language Course:-
        ? 7.Output:
            * 3. Format Specifier():
                    What is format specifier?
                        A format specifier is a character that specifies the format of the data to be printed.
                        Format specifiers are used together with the printf() function to print variables.
                        You can think of a format specifier as a placeholder that tells C what kind of value will be printed.
                        A format specifier always starts with a percentage sign %, followed by a letter.
            For example:-
                to output the value of an int variable, use the format specifier %d surrounded by double quotes (""), inside the printf() function:
            So,
                int = %d
                float = %f
                char = %c
                string = %s
            Example:-
                printf("The value of x is %d", x);
                printf("The value of y is %f", y);
                printf("The value of z is %c", z);
                printf("The value of s is %s", s);
            However:-
                To combine both text and a variable, separate them with a comma inside the printf() function:
                Example:-
                    printf("The value of x is %d", x);
                To print different types in a single printf() function, you can use the following:
                Example:-
                    printf("The value of x is %d and the value of y is %f", x, y);
*///* Start Coding......

// include header file
#include <stdio.h>

// main function
int main() {

    // * Print Integer, Float, Char & String

    // Dcelare Variables
    int x = 5; // integer
    float y = 10.5; // float
    char z = 'A'; // char
    char s[] = "Hello"; // string

    // Print Integer, Float, Char & String
    printf("%d\n", x);
    printf("%f\n", y);
    printf("%c\n", z);
    printf("%s\n", s);

    // Combine text and variable  and format specifier in a single printf() function
    printf("The value of x is %d and the value of y is %f\n", x, y);

    // Print Values Without Variables
    // method - 1
    printf("The value of x is 5 and the value of y is 10.5\n");

    // method - 2
    printf("The value of x is %d and the value of y is %f\n", 1, 0.1);

    // You can also assign the value of one variable to another:
    int a = 5;
    int b = a;
    printf("The value of a is %d and the value of b is %d\n", a, b);

    // use of return statement means that the program will end here
    return 0;

}