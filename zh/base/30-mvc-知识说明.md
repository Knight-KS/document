# mvc 知识说明
## 什么是三层架构
### 什么是系统架构
所谓系统架构是指，整合应用系统程序大的结构。经常提到的系统结构有两种：三层架构与 MVC。这两种结构既有区别，又有联系。但这两种结构的使用，均是为了降低系统模块间的耦合度。

### 什么是三层架构
三层架构是指：视图层 View、服务层 Service，与持久层 DAO。它们分别完成不同的功能。
- View 层：用于接收用户提交请求的代码
- Service 层：系统的业务逻辑主要在这里完成
- DAO 层：直接操作数据库的代码
为了更好的降低各层间的耦合度，在三层架构程序设计中，采用面向抽象编程。即上层对下层的调用，是通过接口实现的。而下层对上层的真正服务提供者，是下层接口的实现类。服务标准（接口）是相同的，服务提供者（实现类）可以更换。这就实现了层间解耦合。

![三层架构 ](https://raw.githubusercontent.com/lll124/document/master/static/zh/base/30-001.png)

## 什么是 MVC 模式
### 概述
MVC，即 Model 模型、View 视图，及 Controller 控制器。

- View：视图，为用户提供使用界面，与用户直接进行交互。
- Model：模型，承载数据，并对用户提交请求进行计算的模块。其分为两类，一类称为数据承载 Bean，一类称为业务处理 Bean。所谓数据承载 Bean 是指实体类，专门用户承载业务数据的，如 Student、User 等。而业务处理 Bean 则是指 Service 或 Dao 对象， 专门用于处理用户提交请求的。
- Controller：控制器，用于将用户请求转发给相应的 Model 进行处理，并根据 Model 的计算结果向用户提供相应响应。

### MVC 架构程序的工作流程
- 用户通过 View 页面向服务端提出请求，可以是表单请求、超链接请求、AJAX 请求等
- 服务端 Controller 控制器接收到请求后对请求进行解析，找到相应的 Model 对用户请求进行处理
- Model 处理后，将处理结果再交给 Controller
- Controller 在接到处理结果后，根据处理结果找到要作为向客户端发回的响应 View 页面。页面经渲染（数据填充）后，再发送给客户端。
![三层架构 mvc](https://raw.githubusercontent.com/lll124/document/master/static/zh/base/30-002.png)
三层架构 + MVC 示意图
![三层架构 mvc](https://raw.githubusercontent.com/lll124/document/master/static/zh/base/30-003.png)