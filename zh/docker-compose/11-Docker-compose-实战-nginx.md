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

    rewrite_log on;

    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" "$request_uri"'
                      '$status $body_bytes_sent "$http_referer" $server_addr $sent_http_location'
                      '"$http_user_agent" "$http_x_forwarded_for"';

    access_log  /var/log/nginx/access.log  main;

    gzip on;
    gzip_min_length 1k;
    gzip_buffers 4 16k;
    gzip_http_version 1.0;
    gzip_comp_level 6;
    gzip_types text/plain application/javascript application/x-javascript text/css application/xml text/javascript application/x-httpd-php image/jpeg image/gif image/png;
    gzip_vary off;

    sendfile        on;

    keepalive_timeout  65;

    server {
        listen       80;
        server_name  localhost;

        location /dev-api/ {
            proxy_pass http://172.31.151.220/;
        }

        location /prod-api/ {
            proxy_pass http://172.31.151.220/;
        }


        location / {
            root   /usr/share/nginx/html;
            try_files $uri $uri/ /index.html =404;
        }

        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   /usr/share/nginx/html/mes;
        }
    }
}

```



```
version: '3'
services:
  nginx:
    image: nginx
    container_name: nginx
    restart: always
    environment:
      - TZ=Asia/Shanghai 
    ports:
      - 88:80
    volumes:
      - ./conf/nginx.conf:/etc/nginx/nginx.conf:ro
      - ./conf/conf.d:/etc/nginx/conf.d
      - ./log:/var/log/nginx
      - ./data/dist:/opt/dist:ro
```

