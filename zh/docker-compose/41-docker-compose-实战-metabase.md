# 实战metabase

```
version: '3.1'
services:
  metabase:
    image: metabase/metabase
    restart: always
    container_name: metabase
    environment:
      MB_DB_TYPE: mysql
      MB_DB_DBNAME: metabase
      MB_DB_PORT: 3306
      MB_DB_USER: root
      MB_DB_PASS: root
      MB_DB_HOST: 192.168.30.145
    ports:
      - 3000:3000
```

