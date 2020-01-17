# Mac brew安装node 及 npm用法

## 使用brew安装node，首先先对brew进行检查

```
brew update
brew doctor
```


## 如果报这个错：

```
Warning: Homebrew's sbin was not found in your PATH but you haveinstalled

formulae that put executables in /usr/local/sbin.

Consider setting the PATH for example like so

  echo 'exportPATH="/usr/local/sbin:$PATH"' >> ~/.bash_profile 
```




## 解决方法：

```
export PATH="/usr/local/bin:$PATH"
source ~/.bash_profile
```



## 安装

- 第一次安装

```
brew link node
brew uninstall node
brew install node
```




- 如果你安装的是旧版本的 npm，可以很容易得通过 npm 命令来升级，命令如下：

```
$ sudo npm install npm -g
/usr/local/bin/npm -> /usr/local/lib/node_modules/npm/bin/npm-cli.js
npm@2.14.2 /usr/local/lib/node_modules/npm
```

- 如果是 Window 系统使用以下命令即可：

  ```
  npm install npm -g
  ```

- *使用淘宝镜像的命令：*

  ```
  npm install -g cnpm --registry=https://registry.npm.taobao.org
  ```

  

  



在使用nodejs时，首先要设置一个工作文件夹，并对其初始化和添加各种dependencies。 

创建文件夹后，首先：

```
npm init

//this utility will walk you through createing a package.json file.
//it covers the most common items, and tries to guess sane defaults.
## 然后安装各种依赖dependecies，它们会被安装在node_module包里。下面举几个例子。

npm install web3
npm install web3-eth
npm install ethereumjs-tx
npm install fast-csv
```




语法为：

```
npm install <module>   //安装
npm uninstall <module>   //卸载
npm search <module>   //搜索
npm update <module>   //更新
```

## 全局安装与本地安装

npm 的包安装分为本地安装（local）、全局安装（global）两种，从敲的命令行来看，差别只是有没有-g而已，比如

```
npm install express          # 本地安装
npm install express -g   # 全局安装
```

如果出现以下错误：

```
npm err! Error: connect ECONNREFUSED 127.0.0.1:8087 
```

解决办法为：

```
$ npm config set proxy null
```





这种安装是本地安装，安装在命令行所在的文件夹里。nodejs使用这些依赖时，要用var xx = requires('xxx')去使用。

还可以全局安装：npm install <module> -g，这种安装方式安装在用户目录下，使用时候不能用require方式。

node install -g 才会把module安装到node全局 不加-g默认安装到当前工程 别的工程不可见。

 

注:

fs 是node自带的功能，所以不需要npm install fs

npm 是node.js自带的功能



参考文章： 

npm init node 通过指令创建一个package.json文件及npm安装package.json
https://blog.csdn.net/qq_35441998/article/details/55270816

【链接】nodejs npm install全局安装和本地安装的区别

https://zhidao.baidu.com/question/1382950329488558500.html

【链接】NPM使用介绍

http://www.runoob.com/nodejs/nodejs-npm.html
