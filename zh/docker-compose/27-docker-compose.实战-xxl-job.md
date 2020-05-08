

# 实战 xxl-job

```
version: '3'
services:
  xxljob:
    image: docker.io/xuxueli/xxl-job-admin:2.2.0
    container_name: xxljob
    depends_on:
      - mysql8
    volumes:
      - /usr/local/docker/xxljob/applogs:/data/applogs
    ports:
      - 8001:8080
    environment:
      TZ: Asia/Shanghai
      PARAMS: '--spring.datasource.url=jdbc:mysql://172.23.34.220:3306/xxl_job?Unicode=true&characterEncoding=UTF-8 --spring.datasource.username=root --spring.datasource.password=123456 --xxl.job.login.username=admin --xxl.job.login.password=admin@123'
    networks:
      - shanhy-ci
    logging:
      driver: "json-file"
      options:
        max-size: "200k"
        max-file: "10"
networks:
  shanhy-ci:
    driver: bridge
```

