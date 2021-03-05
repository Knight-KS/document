# docker-compose搭建MinIO服务器

```
version: '3.0'
services:
  minio:
    image: minio/minio:RELEASE.2021-03-04T00-53-13Z
    container_name: minio
    ports:
      - "9000:9000"
    restart: always
    command: server /data
    environment:
      MINIO_ACCESS_KEY: admin
      MINIO_SECRET_KEY: admin123 #大于等于8位
    logging:
      options:
        max-size: "50M" # 最大文件上传限制
        max-file: "10"
      driver: json-file
    volumes:
      - ./data:/data 
```

