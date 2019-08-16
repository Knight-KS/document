# open-ocr, 使用超正方体和 Docker 作为服务运行你自己的OCR

OpenOCR使托管自己的OCR REST API 变得简单。

heavy OCR的工作是由正方体的OCR 处理的。

Docker 用于对服务的各个组件进行 containerize。

## 特性
- 通过RabbitMQ可以扩展的消息传递体系结构。
- 通过 Docker 容器实现平台独立性。
- Kubernetes支持: 工作线程可以在Kubernetes复制控制器中运行
- 除了英语之外，还支持 31种语言
- 使用图像预处理链的能力。 提供了一个使用[笔画宽度变换](https://github.com/tleyden/open-ocr/wiki/Stroke-Width-Transform)的。
- 将参数传递给超正方体，如字符白名单和页面分段模式。
- REST API 文档
- 可用的[go REST客户端](http://github.com/tleyden/open-ocr-client)。

## 在 Docker PAAS上启动 OpenOCR
OpenOCR可以在任何支持 Docker 容器的PAAS上轻松运行。 以下是一些已经测试过的说明：

- 在Google容器引擎 GKE Kubernetes 上启动 。
- 在AWS上使用 CoreOS 启动
- Google在Google计算引擎上发布。

如果你的首选PAAS未列出，请打开 Github问题以请求说明。

在 Ubuntu 14.04上启动 OpenOCR
可以在支持 Docker的任何东西上启动 OpenOCR，比如 Ubuntu 14.04.

下面是如何从头安装它并验证它是否正常工作的方法。

## 安装 Docker

## 启动OpenOCR命令 run.sh
- [安装 Docker](https://docs.docker.com/installation/)
- 安装 docker-compose
```
git clone https://github.com/tleyden/open-ocr.git
cd open-ocr/docker-compose
```
- 键入 `./run.sh` ( 如果你没有执行权限类型 `sudo chmod +x run.sh`

- runner 将询问你是否想要对图像进行 delete ( 为每个图像选择y 或者n )
- runner 将要求你在 1和 2之间选择
-- 版本 1正在使用ocr多维数据集 3.04. 内存使用情况很简单。 它是相当快，并不昂贵的大小( 带有 1GB 个内存和 8GB 存储的简单aws实例是 sufficiant )。 可以接受的结果
-- 版本 2正在使用ocr多维数据集 4.00. 内存使用情况很简单。 它比超立方体 3更快，而且在大小( 具有 1GB 个内存的简单aws实例已经足够了，但使用的是 16GB 存储)的条件下更成昂。 版本 3.04相比，结果确实更好。
-- 要查看比较，你可以看一下[官方页面的超正方体](https://github.com/tesseract-ocr/tesseract/wiki/4.0-Accuracy-and-Performance)。


你可以使用 docker-compose而不用使用来完成这里任务，只需执行以下操作：
```
# for v1
export OPEN_OCR_INSTANCE=open-ocr
# for v2
export OPEN_OCR_INSTANCE=open-ocr-2
# then up (with -d to start it as deamon)
docker-compose up
```
## Docker 组合将启动四个 Docker 实例
- [RabbitMQ](https://index.docker.io/u/tutum/rabbitmq/)
- [OpenOCR工作线程](https://index.docker.io/u/tleyden5iwx/open-ocr/)
- [OpenOCR HTTP API服务器](https://index.docker.io/u/tleyden5iwx/open-ocr/)
- [OpenOCR转换工作线程](https://registry.hub.docker.com/u/tleyden5iwx/open-ocr-preprocessor/)

你现在可以通过 REST API 解码图像→文本了。

在OSX上使用 Docker 编写的启动 OpenOCR

- [安装 Docker](https://docs.docker.com/installation/)
- [安装 Docker 工具箱](https://www.docker.com/products/docker-toolbox)
- 签出OpenOCR知识库
- cd docker-compose directory
- docker-machine start default
- docker-machine env
- 查看 Docker 主机IP地址
- 运行 docker-compose up -d 以运行容器或者 docker-compose up 以查看控制台中的日志

## 如何在启用docker后测试服务器
其中 IP_ADDRESS_OF_DOCKER_HOST 是你在运行 docker-machine env 时看到的( 比如。 192.168.99.100 ) 和 HTTP_POST 是文件内的.yml 文件中的端口号，它应该是相同的9292.

### 请求
```
$ curl -X POST -H"Content-Type: application/json" -d '{"img_url":"http://bit.ly/ocrimage","engine":"tesseract"}' http://IP_ADDRESS_OF_DOCKER_HOST:HTTP_PORT/ocr
```
假设值为( 192.168.99.100 和 9292 )
```
$ curl -X POST -H"Content-Type: application/json" -d '{"img_url":"http://bit.ly/ocrimage","engine":"tesseract"}' http://192.168.99.100:9292/ocr
```
### 响应

它将返回测试映像的解码文本：
```
<HTTP/1.1 200 OK


 <Date: Tue, 13 May 2014 16:18:50 GMT


 <Content-Length: 283


 <Content-Type: text/plain; charset=utf-8


<


You can create local variables for the pipelines within the template by


preﬁxing the variable name with a"$" sign. Variable names have to be


composed of alphanumeric characters and the underscore. In the example


below I have used a few variations that work for variable names.

```
## 测试 REST API
## 带有图像url的
### 请求
```
$ curl -X POST -H"Content-Type: application/json" -d '{"img_url":"http://bit.ly/ocrimage","engine":"tesseract"}' http://10.0.2.15:$HTTP_PORT/ocr
```
### 响应

它将返回测试映像的解码文本：
```
<HTTP/1.1 200 OK


 <Date: Tue, 13 May 2014 16:18:50 GMT


 <Content-Length: 283


 <Content-Type: text/plain; charset=utf-8


<


You can create local variables for the pipelines within the template by
```

## 带图像base64的
### 请求
```
$ curl -X POST -H"Content-Type: application/json" -d '{"img_base64":"<YOUR BASE 64 HERE>","engine":"tesseract"}' http://10.0.2.15:$HTTP_PORT/ocr

```

## REST API 也支持：
- 通过 `multipart/related` 上传图像内容，而不是传递图像 URL。 ( 中提供的客户端代码 [go REST客户端](http://github.com/tleyden/open-ocr-client) )
- 超立方体配置函数(。当通过 命令行 使用正方体时，等价于-c参数) 和页面模式
- 能够使用图像预处理链，如笔画宽度变换。
- 非英语语言

使用curl上传本地文件
提供的`docs/upload-local-file.sh` 提供了一个示例，说明如何使用curl和图像数据的 `multipart/related` 编码上传本地文件：

- 使用方法： `docs/upload-local-file.sh <urlendpoint> <file> [mimetype]`
- 下载示例ocr图像 `wget http://bit.ly/ocrimage`
- 例如： `docs/upload-local-file.sh http://10.0.2.15:$HTTP_PORT/ocr-file-upload ocrimage`

社区
- 在 Twitter 上跟随 @OpenOCR
- 检查 Github问题跟踪程序
客户端库
- 收费
- C#open-ocr-dotnet
许可证
- OpenOCR是开源的，可以在 Apache 2许可证下获得。


### 带参数的请求 
```
curl -X POST -H "Content-Type: application/json" -d '{"img_url":"http://192.168.81.133:81/img/timg.jpg","engine":"tesseract","inplace_decode":true,"engine_args":{"lang":"chi_sim"}}' http://192.168.81.133:9292/ocr
```
参数说明：
- img_url: 图像地址
- engine: 处理引擎
- inplace_decode:  如果为真，将尝试就地执行ocr解码，而不是在RabbitMQ上为工作进程排队处理一条消息。适用于本地测试，不建议用于生产
- engine_args: 对象参数
-- lang: 语言 默认英语


## 帮助文档 `swagger.yml`
```
---
swagger: '2.0'
info:
  version: 1.0.0
  title: OpenOCR 
  description: OpenOCR is a wrapper around Tesseract easily deployable as a service
  contact:
    name: Traun Leyden
    email: traun.leyden@gmail.com
  license:
     name: Apache2 License
schemes:
  - http
basePath: /
paths:
  /ocr:
    post:
      produces:
        - application/json
      parameters:
        - in: body
          name: body
          description: Pass image url and other info to decode image to text via OCR
          required: true
          schema:
            $ref: "#/definitions/DecodeOCR"
      responses:
        200:
          description: OK
definitions:
  DecodeOCR:
    type: object
    description: OCR processing request to convert an image into text
    properties:
      img_url:
        type: string
        description: The URL of the image to process.
      engine:
        type: string
        description: The OCR engine to use
        enum:
          - tesseract
          - go_tesseract
          - mock
      inplace_decode:
        type: boolean
        description: If true, will attempt to do ocr decode in-place rather than queuing a message on RabbitMQ for worker processing.  Useful for local testing, not recommended for production.
      engine_args:
        type: object
        description: The OCR engine arguments to pass (engine-specific)
        properties:
          config_vars:
            type: string
            description: Config vars - equivalent of -c args to tesseract
          psm:
            type: string
            description: Page Segment Mode, equivalent of -psm arg to tesseract.  To use default, omit this field from the JSON.
            enum:
              - 0
              - 1
              - 2
              - 3
              - 4
              - 5
              - 6
              - 7
              - 8
              - 9
              - 10
          lang:
            type: string
            description: The language to use.  If omitted, will use English
            enum:
              - eng
              - ara
              - bel
              - ben
              - bul
              - ces
              - dan
              - deu
              - ell
              - fin
              - fra
              - heb
              - hin
              - ind
              - isl
              - ita
              - jpn
              - kor
              - nld
              - nor
              - pol
              - por
              - ron
              - rus
              - spa
              - swe
              - tha
              - tur
              - ukr
              - vie
              - chi_sim
              - chi_tra
              
          

```
