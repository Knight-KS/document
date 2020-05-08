# frp 自动启动配置

我下载的是 frp_0.21.0_linux_amd64.tar.gz
解压完了有如下七个文件

其中 frpc是客户端运行的文件 frps是服务端运行的文件。

### 服务端配置

`frps.ini`是服务端的配置文件，这是一个简化版本，只包含了必须的配置项。 其余的配置项在frps_full.ini中，可以根据自己的需要在frps.ini中添加。
在默认的frps.ini中只包含了端口一项，默认为7000
笔者使用的frps配置如下

```
[common]
bind_port = 7000
token = sDesQJk@KlO #客户端连接服务器端的口令
```




配置完成后直接运行
`./frps -c ./frps.ini`



服务端就配置好了

### 客户端配置

和服务端类似，frpc.ini是客户端的配置文件，所有的配置项在frpc_full.ini中能看到。
笔者用的frpc配置如下

```
[common]
server_addr = xxx.xxx.xxx.xxx # 服务端ip
server_port =7000 #服务端端口
token = sDesQJk@KlO #连接服务端口令
[ssh]
type = tcp
local_ip = 127.0.0.1
local_port = 22 #要穿透的本地端口
remote_port =6661 # 暴露到外网的端口
```





配置完成后直接运行
`./frpc -c ./frpc.ini`

已经连接上了，服务端提示如下。

名为ssh的proxy成功连接。现在我们的配置就成功了。

测试
通过 ssh 访问内网机器，假设用户名为 test：
`ssh -oPort=6661 test@x.x.x.x`
这里ip为服务端ip，端口为我们暴露到外网的端口即 6661

### 配置自动启动

笔者使用systemctl来控制启动，以服务端为例。
首先
`sudo vim /lib/systemd/system/frps.service`
在`frps.service`里写入以下内容

```
[Unit]
Description=fraps service
After=network.target network-online.target syslog.target
Wants=network.target network-online.target

[Service]
Type=simple

启动服务的命令（此处写你的frps的实际安装目录）

ExecStart=/your/path/frps -c /your/path/frps.ini

[Install]
WantedBy=multi-user.target
```





然后启动 frps
`sudo systemctl start frps`
再打开自启动
`sudo systemctl enable frps`
同时

重启 `sudo systemctl restart frps`
停止 `sudo systemctl stop frps`
查看应用日志 `sudo systemctl status frps`
客户端自启动配置类似。