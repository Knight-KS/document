# 防火墙和命令

```
# 查看防火墙状态
systemctl status firewalld
# 查看占用端口
netstat -ntlp
# 关闭防火墙 iptables
systemctl disable firewalld
# 打开一个访问端口
iptables -I INPUT -p tcp --dport 7500 -j ACCEPT
iptables -I INPUT -p tcp --dport 80 -j ACCEPT

iptables -A OUTPUT -p udp -o eth0 --dport 53 -j ACCEPT
iptables -A INPUT -p udp -i eth0 --sport 53 -j ACCEPT

iptables -L
# 查看所有规则
iptables -n -L

```

