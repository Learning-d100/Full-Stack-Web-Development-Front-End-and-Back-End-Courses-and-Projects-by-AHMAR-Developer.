/*
TODO : C Language Course:-
        ? 8.Data Types:
            * Data types in C
                As explained in the Variables chapter, a variable in C must be a specified data type, and you must use a format specifier inside the printf() function to display it:
                Basic Data types:
                    int ( integer )
                    float ( floating-point number )
                    char ( character )
                    double ( double-precision floating-point number )
            * Size of Data Types:
                The size of a data type is the amount of memory the data type uses in bytes. For example, an int is 4 bytes, a float is 4 bytes, and a double is 8 bytes.
            * Integer ( int ) - stores whole numbers, without decimals, such as 123 or -123.
            * Floating-point number ( float ) - stores numbers with decimals, such as 19.99 or -19.99.
            * Character ( char ) - stores single characters, such as 'a' or 'A'.
            * Double ( double ) - stores double-precision numbers, such as 19.99 or -19.99.
*///* Start Coding......

// Header Files
#include <stdio.h>

// Main Function
int main()
{

    // Declare variables
    int myNum = 5;           // Integer (whole number)
    float myFloatNum = 5.99; // Floating point number
    char myLetter = 'D';     // Character
    double myDoubleNum = 19.99;  // Double (floating point number)

    // Print variables
    printf("%d\n", myNum);
    printf("%f\n", myFloatNum);
    printf("%c\n", myLetter);
    printf("%lf", myDoubleNum);

    // Size of Data Types Declaration
    int myInt;
    float myFloat;
    double myDouble;
    char myChar;
 
    // Size of Data Types Print
    printf("%zu\n", sizeof(myInt));   
    printf("%zu\n", sizeof(myFloat));
    printf("%zu\n", sizeof(myDouble));
    printf("%zu\n", sizeof(myChar));

    // use of return statement means that the program will end here
    return 0;

}