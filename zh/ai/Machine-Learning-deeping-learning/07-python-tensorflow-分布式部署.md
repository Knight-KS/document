# tensorflow 分布式部署

## 代码`test.py`

```
import tensorflow as tf

tf.compat.v1.app.flags.DEFINE_string("job_name","ps","启动服务的类型 ps  worker")
tf.compat.v1.app.flags.DEFINE_integer("task_index",0,"指定ps或者worker当中的那一台服务器以task:0")

## 定义cifar的数据参数
FLAGS = tf.compat.v1.app.flags.FLAGS

def main(argv):
    """
    运行主函数
    :param argv:
    :return:
    """

    # 保证sess.run()能够正常运行
    tf.compat.v1.disable_eager_execution()

    # 定义全局计数op ,给钩子列表中的训练步数使用
    # global_step  = tf.contrib.framework.get_or_create_global_step()
    global_step  = tf.compat.v1.train.get_or_create_global_step()
    # 指定集群描述  ps  worker
    cluster = tf.compat.v1.train.ClusterSpec({"ps":["10.87.12.128:2222"],"worker":["10.87.12.128:2223"]})

    # 创建不同的服务 ps worker
    server = tf.compat.v1.train.Server(cluster,job_name=FLAGS.job_name,task_index=FLAGS.task_index)

    # 根据不同的服务做不同 事情  ps:去更新参数，worker:指定设备去模型计算
    if FLAGS.job_name == "ps":
        # 参数服务器什么也不用干，需要等待worker传递参数
        server.join()
    else:
        worker_device = "/job:worker/task:0/cpu:0"
        # 可以指定设备运行
        with tf.compat.v1.device(tf.compat.v1.train.replica_device_setter(
            worker_device=worker_device,
            cluster=cluster
        )):
            #简单做一个矩阵运算
            a = tf.compat.v1.Variable([[1,2,3,4]])
            b = tf.compat.v1.Variable([[2],[2],[2],[2]])
            mat = tf.compat.v1.matmul(a,b)

        # 创建分布式回话
        with tf.compat.v1.train.MonitoredTrainingSession(
            master="grpc://10.87.12.128:2223", # 指定主worker
            is_chief=(FLAGS.task_index == 0), # 判断是否是worker
            config=tf.compat.v1.ConfigProto(log_device_placement=True),# 打印设备信息
            hooks=[tf.compat.v1.train.StopAtStepHook(last_step=200)]
        ) as mon_sess:
            while not mon_sess.should_stop():
                print(mon_sess.run(mat))

if __name__ == "__main__":
    tf.compat.v1.app.run()

```



### 命令

```
python test.py --job_name="worker" --task_index=0  
python test.py --job_name="ps" --task_index=0    
```

