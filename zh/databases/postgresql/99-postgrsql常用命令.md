# postgresql 常用命令
## 创建数据库
```
create database vvdd with owner=postgres template=template0 encoding='UTF8' lc_collate='C' lc_ctype='C' connection limit = 100;
```
## 备份数据库
```
 pg_dump  –h 127.0.0.1  -p  5432  -U  postgres -c  –f  dbname.sql  dbname
 pg_dump -h 164.82.233.54 -U postgres databasename > C:\databasename.bak  
 使用如下命令可对全部pg数据库进行备份：
 pg_dumpall –h 127.0.0.1 –p 5432 -U postgres –c –f db_bak.sql
```


## 恢复数据库
windows
```
psql -h localhost -U postgres -d new_db  -f "C:/emoneysit.bak"
```
ubuntu
```
psql -h localhost -U postgres -d vvdd < /Users/leizhenjie/Downloads/postgres.bak
```
