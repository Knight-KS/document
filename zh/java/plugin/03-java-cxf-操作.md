# cxf 操作

### 生成客户端

```
wsdl2java -p [生成代码的包目录] -d [代码生成的路径] -client -encoding utf-8  -noAddressBinding 
 http://localhost:8099/chnInterWs/ChnInterServiceImpl?wsdl
 

wsdl2java -p demoline -d E:\computerWorkspace\wschnweb_client\src -client -encoding utf-8  -noAddressBinding 
  http://localhost:8099/chnInterWs/ChnInterServiceImpl?wsdl
```

