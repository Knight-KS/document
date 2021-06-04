# 实战skyworking

## 简介

这里采用docker-compose的方式部署skywalking。部署所用的docker-compose.yml如下，skywalking-oap中挂载的配置文件volume来自于：https://github.com/apache/incubator-skywalking/tree/master/docker 中的config目录。
这里用的是最新版本6.1.0

首先vi skywalking-compose.yml
注意这个需要在每个docker容器内设置时区

skywalking文档中也提示重要提示：请在UI上选择时区，使其与OAP后端服务器的时区匹配。

```
environment:
      TZ: Asia/Shanghai
```



## `docker-compose.yml`

```
version: '3.3'
services:
  elasticsearch:
    image: elasticsearch:6.8.0
    container_name: skywalking-es
    restart: always
    ports:
      - 9200:9200
      - 9300:9300
    environment:
      discovery.type: single-node
      TZ: Asia/Shanghai
  oap:
    image: apache/skywalking-oap-server:6.1.0
    container_name: skywalking-oap
    depends_on:
      - elasticsearch
    links:
      - elasticsearch
    restart: always
    #前边为外网端口号,后边为容器应用端口号
    ports:
      - 11800:11800
      - 12800:12800
    environment:
      # 设置时区
      TZ: Asia/Shanghai
   # volumes:
   #   - /home/skywalking/apache-skywalking-apm-bin/config/application.yml
     # - ./config:/skywalking/config:ro
  ui:
    image: apache/skywalking-ui:6.1.0
    container_name: skywalking-ui
    depends_on:
      - oap
    links:
      - oap
    restart: always
    ports:
      - 18080:8080
    #设置环境,配置覆盖yml的配置
    environment:
      collector.ribbon.listOfServers: oap:12800
      security.user.admin.password: adminsou888!
```

```
然后执行 docker-componse -f skywalking-compose.yml up -d 
登录密码已被我们改为adminsou888!
登录账号密码为 admin/adminsou888!
访问 ip:18080 就可以登录了
```

```
使用 Agent收集调用信息
skywalking与pinpoint一样，采用javaagent无侵入的方式实现了应用调用信息的收集，原应用程序无需做任何改动。只需要在启动时增加javaagent参数。启动时参数如下：
idea添加 
-javaagent:F:\运行工具\apache-skywalking-apm-6.1.0\apache-skywalking-apm-bin\agent\skywalking-agent.jar -Dskywalking.agent.service_name=syncorder -Dskywalking.collector.backend_service=172.23.34.220:11800

java -javaagent:/opt/skywalking-agent/skywalking-agent.jar=agent.service_name=demo -Dskywalking.agent.service_name=syncorder -Dskywalking.collector.backend_service=172.23.34.220:11800 -jar demo.jar


nohup java -javaagent:/opt/apps/skywalking/apache-skywalking-apm-bin/agent/skywalking-agent.jar -Dskywalking.agent.service_name=syncorder -Dskywalking.collector.backend_service=172.23.34.220:11800 -jar sync-order-server.jar &

说明：

javaagent 参数必须在 jar参数之前；
agent.service_name 表示服务名称；
启动前需要修改agent.config 文件中的相应配置：
collector.backend_service (后端服务的ip地址和端口 xxx.xxx.xxx.xxx:11800)

如果启动报错:
查看现在的资源限制，对core文件大小的设置：ulimit -c
如果为0
需要设置    ulimit -c unlimited 无限大      ulimit -c 100设置为100kb

其它配置项说明参见：https://github.com/apache/incubator-skywalking/blob/master/docs/en/setup/service-agent/java-agent/README.md

```

```
version: '3.3'
services:
  oap:
    image: apache/skywalking-oap-server:8.3.0-es7
    container_name: oap
    restart: always
    ports:
      - 11800:11800
      - 12800:12800
    environment:
      SW_STORAGE: elasticsearch7
      SW_STORAGE_ES_CLUSTER_NODES: 192.168.10.181:9200
  ui:
    image: apache/skywalking-ui:8.3.0
    container_name: ui
    restart: always
    depends_on:
      - oap
    links:
      - oap
    ports:
      - 8801:8080
    environment:
      SW_OAP_ADDRESS: oap:12800
```

