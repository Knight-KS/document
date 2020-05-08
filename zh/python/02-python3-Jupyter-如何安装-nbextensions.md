# Anaconda-Jupyter notebook 如何安装 nbextensions

## **系统环境：windows**

安装过程中，再次遇到了一地鸡毛，经过不断查询方法，发现前辈大牛们好棒棒！

Step1：确定是已经安装好anaconda

Step2：要在anaconda prompt模式下运行（jupyter notebook打开）

Step3：pip install jupyter_contrib_nbextensions（安装成功后，关掉jupyter notebook及相关网页，并重新打开，观察是否安装成功）

Step4：如果发现依旧失败，则可进行此步骤，注意（jupyter notebook关闭）

​       进行配置：jupyter contrib nbextension install --user --skip-running-check

Step5：安装完成后，重新启动jupyter notebook，“Nbextensions”出现在导航栏中，勾选目录。 

## **系统环境：macos**

因为作妖儿换了新电脑，故来更新相关操作。

Step1：确定是已经安装好anaconda

Step2：要在Mac终端下运行，如何找到终端（启动台-其他-终端）

Step3：先安装nbextensions依次输入运行下面代码：

pip install jupyter_contrib_nbextensions

jupyter contrib nbextension install --user

Step4：再安装nbextensions_configurator,依次输入运行以下代码：

pip install jupyter_nbextensions_configurator

jupyter nbextensions_configurator enable --user

Step5：安装完成后，关终端，启动anaconda中的jupyter notebook,在主页中，可以看见Nbextensions标签页，选中Hinterland 就能使用代码补全了。

