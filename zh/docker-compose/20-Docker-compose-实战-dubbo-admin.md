## Docker-compose-实战-dubbo-admin

## docker-compse.yml

```
version: '3.1'
services:
  mysql:
    restart: always
    image: cao2068959/dubbo-admin:2.7
    container_name: dubbo-admin-2-7
    ports:
      - 7999:8080
    volumes:
      - ./conf/myapplication.properties:/dubbo-admin/myapplication.properties
```
## myapplication.properties
```
admin.registry.address=zookeeper://192.168.10.10:2181
admin.config-center=zookeeper://192.168.10.10:2182
admin.metadata-report.address=zookeeper://192.168.10.10:2183
 
 
 
admin.registry.group=dubbo
admin.apollo.token=e16e5cd903fd0c97a116c873b448544b9d086de9
admin.apollo.appId=test
admin.apollo.env=dev
admin.apollo.cluster=default
admin.apollo.namespace=dubbo
```