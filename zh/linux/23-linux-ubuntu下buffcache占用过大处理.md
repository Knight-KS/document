# ubuntu下buff/cache占用过大处理

执行free -h查看内存使用情况

发现，buff/cache占用过大

上图是清理之后的，清理之前buff/cache占用了5个G

buff/cache是由于系统读写导致的文件缓存，没有及时释放。

清理内存命令：

```
echo 1 > /proc/sys/vm/drop_caches
echo 2 > /proc/sys/vm/drop_caches
echo 3 > /proc/sys/vm/drop_caches
```



