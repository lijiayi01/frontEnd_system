#!/bin/bash

name='lijiayi'

echo ''$name' is good'
echo ""$name" is good!"
echo '$name is good'

# 获取string长度
# 方法1
echo ${#name}

# 方法2

expr length "$name"

# 截取字符串

echo ${name:0:3}


