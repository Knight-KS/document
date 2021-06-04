# v2ray-web-manager

```
mkdir -p conf
echo "admin:
  #[请修改]第一次启动时候的账号和密码
  email: admin@admin.com
  password: 123456

proxy:
  #[请修改]与porxy交互的密码，也是各种token的私钥
  authPassword: ''
  subscriptionTemplate: /subscribe/%s?type=%s&timestamp=%s&token=%s

email:
  #smtp地址
  host: 
  #用户名称
  userName: 
  #密码
  password: 
  #端口
  port: 
  #默认false ,邮件不支持startTls不要开启
  startTlsEnabled: false

  exceedConnections: 你当前的连接数已经超过账号最大限制，当前风险系统自动降低你一半的连接数，并且持续一个小时;如果你在一个小时后，不在触发监控指标，你的账号连接数将恢复。
  vCodeTemplate: '你的验证码为: %s,请在10分钟内使用'
  overdueDate: 你的账号即将于：%s 过期，请留意续费。



logging:
  file: /opt/jar/logs/admin.log
  file.max-history: 7
  level:
    root: info

server:
  port: 9091
  tomcat:
    max-threads: 5
    min-threads: 2
spring:
  datasource:
    driver-class-name: org.sqlite.JDBC
    hikari:
      maximum-pool-size: 5
      minimum-idle: 2
    password: ''
    type: com.zaxxer.hikari.HikariDataSource
    url: jdbc:sqlite:/opt/jar/db/admin.db
    username: ''
  jackson:
    date-format: yyyy-MM-dd HH:mm:ss
    time-zone: GMT+8
  jpa:
    hibernate:
      ddl-auto: update
    properties:
      hibernate:
        dialect: com.jhl.admin.util.SQLiteDialect
        enable_lazy_load_no_trans: true
        format_sql: ''
        show_sql: true
" > conf/admin.yaml
echo "proxy:
  #[请修改]与admin.yaml中的proxy.authPassword配置相同
  authPassword: ''
  localPort: 8081
  maxConnections: 300

logging:
  file: /opt/jar/logs/v2ray-proxy.log
  file.max-history: 7
  level:
    root: info
manager:
  #如果admin端不在本机需要修改
  address: http://127.0.0.1:9091
  getProxyAccountUrl: ${manager.address}/proxy/proxyAccount/ac?accountNo={accountNo}&domain={domain}
  reportFlowUrl: ${manager.address}/report/flowStat
  reportOverConnectionLimitUrl: ${manager.address}/report/connectionLimit?accountNo={accountNo}

server:
  port: 8091
  tomcat:
    max-threads: 1
    min-threads: 1
" > ~/conf/proxy.yaml
echo 'server {

  listen 80;
  server_name 127.0.0.1; #[请修改]修改为自己的IP/域名. 如果设置为域名，则稍后在浏览器上输入域名即可.
  root /opt/jar/web;
                
  location /api {
    proxy_pass http://127.0.0.1:9091/;
  }

  location /ws/ {
    proxy_redirect off;
    proxy_pass http://127.0.0.1:8081;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
    proxy_set_header Host $http_host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  } 

}' > conf/v2ray-mng.conf
```





```
version: '3.1'
services:
  v2ray-manager:
    restart: always
    image: greatbody/v2ray-web-manager:0.0.19
    container_name: v2ray
    network_mode: "host"
    #ports:
    #  - 81:80
    volumes:
      - ./data/conf:/opt/conf 
      
```





