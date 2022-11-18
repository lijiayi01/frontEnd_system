#include <stdio.h>
int main(){
    extern void p1(char x);
    char a = 'b';
    p1(a);
    return 0;
}