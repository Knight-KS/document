#  百度云盘



```
基本信息

AppID:23920120
应用名称:百度云目录浏览
应用类别:软件
应用描述:百度云目录浏览
 密钥信息

AppKey:OtEltO145U5BrQqG8bWWxzT3IFCoBar1
SecretKey:KSqhG3qAxliTHzP45yTTfQsL4L0tLY7L
SignKey:n!YqfEdbSFQQ31Adxu#hMBgsR#d3K=MT

漆 牢 剩 铅 搭 美 坚 签 语 间 酶 给

```



**2.1**引导用户到如下地址授权。

> GET http://openapi.baidu.com/oauth/2.0/authorize?response_type=code&client_id=YOUR_CLIENT_ID&redirect_uri=YOUR_REGISTERED_REDIRECT_URI&scope=basic,netdisk&display=tv&qrcode=1&force_login=1

```
http://openapi.baidu.com/oauth/2.0/authorize?response_type=code&client_id=OtEltO145U5BrQqG8bWWxzT3IFCoBar1&redirect_uri=http://openapi.baidu.com/oauth/2.0/login_success?code=CODE&scope=basic,netdisk&display=tv&qrcode=1&force_login=1
```

```
http://openapi.baidu.com/oauth/2.0/authorize?response_type=code&client_id=OtEltO145U5BrQqG8bWWxzT3IFCoBar1&redirect_uri=http://openapi.baidu.com/oauth/2.0/login_success?code=CODE&scope=basic,netdisk
```

```
http://openapi.baidu.com/oauth/2.0/authorize?response_type=code&client_id=ByC2GPxhndeLgV9AZCLU0S665gBMtV8m&redirect_uri=http://openapi.baidu.com/oauth/2.0/login_success?code=CODE&scope=basic,netdisk
```

```
b3fad6e6a114fb2bd8dfd39d77ca397f
```



**参数说明**

| 参数          | 类型   | 是否必须 | 备注                                                         |
| ------------- | ------ | -------- | ------------------------------------------------------------ |
| response_type | string | 是       | 固定参数，必为code                                           |
| client_id     | string | 是       | 用自己应用的API key替换示例中的YOUR_CLIENT_ID                |
| redirect_uri  | string | 是       | 授权回调地址，可在获取应用AK,SK的页面【安全配置】入口进行配置，更多说明见**授权说明** |
| scope         | string | 是       | 固定参数，必须为basic,netdisk                                |
| display       | string | 否       | 授权页的展示方式，更多说明见**授权说明**                     |
| state         | string | 否       | 重定向后会带上state参数。建议开发者利用state参数来防止CSRF攻击 |
| force_login   | int    | 否       | 如传递“force_login=1”，则加载登录页时强制用户输入用户名和口令，不会从cookie中读取百度用户的登陆状态 |

**2.3** ：用CODE换取Access_token

> GET https://openapi.baidu.com/oauth/2.0/token?grant_type=authorization_code&code=CODE&client_id=YOUR_CLIENT_ID&client_secret=YOUR_CLIENT_SECRET&redirect_uri=YOUR_REGISTERED_REDIRECT_URI

**code说明**：code作为换取access_token的票据，每次用户授权带上的code将不一样，code只能使用一次，10分钟未被使用自动过期。

```
https://openapi.baidu.com/oauth/2.0/token?grant_type=authorization_code&code=1f1233986685c720b6c2a06a77ec441c&client_id=OtEltO145U5BrQqG8bWWxzT3IFCoBar1&client_secret=KSqhG3qAxliTHzP45yTTfQsL4L0tLY7L&redirect_uri=http://openapi.baidu.com/oauth/2.0/login_success?code=CODE&code=3f7fa71e523f7c7a61d7eaa7446afd3c
```



```
121.b1d2c745b84433bffed6d8ac82b5b86f.YHJhYKY1b3qGr3zXXfKXaWSQGIdPWVgn4PvlWiA.-rtHhw
```





```
https://openapi.baidu.com/oauth/2.0/token?grant_type=authorization_code&code=b3fad6e6a114fb2bd8dfd39d77ca397f&client_id=ByC2GPxhndeLgV9AZCLU0S665gBMtV8m&client_secret=WVezGoIyQyM3DWH98Kqh7zyQai0mgFe8&redirect_uri=http://openapi.baidu.com/oauth/2.0/login_success?code=CODE&code=b3fad6e6a114fb2bd8dfd39d77ca397f
```



```
121.c09568fd5db95ed277d82b18b305234d.Y_cwTi-XOA-f5MDBPeK61CDFeQ3xsoiNSYVBU6w.IIWpkg
```



**参数说明**

| 参数          | 类型   | 是否必须 | 备注                               |
| ------------- | ------ | -------- | ---------------------------------- |
| grant_type    | string | 是       | 固定值，必须为authorization_code   |
| code          | string | 是       | 获取用户授权后得到的code           |
| client_id     | string | 是       | 应用的API KEY                      |
| client_secret | string | 是       | 应用的SECRET KEY                   |
| redirect_uri  | string | 是       | 必须与获取授权code是传递的保持一致 |

**返回值说明**

| 参数          | 类型   | 备注                                                  |
| ------------- | ------ | ----------------------------------------------------- |
| access_token  | string | 获取到的授权token，作为调用其他接口访问用户数据的凭证 |
| expires_in    | int    | access_token的有效期，单位：秒                        |
| refresh_token | string | 用于刷新access_token, 有效期为10年                    |
| scope         | string | access_token最终的访问权限，即用户的实际授权列表      |