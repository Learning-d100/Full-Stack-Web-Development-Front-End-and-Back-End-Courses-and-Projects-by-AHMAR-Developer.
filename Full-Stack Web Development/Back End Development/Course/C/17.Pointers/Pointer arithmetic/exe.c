#include <stdio.h>

int main() {
  int myNumbers[4] = {25, 50, 75, 100};
  int *p = myNumbers;  // points to myNumbers[0]

  printf("%d\n", *p);     // 25
  printf("%d\n", *(p + 1)); // 50
  printf("%d\n", *(p + 2)); // 75
  printf("%d\n", *(p + 3)); // 100
  return 0;
}