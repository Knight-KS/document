# tensorflow-线程队列和IO操作

### 线程队列

```
		import tensorflow as tf
		
		# 保证sess.run()能够正常运行
    tf.compat.v1.disable_eager_execution()

    # 模拟异步子线程 存入样本 ，主线程 读取样本
    # 1 定义一个对列 1000
    q = tf.queue.FIFOQueue(1000,tf.float32)
    # 2 定义要做的事情 循环值 +1 放入对列
    var = tf.Variable(0.0)
    # 实现一个自增
    data = tf.compat.v1.assign_add(var,tf.constant(1.0))
    end_q = q.enqueue(data)
    # 3 定义对列管理器OP 指定多少个子线程 ，子线程干什么事情
    qr = tf.compat.v1.train.QueueRunner(q,enqueue_ops=[end_q]*2)
    # 定义个初始化OP
    init_op = tf.compat.v1.global_variables_initializer()
    # 版本2.0的函数
    sess = tf.compat.v1.Session()
    # 初始化op
    sess.run(init_op)
    # 开启线程管理器
    coord = tf.train.Coordinator()
    # 真正开启子线程
    threads = qr.create_threads(sess,coord = coord,start=True)

    # 主线程， 不断读取训练数据
    for i in range(300):
        print(sess.run(q.dequeue()))

    # 回收子线程
    coord.request_stop()
    coord.join(threads)
```





## IO操作

- csv文件：读取一行
  - 1 先找到文件，构造一个列表
  - 2 构造文件列表
  - 3 构造阅读器，读取队列内容（一行）
  - 4 解码内容
  - 5 批处理（多个样本）
- 二进制文件：指定一个样本的bytes读取
  - 地址:`https://www.cs.toronto.edu/~kriz/cifar.html`
  - 
- 图片文件：按一张一张的读取
  - 1 所有图片统一特征的数量（像素值一样）
  - 2 减少数据量
- tfrecords
  - example协议块 ：类字典格式
  - 对于每个样本 都要构造example协议块