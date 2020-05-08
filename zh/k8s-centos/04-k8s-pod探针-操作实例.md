# pod 探针操作实例

### nginx.yml

```
apiVersion: v1
kind: Pod
metadata:
  name: myapp-pod
  labels:
    app: myapp
    version: v1
spec:
  containers:
    - name: app
      image: hub.a.com/library/nginx:latest
    - name: test
      image: hub.a.com/library/nginx:latest

```



```
##创建
kubectl apply -f nginx.yml
##查看错误
kubectl describe pod myapp-pod
##单个容器详细错误 -c 指定容器
kubectl log myapp-pod -c test
## 删除pod
kubectl delete pod myapp-pod

## pod 详细信息
kubectl get pod -o wide


```

### init 模板

```
apiVersion: v1
kind: Pod
metadata:  
  name: myapp-pod  
  labels:    
    app: myapp
spec:  
  containers:  
  - name: myapp-container    
    image: busybox    
    command: ['sh','-c','echo The app is running! && sleep 3600']  
  initContainers:  
  - name: init-myservice    
    image: busybox    
    command: ['sh','-c','until nslookup myservice; do echo waiting for myservice; sleep 2;done;']  
  - name: init-mydb    
    image: busybox    
    command: ['sh','-c','until nslookup mydb; do echo waiting for mydb; sleep 2; done;']
```

```
kubectl apply -f init-pod.yaml
kubectl get pod
kubectl get pod -o wide
kubectl describe pod  myapp-pod

```



```
kind: Service
apiVersion: v1
metadata:  
  name: myservice
spec:  
  ports:    
    - protocol: TCP      
      port: 80      
      targetPort: 9376
---
kind: Service
apiVersion: v1
metadata:  
  name: mydb
spec:  
  ports:    
    - protocol: TCP      
      port: 80      
      targetPort: 9377
```



```
kubectl apply -f myservice.yaml
kubectl get pod
kubectl apply -f mydb.yaml
kubectl get service
kubectl get pod -n kube-system


```

### 检测探针 - 就绪检测

#### readinessProbe-httpget

```
apiVersion: v1
kind: Pod
metadata:  
  name: readiness-httpget-pod  
  namespace: default
spec:  
  containers:  
  - name: readiness-httpget-container    
    image: hub.a.com/library/nginx:latest   
    imagePullPolicy: IfNotPresent    
    readinessProbe:      
      httpGet:        
        port: 80        
        path: /index1.html      
      initialDelaySeconds: 1      
      periodSeconds: 3
```

```
kubectl apply -f readiness.yaml
kubectl decribe pod readiness-httpget-pod
## pod 加 -c 指定单个容器名  kubectl exec readiness-httpget-pod -c aa -it -- /bin/sh
kubectl exec readiness-httpget-pod -it -- /bin/sh

cd /usr/share/nginx/html
echo "123" >> index1.html


kubectl get pod


```



### 检测探针 - 存活检测

#### livenessProbe-exec

```
apiVersion: v1
kind: Pod
metadata:  
  name: liveness-exec-pod  
  namespace: default
spec:  
  containers:  
  - name: liveness-exec-container    
    image: busybox    
    imagePullPolicy: IfNotPresent    
    command: ["/bin/sh","-c","touch /tmp/live ; sleep 60; rm -rf /tmp/live; sleep3600"]    
    livenessProbe:      
      exec:        
        command: ["test","-e","/tmp/live"]      
      initialDelaySeconds: 1      
      periodSeconds: 3
```

```
kubectl apply -f liveness.yaml
kubectl get pod -w

```



#### livenessProbe-httpget

```
apiVersion: v1
kind: Pod
metadata:  
  name: liveness-httpget-pod  
  namespace: default
spec:
  containers:  
  - name: liveness-httpget-container    
    image: hub.a.com/library/nginx:latest    
    imagePullPolicy: IfNotPresent    
    ports:    
    - name: http      
      containerPort: 80    
    livenessProbe:      
      httpGet:        
        port: http        
        path: /index.html      
      initialDelaySeconds: 1      
      periodSeconds: 3      
      timeoutSeconds: 10
```

```
kubectl apply -f liveness-http.yaml
kubectl exec liveness-httpget-pod -it -- /bin/sh

rm -rf index.html
kubectl get pod -w


```



#### livenessProbe-tcp

```
apiVersion: v1
kind: Pod
metadata:  
  name: probe-tcp
spec:  
  containers:  
  - name: nginx    
    image: hub.a.com/library/nginx:latest    
    livenessProbe:      
      initialDelaySeconds: 5      
      timeoutSeconds: 1      
      tcpSocket:        
        port: 80
```



### 启动、退出动作

```
apiVersion: v1
kind: Pod
metadata:  
  name: lifecycle-demo
spec:  
  containers:  
  - name: lifecycle-demo-container    
    image: hub.a.com/library/nginx:latest    
    lifecycle:      
      postStart:        
        exec:          
          command: ["/bin/sh", "-c", "echo Hello from the postStart handler >/usr/share/message"]      
      preStop:        
        exec:
          command: ["/bin/sh", "-c", "echo Hello from the poststop handler >/usr/share/message"]
```

