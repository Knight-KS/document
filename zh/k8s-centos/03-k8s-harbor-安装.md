# harbor安装

### 要求

- Python应该是应该是2.7或更高版本或更高版本

- Docker引擎应为引擎应为1.10或更高版本或更高版本

- Docker Compose需要为需要为1.6.0或更高版本或更高版本

### Harbor 安装：

#### harbor 官方地址

```
https://github.com/vmware/harbor/releases
```

#### 解压软件包

```
tar -zxvf harbor-offline-installer-v1.8.0.tgz
```

#### 配置harbor.cfg

```
hostname：目标的主机名或者完全限定域名：目标的主机名或者完全限定域名
ui_url_protocol：：http或或https。默认为。默认为http
db_password：用于：用于db_auth的的MySQL数据库的根密码。更改此密码进行任何生产用途数据库的根密码。更改此密码进行任何生产用途
max_job_workers：（默认值为：（默认值为3）作业服务中的复制工作人员的最大数量。对于每个映像复制作业，）作业服务中的复制工作人员的最大数量。对于每个映像复制作业，工作人员将存储库的所有标签同步到远程目标。增加此数字允许系统中更多的并发复制作业。但是，由于每个工工作人员将存储库的所有标签同步到远程目标。增加此数字允许系统中更多的并发复制作业。但是，由于每个工作人员都会消耗一定数量的网络作人员都会消耗一定数量的网络/ CPU / IO资源，请根据主机的硬件资源，仔细选择该属性的值资源，请根据主机的硬件资源，仔细选择该属性的值
customize_crt：（：（on或或off。默认为。默认为on）当此属性打开时，）当此属性打开时，prepare脚本将为注册表的令牌的生成脚本将为注册表的令牌的生成/验证创验证创建私钥和根证书建私钥和根证书
ssl_cert：：SSL证书的路径，仅当协议设置为证书的路径，仅当协议设置为https时才应用时才应用
ssl_cert_key：：SSL密钥的路径，仅当协议设置为密钥的路径，仅当协议设置为https时才应用时才应用
secretkey_path：用于在复制策略中加密或解密远程注册表的密码的密钥路径：用于在复制策略中加密或解密远程注册表的密码的密钥路径
```

#### 创建 https 证书以及配置相关目录权限证书以及配置相关目录权

```
openssl genrsa -des3 -out server.key 2048
openssl req -new -key server.key -out server.csr
cp server.key server.key.org
openssl rsa -in server.key.org -out server.key
openssl x509 -req -days 365 -in server.csr -signkey server.key -out server.crt
mkdir  /data/cert
chmod -R 777 /data/cert
```

### 运行 安装

```
##到新创建的目录
cd !$

##回到原目录
cd -

## 执行安装
./install.sh
```

####  

#### 指定镜像仓库地址

```
vim /etc/docker/daemon.json
{"insecure-registries": ["https://hub.a.com"]}
```



 ### 追加域名设置

```
echo "172.23.34.252  hub.a.com" >> /etc/hosts
```

### harbor 密码

```
Harbor12345
```

#### 测试登录

```
docker login https://hub.a.com
```

```
docker  pull  nginx
docker tag nginx    https://hub.a.com/nginx:latest
docker login https://hub.a.com
docker push hub.a.com/library/nginx:latest
```



### 测试k8s

```
kubectl run nginx-deployment --image=hub.a.com/library/nginx:latest --port=80  --replicas=2
kubectl get deployment
kubectl get rs
kubectl get pod
kubectl get pod -o wide
docker ps | grep nginx
curl 10.244.2.2
## 扩容
kubectl scale --replicas=3 deployment/nginx-deployment

kubectl delete pod nginx-deployment-7c5c8b7549-s89rb

## 负载均衡
kubectl expose --help
kubectl expose deployment nginx-deployment --port=3001 --target-port=80
kubectl get svc
## 查看IP
ipvsadm -Ln | grep 10.102.82.211
## 删除
kubectl delete svc nginx-deployment

## 外网访问
kubectl edit svc nginx-deployment
ClusterIP 改成 NodePort

## 查看暴露端口访问
netstat -anpt | grep :30003



```

