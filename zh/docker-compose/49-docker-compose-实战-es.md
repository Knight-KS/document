# 实战ES

```
version: '3'
services:
  elasticsearch:
    image: elasticsearch:7.6.2
    container_name: elasticsearch
    user: root
    environment:
      - "cluster.name=elasticsearch" #设置集群名称为elasticsearch
      - "discovery.type=single-node" #以单一节点模式启动
      - "ES_JAVA_OPTS=-Xms512m -Xmx512m" #设置使用jvm内存大小
    volumes:
      - ./data/elasticsearch/plugins:/usr/share/elasticsearch/plugins #插件文件挂载
      - ./data/elasticsearch/data:/usr/share/elasticsearch/data #数据文件挂载
    ports:
      - 9200:9200
      - 9300:9300
  logstash:
    image: logstash:7.6.2
    container_name: logstash
    environment:
      - TZ=Asia/Shanghai
    volumes:
      - ./data/logstash/logstash.conf:/usr/share/logstash/pipeline/logstash.conf #挂载logstash的配置文件
    depends_on:
      - elasticsearch #kibana在elasticsearch启动之后再启动
    links:
      - elasticsearch:es #可以用es这个域名访问elasticsearch服务
    ports:
      - 4560:4560
      - 4561:4561
      - 4562:4562
      - 4563:4563
  kibana:
    image: kibana:7.6.2
    container_name: kibana
    links:
      - elasticsearch:es #可以用es这个域名访问elasticsearch服务
    depends_on:
      - elasticsearch #kibana在elasticsearch启动之后再启动
    environment:
      - "elasticsearch.hosts=http://es:9200" #设置访问elasticsearch的地址
    ports:
      - 5601:5601

```





```
input {
      stdin {}
      jdbc {
        # 连接的数据库地址和哪一个数据库，指定编码格式，禁用SSL协议，设定自动重连
        jdbc_connection_string => "jdbc:mysql://192.168.20.180:3306/datacenter-cms?characterEncoding=UTF-8&useSSL=false&autoReconnect=true"
        jdbc_user => "root"
        jdbc_password => "123456"
        # 下载连接数据库的驱动包，建议使用绝对地址
       jdbc_driver_library => "/data/jdbc/mysql-connector-java-8.0.22.jar"
       jdbc_driver_class => "com.mysql.cj.jdbc.Driver"
       jdbc_paging_enabled => "true"
       jdbc_page_size => "50000"
       codec => plain { charset => "UTF-8"}
        #使用其它字段追踪，而不是用时间
      use_column_value => true   #//这里如果是用时间追踪比如：数据的更新时间或创建时间等和时间有关的这里一定不能是true, 切记切记切记，我是用update_time来追踪的
        #追踪的字段
     tracking_column => update_time
     record_last_run => true
      jdbc_default_timezone => "Asia/Shanghai"   # //设置时区
      statement => SELECT * FROM zy_site  WHERE create_date > :last_sql_value  
      # //这里要说明一下如果直接写sql语句，前面这种写法肯定不对的　　　　　　　　　　　　　　
     #是否清除 last_run_metadata_path 的记录,如果为真那么每次都相当于从头开始查询所有的数据库记录
     clean_run => false
       # 这是控制定时的，重复执行导入任务的时间间隔，第一位是分钟 不设置就是1分钟执行一次
       schedule => "* * * * *"
       type => "std"
     }
 }
 filter {
    json {
        source => "message"
        remove_field => ["message"]
    }
}
output {
    elasticsearch {
        # 要导入到的Elasticsearch所在的主机
        hosts => "192.168.20.181:9200"
        # 要导入到的Elasticsearch的索引的名称
        index => "zy_site"
        # 类型名称（类似数据库表名）
        document_type => "zy"
        # 主键名称（类似数据库主键）
        document_id => "%{id}"
    }
    stdout {
        # JSON格式输出
        codec => json_lines
    }
}
```







```
input {
	jdbc {
		type => "zy_site"
		jdbc_driver_library => "/data/jdbc/mysql-connector-java-8.0.22.jar"
		jdbc_driver_class => "com.mysql.cj.jdbc.Driver"
		jdbc_connection_string => "jdbc:mysql://192.168.20.180:3306/datacenter-cms?characterEncoding=UTF-8&useSSL=false&autoReconnect=true"
		jdbc_user => "root"
		jdbc_password => "123456"
		jdbc_paging_enabled => "true"
		jdbc_page_size => "500"
		schedule => "* * * * *"
		statement => "SELECT id,site_id,type_id,type_name,create_time FROM zy_site WHERE create_time >= :sql_last_value"
		use_column_value => true
		tracking_column_type => "timestamp"
		tracking_column => "create_time"
		last_run_metadata_path => "syncpoint_table"
	}
	jdbc {
		type => "zy_site_video"
		jdbc_driver_library => "/data/jdbc/mysql-connector-java-8.0.22.jar"
		jdbc_driver_class => "com.mysql.cj.jdbc.Driver"
		jdbc_connection_string => "jdbc:mysql://192.168.20.180:3306/datacenter-cms?characterEncoding=UTF-8&useSSL=false&autoReconnect=true"
		jdbc_user => "root"
		jdbc_password => "123456"
		schedule => "* * * * *"
		statement => "SELECT * FROM zy_site_video WHERE id >= :sql_last_value"
		use_column_value => true
		tracking_column_type => "numeric"
		tracking_column => "id"
		jdbc_paging_enabled => "true"
		jdbc_page_size => "5000"
		last_run_metadata_path => "syncpoint_table"
	}
}
output {
	if [type]=="zy_site" {

		elasticsearch {
			hosts => ["192.168.20.181:9200"]
			index => "zy_site"
			document_id => "%{id}"
			document_type => "zy_site"
		}
	}
	if [type]=="zy_site_video" {

		elasticsearch {
			hosts => ["192.168.20.181:9200"]
			index => "zy_site_video"
			document_id => "%{id}"
			document_type => "zy_site_video"
		}
	}
	stdout {
		codec => json_lines
	}
}

```

