# linux常见命令

## 系统相关命令

1.查看内存使用情况

` free -h ` 相当于 `cat /proc/meminfo`

2.查看进程运行情况

` top `

3.查看某个进程运行情况

`ps -ef | grep 进程名`

4.磁盘使用空间

`df -h 目录 `

5.查看cpu信息

` lscpu ` 相当于 `cat /proc/cpuinfo`

6.查看硬盘大小

`lsblk` type=disk的即为硬盘

7.linux使用的系统信息

` uname `

## 网络相关命令

1.查看当前系统端口使用

`netstat -tunlp`

`lsof -i:端口`

2.当前系统的网卡信息

`ifconfig`




## 用户管理相关命令

1.查看linux用户密码

用户名在/etc/passwd文件 `cat /etc/passwd`

密码在 /etc/shadow文件 `cat /etc/shadow `(密码使用sha512加密，如果需要解密，使用解密工具查看) -- 该命令都需要root用户执行


2.查看当前自身用户名称

`whoami`

3.查当前用户所属组

`groups `

4.查某个用户所属组

`groups 用户名称`

5.查用户组列表

`cat /etc/group`

6.新增用户

` useradd -d /home/用户名 -m 用户名`

7.修改密码

` passwd 用户名`

8.修改用户配置

` usermod 选项 用户名`

9.删除用户

` userdel -r 用户名`

## 环境变量

1.env命令查看当前用户全部的环境变量

` env | grep PATH` // 带PATH关键字的环境变量

2.export命令显示当前系统定义的所有环境变量

` export `

3.echo 环 境 变 量 名 ： 查 看 特 定 的 环 境 变 量 的 值

` echo $PATH`

4.配置临时环境变量export命令

```
export PATH=你的目录/bin:$PATH
#或者把PATH放在前面
export PATH=$PATH:你的目录/bin

```

注意事项：

  生效时间：立即生效

  生效期限：当前终端有效，窗口关闭后无效

  生效范围：仅对当前用户有效

  配置的环境变量中不要忘了加上原来的配置，即$PATH部分，避免覆盖原来配置

5.配置用户环境变量.bashrc文件
```
vim ~/.bashrc
# 在最后一行加上
export PATH=$PATH:/home/zhou/gcc/bin

```
注意事项：

  生效时间：使用相同的用户打开新的终端时生效，或者手动source ~/.bashrc生效

  生效期限：永久有效

  生效范围：仅对当前用户有效

  如果有后续的环境变量加载文件覆盖了PATH定义，则可能不生效

6.配置用户环境变量.bash_profile文件

```
vim ~/.bash_profile
# 在最后一行加上
export PATH=$PATH:/home/zhou/gcc/bin

```
注意事项：

  生效时间：使用相同的用户打开新的终端时生效，或者手动source ~/.bash_profile生效

  生效期限：永久有效

  生效范围：仅对当前用户有效

  如果没有/.bash_profile文件，则可以编辑/.profile文件或者新建一个

7.配置系统环境变量/etc/bashrc文件

```
# 如果/etc/bashrc文件不可编辑，需要修改为可编辑
chmod -v u+w /etc/bashrc
 
vim /etc/bashrc
# 在最后一行加上
export PATH=$PATH:/home/zhou/gcc/bin

```
注意事项：

  生效时间：新开终端生效，或者手动source /etc/bashrc生效

  生效期限：永久有效

  生效范围：对所有用户有效

8.配置系统环境变量/etc/profile文件
```
# 如果/etc/profile文件不可编辑，需要修改为可编辑
chmod -v u+w /etc/profile
 
vim /etc/profile
 
# 在最后一行加上
export PATH=$PATH:/home/zhou/gcc/bin

```
9.配置系统环境变量 在/etc/profile.d目录中增加环境变量脚本文件

/etc/profile在每次启动时会执行 /etc/profile.d下全部的脚本文件。/etc/profile.d比/etc/profile好维护，不想要什么变量直接删除 /etc/profile.d下对应的 shell 脚本即可。

  /etc/profile.d目录下有很多脚本文件

