#include <stdio.h>
#include <string.h>
 
int main() {
  char alphabet[] = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  printf("%zu", strlen(alphabet));
  printf("%zu\n", strlen(alphabet));   // 26
printf("%zu\n", sizeof(alphabet));   // 27

    char str1[20] = "Hello ";
char str2[] = "World!";

// Concatenate str2 to str1 (result is stored in str1)
strcat(str1, str2);

// Print str1
printf("%s", str1);

char str_1[20] = "Hello World!";
char str_2[20];

// Copy str1 to str2
strcpy(str_2, str_1);

// Print str2
printf("%s", str_2);


char _str1[] = "Hello";
char _str2[] = "Hello";
char _str3[] = "Hi";

// Compare str1 and str2, and print the result
printf("%d\n", strcmp(_str1, _str2));  // Returns 0 (the strings are equal)

// Compare str1 and str3, and print the result
printf("%d\n", strcmp(_str1, _str3));  // Returns -4 (the strings are not equal)
  return 0;
}