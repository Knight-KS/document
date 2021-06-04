# Prometheus+Grafana



基于 Prometheus+Grafana 的服务器监控系统部署手册

监控系统一般不需要高可用，因为是被动监控，故障了也不会影响业务系统。正常来说是稳定的，用docker容器化方式简化部署难度。

#### 部署清单

Prometheus (pull的方式主动采集数据，被采集端暴露监控指标接口) 【1个】
Grafana (图形化Dashboard，将指标可视化呈现) 【1个】
node-exporter (用于提供服务器内核的硬件以及系统指标) 【每个服务器一个】
主机	地址	安装服务(外端口/内端口)
host01	192.168.1.163	node-exporter(9100/9100)
host02	192.168.1.164	Grafana(3300/3300)、Prometheus(9090/9090)、node-exporter(9100/9100)
host03	192.168.1.165	node-exporter(9100/9100)
安装
创建目录

```
mkdir -p mkdir /opt/soft/prometheus
mkdir -p /opt/soft/grafana/storage
chmod 777 -R /opt/soft/grafana/storage
```




创建配置文件(下面内容完整拷贝粘贴执行)

```
cat > /opt/soft/prometheus/prometheus.yml <<- EOF
global:
  # 采集频率：30s
  scrape_interval: 30s  
  # 采集超时：10s
  evaluation_interval: 10s  

scrape_configs:
  # 全局唯一
  - job_name: prometheus
    # 采集对象的path路径
    metrics_path: /metrics
    # 采集协议：http或者https
    scheme: http  
    static_configs:
      - targets: ['192.168.1.164:9090']
 
  - job_name: node-exporter
    static_configs:
      - targets: ['192.168.1.163:9100','192.168.1.164:9100','192.168.1.165:9100']
EOF
```





注：关于 prometheus.yml 的更多参数配置，可以参考官网或其他资料。

文件 /opt/soft/docker-compose.yml
文件中的 prometheus 和 grafana 在一个机器上部署即可（本例为host02）
文件中的 node-exporter 为获取服务器各项指标的服务在所有服务器中都运行

```
version: '3.7'
services:

  common: &commmon
    image: alpine:latest
    container_name: common
    environment:
      TZ: Asia/Shanghai
    logging:
      driver: "json-file"
      options:
        max-size: "1g"
        max-file: "20"

  prometheus:
    image: prom/prometheus:latest
    container_name: prometheus
    <<: *commmon
    ports:
      - "9090:9090"
    command: 
      - --config.file=/etc/prometheus/prometheus.yml
      - --storage.tsdb.path=/prometheus
      - --web.console.libraries=/usr/share/prometheus/console_libraries
      - --web.enable-lifecycle
      - --web.console.templates=/usr/share/prometheus/consoles
    restart: always
    volumes:
    - "/opt/soft/prometheus/prometheus.yml:/etc/prometheus/prometheus.yml"

  grafana:
    image: grafana/grafana:latest
    container_name: grafana
    <<: *commmon
    ports:
      - "3300:3000"
    restart: always
    volumes:
    - "/opt/soft/grafana/storage:/var/lib/grafana"

  node-exporter:
    image: prom/node-exporter:latest
    container_name: node-exporter
    <<: *commmon
    ports:
      - "9100:9100"
    restart: always
    volumes:
    - "/proc:/host/proc:ro"
    - "/sys:/host/sys:ro"
    - "/:/rootfs:ro"
```

​     

注：如果你需要用 docker run 的方式启动 node-exporter 参考如下命令：

```
docker run -itd --name=node-exporter \
  -p 9100:9100 \
  -v "/proc:/host/proc:ro" \
  -v "/sys:/host/sys:ro" \
  -v "/:/rootfs:ro" \
  --restart=always \
  prom/node-exporter:0.18.1
```





#### 启动服务

```
docker-compose up -d
```



#### 访问地址

