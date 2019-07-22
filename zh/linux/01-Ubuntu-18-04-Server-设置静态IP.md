# Ubuntu 18.04 Server 设置静态IP
## 背景
`Netplan`是Ubuntu 17.10中引入的一种新的命令行网络配置实用程序，用于在Ubuntu系统中轻松管理和配置网络设置。它允许您使用YAML抽象来配置网络接口。它可与NetworkManager和systemd-networkd网络守护程序（称为渲染程序，您可以选择使用其中的哪一个）一起作为内核的接口。

它读取`/etc/netplan/*.ymal`中描述的网络配置，并且可以将所有网络接口的配置存储在这些文件中。
在本文中。我们将解释如何使用Netplan实用程序在Ubuntu 18.04中为网络接口配置网络静态或动态IP地址。

## 解决方案
### 列出Ubuntu上的所有活动网络接口
首先，您需要确定要配置的网络接口。 您可以使用ifconfig命令列出系统中所有连接的网络接口，如图所示。
```
ifconfig -a
```
检查Ubuntu中的网络接口
从上述命令的输出中，我们有2个连接到Ubuntu系统的接口：1个以太网接口和环回接口。

### Ubuntu设置静态IP地址
在这个例子中，我们将ens33以太网网络接口配置一个静态IP。如图所示，使用vim打开netplain配置文件。
> 重要提示：如果YAML文件不是由发行版安装程序创建的，则可以使用此命令为渲染器生成所需的配置。
```
sudo netplan generate
```
另外，自动生成的文件可能在桌面，服务器，云实例等（例如`01-network-manager-all.ymal或01-netcfg.yaml`）上有不同的文件名，但是`/etc/netplan/*.yaml`下的所有文件将被netplan读取。

另外，自动生成的文件可能在桌面，服务器，云实例等（例如`01-network-manager-all.ymal或01-netcfg.yaml`）上有不同的文件名，但是`/etc/netplan/*.yaml`下的所有文件将被netplan读取。
```
sudo vim /etc/netplan/xxxx.ymal
```
然后在ethernet部分添加以下配置。
```
network:
    ethernets:
        ens33:
            addresses:
            - 192.168.4.254/24
            dhcp4: false
            gateway4: 192.168.4.2
            nameservers:
                addresses:
                - 8.8.8.8
                search: []
    version: 2
```
说明：

- ens33:网络接口名称
- dhcp4:接收IPV4接口的dhcp属性
- dhcp6:接收IPV6接口的dhcp属性
- addresses:接口的静态地址序列
- gateway4:默认网关的IPV4地址
- Nameservers:DNS服务器地址，以,号分割
- 添加完成后，您的配置文件应该具有以下内容，如以下屏幕截图所示。
- 接口的地址属性期望有一个序列条目，例如[192.168.4.254/24,"20001: 1 :: 1/64"]或[192.168.1.254/24, ]（有关更多信息，请参考[netplan手册页](https://netplan.io/)）。

在Ubuntu中配置静态IP
保存该文件并退出。然后使用以下netplan命令应用最近的网络更改。
```
sudo netplan apply
```
现在再次验证所有可用的网络接口，ens33以太网接口现在应连接到本地网络，并具有IP地址，如以下截图所示。
```
ifconfig -a
```
在Ubuntu中验证网络接口

### Ubuntu设置动态IP地址
要将ens33以太网接口配置为通过DHCP动态接收IP地址，只需使用一下配置即可。
```
network:
    ethernets:
        ens33:
            dhcp6: true
            dhcp4: true
    version: 2
```
保存该文件并退出。然后使用以下netplan命令应用最近的网络更改。
```
sudo netplan apply
ifconfig -a
```
从现在起，您的系统将从路由器动态获取IP地址。
你可以通过查看netplan手册页找到更多信息和配置选项。
```
man netplan
```
这个时候，你已成功将网络静态IP地址配置到你的Ubuntu服务器。
