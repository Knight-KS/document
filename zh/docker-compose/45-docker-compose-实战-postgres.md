# 实战postgres

```
version: '3.1'
services:
	db:
    restart: always
    image: postgres:9.6.21 // postgres 镜像
    ports:
      - 5432:5432  //映射端口号
    environment:
      POSTGRES_PASSWORD: postgres  //密码
      PGDATA: /var/lib/postgresql/data/pgdata //数据存储文件夹
    volumes:
      - ./data/pgdata:/var/lib/postgresql/data/pgdata //将数据映射到对应的路径
```

