# 个人在线办公 dzzoffice

## 官网地址([http://www.dzzoffice.com](http://www.dzzoffice.com/))

## 当前镜像基于最新社区版 v2.02 构建。

### Dockerfile(https://github.com/soar1688/DzzOffice)

## 快速部署

### 部署安装Mysql 5.7数据库

```
docker run -d --name mysql -p 3306:3306 -e MYSQL_ROOT_PASSWORD=root_password mysql:5.7.27
```

如需做数据持久化存储，可加参数`-v $PWD:/var/lib/mysql`挂载数据卷到宿主机上，避免容器删除数据丢失。

### 部署安装DzzOffice

```
docker run -d --name dzzoffice -p 80:80 imdevops/dzzoffice:latest
```

如需做数据持久化存储，可加参数`-v $PWD:/var/www/html/data`挂载数据卷到宿主机上，避免容器删除数据丢失。

- 注意：挂载数据卷后，需要使用命令`docker exec -it dzzoffice bash` 进入容器内，执行命令 `chown -R www-data:www-data /var/www/html/data` 给data目录读写权限



```
version: '3.1'
services:
  db:
    image: mysql:5.7
    command: --default-authentication-plugin=mysql_native_password
    restart: always
    ports:
      - "3306:3306"
    environment:
      MYSQL_ROOT_PASSWORD: dzzoffice
      MYSQL_DATABASE: dzzoffice
      MYSQL_USER: dzzoffice
      MYSQL_PASSWORD: dzzoffice
    volumes:
      - "./data/dzzoffice/mysql:/var/lib/mysql"
  dzzoffice:
    depends_on:
      - db
    links:
      - db
    restart: always
    image: imdevops/dzzoffice:latest
    container_name: dzzoffice
    ports:
      - 8001:80
    volumes:
      - ./data/dzzoffice/html:/var/www/html
      - ./data/dzzoffice/disk1:/data/disk1

```

```
# docker cp：从容器中复制文件到本地
docker cp dzzoffice:/var/www/html ./data/dzzoffice/
# 以上面的代码为例，把容器路径和本地路径颠倒即可.
docker cp ./data/test.db koko:/tmp/test.db
# 重新build
docker build -t custom_python:1.0.0 v1.0.0/
```

