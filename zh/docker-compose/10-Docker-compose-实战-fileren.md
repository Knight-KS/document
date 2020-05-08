# filerun

## docker-compose

```
version: '3'
services:
  db:
    image: mariadb:10.1
    environment:
      MYSQL_ROOT_PASSWORD: filerun
      MYSQL_USER: filerun
      MYSQL_PASSWORD: filerun
      MYSQL_DATABASE: filerun
    volumes:
      - ./db:/var/lib/mysql
    networks:
      - cloud_filerun

  web:
    depends_on:
      - db
    links:
      - db
    image: afian/filerun
    ports:
      - "82:80"
    volumes:
      - ./filerun/html:/var/www/html
      - ./filerun/user-files:/user-files
    networks:
      - cloud_filerun
      
networks:
  cloud_filerun:
```

```


```

