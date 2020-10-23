# openvas docker-compose 实战

docker-compose

```yaml
version: '3.1'
services:
  openvas:
    restart: always
    image: securecompliance/gvm
    container_name: openvas
    ports:
      - 8080:9392
      #- 80:80
      #- 443:443
    environment:
      PASSWORD: 123456
      TZ: Asia/Shanghai
      HTTPS: false
    volumes:
      - ./data:/data
```

```
docker run --detach --publish 8080:9392 --env PASSWORD="123456" --volume ./data:/data --name gvm securecompliance/gvm

```

