# ORACLE 简单建库基本流程

## 创建数据表空间
```
create tablespace JCPT_DATA
datafile '/u01/app/oracle/oradata/jcpt/JCPT_DATA.dbf' size 1000M 
autoextend on next 100M maxsize unlimited logging
extent management local autoallocate
segment space management auto;
```
   
## 创建临时表空间
```
create temporary tablespace JCPT_TEMP
tempfile '/u01/app/oracle/oradata/jcpt/JCPT_TEMP.dbf'
Size 100m
Autoextend on
Next 100m maxsize 20480m
Extent management local;
```
   
## 删除表空间
```
drop tablespace JCPT_TEMP including contents and datafiles cascade constraint;
```

## 创建用户
```
create user jcpt_system identified by jcpt_system --(注意这里的密码不能有特殊字符，否则会报错)
account unlock
DEFAULT tablespace jcpt_data
Temporary tablespace jcpt_temp;
```
## 用户赋权
使用系统用户登录后，使用如下sql语句给出错用户赋权限
```
grant create session to UserName;(UserName是登录出错的用户名)
```
```
grant create table to jcpt_system;
grant unlimited tablespace to jcpt_system;
grant create tablespace to jcpt_system;
grant alter tablespace to jcpt_system;
grant drop tablespace to jcpt_system;
grant manage tablespace to jcpt_system;
grant create session,resource to jcpt_system
```

## oracle数据库用户删除及表空间删除

以system用户登录，查找需要删除的用户：
--查找用户
```
select  *　from dba_users;
```
--查找工作空间的路径
```
select * from dba_data_files; 
```
--删除用户
```
drop user 用户名称 cascade;
```
--删除表空间
```
drop tablespace 表空间名称 including contents and datafiles cascade constraint;
```
例如：删除用户名成为LYK，表空间名称为LYK
--删除用户，及级联关系也删除掉
```
drop user LYK cascade;
```
--删除表空间，及对应的表空间文件也删除掉
```
drop tablespace LYK including contents and datafiles cascade constraint;
```