# docker-compse-常用工具配置

orcale docker-compse.yml
```
version: '3.1'
services:
  oracle:
    # sid: xe
    # username: system
    # password: oracle
    image: sath89/oracle-xe-11g
    restart: always   #如果docker容器由于一些问题挂掉的化，docker-composer会自动把容器给启动起来
    container_name: oracle  #启动之后容器的名称
    volumes:
      - oracel-data::/u01/app/oracle
    ports:
      - 1521:1521
volumes:
  oracel-data:
```