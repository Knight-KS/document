# Docker CentOS 网段与公司网段冲突
在公司内网的一个虚拟服务器（CentOS 7）安装Docker后，发现网段172.18.0.1和172.17.0.1与公司内部网络存在冲突，当安装完成了Docker后，无法通过内网连接到服务器

查找了一些方案，应该是在Docker中的daemon中设置

https://docs.docker.com/v17.09/engine/userguide/networking/default_network/custom-docker0/

https://success.docker.com/article/how-do-i-configure-the-default-bridge-docker0-network-for-docker-engine-to-a-different-subnet

https://support.getjoan.com/hc/en-us/articles/115005951805-Change-the-Docker-default-subnet-IP-address


## 操作步骤：

### 停止服务，并查看服务是否已经停止
```
sudo systemctl stop docker.service
sudo systemctl status docker.service
```
#### 查看配置文件，原内容
```
sudo vim /etc/docker/daemon.json
```

#### 旧内容
```
{
  "registry-mirrors": ["https://vx05t6vp.mirror.aliyuncs.com"],
  "bip": "172.66.1.1/24"
}
```

#### 新内容
```
{
  "registry-mirrors": ["https://vx05t6vp.mirror.aliyuncs.com"],
  "bip": "192.66.1.1/24"
}
```
### 重新启动服务
```
sudo systemctl start docker.service
sudo systemctl status docker.service
```
重新查看IP地址，可以发现docker0的地址变成了192.66.1.1，但这里依然存在一个问题，另外一个虚拟网卡，还是保持一样的地址，需要继续寻找方案

### 查看新网络
```
docker info 
```