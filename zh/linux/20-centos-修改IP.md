# centos7 修改IP

### 进入进入IP地址配置文件夹

```
 cd /etc/sysconfig/network-scripts/
```

### 编辑centos的网卡配置文件

```
vi ifcfg-ens33
```

```
TYPE="Ethernet"
BOOTPROTO="none"
DEFROUTE="yes"
IPV4_FAILURE_FATAL="no"
IPV6INIT="yes"
IPV6_AUTOCONF="yes"
IPV6_DEFROUTE="yes"
IPV6_FAILURE_FATAL="no"
IPV6_ADDR_GEN_MODE="stable-privacy"
NAME="ens192"
UUID="404a88b6-1d94-4a7f-84ee-a07d11f87a72"
DEVICE="ens192"
ONBOOT="yes"
IPADDR="172.23.34.210"
PREFIX="24"
GATEWAY="172.23.34.1"
DNS1="172.17.0.13"
DNS2="172.17.0.14"
IPV6_PEERDNS="yes"
IPV6_PEERROUTES="yes"
IPV6_PRIVACY="no"

```

### 重启网卡

```
service network restart
```

