#!/bin/bash

array=(1 2 3 4 5 6 7 8);

length=${#array[*]}

echo $length

# 输出第3个元素
echo ${array[2]}

#删除元素

unset array[1]

for i in ${array[@]};do echo $i ;done


