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



### 找出占用cpu内存过高的进程

```
//分析占用CPU最高的应用
[root@dy1 ~]# ps -eo user,pid,pcpu,pmem,args --sort=-pcpu  |head -n 10
//分析占用内存最高的应用
[root@dy1 ~]# ps -eo user,pid,pcpu,pmem,args --sort=-pmem  |head -n 10
```

```
#!/bin/bash
echo "-------------------CUP占用前10排序--------------------------------"
ps -eo user,pid,pcpu,pmem,args --sort=-pcpu  |head -n 10
echo "-------------------内存占用前10排序--------------------------------"
ps -eo user,pid,pcpu,pmem,args --sort=-pmem  |head -n 10
————————————————
```



### df命令

```

df -T # 可以用来查看分区的文件系统

df -h #  df命令可以显示目前所有文件系统的可用空间及使用情形
```

### du命令

```
//查看系统中文件的使用情况
df -h
//查看当前目录下各个文件及目录占用空间大小
du -sh *

//方法一：切换到要删除的目录，删除目录下的所有文件
rm -f *

//方法二：删除logs文件夹下的所有文件，而不删除文件夹本身
rm -rf log/*

//du：查询文件或文件夹的磁盘使用空间
du -h --max-depth=1 /home
```

### **查看linux文件目录的大小和文件夹包含的文件数**

```
 统计总数大小

    du -sh xmldb/

    du -sm * | sort -n //统计当前目录大小 并安大小 排序

    du -sk * | sort -n

    du -sk * | grep guojf //看一个人的大小

    du -m | cut -d "/" -f 2 //看第二个/ 字符前的文字

    查看此文件夹有多少文件 /*/*/* 有多少文件

    du xmldb/

    du xmldb/*/*/* |wc -l

    40752

    解释：

    wc [-lmw]

    参数说明：

    -l :多少行

    -m:多少字符

    -w:多少字
```

###  **Linux:ls以K、M、G为单位查看文件大小**

```
#man ls

……

-h, --human-readable

                print sizes in human readable format (e.g., 1K 234M 2G)

……

# ls

cuss.war    nohup.out

# ls -l

total 30372

-rw-r--r--    1 root root 31051909 May 24 10:07 cuss.war

-rw-------    1 root root          0 Mar 20 13:52 nohup.out

# ls -lh

total 30M

-rw-r--r--    1 root root 30M May 24 10:07 cuss.war

-rw-------    1 root root     0 Mar 20 13:52 nohup.out

# ll -h

total 30M

-rw-r--r--    1 root root 30M May 24 10:07 cuss.war

-rw-------    1 root root     0 Mar 20 13:52 nohup.out
```

## 删除系统日志等

```
#删除keep文件之外的所有文件
rm -rf !(folder) 

#删除folder1和folder2文件之外的所有文件
rm -rf !(folder1 | folder2) 
#删除keep文件之外的所有文件
ls | grep -v keep | xargs rm  
#删除当前test文件夹中keep文件之外的所有文件
find ./test/ | grep -v keep | xargs rm 

#删除keep以外的其他文件。
find ./ -name '[^k][^e][^e][^p]*'  -exec rm -rf {} \; 

 #删除keep以外的其他文件。推荐！
find ./ -name '[^k][^e][^e][^p]*'  | xargs rm -rf  


#删除生成 core,mbox等文件
find / -name core|xargs rm –rf

#删除日志
rm -rf /var/log/*

#建立查找规则
 vi test.txt 

^debug.log$
^sys.out$

linux-hipe:/home/tws/server/basedata-server/logs # ls | grep -f test.txt 
debug.log
sys.out

#记得加v，保留要保留的文件，不要删错了
ls | grep -vf test.txt |xargs rm


#删除，文件名中带有数字，超过30天的日志：
find -mtime +30 -name "*[0-9]*" -exec rm {} \;
```

## linux 代理上网命令

```
ssh -qTfnN -D 7777 root@47.90.127.53
```

| 参数 | 备注                                                         |      解释      |
| :--- | :----------------------------------------------------------- | :------------: |
| -q   | Quiet mode. Causes most warning and diagnostic messages to be suppressed. |    安静模式    |
| -T   | Disable pseudo-tty allocation.                               |   不分配tty    |
| -f   | Requests ssh to go to background just before command execution. |    后台运行    |
| -n   | Redirects stdin from /dev/null                               |     不输出     |
| -N   | Do not execute a remote command. This is useful for just forwarding ports | 不执行远程命令 |