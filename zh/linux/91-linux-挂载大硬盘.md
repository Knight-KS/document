# linux挂载大硬盘

### 查看所有硬盘

```
sudo fdisk -l         #查看机器上硬盘
sudo parted /dev/sdb  # 分区没有挂载的硬盘
```



## 进入parted， 

```
mklabel gpt         # 将磁盘设置为gpt格式
#mkpart logical 0 -1 # 将磁盘所有的容量设置为GPT格式
mkpart extended 0% 100%  # （扩展分区extended ,主分区primary  ,并使用整个硬盘）
print # 查看分区结果
quit # 退出
```

### 挂载硬盘

```
mkfs.ext4 /dev/sdb     #（格式化新硬盘）
#sudo mkfs.ext4 -F /dev/sdb
mount /dev/sdb /data   #（挂载，之后即可使用了，第二个参数是挂载到哪个目录）

```

### 设置开机自动挂载啦

```
sudo gedit /etc/fstab # 然后在文件末尾添加,重启即可进行挂载 

/dev/sdb /data ext4 defaults 0 0
```

### 







