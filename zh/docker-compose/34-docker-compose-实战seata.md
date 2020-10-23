# 使用 Docker 部署 Seata Server

#### Docker compose 启动

`docker-compose.yaml` 示例

```yaml
version: "3"
services:
  seata-server:
    image: seataio/seata-server
    hostname: seata-server
    ports:
      - "8091:8091"
    environment:
      - SEATA_PORT=8091
      - STORE_MODE=file
      - SEATA_CONFIG_NAME=file:/root/seata-config/registry
    volumes:
      - ./config:/root/seata-config
     
```