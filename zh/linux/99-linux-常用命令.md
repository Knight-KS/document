# linux 常用命令



更改root 密码：
```
sudo passwd root
```

linux root 登录 ssh 
```
LoginGraceTime 120
PermitRootLogin yes
```
重启ssh服务
```
service sshd restart  # 或者
/etc/initd.d/sshd restart
```
ubuntu server 18.04
```
systemctl restart sshd
```
ubunut aliyun  source
```
http://mirrors.aliyun.com/ubuntu/
```