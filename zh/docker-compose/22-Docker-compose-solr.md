# 部署 Solr 并安装 IKAnalyzer



创建一个名为 /usr/local/docker/solr/ikanalyzer 目录

- `/usr/local/docker/solr`：用于存放 `docker-compose.yml` 配置文件
- `/usr/local/docker/solr/ikanalyzer`：用于存放 Dockerfile 镜像配置文件

## docker-compose.yml

```
version: '3.1'
services:
  solr:
    build: ikanalyzer
    restart: always
    container_name: solr
    ports:
      - 8983:8983
    volumes:
      - ./solrdata:/opt/solrdata
```

## Dockerfile

```
FROM solr
MAINTAINER Liezhenjie <zhenjie_lei@163.com>

# 创建 Core
WORKDIR /usr/local/docker/solr/server/solr
RUN mkdir ik_core
WORKDIR /usr/local/docker/solr/server/solr/ik_core
RUN echo 'name=ik_core' > core.properties
RUN mkdir data
RUN cp -r ../configsets/sample_techproducts_configs/conf/ .

# 安装中文分词
WORKDIR /usr/local/docker/solr/server/solr-webapp/webapp/WEB-INF/lib
ADD ik-analyzer-solr5-5.x.jar .
ADD solr-analyzer-ik-5.1.0.jar .
WORKDIR /usr/local/docker/solr/server/solr-webapp/webapp/WEB-INF
ADD ext.dic .
ADD stopword.dic .
ADD IKAnalyzer.cfg.xml .

# 增加分词配置
COPY managed-schema /usr/local/docker/solr/server/solr/ik_core/conf

WORKDIR /usr/local/docker/solr
```