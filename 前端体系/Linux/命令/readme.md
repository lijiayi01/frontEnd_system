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

` `

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