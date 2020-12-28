# Docker Compose 实战 Nginx
## MySQL5
```
version: '3.1'
services:
  nginx:
    restart: always
    image: nginx
    container_name: nginx
    ports:
      - 81:80
      #- 80:80
      #- 443:443
    volumes:
      - ./conf.d:/etc/nginx/conf.d
      - ./log:/var/log/nginx
      - ./www:/var/www
      - /etc/letsencrypt:/etc/letsencrypt
```

### nginx-stmp

```
version: '3.1'
services:
  nginx:
    restart: always
    image: alfg/nginx-rtmp
    container_name: nginx
    ports:
      - 81:80
      #- 80:80
      #- 443:443
    volumes:
      - ./data/html:/usr/local/nginx/html
```

