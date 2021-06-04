# baota

```
version: '3'
services:
  baota:
    image: pch18/baota:lnmp7.2
    container_name: baota
    restart: always
    privileged: true
    ports: 
      - "81:80"
    volumes:
      - ./data/wwwroot:/www/wwwroot
```

