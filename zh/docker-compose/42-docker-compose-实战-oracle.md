# docker-compose 实战oracle

### 脚本

```
version: '2'
services:
  oracle12c:
    image: sath89/oracle-12c
    volumes:
      - ./datas:/u01/app/oracle
    environment:
      DBCA_TOTAL_MEMORY: 16192
    ports:
      - "8082:8080"
      - "1521:1521"
    restart:
      always
networks:
  oraclenetwork:
    driver: 'local'
```

将以上文件保存为docker-compose.yml文件

 

### 启动docker-compose脚本

> docker-compose up

```
启动docker-compose（后台模式-不打印日志）
docker-compose up -d
```

 

### 启动日志

```
[root@linux yunwisdom]# docker logs c640   
/home/oracle/app/oracle/product/11.2.0/dbhome_2  
Processing Database instance "orcl": log file /home/oracle/app/oracle/product/11.2.0/dbhome_2/startup.log       
tail: unrecognized file system type 0x794c7630 for `/home/oracle/app/oracle/product/11.2.0/dbhome_2/startup.log'. Reverting to polling.  
Fixed Size                  2213776 bytes  
Variable Size             402655344 bytes  
Database Buffers         1191182336 bytes
Redo Buffers                7360512 bytes  
Database mounted.   
Database opened.         
SQL> Disconnected from Oracle Database 11g Enterprise Edition Release 11.2.0.1.0 - 64bit Production     
With the Partitioning, OLAP, Data Mining and Real Application Testing options            
/home/oracle/app/oracle/product/11.2.0/dbhome_2/bin/dbstart: Database instance "orcl" warm started.   
[root@brc-linux-01 yunwisdom]#                                                                         
```

 

### 参数信息

**Orale服务器连接参数:**

```
hostname: localhost
port: 1521
sid: xe
service name: xe
username: system
password: oracle
```

**使用如下命令连接sqlplus:**

```
 sqlplus system/oracle@//localhost:1521/xe 
```

**Password for SYS & SYSTEM:**

```
oracle
```

 **Oracle Web管理端连接参数:**

```
http://localhost:8082/apex
workspace: INTERNAL
user: ADMIN
password: 0Racle$ 
updatePassword:32#@EWdscx
```

 

**Oracle企业管理控制台:**

```
http://localhost:8082/em
user: sys
password: oracle
connect as sysdba: true
```