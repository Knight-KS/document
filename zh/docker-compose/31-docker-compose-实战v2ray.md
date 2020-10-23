# v2ray

docker-compose

```
  102  systemctl daemon-reload && systemctl restart docker && systemctl enable docker
  103  docker info
  104  docker run -d --name v2ray --privileged --restart always --network host jrohy/v2ray
  105  docker ps -a
  106  docker exec v2ray bash -c "v2ray info"
  107  systemctl stop firewalld.service
  108  systemctl disable firewalld.service
  109  pwd

```



image地址

```
https://github.com/Jrohy/multi-v2ray
```

默认创建mkcp +随机一种伪装头配置文件：

```
docker run -d --name v2ray --privileged --restart always --network host jrohy/v2ray
```

自定义v2ray配置文件：

```
docker run -d --name v2ray --privileged -v /path/config.json:/etc/v2ray/config.json --restart always --network host jrohy/v2ray
```

查看v2ray配置：

```
docker exec v2ray bash -c "v2ray info"
```

**警告**：如果用centos，需要先关闭防火墙

```
systemctl stop firewalld.service
systemctl disable firewalld.service
```





#    如何卸载V2ray

------

一、卸载V2ray

​    其中 systemd 和 sysv 二选一，取决于你的系统。

​    1、停用并卸载服务（systemd）

```
systemctl stop v2ray
systemctl disable v2ray
```

​     2、停用并卸载服务（sysv）

```
service v2ray stop
update-rc.d -f v2ray remove
```

 

二、删除文件

```
#(配置文件)
rm -rf /etc/v2ray/*  

#(程序)
rm -rf /usr/bin/v2ray/* 
#(日志)
rm -rf /var/log/v2ray/*  
#(systemd 启动项)
rm -rf /lib/systemd/system/v2ray.service 
#(sysv 启动项)
rm -rf /etc/init.d/v2ray
```

## ubuntu 

1.查看防火墙当前状态

```
sudo ufw status
```

2.开启防火墙

```
sudo ufw enable
```

3.关闭防火墙

```
sudo ufw disable
```

4.查看防火墙版本

```
sudo ufw version
```

5.默认允许外部访问本机

```
sudo ufw default allow
```

6.默认拒绝外部访问主机

```
sudo ufw default deny
```

7.允许外部访问53端口

```
sudo ufw allow 53
```

8.拒绝外部访问53端口

```
sudo ufw deny 53
```

9.允许某个IP地址访问本机所有端口

```
sudo ufw allow from 192.168.0.1
```