```
Prometheus 
http://host02:9090/graph  
http://host02:9090/targets  
Grafana
http://host02:3300/  
node-exporter  
http://host01:9100/metrics  
http://host02:9100/metrics  
http://host03:9100/metrics  
搭建完成之后访问这个几个地址，都可以正常访问（其中host01这些修改为IP地址或者你配置本地hosts文件后访问）。


```

#### 数据配置
登录Grafana(默认账号密码为admin第一次需要修改)
1.配置DataSource
打开登录Grafana》左侧图标Configuration》Data Sources》绿色按钮Add data source》选择Prometheus》填写HTTP URL为http://192.168.1.164:9090》底部绿色按钮Save&Test》完成

2.导入dashboard模板
打开登录Grafana》左侧图标Dashboards》Manage》按钮Import》输入下面的URL或者填写json字符串》按钮Load》完成
node-exporter https://grafana.com/grafana/dashboards/8919
JVM (Micrometer) https://grafana.com/grafana/dashboards/4701
附官方地址的模板列表 https://grafana.com/grafana/dashboards
注：模板是别人做好的可以直接使用，也可以根据自己业务需求编写模板的JSON脚本。

3.查看显示的数据
选择对应的Dashboard就可以查看数据了，面板上的各个按钮功能不多，熟悉一下即可。

#### Prometheus热加载
通过POST请求reload接口 curl -X POST http://host02:9090/-/reload 可以对修改后的 prometheus 配置文件热加载，这样就不需要重启服务了。
由于 Prometheus 官方提供的 Docker 默认没有开启Lifecycle API，所以在上面启动 docker 时指定command覆盖了默认Dockerfile中cmd增加--web.enable-lifecycle 参数开启Lifecycle API。

推荐几个面板：

```
https://grafana.com/grafana/dashboards/10619
https://grafana.com/grafana/dashboards/8919
https://grafana.com/grafana/dashboards/4701
https://grafana.com/grafana/dashboards/893
https://grafana.com/grafana/dashboards/10619
https://grafana.com/grafana/dashboards/395
https://grafana.com/grafana/dashboards/10280
```





```
cat > prometheus.yml <<- EOF
global:
  # 采集频率：30s
  scrape_interval: 30s  
  # 采集超时：10s
  evaluation_interval: 10s  

scrape_configs:
  # 全局唯一
  - job_name: prometheus
    # 采集对象的path路径
    metrics_path: /metrics
    # 采集协议：http或者https
    scheme: http  
    static_configs:
      - targets: ['192.168.20.160:9090']
 
  - job_name: node-exporter
    static_configs:
      - targets: ['192.168.20.160:9100']
EOF
```

```
version: '3.7'
services:

  common: &commmon
    image: alpine:latest
    container_name: common
    environment:
      TZ: Asia/Shanghai
    logging:
      driver: "json-file"
      options:
        max-size: "1g"
        max-file: "20"

  prometheus:
    image: prom/prometheus:latest
    container_name: prometheus
    <<: *commmon
    ports:
      - "9090:9090"
    command: 
      - --config.file=/etc/prometheus/prometheus.yml
      - --storage.tsdb.path=/prometheus
      - --web.console.libraries=/usr/share/prometheus/console_libraries
      - --web.enable-lifecycle
      - --web.console.templates=/usr/share/prometheus/consoles
    restart: always
    volumes:
    - "./data/prometheus/prometheus.yml:/etc/prometheus/prometheus.yml"

  grafana:
    image: grafana/grafana:latest
    container_name: grafana
    <<: *commmon
    ports:
      - "3300:3000"
    restart: always
    volumes:
    - "./data/grafana/storage:/var/lib/grafana"

  node-exporter:
    image: prom/node-exporter:latest
    container_name: node-exporter
    <<: *commmon
    ports:
      - "9100:9100"
    restart: always
    volumes:
    - "/proc:/host/proc:ro"
    - "/sys:/host/sys:ro"
    - "/:/rootfs:ro"
```



