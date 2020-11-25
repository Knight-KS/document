# 实战Python环境

```
version: '3.1'
services:
  python:
    build: v1.0.0
    image: custom_python:1.0.0
    restart: always
    container_name: python
    command: /root/.pyenv/shims/jupyter notebook --no-browser --ip 0.0.0.0 --allow-root
    # 查看token
    # docker exec -it python /root/.pyenv/shims/jupyter notebook list
    # new password 123456
    # docker exec -it python /bin/bash
    ports:
      - 8777:8888
    ##  - 2222:2222
    ##volumes:
    ##  - ./data/app:/app
```

Dockerfile

````
FROM centos:7

RUN rm /bin/sh && ln -s /bin/bash /bin/sh
# centos设置环境变量会报/bin/sh: warning: setlocale: LC_ALL: cannot change locale (en_US.UTF-8)
ENV LANG zh_CN.UTF-8
ENV LC_ALL zh_CN.UTF-8
# 所以需要在设置环境变量之后使用localedef创建一个字符集
RUN localedef -c -f UTF-8 -i zh_CN zh_CN.utf8

RUN yum update -y && yum -y install wget curl unzip zip gcc make lsof zlib-devel bzip2-devel openssl-devel ncurses-devel sqlite-devel readline-devel tk-devel gdbm-devel libffi-devel libpcap-devel xz-devel git make libaio libnsl

RUN mkdir ~/.pyenv
RUN git clone git://github.com/yyuu/pyenv.git ~/.pyenv
RUN echo 'export PYENV_ROOT="$HOME/.pyenv"' >> ~/.bashrc
RUN echo 'export PATH="$PYENV_ROOT/bin:$PATH"' >> ~/.bashrc
RUN echo 'eval "$(pyenv init -)"' >> ~/.bashrc
RUN source ~/.bashrc

RUN /root/.pyenv/bin/pyenv install --list
RUN /root/.pyenv/bin/pyenv install 3.7.9 -v
RUN /root/.pyenv/bin/pyenv global 3.7.9

RUN /root/.pyenv/shims/pip install --upgrade pip

RUN /root/.pyenv/shims/pip install jupyter

#设置时区
RUN echo 'Asia/Shanghai' >/etc/timezone

## CMD ["jupyter","notebook --allow-root"]

EXPOSE 8888
````

### jupyter

```
# docker 启动 jupyter notebook
jupyter notebook --no-browser --ip 0.0.0.0 --port=7000 --allow-root

juypter notebook    # 默认端口启动，8888
jupyter notebook --port <port number>   # 指定端口启动
jupyter notebook --no-browser   # 启动服务器但不在浏览器中打开


# 配置目录
/root/.jupyter/jupyter_notebook_config.py

```



```
# docker cp：从容器中复制文件到本地
docker cp koko:/tmp/test.db ./data/test.db
# 以上面的代码为例，把容器路径和本地路径颠倒即可.
docker cp ./data/test.db koko:/tmp/test.db
# 重新build
docker build -t custom_python:1.0.0 v1.0.0/
```

