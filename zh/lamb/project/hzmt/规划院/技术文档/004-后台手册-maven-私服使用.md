## maven 私服使用



#### 修改 pom.xml

```
<repositories>
        <repository>
            <id>nexus-releases</id>
            <name>releases</name>
            <url>http://10.120.133.190:38081/repository/ods-releases/</url>
            <layout>default</layout>
        </repository>
</repositories>
<distributionManagement>
        <repository>
            <id>nexus-releases</id>
            <name>releases</name>
            <url>http://10.120.133.190:38081/repository/ods-releases/</url>
            <uniqueVersion>true</uniqueVersion>
        </repository>
        <snapshotRepository>
            <id>nexus-snapshots</id>
            <name>snapshots</name>
            <url>http://10.120.133.190:38081/repository/ods-snapshots/</url>
        </snapshotRepository>
  </distributionManagement>

```

#### 修改setting

```
    <server>
      <id>nexus-releases</id>
      <username>admin</username>
      <password>admin123</password>
    </server>

    <server>
      <id>nexus-snapshots</id>
      <username>admin</username>
      <password>admin123</password>
    </server>
```



### PaaS pom

```
  <distributionManagement>
        <repository>
            <id>nexus-releases</id>
            <name>snapshots</name>
            <url>http://10.120.146.12:8081/repository/maven-releases/</url>
            <uniqueVersion>true</uniqueVersion>
        </repository>
        <snapshotRepository>
            <id>nexus-snapshots</id>
            <name>snapshots</name>
            <url>http://10.120.146.12:8081/repository/maven-snapshots/</url>
        </snapshotRepository>
    </distributionManagement>
    <repositories>
        <repository>
            <id>nexus-snapshots</id>
            <name>releases</name>
            <url>http://10.120.146.12:8081/repository/maven-snapshots</url>
        </repository>
        <repository>
            <id>nexus-releases</id>
            <name>releases</name>
            <url>http://10.120.146.12:8081/repository/maven-releases</url>
        </repository>
    </repositories>
```



```
FROM 10.120.146.82/public/openjdk:8.201.08
MAINTAINER leizhenjie <zhenjie_lei@163.com>

ENV DIST_NAME=ods-gateway \
        APP_VERSION=1.0.0
COPY target/"$DIST_NAME.jar" /"$DIST_NAME.jar"
EXPOSE 8080
ENTRYPOINT java  -javaagent:/skywalking-agent/skywalking-agent.jar \
           -Dcollector.backend_service=${SW_AGENT_COLLECTOR_BACKEND_SERVICES} \
		   -Dskywalking.agent.service_name=${DIST_NAME} \
           -XX:+PrintFlagsFinal -XX:+UnlockExperimentalVMOptions -XX:+UseCGroupMemoryLimitForHeap \
           -Dapp.id=${APOLLO_APP_ID} \
           -Dapollo.meta=${APOLLO_CONFIGSERVICE} \
           $JAVA_OPTS -jar /$DIST_NAME.jar

```

