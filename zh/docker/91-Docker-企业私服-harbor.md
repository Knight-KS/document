# Docker-企业私服-harbor

### 下载harbor 运行包`harbor-offline-installer-v1.8.0.tgz`

### 修改文件`harbor.yml`

```
vim harbor.yml
## 修改 hostname 
# The IP address or hostname to access admin UI and registry service.
# DO NOT use localhost or 127.0.0.1, because Harbor needs to be accessed by external clients.
hostname: 192.168.81.136
```

### 执行`./install.sh`

### 修改私服地址 `vim /etc/docker/daemon.json`

```
{
 "registry-mirrors": ["https://vx05t6vp.mirror.aliyuncs.com"],
  "insecure-registries": ["192.168.81.136"],
  "bip": "192.66.1.1/24"
}
```

### 重启 docker

```
systemctl restart docker
```

### 启动harbor

```
cd /usr/local/docker/harbor/harbor
docker-compose start
```



### 上传私服命令

```
## 下载nginx
docker pull nginx
## 打包
docker tag nginx:latest 192.168.81.136/myshop/nginx:latest
## 登录私服
docker login 192.168.81.136 -u admin -p Harbor12345
## 推送nginx 到私服
docker push 192.168.81.136/myshop/nginx:latest
```





