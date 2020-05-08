# Docker-compose-实战-Nextcloud
使用`Docker-compose`安装`NextCloud`, 并集成`OnlyOffice`和`redis`
## docker-compose.yml 
```
version: '3'
services:
  nginx:
    container_name: nginx
    hostname: nginx
    image: nginx:latest
    ports:
      - 80:80
      - 443:443
    networks:
      - cloud_net
    restart: always
    volumes:
      - /usr/local/docker/nextcloud/data:/usr/share/nginx/html
      - /usr/local/docker/nextcloud/nginx:/etc/nginx
      - /usr/local/docker/nextcloud/nginx/certs:/etc/certs
      - /usr/local/docker/nextcloud/nginx/log:/var/log/nginx

  nextcloud_web:
    image: nextcloud:apache
    container_name: nextcloud_web
    hostname: nextcloud_web
    depends_on:
      - redis
    environment:
      - UID=1000
      - GID=1000
      - UPLOAD_MAX_SIZE=10G
      - APC_SHM_SIZE=128M
      - OPCACHE_MEM_SIZE=128
      - CRON_PERIOD=15m
      - TZ=Aisa/Shanghai
      - DOMAIN=cloud.vvdd.top
      - DB_TYPE=mysql
      - DB_NAME=nextcloud
      - DB_USER=root
      - DB_PASSWORD=123456
      - DB_HOST=192.168.81.133
    ports:
      - 9000:80/tcp
    networks:
      - cloud_net
    volumes:
      - /usr/local/docker/nextcloud/data:/var/www/html
    restart: always
  redis:
    image: redis:alpine
    container_name: redis
    hostname: redis
    restart: always
    networks:
      - cloud_net
    expose:
      - 6379
    restart: always

  onlyoffice:
    image: onlyoffice/documentserver
    container_name: onlyoffice
    hostname: onlyoffice
    environment:
      - REDIS_SERVER_HOST=redis
      - REDIS_SERVER_PORT=6379
    volumes:
      - /usr/local/docker/nextcloud/onlyoffice/data:/var/www/onlyoffice/Data
      - /usr/local/docker/nextcloud/onlyoffice/logs:/var/log/onlyoffice
    restart: always
    ports:
      - 9001:80/tcp
    networks:
      - cloud_net
      
networks:
  cloud_net:
```



# NextCloud 扫描已存在文件命令

```
docker exec nextcloud_web su www-data -s /bin/bash -c "php /var/www/html/occ files:scan --all"
```

NextCloud 安装之后并不认得文件夹内已经存在的内容，需要使用 occ 命令扫描。

在 Docker 里，需要使用下面的命令行，记录一下：

```
su www-data -s /bin/bash -c "php /var/www/html/occ files:scan --all"
```

使用方式：

```
docker exec nextcloud_web su www-data -s /bin/bash -c "php /var/www/html/occ files:scan --all"
```

记得把 exec 后面的换成你的容器名即可。

都 9102 年了，设置里面连一个扫描按钮都没有…