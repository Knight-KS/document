# Linux-安装-Maven
## 概述
此处以 apache-maven-3.6.1-bin.tar.gz为例

## 下载地址
```
https://maven.apache.org
```

## 解压缩并移动到指定目录
### 解压缩
```
tar -zxvf apache-maven-3.6.1-bin.tar.gz
```
### 创建目录
```
mkdir -p /usr/local/maven
```
### 移动安装包
```
mv apache-maven-3.6.1/ /usr/local/maven/
```
### 设置所有者
```
chown -R root:root /usr/local/maven/
```
## 配置环境变量
### 配置用户环境变量
```
nano /etc/profile
```
### 添加如下语句
```
if [ "$PS1" ]; then
  if [ "$BASH" ] && [ "$BASH" != "/bin/sh" ]; then
    # The file bash.bashrc already sets the default PS1.
    # PS1='\h:\w\$ '
    if [ -f /etc/bash.bashrc ]; then
      . /etc/bash.bashrc
    fi
  else
    if [ "`id -u`" -eq 0 ]; then
      PS1='# '
    else
      PS1='$ '
    fi
  fi
fi

export MAVEN_HOME=/usr/local/maven/apache-maven-3.6.1
export PATH=$MAVEN_HOME/bin:$PATH:$HOME/bin

if [ -d /etc/profile.d ]; then
  for i in /etc/profile.d/*.sh; do
    if [ -r $i ]; then
      . $i
    fi
  done
  unset i
fi
```
### 使用户环境变量生效
```
source /etc/profile
```
### 测试是否安装成功
```
root@UbuntuBase:/usr/local/java# mvn -version
```
### 为其他用户更新用户环境变量
```
su leizhenjie
source /etc/profile
```