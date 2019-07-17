# 使用Docker搭建Squid代理服务器
```
version: '3.1'
services:
  squid:
    restart: always
    image: sameersbn/squid
    container_name: squid
    ports:
      - 3128:3128
    volumes:
      - /usr/local/docker/squid/squid-simple.conf:/etc/squid/squid.conf
```