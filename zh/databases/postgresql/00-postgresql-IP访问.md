# IP访问 postgresql

### 修改pg_hba.conf
pg_hba.conf和postgresql.conf的存放目录都在(9.5版本)/etc/postgresql/9.5/main

```
host  all    all    192.168.1.0/24    trust
```

表示允许网段192.168.1.0上的所有主机使用所有合法的数据库用户名访问数据库,
其中，数字24是子网掩码，表示允许192.168.1.0–192.168.1.255的计算机访问



### 修改postgresql.conf

修改listen_addresses=’localhost’, 并放开注释（默认监听localhost）

192.168.1.111 为postgresql本机内网地址

```
listen_addresses='192.168.1.111' 
```





### 重启postgresql
```
sudo /etc/init.d/postgresql restart
```



