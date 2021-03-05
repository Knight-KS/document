# harbor

```
wget https://github.com/goharbor/harbor/releases/download/v2.2.0/harbor-offline-installer-v2.2.0.tgz

scp -r -P 2580 harbor-offline-installer-v2.2.0.tgz hzmt@192.168.10.181:/home/hzmt/


tar -zxvf harbor-offline-installer-v2.2.0.tgz
cp -r harbor.yml.tmpl harbor.yml
# 修改配置文件 hostname: 192.168.10.181 注释掉https 
vim harbor.yml
# 安装
./install.sh
# 或者 (开启镜像扫描功能)
/install.sh --with-clair # (开启镜像扫描功能)

```

```
用户名： admin
密码： Harbor12345
```

### 修改daemon.json

```
vim /etc/docker/daemon.json


{
"exec-opts": ["native.cgroupdriver=systemd"],
"log-driver": "json-file",
"log-opts": {"max-size": "100m"  },
"registry-mirrors": ["https://vx05t6vp.mirror.aliyuncs.com"],
"insecure-registries" : ["192.168.10.181"] ## 要添加的列
}

# docker 重启
systemctl restart docker

```





```
# 注册
sudo docker login -u admin -p Harbor12345 192.168.10.181

```





```
推送命令
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Docker 推送命令
在项目中标记镜像：
docker tag SOURCE_IMAGE[:TAG] 192.168.10.181/ods/REPOSITORY[:TAG]
docker tag SOURCE_IMAGE[:TAG] 192.168.10.181/ods/REPOSITORY[:TAG]
推送镜像到当前项目：
docker push 192.168.10.181/ods/REPOSITORY[:TAG]
docker push 192.168.10.181/ods/REPOSITORY[:TAG]
Helm 推送命令
在项目中标记 chart
helm chart save CHART_PATH 192.168.10.181/ods/REPOSITORY[:TAG]
helm chart save CHART_PATH 192.168.10.181/ods/REPOSITORY[:TAG]
推送 chart 到当前项目
helm chart push 192.168.10.181/ods/REPOSITORY[:TAG]
helm chart push 192.168.10.181/ods/REPOSITORY[:TAG]
CNAB 推送命令
推送 CNAB 到当前项目
cnab-to-oci push CNAB_PATH --target 192.168.10.181/ods/REPOSITORY[:TAG] --auto-update-bundle
cnab-to-oci push CNAB_PATH --target 192.168.10.181/ods/REPOSITORY[:TAG] --auto-update-bundle

```



