# 创建数据库
create database if not exists study 
default character set utf8;

# 使用数据库
use study;

# 查看是否支持分区(下面方式为5.6版本及其以上), 如果下面的sql执行完以后，有下面的partition，表示支持分区。
# partition          | ACTIVE   | STORAGE ENGINE     | NULL    | GPL  
show plugins;

# 创建登录日志表
create table user_login_log(
	user_login_id int unsigned  null default 1 comment '登录日志id',
    user_id int not null comment '登录用户id',
    user_login_time datetime not null comment '登录日志时间',
    user_login_ip int not null comment '登录日志ip'
) engine = InnoDB comment '用户登录日志表'
partition by range(year(user_login_time))(
	partition p0 values less than (2015), # 小于2015年的数据存到p0分区
    partition p1 values less than (2016), # 小于2016年的数据存到p1分区
    partition p2 values less than (2017), # 小于2017年的数据存到p2分区
    partition p3 values less than (2018)  # 小于2018年的数据存到p3分区
);

# 删除表所有数据
delete  from user_login_log;

# 插入数据
insert into user_login_log (user_id, user_login_time, user_login_ip) values
(1, '2014-01-01 00:00', 1), (1, '2015-01-01 00:00', 1), (1, '2016-01-01 00:00', 1);

# 查询分区数据
select PARTITION_NAME, TABLE_ROWS from information_schema.PARTITIONS where TABLE_NAME = 'user_login_log';

select * from user_login_log;

# 插入2018年的log数据(会报错 Error Code: 1526. Table has no partition for value 2018，因为我们没有2018年的数据分区)
insert into user_login_log (user_id, user_login_time, user_login_ip) values
(1, '2018-01-01 00:00', 1);

# 修改分区,增加p4分区，用于存储2018年日志
alter table user_login_log add partition(
	 partition p4 values less than (2019)
     # partition p5 values less than (2020)
);

# 重新插入
insert into user_login_log (user_id, user_login_time, user_login_ip) values
(1, '2018-01-01 00:00', 1);

# 查看分区数据
select PARTITION_NAME, TABLE_ROWS from information_schema.PARTITIONS where TABLE_NAME = 'user_login_log';

# 过期数据归档，比如说： 2014年数据不要了，我们对其归档

# 归档需要如下步骤:

# 1. 创建一个归档表，字段名要和原表相同，并且enginee也要相同
create table arch_user_login_log(
	user_login_id int unsigned  null default 1 comment '登录日志id',
    user_id int not null comment '登录用户id',
    user_login_time datetime not null comment '登录日志时间',
    user_login_ip int not null comment '登录日志ip'
) engine = InnoDB;

# 2. 将p0分区数据归档到arch_user_login_log(此时发现，user_login_log表中2014年的数据已经转移到arch_user_login_log表)

# 下面的方法需要mysql >= 5.7 才能支持 
alter table user_login_log exchange partition p0 with table arch_user_login_log;

# 3. 删除p0分区
alter table user_login_log drop partition p0;