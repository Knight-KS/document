# 实战oracle

## docker-compose

```
version: '2'
services:
  oracle01:
    image: oracleinanutshell/oracle-xe-11g 
    container_name: oracle01
    privileged: true
    restart: always
#    shm_size: "1g"
    ports:
      - "1521:1521"
      - "8090:8080"
#    environment:
#      - ORACLE_PWD=root123456
    volumes:
      - ./oracle/oradata:/u01/app/oracle/product/11.2.0/xe/oradata
```

# 使用Docker-compose搭建MySQL，Oracle11，Oracle12，MSSQL，DB2，PgSQL

准备环境：
 1.系统：centos7.6
 2.硬盘：40G （数据库占用内存特别的大）
 3.内存：3G （可能同时运行着很多的数据库）

##### 1. 搭建docker 环境 及 相关依赖

###### #1. 基本配置

// 拉取docker
 // 网络拉取
 // 编辑器
 // 文件导入导出
 // 压缩文件



```swift
yum install -y docker 
yum install -y wget
yum install -y vim
yum install -y lszrz
yum install -y unzip zip
```

PS：可能出现的异常



```cpp
【转载】Docker 安装后 报 Cannot connect to the Docker daemon at unix:///var/run/docker.sock. Is the docker daemon running? 解决办法

解决办法
 systemctl daemon-reload
 sudo service docker restart
 sudo service docker status 
```

###### #2.配置docker 阿里镜像

PS：不配置可能之后等哭了（镜像地址好像要个人账号申请，就不公开了）



```bash
sudo mkdir -p /etc/docker
sudo tee /etc/docker/daemon.json <<-'EOF'
{
  "registry-mirrors": ["XXXXX"]
}
EOF
sudo systemctl daemon-reload
sudo systemctl restart docker
```

###### #3. 安装docker-compose

// 输入命令行
 // 配置权限
 // 查看版本



```bash
sudo curl -L "https://github.com/docker/compose/releases/download/1.24.1/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

sudo chmod +x /usr/local/bin/docker-compose

docker-compose --version
```

上面完成了基本配置，下面开始进行数据库的安装。

------

