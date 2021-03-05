# mongodb

```yaml
version: '3'
services:
  mongo-db:
    image: mongo:4.2.5
    container_name: mongo-db
    #network_mode: "host"
    restart: always
    ports:
      - 27017:27017
    environment:
      TZ: Asia/Shanghai
      MONGO_INITDB_ROOT_USERNAME: admin
      MONGO_INITDB_ROOT_PASSWORD: admin@123
    volumes:
      - ./data/mongo/db:/data/db
      - /etc/localtime:/etc/localtime
    logging:
      driver: "json-file"
      options:
        max-size: "200k"
        max-file: "10"

  mongo-express:
    image: mongo-express:4.2.5
    container_name: mongo-express
    restart: always
    links:
      - mongo-db:mongodb
    depends_on:
      - mongo-db
    ports:
      - 27018:8081
    environment:
      ME_CONFIG_OPTIONS_EDITORTHEME: 3024-night
      ME_CONFIG_MONGODB_SERVER: mongodb
      ME_CONFIG_MONGODB_ADMINUSERNAME: admin
      ME_CONFIG_MONGODB_ADMINPASSWORD: admin@123
      ME_CONFIG_BASICAUTH_USERNAME: admin
      ME_CONFIG_BASICAUTH_PASSWORD: admin@123
      
      
      
      

```

docker-compose up -d 启动容器（mongodb默认端口是27017）。

进入容器

docker exec -it mongodb bash

输入 mongo 进入mongodb
创建用户

# 进入 admin 的数据库
use admin;
# 创建管理员用户
db.createUser({
  user: "admin",
  pwd: "admin@123",
  roles: [ { role: "userAdminAnyDatabase", db: "admin" } ]
})
# 创建测试用户，特定于一个数据库，比如：demo
db.createUser({
  user: 'test',
  pwd: '123456',
  roles: [{role: "read", db: "demo"}]
})
# 建立数据库
use demo;

# 写入数据测试
db.info.save({name: 'shanhy', age: '31'})

# 查询写入的数据
db.info.find();

# 查询输出如下（_id 是系统分配的）
{ "_id" : ObjectId("5db670b4a822e1923359072c"), "name" : "shanhy", "age" : "31" }


如果需要开始远程链接，需要按如下步骤操作：
进入 mongodb 的容器当中

#更新源
apt-get update
# 安装 vim
apt-get install vim
# 修改 mongo 配置文件
vim /etc/mongod.conf.orig

将其中的 bindIp: 127.0.0.1 注释掉 # bindIp: 127.0.0.1 或者改成bindIp: 0.0.0.0 即可开启远程连接。