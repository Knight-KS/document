# jetty 实战操作

### docker-compose.yaml

```
version: '3.1'
services:
  tomcat:
    restart: always
    image: jetty:9-jre8
    container_name: jetty
    ports:
      - 8082:8080
    volumes:
      - /usr/local/docker/vvdd/webapps:/var/lib/jetty/webapps
```

