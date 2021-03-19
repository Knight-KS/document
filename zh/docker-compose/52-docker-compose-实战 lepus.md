# lupus

```
version: '3.1'
services:
  lepus:
    restart: always
    image: georce/lepus
    container_name: lepus
    ports:
      - 81:80
      - 3306:3306
    volumes:
      - ./data/mysql:/var/lib/mysql
```

