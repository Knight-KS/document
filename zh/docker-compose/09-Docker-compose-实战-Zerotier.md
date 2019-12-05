# Docker-compose-实战-Zerotier.
## docker-compose.yml 
```
version: '3'
services:
  zerotier:
    container_name: zerotier
    hostname: zerotier
    image: zerotier/zerotier-containerized
    devices:
      - "/dev/net/tun"
    cap_add:
      - NET_ADMIN
      - SYS_ADMIN
    restart: always
    volumes:
      - /usr/local/docker/zerotier/data:/var/lib/zerotier-one
    network_mode: host
```