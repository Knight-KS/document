# helm 部署ELK 操作实战

### 添加 Google incubator 仓库

```
helm repo add incubator http://storage.googleapis.com/kubernetes-charts-incubator
```

```
helm repo add incubator  http://mirror.azure.cn/kubernetes/charts-incubator/ 
helm repo add stable  http://mirror.azure.cn/kubernetes/charts/
helm repo add incubator  http://mirror.azure.cn/kubernetes/charts-incubator/
helm search jenkins
helm repo list

```



### 部署 Elasticsearch

```
kubectl create namespace efk
helm fetch incubator/elasticsearch
helm  install --name els1 --namespace=efk -f values.yaml incubator/elasticsearch
kubectl  run cirror-$RANDOM --rm -it --image=cirros -- /bin/sh
curl Elasticsearch:Port/_cat/nodes
```

```
helm del --purge els1
helm fetch incubator/elasticsearch
tar -zxvf elasticsearch-1.10.2.tgz
cd elasticsearch
## 修改PV 改成false
vim values.yaml

docker load -i elasticsearch-oss.tar
docker load -i fluentd-elasticsearch.tar
docker load -i kibana.tar

helm  install --name els1 --namespace=efk -f values.yaml .
kubectl get pod -n efk
kubectl get svc -n efk

# 测试 Elasticsearch
kubectl  run cirror-$RANDOM --rm -it --image=cirros -- /bin/sh
curl Elasticsearch:Port/_cat/nodes

```



### 部署 Fluentd

```
helm fetch stable/fluentd-elasticsearch
vim  values.yaml
# 更改其中 Elasticsearch 访问地址
helm install --name flu1 --namespace=efk -f values.yaml stable/fluentd-elasticsearch
```

```
helm fetch stable/fluentd-elasticsearch
tar -zxvf fluentd-elasticsearch-2.0.7.tgz
cd fluentd-elasticsearch
# 修改elasticsearch地址
vim values.yaml

helm install --name flu1 --namespace=efk -f values.yaml .
kubectl get pod -n efk
kubectl get svc -n efk

```



### 部署 kibana

```
helm fetch stable/kibana --version 0.14.8
helm install --name kib1 --namespace=efk -f values.yaml stable/kibana --version 0.14.8
```

```
helm fetch stable/kibana --version 0.14.8
tar -zxvf kibana-0.14.8.tgz
cd kibana

# 修改elasticsearch 地址
vim values.yaml
helm install --name kib1 --namespace=efk -f values.yaml .
kubectl get pod -n efk
kubectl get svc -n efk
# 修改为NodePort方式访问
kubectl edit svc kib1-kibana -n efk
```

