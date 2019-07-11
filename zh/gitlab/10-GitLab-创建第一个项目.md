# GitLab 创建第一个项目



# 使用 SSH 的方式拉取和推送项目
## 生成 SSH KEY
使用 ssh-keygen 工具生成，位置在 Git 安装目录下，我的是 C:\Program Files\Git\usr\bin

输入命令：
```
ssh-keygen -t rsa -C "your_email@example.com"
```
```
ssh-keygen -t rsa -C "zhenjie_lei@163.com"
```
执行成功后的效果：
```
➜  ~ ssh-keygen -t rsa -C "zhenjie_lei@163.com"
Generating public/private rsa key pair.
Enter file in which to save the key (/Users/leizhenjie/.ssh/id_rsa):
/Users/leizhenjie/.ssh/id_rsa already exists.
Overwrite (y/n)? y
Enter passphrase (empty for no passphrase):
Enter same passphrase again:
Your identification has been saved in /Users/leizhenjie/.ssh/id_rsa.
Your public key has been saved in /Users/leizhenjie/.ssh/id_rsa.pub.
The key fingerprint is:
SHA256:jFr4mCmhOqRjyn+aIxal/y6orNlAlA06eqJBb2w8D6Y zhenjie_lei@163.com
The key's randomart image is:
+---[RSA 2048]----+
| .               |
|. +              |
|o+ .             |
|+.+. . o         |
|+.=X. o S        |
|oO=.+B           |
|*E= =..          |
|BO =..           |
|%=++Bo           |
+----[SHA256]-----+
```
## 复制 SSH-KEY 信息到 GitLab
秘钥位置在：`C:\Users\你的用户名\.ssh` 目录下，找到 `id_rsa.pub` 并使用编辑器打开，如

登录 GitLab，点击“用户头像”-->“设置”-->“SSH 密钥”
