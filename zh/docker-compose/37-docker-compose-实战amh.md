# amh 安装运行

```
version: '3.1'
services:
  amh6:
    image: amh6:1.0
    restart: always
    container_name: amh6
    ports:
      - 8888:8888
    	- 9999:9999
    volumes:
      - ./data/wwwroot:/home/wwwroot
```

