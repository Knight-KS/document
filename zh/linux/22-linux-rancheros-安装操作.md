# rancher os

管理端IP：192.168.20.160

1、管理端生成ssh-key
ssh-keygen -t rsa

2、将ssh-key写入cloud-config.yml
\#cloud-config

```
rancher:
    network:
        interfaces:
            eth0:
                address: 192.168.20.170/24
                gateway: 192.168.20.254
                mtu: 1500
                dhcp: false

ssh_authorized_keys:
    - ssh-rsa AAAAB3NzaC1yc2EAAAABIwAAAQEA0rUXXb3mIX1Zt0U6GMGchehCp7nIo75jENxYWgg0hQCQ9+BMOmN1Dtl/UsewNRRO3X4OajJ0M4fU0B8bWXsG1nv9cSESzoozh6AXo0ZxbZtp7Kg3aD41ncF1IW4pa3kAVEmgjxFc3VvYLhnF27zWxEmbqqulbBD7n6ARSJijbW/v0sNVncd14K/B5eYdIZIbzdAWpvbYI5Eug42G+CJlZo4q/Qa9XBeGDQAU+aHIZj+fkj4U8t5DFAI6ApUa5h4P5/ddBTNDj7f/iyXTOgJQrtnITSdd565+11S6ERZSWt88C7/OfspDZZx9gFy2lIxI46TTdMkfnlqbEpQbC1KzFw== rsa 2048-041018
```

4、进入rancherOS，拷贝管理端cloud-config.yml到本地，执行
sudo scp root@192.168.20.160:/root/cloud-config.yml /root

5、rancheros安装到本地磁盘
sudo ros install -c cloud-config.yml -d /dev/sda
安装成功，自动重启

6、在管理终端登陆rancheros
[root@k8sMaster ~]# ssh -i /root/.ssh/id_rsa rancher@192.168.20.170