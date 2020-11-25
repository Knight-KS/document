# 实战tensorflow

```
version: '3.1'
services:
  tensorflow:
    image: jupyter/tensorflow-notebook
    restart: always
    container_name: tensorflow-notebook
    ports:
      - 8888:8888
    volumes:
      - ./data/jovyan:/home/jovyan
      
```

```
# 获取Token：
docker exec -it tensorflow-notebook jupyter notebook list
docker exec -it tensorflow-notebook /bin/bash
# 重新build
docker build -f /path/to/a/Dockerfile .
## 查看pip 安装文件
pip list

docker run -it --rm custom_python:1.0.0 /bin/bash
```

