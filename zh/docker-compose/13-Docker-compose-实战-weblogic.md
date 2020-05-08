# Docker-compose-实战-weblogic

### docker-compose

```
version: '3.1'
services:
  weblogic12:
    restart: always
    image: ismaleiva90/weblogic12
    container_name: weblogic12
    ports:
      - 7001:7001
    volumes:
      - ./data:/u01/oracle/weblogic/user_projects/domains/base_domain/data
```

```
账号weblogic 密码 welcome1
```

