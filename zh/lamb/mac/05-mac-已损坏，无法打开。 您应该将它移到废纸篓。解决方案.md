# 已损坏，无法打开。 您应该将它移到废纸篓。解决方案

1.首先先看你电脑的安全设置

如果没有设置任何来源，那把小锁打开，添加一下任何来源。在尝试安装

2.如果还不行，在终端粘贴复制输入命令：“sudo xattr -r -d com.apple.quarantine ”（注意最后有一个空格），先不要按回车

3.打开 “访达”（Finder）进入 “应用程序” 目录，找到该软件图标，将图标拖到刚才的终端窗口里面，会得到如下组合：“sudo xattr -r -d com.apple.quarantine /Applications/Bartender\ 3.app”，回到终端窗口按回车，输入系统密码回车即可。

```
sudo xattr -r -d com.apple.quarantine /Applications/Bartender\ 3.app
```

