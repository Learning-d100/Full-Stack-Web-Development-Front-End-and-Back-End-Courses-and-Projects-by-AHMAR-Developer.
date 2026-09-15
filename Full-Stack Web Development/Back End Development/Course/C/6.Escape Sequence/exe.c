/*
TODO : C Language Course:-
        ? 6.Escape Sequence:
            * Escape Sequence:
                Escape sequences are used to insert special characters into a string.
                Escape sequences start with a backslash and represent special characters that cannot be typed directly.
                Here are some common escape sequences mostly used:
                \n: Newline ( Inserts a new line )
                \t: Tab ( Inserts a horizontal tab )
                \\: Backslash ( Inserts a backslash character ( \ ) )
                \": Double quote ( Inserts a double quote character ( " ) )
                \': Single quote ( Inserts a single quote character ( ' ) )
                \a: Bell ( Produces an audible alert or bell sound. )
                \b: Backspace ( Moves the cursor one position to the left )
                \f: Form feed ( Moves the cursor to the beginning of the next page )
                \r: Carriage return ( Moves the cursor to the beginning of the current line )
                \v: Vertical tab ( Moves the cursor vertically to the next tab stop )
                \?: Question mark ( Inserts a question mark character ( ? ) )
                \xXX: Hexadecimal value ( Inserts a character with the specified hexadecimal value XX )
                \xhh: Hexadecimal value ( Inserts a character with the specified hexadecimal value hh )
                \nnn: Octal value ( Inserts a character with the specified octal value nnn )
                \uhhhh: Hexadecimal value ( Inserts a character with the specified hexadecimal value hhhh )
*///* Start Coding......

// Header Files
#include <stdio.h>

// Main Function
int main() {

    // Print "Hello World!"
    printf("Hello World!");

    // Insert a new line
    printf("\n");

    // Print "I am learning C and it is awesome" with tab space
    printf("I am learning C \t and it is awesome");

    // Insert a new line
    printf("\n");

    // Print format (D:\MyFolder\MyFile.txt) using backslash
    printf("D:\\MyFolder\\MyFile.txt");

    // Insert a new line
    printf("\n");

    // Insert Double quote around (Hello World!)
    printf("\"Hello World!\"");

    // insert a new line
    printf("\n");

    // Insert Single quote around (Hello World!)
    printf("\'Hello World!\'");

    // insert a new line
    printf("\n");

    // Print "Hello World!" with alert
    printf("Hello \a World!");

    // insert a new line
    printf("\n");

    // Print "Hello World!" with backspace
    printf("Hello \b World!");

    // insert a new line
    printf("\n");

    // Print "Hello World!" with form feed
    printf("Hello \f World!");

    // insert a new line
    printf("\n");

    // Print "Hello World!" with carriage return
    printf("Hello \r World!");

    // insert a new line
    printf("\n");

    // Print "Hello World!" with vertical tab
    printf("Hello \v World!");

    // insert a new line
    printf("\n");

    // Print "Hello World" with question mark
    printf("Hello World\?");

    // insert a new line
    printf("\n");

    // Print "Hello World" with hexadecimal value ( xXX )
    printf("\x48\x65\x6c\x6c\x6f\x20\x57\x6f\x72\x6c\x64");

    // insert a new line
    printf("\n");

    // Print "Hello World" with hexadecimal value ( xhh )
    printf("\x48\x65\x6c\x6c\x6f\x20\x57\x6f\x72\x6c\x64");

    // insert a new line
    printf("\n");

    // Print "Hello World" with octal value ( nnn )
    printf("\111\x65\x6c\x6c\x6f\x20\x57\x6f\x72\x6c\x64");

    // insert a new line
    printf("\n");

    // Print "Hello World" with hexadecimal value ( hhhh )
    printf("\x48\x65\x6c\x6c\x6f\x20\x57\x6f\x72\x6c\x64");

    // use of return statement means that the program will end here
    return 0;

}