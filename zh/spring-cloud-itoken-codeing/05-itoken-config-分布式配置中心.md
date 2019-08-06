# itoken-config-分布式配置中心
# Spring-Cloud-创建分布式配置中心服务端
## 概述
创建一个工程名为 `itoken-cloud-config` 的项目，`pom.xml` 配置文件如下：
```
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <parent>
        <groupId>com.vvdd</groupId>
        <artifactId>itoken-dependencies</artifactId>
        <version>1.0.0-SNAPSHOT</version>
        <relativePath>../itoken-dependencies/pom.xml</relativePath>
    </parent>

    <artifactId>itoken-config</artifactId>
    <packaging>jar</packaging>

    <name>itoken-config</name>
    <url>http://www.vvdd.com</url>
    <inceptionYear>2018-Now</inceptionYear>

    <dependencies>
        <!-- Spring Boot Begin -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-tomcat</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-actuator</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
        <!-- Spring Boot End -->

        <!-- Spring Cloud Begin -->
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-zipkin</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-config-server</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-netflix-eureka-server</artifactId>
        </dependency>
        <!-- Spring Cloud End -->

        <!-- Spring Boot Admin Begin -->
        <dependency>
            <groupId>org.jolokia</groupId>
            <artifactId>jolokia-core</artifactId>
        </dependency>
        <dependency>
            <groupId>de.codecentric</groupId>
            <artifactId>spring-boot-admin-starter-client</artifactId>
        </dependency>
        <!-- Spring Boot Admin End -->
    </dependencies>

    <repositories>
        <repository>
            <id>nexus</id>
            <name>Nexus Repository</name>
            <url>http://172.23.34.200:8081/repository/maven-public/</url>
            <snapshots>
                <enabled>true</enabled>
            </snapshots>
            <releases>
                <enabled>true</enabled>
            </releases>
        </repository>
    </repositories>


    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
                <configuration>
                    <mainClass>com.vvdd.itoken.config.ConfigApplication</mainClass>
                </configuration>
            </plugin>
        </plugins>
    </build>
</project>
```
主要增加了 spring-cloud-config-server 依赖
```
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-config-server</artifactId>
</dependency>
```
## Application
```
通过 @EnableConfigServer 注解，开启配置服务器功能

package com.vvdd.itoken.spring.cloud.config;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.config.server.EnableConfigServer;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@SpringBootApplication
@EnableConfigServer
@EnableEurekaClient
public class ConfigApplication {
    public static void main(String[] args) {
        SpringApplication.run(ConfigApplication.class, args);
    }
}
```
## bootstrap.yml
增加 Config 相关配置，并设置端口号为：`8888`
```
spring:
  application:
    name: itoken-config
  boot:
    admin:
      client:
        url: http://localhost:8084
  cloud:
    config:
      label: master
      server:
        git:
          uri: http://172.23.34.200:8080/itoken/itoken-config-respo.git
          search-paths: respo
          username: topsale@vip.qq.com
          password: 12345678
  zipkin:
    base-url: http://localhost:9411

server:
  port: 8888

eureka:
  client:
    serviceUrl:
      defaultZone: http://localhost:8761/eureka/

management:
  endpoint:
    health:
      show-details: always
  endpoints:
    web:
      exposure:
        include: health,info
```
## bootstrap-prod.yml
```
spring:
  application:
    name: itoken-config
  boot:
    admin:
      client:
        url: http://192.168.81.128:8084
  cloud:
    config:
      label: master
      server:
        git:
          uri: http://172.23.34.200:8080/itoken/itoken-config-respo.git
          search-paths: respo
          username: deploy
          password: 12345678
  zipkin:
    base-url: http://192.168.81.128:9411

server:
  port: 8888

eureka:
  client:
    serviceUrl:
      defaultZone: http://192.168.81.128:8761/eureka/,http://192.168.81.128:8861/eureka/,http://192.168.81.128:8961/eureka/

management:
  endpoint:
    health:
      show-details: always
  endpoints:
    web:
      exposure:
        include: health,info
```

相关配置说明，如下：

- `pring.cloud.config.label`：配置仓库的分支
- `pring.cloud.config.server.git.uri`：配置 Git 仓库地址（GitHub、GitLab、码云 ...）
- `pring.cloud.config.server.git.search-paths`：配置仓库路径（存放配置文件的目录）
- `pring.cloud.config.server.git.username`：访问 Git 仓库的账号
- `pring.cloud.config.server.git.password`：访问 Git 仓库的密码
注意事项：

如果使用 GitLab 作为仓库的话，`git.uri` 需要在结尾加上 `.git`，GitHub 则不用

## 附：HTTP 请求地址和资源文件映射
- http://ip:port/{application}/{profile}[/{label}]
- http://ip:port/{application}-{profile}.yml
- http://ip:port/{label}/{application}-{profile}.yml
- http://ip:port/{application}-{profile}.properties
- http://ip:port/{label}/{application}-{profile}.properties

