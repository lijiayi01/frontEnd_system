#!/bin/bash

a='20'
b='20'

if [ $a = $b ]
then
    echo "a等于b"
else 
    echo "a不等于b"
fi

# for

# 输出当前列表中的数据
for i in 1 2 3 4 5
do
	echo "this value is "$i""
done

# 产生10个随机数

#for i in {0..9}
#do
#	echo $RANDOM
#done

# 输出1到5
for(( i=1;1<=5;i++ ));do
	echo $i;
done;


