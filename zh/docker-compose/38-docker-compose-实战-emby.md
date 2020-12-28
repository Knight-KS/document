# 实战emby

```
version: '3.1'
services:
  emby:
    restart: always
    image: emby/embyserver:latest
    container_name: emby
    ports:
      - 1900:1900
      - 7359:7359
      - 7359:7359/udp
      - 8096:8096
      - 8920:8920
    environment:
      UID=1000
      GID=100
    volumes:
      - ./data/config:/config
      - ./data/share1:/mnt/share1
      - ./data/share2:/mnt/share2
```

