# sentinel



```
version: '3'
services:
  sentinel-dashboard:
    image: bladex/sentinel-dashboard:1.7.2
    container_name: sentinel-dashboard
    restart: always
    environment:
      JAVA_OPTS: "-Dserver.port=8858 -Dcsp.sentinel.dashboard.server=localhost:8858 -Dproject.name=sentinel-dashboard"
    ports: #避免出现端口映射错误，建议采用字符串格式 8080端口为Dockerfile中EXPOSE端口
      - "8858:8858"
    volumes:
      - ./data/logs:/root/logs
```



```
# 账号密码
sentinel/sentinel
```



