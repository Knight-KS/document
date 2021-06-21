# linux 内存占用过高处理



当Java虚拟机遇上Linux+Arena内存池



解决办法：

直接想到的解决思路就是**限制Arena内存池的个数**。考虑到Arena内存池的主要是用来提高glibc内存分配性能的，而且根据Hadoop、Redis等产品的最佳实践建议，尝试设置MALLOC_ARENA_MAX环境变量值为4：

export MALLOC_ARENA_MAX=4







后来我查到glibc 2.12版本有几个Arena内存管理的Bug，可能导致参数设置不生效或生效后内存继续往上涨：

Bug 799327 - MALLOC_ARENA_MAX=1 does not work in RHEL 6.2(glibc 2.12)

Bug 20425 - unbalanced and poor utilization of memory in glibc arenas may cause memory bloat and subsequent OOM

Bug 11261 - malloc uses excessive memory for multi-threaded applications

然后，我们考虑到将MALLOC_ARENA_MAX设置为4已经影响了一些Arena内存池管理上的一些性能，要继续使用MALLOC_ARENA_MAX参数，就需要升级glibc的版本，升级完还不确定高版本的glibc与其他包兼容性上有什么影响，毕竟是操作系统底层的包了，所以就直接使用了Google的tcmalloc替代操作系统自带的glibc管理内存。有资料显示，使用tcmalloc以后，Web Server的吞吐量得以提升（先尝试的jemalloc，但是启动后会影响操作系统命令的执行，所以，就用了tcmalloc）：