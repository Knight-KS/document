# pip 安装问题

### 更改国内源

```
pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple
```

pip国内的一些镜像

  阿里云 https://mirrors.aliyun.com/pypi/simple/
  中国科技大学 https://pypi.mirrors.ustc.edu.cn/simple/
  豆瓣(douban) http://pypi.douban.com/simple/
  清华大学 https://pypi.tuna.tsinghua.edu.cn/simple/
  中国科学技术大学 http://pypi.mirrors.ustc.edu.cn/simple/

修改源方法：

临时使用：
可以在使用pip的时候在后面加上-i参数，指定pip源

```
pip install scrapy -i https://pypi.tuna.tsinghua.edu.cn/simple
```



永久修改：
linux:
修改 ~/.pip/pip.conf (没有就创建一个)， 内容如下：

```
[global]
index-url = https://pypi.tuna.tsinghua.edu.cn/simple
```

 建议使用清华源,更新快.

**pip安装出现Script file 'D:\ProgramData\Anaconda3\Scripts\pip-script.py' is not present.**

执行一行命令即可：

```
easy_install pip
```

然后就可以正常安装了。

前提是python已经配置了环境变量。