# docker-compose常用命令
## yml文件
```
version: '3.1'
services:
  web:
    restart: always
    image: tomcat
    container_name: web
    ports:
      - 8080:8080
    volumes:
      - /usr/local/docker/myshop/ROOT:/usr/local/tomcat/webapps/ROOT
  mysql:
    restart: always
    image: mysql:5.7.22
    container_name: mysql
    ports:
      - 3306:3306
    environment:
      TZ: Asia/Shanghai
      MYSQL_ROOT_PASSWORD: 123456
    command:
      --character-set-server=utf8mb4
      --collation-server=utf8mb4_general_ci
      --explicit_defaults_for_timestamp=true
      --lower_case_table_names=1
      --max_allowed_packet=128M
      --sql-mode="STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION,NO_ZERO_DATE,NO_ZERO_IN_DATE,ERROR_
FOR_DIVISION_BY_ZERO"
    volumes:
      - mysql-data:/var/lib/mysql
volumes:
  mysql-data:
```
> mysql-data 默认路径：
```
/var/lib/docker/volumes/myshop_mysql-data
```
#前台运行
```
docker-compose up
```
# 后台运行
```
docker-compose up -d
```
# 启动
```
docker-compose start
```
# 停止
```
docker-compose stop
```
# 停止并移除容器
```
docker-compose down
```
