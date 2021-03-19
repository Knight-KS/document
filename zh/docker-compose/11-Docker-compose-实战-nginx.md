# docker-compose 实战nginx

## docker-compose

```
version: '3.1'
services:
  mysql:
    restart: always
    image: nginx
    container_name: nginx
    ports:
      - 88:80
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
```

```
version: '2.0'

services:
  nginx:
    restart: always
    image: nginx:1.11.6-alpine
    ports:
      - 82:80
    volumes:
     # - ./data/conf.d:/etc/nginx/conf.d
      - ./data/log:/var/log/nginx
      - ./data/html:/usr/share/nginx/html
     # - /etc/letsencrypt:/etc/letsencrypt

```



## nginx.conf 

```

user  nginx;
worker_processes  1;

error_log  /var/log/nginx/error.log warn;
pid        /var/run/nginx.pid;


events {
    worker_connections  1024;
}


http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    access_log  /var/log/nginx/access.log  main;

    sendfile        on;
    #tcp_nopush     on;

    keepalive_timeout  65;

    #gzip  on;

    include /etc/nginx/conf.d/*.conf;
}

```