如果已经有镜像，可以直接导入
 （本例子中所用的镜像[https://pan.baidu.com/s/1tNJ1RL5mpdGmBmP2ciu1Ow](https://links.jianshu.com/go?to=https%3A%2F%2Fpan.baidu.com%2Fs%2F1tNJ1RL5mpdGmBmP2ciu1Ow) 提取码：7p69）

![img](https:////upload-images.jianshu.io/upload_images/14387783-58eb904ae15cbe4b.png?imageMogr2/auto-orient/strip|imageView2/2/w/770/format/webp)

01.png



```css
docker load < db2.tar  
docker load < mssql-server-linux.tar  
docker load < mysql.5.7.tar
docker load < oracle-12c.tar  
docker load < oracle-xe-11g.tar  
docker load < postgres.9.6.tar  
```

![img](https:////upload-images.jianshu.io/upload_images/14387783-c051f8a33bb1003b.png?imageMogr2/auto-orient/strip|imageView2/2/w/905/format/webp)

02.png

##### 2. docker-compose 构建数据库

------

### MySQL



```ruby
version: '2'
services:
  mysql01:
    image: docker.io/mysql:5.7
    container_name: mysql01
    privileged: true
    ports:
      - "3306:3306"
    environment:
      - MYSQL_ROOT_PASSWORD=Root123456
    volumes:
      - /home/mysql/logs:/logs
      - /home/mysql/conf:/etc/mysql/conf.d
      - /home/mysql/conf:/var/lib/mysql
```

连接参数：



```undefined
username：root
password：Root123456
port：3306
```

------

### MSSQL



```ruby
services:
  mssql01:
    image: docker.io/microsoft/mssql-server-linux
    container_name: mssql01
    privileged: true
    ports:
      - "1433:1433"
    environment:
      - ACCEPT_EULA=Y
      - SA_PASSWORD=Root123456
    volumes:
      - /home/mssql/data/:/var/opt/mssql/data/db/  
```

连接参数：



```undefined
username：sa
password：Root123456
port：1433
```

------

### Oracle11g



```ruby
version: '2'
services:
  oracle01:
    image: oracleinanutshell/oracle-xe-11g 
    container_name: oracle01
    privileged: true
    restart: always
#    shm_size: "1g"
    ports:
      - "1521:1521"
      - "8090:8080"
#    environment:
#      - ORACLE_PWD=root123456
    volumes:
      - /home/oracle/oradata:/u01/app/oracle/product/11.2.0/xe/oradata
```

连接参数：



```undefined
username：system
password：oracle
port：1521
sid：xe
```

------

### Oracle12c



```objectivec
version: '2'
services:
  oracle02:
    image: docker.io/truevoly/oracle-12c
    container_name: oracle02
    privileged: true
    restart: always
#    shm_size: "1g"
    ports:
      - "1522:1521"
      - "8091:8080"
#    environment:
#      - ORACLE_PWD=root123456
#    volumes:
#      - /home/oracle/oradata:/u01/app/oracle/oradata 
```

连接参数：



```undefined
username：system
password：oracle
port：1522
sid：xe
```

------

### DB2



```ruby
version: '2'
services:
  db2_01:
    image: docker.io/ibmcom/db2
    container_name: db2_01
    privileged: true
    ports:
      - "50000:50000"
    environment:
      - DB2INST1_PASSWORD=Root123456
      - LICENSE=accept
      - DBNAME=testdb
    volumes:
      - /home/db2/database:/database
```

连接参数：



```undefined
database：testdb
username：db2inst1
password：Root123456
port：50000
```

------

### postgres



```ruby
version: '2'
services:
  psql01:
    image: docker.io/postgres:9.6
    container_name: psql01
    privileged: true
    ports:
      - "5432:5432"
    environment:
      - POSTGRES_PASSWORD=Root123456
    volumes:
      - /home/pgsql/database/:/var/lib/postgresql/data
```

连接参数：



```undefined
database：postgres
username：postgres
password：Root123456
port：5432
```

##### 3.  相关的jdbc依赖

对于上面这些数据库，肯定需要对相关的jdbc进行操作，下面是常用的相关 **jdbc jar** 依赖：

##### DB2



```xml
<dependency>
    <groupId>com.ibm.db2.jcc</groupId>
    <artifactId>db2jcc</artifactId>
    <version>db2jcc4</version>
</dependency>
```

##### Oracle 11g 12c



```xml
<dependency>
    <groupId>com.oracle</groupId>
    <artifactId>ojdbc6</artifactId>
    <version>11.2.0.3</version>
</dependency>
```

##### MSSQL



```xml
<dependency>
    <groupId>com.microsoft.sqlserver</groupId>
    <artifactId>mssql-jdbc</artifactId>
    <version>11.2.0.3</version>
</dependency>
```

##### PgSQL



```xml
<dependency>
    <groupId>org.postgresql</groupId>
    <artifactId>postgresql</artifactId>
    <version>42.2.8</version>
</dependency>
```

##### MySQL



```xml
 <dependency>
       <groupId>mysql</groupId>
         <artifactId>mysql-connector-java</artifactId>
        <version>5.1.47</version>
</dependency>
```

相关的url：



```bash
        "mysql", "jdbc:mysql://${host}:${port}/${dbName}?characterEncoding=utf8&serverTimezone=UTC"
        "oracle", "jdbc:oracle:thin:@${host}:${port}:XE";
        "mssql", "jdbc:sqlserver://${host}:${port};${dbName}";
        "postgresql", "jdbc:postgresql://${host}:${port}/${dbName}";
        "db2", "jdbc:db2://${host}:${port}/${dbName}";
```

------

以上就基本描述完环境的搭建


