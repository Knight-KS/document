# maxwell-mysql

## 1 修改mysql 配置文件

```
$ vi my.cnf

[mysqld]
server_id=1
log-bin=master
binlog_format=row
```

## 2 创建Maxwell用户，并赋予权限

```
CREATE USER 'maxwell'@'%' IDENTIFIED BY '123456';
GRANT ALL ON maxwell.* TO 'maxwell'@'%';
GRANT SELECT, REPLICATION CLIENT, REPLICATION SLAVE on *.* to 'maxwell'@'%'; 
```

## 3 启动 kafka

```
wget http://mirrors.tuna.tsinghua.edu.cn/apache/kafka/2.1.0/kafka_2.11-2.1.0.tgz
tar -xzf kafka_2.11-2.1.0.tgz
cd kafka_2.11-2.1.0
# 启动Zookeeper
bin/zookeeper-server-start.sh config/zookeeper.properties
```

## 4 修改kafka配置文件

```
vi config/server.properties
advertised.host.name=192.168.30.145
```

## 5 启动kafka

```
bin/kafka-server-start.sh config/server.properties
```

## 6 测试kafka

```
# 创建一个 topic
bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic test

# 列出所有 topic
bin/kafka-topics.sh --list --zookeeper localhost:2181

# 启动一个生产者，然后随意发送一些消息
bin/kafka-console-producer.sh --broker-list localhost:9092 --topic test
This is a message
This is another message

# 在另一个终端启动一下消费者，观察所消费的消息
bin/kafka-console-consumer.sh --bootstrap-server localhost:9092 --topic test --from-beginning
This is a message
This is another message
```

## 7 安装maxwell 

```
# 拉取镜像 
docker pull zendesk/maxwell

# 启动maxwell，并将解析出的binlog输出到控制台
docker run -ti --rm zendesk/maxwell bin/maxwell --user='maxwell' --password='123456' --host='192.168.30.145' --producer=stdout

```

```sql
-- 测试Maxwell，首先创建一张简单的表，然后增改删数据
CREATE TABLE `test` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `age` int(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
 
insert into test values(1,22,"小旋锋");
update test set name='whirly' where id=1;
delete from test where id=1;
```

```
## 观察docker控制台的输出，从输出的日志中可以看出Maxwell解析出的binlog的JSON字符串的格式
{"database":"test","table":"test","type":"insert","ts":1552153502,"xid":832,"commit":true,"data":{"id":1,"age":22,"name":"小旋锋"}}
{"database":"test","table":"test","type":"update","ts":1552153502,"xid":833,"commit":true,"data":{"id":1,"age":22,"name":"whirly"},"old":{"name":"小旋锋"}}
{"database":"test","table":"test","type":"delete","ts":1552153502,"xid":834,"commit":true,"data":{"id":1,"age":22,"name":"whirly"}}
```



```
### 输出到 Kafka，关闭 docker，重新设置启动参数
docker run -it --rm zendesk/maxwell bin/maxwell --user='maxwell' \
    --password='123456' --host='192.168.30.145' --producer=kafka \
    --kafka.bootstrap.servers='192.168.30.145:9092' --kafka_topic=maxwell --log_level=debug
```

