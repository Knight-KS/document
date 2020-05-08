# mac brew 更改国内源

### Mac的brew修改国内源

- - [阿里云](https://mirrors.aliyun.com/homebrew/brew.git)
  - [清华源](https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/brew.git)



## 阿里云

```
# 替换brew.git
cd "$(brew --repo)"
git remote set-url origin https://mirrors.aliyun.com/homebrew/brew.git
# 替换homebrew-core.git
cd "$(brew --repo)/Library/Taps/homebrew/homebrew-core"
git remote set-url origin https://mirrors.aliyun.com/homebrew/homebrew-core.git
# 刷新源
brew update
12345678
```

## 清华源

```
# 替换brew.git
cd "$(brew --repo)"
git remote set-url origin https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/brew.git
# 替换homebrew-core.git
cd "$(brew --repo)/Library/Taps/homebrew/homebrew-core"
git remote set-url origin https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/homebrew-core.git
# 刷新源
brew update
```

## homebrew安装

```
ruby -e “$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)”
```

## 解决brew安装速度慢的问题(替换homebrew镜像源)

1.替换brew.git:

```
cd "$(brew --repo)”
git remote set-url origin https://mirrors.aliyun.com/homebrew/brew.git
```

2.替换homebrew-core.git:

```
cd "$(brew --repo)/Library/Taps/homebrew/homebrew-core"
git remote set-url origin https://mirrors.aliyun.com/homebrew/homebrew-core.git
```

3.终端输入命令：

> echo $SHELL 看输出结果是/bin/zsh还是/bin/bash

- /bin/zsh替换homebrew-bottles:

```
echo 'export HOMEBREW_BOTTLE_DOMAIN=https://mirrors.aliyun.com/homebrew/homebrew-bottles' >> ~/.zshrc
source ~/.zshrc
```

- /bin/bash替换homebrew-bottles:

```
echo 'export HOMEBREW_BOTTLE_DOMAIN=https://mirrors.ustc.edu.cn/homebrew-bottles' >> ~/.bash_profile
source ~/.bash_profile
```

4.恢复homebrew国内镜像源配置

- 重置brew.git

```
cd "$(brew --repo)"
git remote set-url origin https://github.com/Homebrew/brew.git
```

- 重置homebrew-core.git

```
cd "$(brew --repo)/Library/Taps/homebrew/homebrew-core"
git remote set-url origin https://github.com/Homebrew/homebrew-core.git
```

- 重置homebrew-bottles

```
将刚添加到~/.bash_profile文件的语句注释掉即可
```

## 解决brew安装包一直卡在Updating Homebrew

> 运行命令brew install node，结果界面一直卡在Updating Homebrew上，有两种解决办法

方法一：关闭brew每次执行命令时的自动更新（推荐）

```
vim ~/.bash_profile
# 新增一行
export HOMEBREW_NO_AUTO_UPDATE=true
```

方法二(懒人方法)：

```
出现Updating Homebrew的时候ctrl+c一下就行
```