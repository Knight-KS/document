# docker-compose-安装-sentinel

https://github.com/alibaba/Sentinel/releases 下载源码

修改成支持nacos(略)

```
mkdir -p /usr/local/docker/sentinel/

把编译好的sentinel-dashboard.jar复制到/opt/sentinel-dashboard目录

wget https://github.com/alibaba/Sentinel/releases/download/1.7.0/sentinel-dashboard-1.7.0.jar

vim /usr/local/docker/sentinel/build/Dockerfile
```





```
FROM openjdk:8

ENV SENTINEL_HOME /usr/local/docker/sentinel/build

RUN mkdir -p ${SENTINEL_HOME}

COPY sentinel-dashboard.jar ${SENTINEL_HOME}

RUN chmod -R +x ${SENTINEL_HOME}/*jar

WORKDIR ${SENTINEL_HOME}

EXPOSE 8080

CMD java ${JAVA_OPTS} -jar sentinel-dashboard.jar
```

```
sudo mkdir -p /usr/local/docker/sentinel/log/sentinel-dashboard;
sudo chmod -R 777 /usr/local/docker/sentinel/log/sentinel-dashboard
```



```
vim /usr/local/docker/sentinel/docker-compose.yml
```

 ```
version: '3.6'

services:
  sentinel-dashboard:
    image: v-sentinel-dashboard
    container_name: sentinel-dashboard
    restart: on-failure
    build: 
      context: ./build/
      dockerfile: Dockerfile
    ports:
      - "8718:8080"
    environment:
      - JAVA_OPTS=-Dserver.port=8080 -Dcsp.sentinel.dashboard.server=localhost:8080 -Dproject.name=sentinel-dashboard -Djava.security.egd=file:/dev/./urandom -Dcsp.sentinel.api.port=8719
    volumes:
      - /usr/local/docker/sentinel/log/sentinel-dashboard:/root/logs/csp
 ```

```
cd /opt/sentinel-dashboard
docker-compose build
docker-compose up -d --force-recreate
docker-compose down
docker-compose restart

 

查看日志
docker logs --tail="500" sentinel-dashboard

查看进程
netstat -anltp|grep 8718

进入容器
docker exec -it sentinel-dashboard /bin/bash

```



 

配置见：https://github.com/alibaba/Sentinel/wiki/启动配置项

> 说明：
> -Dserver.port=8718 控制台端口，sentinel控制台是一个spring boot程序。客户端配置文件需要填对应的配置，如：spring.cloud.sentinel.transport.dashboard=192.168.1.102:8718
> -Dcsp.sentinel.dashboard.server=localhost:8718 向控制台发送心跳包的控制台地址，指定控制台后客户端会自动向该地址发送心跳包。
> -Dproject.name=sentinel-dashboard 指定Sentinel控制台程序的名称
> -Dcsp.sentinel.api.port=8719 (默认8719) 客户端提供给Dashboard访问或者查看Sentinel的运行访问的参数

> 注：csp.sentinel.dashboard.server这个配置是用在客户端，这里Sentinel控制台也使用是用于自己监控自己程序的api(sentinel-dashboard是服务端的同时，若对自己进行监控，那么自己也是一个客户端)，否则无法显示控制台的api情况，当然这个也可以不显示。

> 注：csp.sentinel.api.port=8719是客户端的端口，需要把客户端设置的端口穿透防火墙，可在控制台的“机器列表”中查看到端口号，这里Sentinel控制台也使用是用于自己程序的api传输，由于是默认端口所以控制台也可以不设置。

> 注：客户端需向控制台提供端口，配置文件配置，如：spring.cloud.sentinel.transport.port=8720



- 控制台推送规则的日志在 ：${user.home}/logs/csp/sentinel-dashboard.log 中，
- 客户端接收规则日志在 ${user.home}/logs/csp/record.log 中
- 启动配置wiki： https://github.com/alibaba/Sentinel/wiki/启动配置项
- spring cloud alibaba配置、整合feign、动态数据源支持 等的wiki：https://github.com/spring-cloud-incubator/spring-cloud-alibaba/wiki/Sentinel