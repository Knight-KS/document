# nodejs 国内镜像加速



### 1.临时使用



```cpp
npm --registry https://registry.npm.taobao.org install express
```

### 2.持久使用



```cpp
npm config set registry https://registry.npm.taobao.org
```

- 配置后可通过下面方式来验证是否成功
   `npm config get registry`
- 或
   `npm info express`

### 3.通过cnpm使用



```cpp
npm install -g cnpm --registry=https://registry.npm.taobao.org
```

- 使用
   `cnpm install express`



作者：云爬虫技术研究笔记
链接：https://www.jianshu.com/p/45495cf30993
来源：简书
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。