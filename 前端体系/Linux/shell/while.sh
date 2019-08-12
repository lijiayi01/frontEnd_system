#!/bin/bash

int=1

while(( $int<=5 ))
do
	echo $int;
	let "int++"
done;

# while读取键盘信息

echo -n '输入你喜欢的电影'

while read FILM
do
	echo '是的。'$FILM' 是好电影'
done;
