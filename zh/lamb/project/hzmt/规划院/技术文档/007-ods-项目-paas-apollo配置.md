# apollo

#### pom.xml 配置

```
    <!--      配置中心      apollo-->
        <dependency>
            <groupId>com.ctrip.framework.apollo</groupId>
            <artifactId>apollo-client</artifactId>
        </dependency>

```





### bootstrap.yml 配置

```
# Tomcat
server:
  port: 9201

# Spring
spring:
  application:
    # 应用名称
    name: ods-system
  profiles:
    # 环境配置
    active: dev
  cloud:
    nacos:
#      discovery:
#        # 服务注册地址
#        server-addr: 10.120.133.190:38848
      config:
        # 配置中心地址
        server-addr: 10.120.133.190:38848
        # 配置文件格式
        file-extension: yml
        # 共享配置
        shared-configs:
          - application-${spring.profiles.active}.${spring.cloud.nacos.config.file-extension}

eureka:
  client:
    service-url:
#      defaultZone: http://10.120.146.154:35502/eureka
      defaultZone: http://127.0.0.1:8761/eureka

# 配置组 ID
app:
  id: asddev.dev
# 配置中心apollo
apollo:
  meta: http://10.120.146.158:33684
  configServer: http://10.120.146.158:33684
  bootstrap:
    namespaces: application-${spring.profiles.active}.${spring.cloud.nacos.config.file-extension},${spring.application.name}-${spring.profiles.active}.${spring.cloud.nacos.config.file-extension}
    enabled: true   # 是否注入到spring的Environment
    eagerLoad:
      enabled: true  # Apollo配置加载提到初始化日志系统之前
```

