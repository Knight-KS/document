# itoken external 离线jar包管理
## pom.xml 
```
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <parent>
        <groupId>com.funtl</groupId>
        <artifactId>itoken-dependencies</artifactId>
        <version>1.0.0-SNAPSHOT</version>
        <relativePath>../itoken-dependencies/pom.xml</relativePath>
    </parent>

    <artifactId>itoken-external</artifactId>
    <packaging>jar</packaging>

    <name>itoken-external</name>
    <description></description>

    <build>
        <plugins>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-install-plugin</artifactId>
                <executions>
                    <execution>
                        <id>install-external-fastdfs</id>
                        <!-- 触发时机：执行 mvn clean 命令时自动触发插件 -->
                        <phase>clean</phase>
                        <configuration>
                            <!-- 存放依赖文件的位置 -->
                            <file>${project.basedir}/libs/fastdfs-client-java-1.27-RELEASE.jar</file>
                            <repositoryLayout>default</repositoryLayout>
                            <!-- 自定义 groupId -->
                            <groupId>org.csource</groupId>
                            <!-- 自定义 artifactId -->
                            <artifactId>fastdfs-client-java</artifactId>
                            <!-- 自定义版本号 -->
                            <version>1.27-RELEASE</version>
                            <!-- 打包方式 -->
                            <packaging>jar</packaging>
                            <!-- 是否自动生成 POM -->
                            <generatePom>true</generatePom>
                        </configuration>
                        <goals>
                            <goal>install-file</goal>
                        </goals>
                    </execution>
                </executions>
            </plugin>

        </plugins>
    </build>
</project>
```