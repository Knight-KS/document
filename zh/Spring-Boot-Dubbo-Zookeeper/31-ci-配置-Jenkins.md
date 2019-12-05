# 配置-Jenkins
## 配置 JDK & Maven
- 上传 JDK 和 Maven 的 tar 包到服务器（容器数据卷目录）
- Manage Jenkins -> Global Tool Configuration
- 安装 JDK（JAVA_HOME 的路径是宿主机目录，切记！不明白的看视频！）
![31-001](31-001.png)
```
/var/jenkins_home/jdk1.8.0_152
```
![31-002](31-002.png)
- 安装 Maven（MAVEN_HOME 的路径是宿主机目录，切记！不明白的看视频！）
```
/var/jenkins_home/apache-maven-3.5.3
```

别忘记保存
## 配置本地化（显示中文）
安装 Locale 插件
![31-003](31-003.png)

`Manage Jenkins` -> `Configure System` -> `Locale`
![31-004](31-004.png)

本地化效果图
![31-005](31-005.png)

## 安装动态参数插件
该插件的主要目的是为了方便我们后面在做项目构建时可以按照版本进行构建（支持一键回滚哦）
![31-006](31-006.png)
