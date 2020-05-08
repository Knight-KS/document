# nfs 安装使用

## 安装 NFS 服务端

由于 NFS 是一套分布式文件系统，我们再创建一台独立的虚拟机作为我们 NFS 服务端，配置如下

| **主机名**         | **IP**         | **系统**            | **CPU/内存** | **磁盘** |
| ------------------ | -------------- | ------------------- | ------------ | -------- |
| kubernetes-volumes | 192.168.81.140 | Ubuntu Server 18.04 | 2核2G        | 20G      |


- 创建一个目录作为共享文件目录

```
mkdir -p /usr/local/kubernetes/volumes
```

- 给目录增加读写权限

```
chmod a+rw /usr/local/kubernetes/volumes
```

## 安装 NFS 服务端

```
apt-get update
apt-get install -y nfs-kernel-server
```

- 配置 NFS 服务目录，打开文件 `vi /etc/exports`，在尾部新增一行，内容如下
  -- `/usr/local/kubernetes/volumes`：作为服务目录向客户端开放
  -- `*`：表示任何 IP 都可以访问
  -- `rw`：读写权限
  -- `sync`：同步权限
  -- `no_subtree_check`：表示如果输出目录是一个子目录，NFS 服务器不检查其父目录的权限

```
/usr/local/kubernetes/volumes *(rw,sync,no_subtree_check)
```

- 重启服务，使配置生效

```
/etc/init.d/nfs-kernel-server restart
```

## 安装 NFS 客户端

安装客户端的目的是验证是否可以上传文件到服务端，安装命令如下

```
apt-get install -y nfs-common
```

- 创建 NFS 客户端挂载目录

```
mkdir -p /usr/local/kubernetes/volumes-mount
```

- 将 NFS 服务器的 `/usr/local/kubernetes/volumes` 目录挂载到 NFS 客户端的 `/usr/local/kubernetes/volumes-mount` 目录

```
mount 192.168.81.140:/usr/local/kubernetes/volumes /usr/local/kubernetes/volumes-mount
```

- 使用 `df` 命令查看挂载信息

```
df

# 输出如下
Filesystem                                    1K-blocks    Used Available Use% Mounted on
udev                                             978156       0    978156   0% /dev
tmpfs                                            201732    1252    200480   1% /run
/dev/mapper/ubuntu--vg-ubuntu--lv              19481088 5490916  12971848  30% /
tmpfs                                           1008648       0   1008648   0% /dev/shm
tmpfs                                              5120       0      5120   0% /run/lock
tmpfs                                           1008648       0   1008648   0% /sys/fs/cgroup
/dev/loop0                                        90624   90624         0 100% /snap/core/6964
/dev/loop1                                        93184   93184         0 100% /snap/core/6350
/dev/sda2                                        999320  214252    716256  24% /boot
tmpfs                                            201728       0    201728   0% /run/user/0
# 有此输出表示挂载成功
193.192.168.81.140:/usr/local/kubernetes/volumes  19481200 5490944  12972032  30% /usr/local/kubernetes/volumes-mount
```

## 验证 NFS 服务

- 测试文件上传

```
ip addr > /usr/local/kubernetes/volumes-mount/test.txt
```

- 查看 `/usr/local/kubernetes/volumes` 目录下是否有 `test.txt` 文件，有则表示成功

## 取消 NFS 客户端挂载

> 注意： 不要直接在挂载目录下执行，否则会报错

```
umount /usr/local/kubernetes/volumes-mount
```

### 问题

```
umount.nfs4: /usr/local/nfs/volumes-mount: device is busy
```

### 解决

```
fuser -m -v /usr/local/nfs/volumes-mount

root@env-master:/usr/local/nfs# fuser -m -v /usr/local/nfs/volumes-mount
                     USER        PID ACCESS COMMAND
/usr/local/nfs/volumes-mount:
                     root     kernel mount /usr/local/nfs/volumes-mount
                     root       2078 ..c.. bash
root@env-master:/usr/local/nfs# kill -9 2078


```

### 其他

```
#法一

fuser -m -v /data_nas/
USER PID ACCESS COMMAND
as: root kernel mount /mnt
root 7088 ..c.. bash
admin 7145 ..c.. bash

#法二（亲测有效）

umount -l /data_nas

#法三

fuser -km /data_nas
```

```
mount 192.168.31.251:/data6T/volumes/env-master/ /data/env-master/
```

```
chmod a+rwx /home/user/ 

```



**2. 配置**
  假设网络文件系统为/work/nfs_root/new_fs，
   sudo vi /etc/exports; 添加如下内容
   /work/nfs_root *(rw,sync,no_root_squash)

   /work/nfs_root/new_fs *(rw,sync,no_root_squash)

**3. 重启**

  sudo /etc/init.d/portmap restart

​    //ubuntu16.04之后的版本中是：sudo /etc/init.d/rpcbind restart

  sudo /etc/init.d/nfs-kernel-server restart

  注意：

​    如果/etc/exports中没有内容，或者里边的路径实际并不存在，则

   sudo /etc/init.d/nfs-kernel-server restart会失败

**4. 测试**
  此时可以运行以下命令来显示一下共享出来的目录：
    $showmount -e
 或者可以使用以下命令把它挂载在本地磁盘上，例如将/work/nfs_root挂载到/tmp下：
   $sudo mount -t nfs localhost:/work/nfs_root /tmp
 可以运行df命令查看是否挂载成功。查看后可以使用以下命令卸载：

​     $ sudo umount /tmp

**5.NFS参数说明**

rw 可读写的权限
ro 只读的权限
no_root_squash 登入NFS主机，使用该共享目录时相当于该目录的拥有者，如果是root的话，那么对于这个

​              共 享的目录来说，他就具有root的权限，这个参数『极不安全』，不建议使用
root_squash   登入NFS主机，使用该共享目录时相当于该目录的拥有者。但是如果是以root身份使用这个共

​             享目录的时候，那么这个使用者（root）的权限将被压缩成为匿名使用者，即通常他的UID与

​             GID都会变成nobody那个身份
all_squash   不论登入NFS的使用者身份为何，他的身份都会被压缩成为匿名使用者，通常也就是nobody
anonuid    可以自行设定这个UID的值，这个UID必需要存在于你的/etc/passwd当中
anongid    同anonuid，但是变成groupID就是了
sync       资料同步写入到内存与硬盘当中
async      资料会先暂存于内存当中，而非直接写入硬盘
insecure    允许从这台机器过来的非授权访问

####  

### 开机自动挂载

`/etc/fstab` 开机挂载配置文件
开机自动挂载：

```
[root@server ~]# echo "172.25.254.141:/ftp /ftp nfs defaults 0 0" >> /etc/fstab
[root@server mnt]# reboot
Connection to 172.25.254.241 closed by remote host.
Connection to 172.25.254.241 closed.
[root@foundation79 Desktop]# ssh root@172.25.254.241
root@172.25.254.241's password: 
Last login: Wed Jun  6 01:59:12 2018 from 172.25.254.79
[root@server ~]# df
Filesystem          1K-blocks    Used Available Use% Mounted on
/dev/vda1            10473900 3188264   7285636  31% /
devtmpfs               469344       0    469344   0% /dev
tmpfs                  484932      80    484852   1% /dev/shm
tmpfs                  484932   12748    472184   3% /run
tmpfs                  484932       0    484932   0% /sys/fs/cgroup
172.25.254.141:/ftp  10473984 3519232   6954752  34% /ftp
```









### mac nfs 挂载命令

```
sudo mount -o resvport 192.168.31.251:/data6T/volumes/mac-nfs/ /data/nfs/
```

