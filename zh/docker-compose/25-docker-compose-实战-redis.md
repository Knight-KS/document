# 实战Redis

## docker-compose

```
#docker-compose.yml文件的版本
version: "3"
# 管理的服务
services:
  redis:
    restart: always
    # 指定镜像
    image: redis:4
    ports:
      # 端口映射
      - 6379:6379
    volumes:
      # 目录映射
      - "${REDIS_DIR}/conf:/usr/local/etc/redis"
      - "${REDIS_DIR}/data:/data"
    command:
      # 执行的命令
      redis-server      
```

### .env

```
# .env文件内容
# redis
REDIS_DIR=./redis


# mysql
MYSQL_DIR=./mysql
MYSQL_ROOT_PASSWORD=123456  
```

```
version: "3"
services:
  redis:
    restart: always
    image: redis:4
    ports:
      - 6379:6379
    volumes:
      - "./redis/conf:/usr/local/etc/redis"
      - "./redis/data:/data"
    command:
      redis-server  
```

