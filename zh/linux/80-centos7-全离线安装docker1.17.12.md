# centos7全离线安装docker1.17.12
## 检查前提条件，必须是64位内核，docker不支持32位内核

- 1.内核，运行Linux3.8或更高版本内核，CentOS时内核必不小于3.10。
```
uname -a
```
- 2.检查Device Mapper，内核必须支持一种合适的存储驱动，可以是Device
Manager、AUFS、vfs、btrfs、以及默认的驱动Device Mapper中的一个。
```
ls -l /sys/class/misc/device-mapper
```

## 强制不检查依赖，安装所有rpm包
```
rpm-ivh docker/* --nodeps --force
systemctl daemon-reload
systemctl enable docker
systemctl start docker
#测试helloworld程序
docker run hello-world
```

docker rpm包下载地址如下：
```
链接: https://pan.baidu.com/s/1MOGlbnWP1oykzt5dj6E8cw 提取码: 3tyr 
```