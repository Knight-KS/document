# pip/anaconda修改镜像源，加快python模块安装速度

 修改镜像源的原因是pip和conda默认国外镜像源，所以每次安装模块pip install ×××或者 conda install ×××的时候非常慢。所以，切换到国内的镜像源会显著加快模块安装速度。

pip和conda修改镜像源的方式有所不同，网上有大量教程，我把这些教程总结到一起。

pip修改镜像源
国内源：
新版ubuntu要求使用https源，要注意。
清华：`https://pypi.tuna.tsinghua.edu.cn/simple`
阿里云：`http://mirrors.aliyun.com/pypi/simple/`
中国科技大学 `https://pypi.mirrors.ustc.edu.cn/simple/`
华中科技大学：`http://pypi.hustunique.com/`
山东理工大学：`http://pypi.sdutlinux.org/`
豆瓣：`http://pypi.douban.com/simple/`
      清华的镜像源是最常用的，我试过几个镜像源之后，发现中科大的比较快质量不错。

## 1.对于Linux系统：

```
mkdir ~/.pip
cd ~/.pip
vi pip.conf
```


按i进入编辑模式：

```
[global]
index-url = https://pypi.mirrors.ustc.edu.cn/simple/
```


按ESC,再输入wq保存即可。

## 2.对于windows系统：

```
cd C:\Users\(你的用户名)
mkdir pip
cd pip
cd.>pip.ini
```





然后打开`C:\Users(用户名)\pip\pip.ini`，在里面黏贴和linux系统一样的内容：

```
[global]
index-url = https://pypi.mirrors.ustc.edu.cn/simple/
```






用pip安装时，发现镜像源链接发生改变，就成功了~


#Conda修改镜像源
Linux和Windows对于conda修改镜像源的方法一样：

```
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/free/
conda config --set show_channel_urls yes
```





查看是否添加上了channel可以使用：

```
 vim ~/.condarc
```


看到这个就对了：

然后，安装一个模块试试：

conda install 随便一个模块试试，看到链接改成清华的，那就对了~
