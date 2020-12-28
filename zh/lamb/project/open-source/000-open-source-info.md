# 优秀的开源项目

## 101.安装宝塔面板 （经典方式）

- 项目说明：优秀的开源免费服务器管理面板，适合小白
- 架构：Docker 通用
- 开源地址：https://github.com/aaPanel/aaPanel
- 相关文档：https://www.bt.cn/

## 安装宝塔面板-docker版102.安装宝塔面板(Docker版)

- 项目说明：优秀的开源免费服务器管理面板，适合小白
- 架构：Docker 通用
- 开源地址：https://github.com/aaPanel/aaPanel
- 相关文档：https://github.com/pch18-docker/baota
- 博客介绍：https://baiyue.one/archives/469.html
- 源码路径：`~/wwwroot`

### 手动部署：

```text
docker run -tid --name baota --net=host --privileged=true --restart always -v ~/wwwroot:/www/wwwroot pch18/baota
```

### 通过bridge模式运行宝塔重新

**如果特殊情况不能使用主机网络模式（macos和Windows不支持主机），请使用以下命令重新以bridge网络模式运行**

```
docker run -tid --name baota -p 80:80 -p 443:443 -p 8888:8888 -p 888:888 --privileged=true --shm-size=1g --restart always -v ~/wwwroot:/www/wwwroot pch18/baota
```



### 其它命令：

```text
docker rm -f baota		#删除宝塔
docker stop baota		#停止
docker exec -it baota bash 		#进入宝塔，centos系统
```

## 103.BBR五合一安装脚本

## 104.服务器推荐购买指南

## 105.海鸥Docker容器镜像管理工具（适合新手可视化操作）

—————————————云盘目录类——————————————

## 201.安装Index of Onedrive

## 202.安装Nextcloud

## 203.安装人人影视

## 204.安装百度云盘linux版

## 205.安装FileBrowser

## 206.安装Kodexplore

—————————————博客类程序——————————————

## 301.安装Wordpress

## 302.安装Tyecho

## 303.java类博客Halo

## 304.java Jpress



—————————————55R类——————————————

## 401.安装SSPanel(商用)

项目来源：Anankke/SSPanel-Uim [https://github.com/Anankke/SSPanel-Uim](https://baiyue.one/部落跳转.html?url=https://github.com/Anankke/SSPanel-Uim)

特点：

- 镜像模式类似wordpress、typoehco\nextcloud等，抛弃臃肿的LNMP，镜像极简。
- 更轻量、更快、也更安全。
- 完整镜像体积仅仅275MB，源码可挂载本地

## 402.安装v2ray（自用）

## 403.安装ServerStatus

## 404.安装Netdata

—————————————下载类程序——————————————

## 501.安装airng+filebrowser

## 502.安装CloudTorret

—————————————发卡类程序——————————————

## 601.安装ZFAKA

## 602.安装云尚发卡

## 603.安装风铃发卡

—————————————杂项——————————————

## 701.安装临时邮箱

## 702.安装Meedu付费视频