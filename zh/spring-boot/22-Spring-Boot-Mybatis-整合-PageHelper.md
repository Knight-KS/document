# Spring Boot 整合 PageHelper
## 概述
PageHelper 是 Mybatis 的分页插件，支持多数据库、多数据源。可以简化数据库的分页查询操作，整合过程也极其简单，只需引入依赖即可。

### 引入依赖

> 这里我直接那我之前用来整合mybatis的项目简单演示下

```
        <dependency>
            <groupId>com.github.pagehelper</groupId>
            <artifactId>pagehelper</artifactId>
            <version>5.1.2</version>
        </dependency>
        <dependency>
            <groupId>com.github.pagehelper</groupId>
            <artifactId>pagehelper-spring-boot-autoconfigure</artifactId>
            <version>1.2.5</version>
        </dependency>
        <dependency>
            <groupId>com.github.pagehelper</groupId>
            <artifactId>pagehelper-spring-boot-starter</artifactId>
            <version>1.2.5</version>
        </dependency>
```

### application.yml

```
pagehelper:
    helperDialect: mysql
    reasonable: true
    supportMethodsArguments: true
    params: count=countSql
```

### 修改controller

```
    @GetMapping(value = "/users")
    public PageInfo<UserEntity> getUsers() {
        PageHelper.startPage(1, 10);
        List<UserEntity> users=userMapper.getAll();
        PageInfo<UserEntity> pageInfo = new PageInfo<UserEntity>(users);
        return pageInfo;
    }
```

### 访问验证

```
{
  "pageNum": 1,
  "pageSize": 10,
  "size": 2,
  "startRow": 1,
  "endRow": 2,
  "total": 2,
  "pages": 1,
  "list": [
    {
      "id": 28,
      "userName": "毛毛",
      "passWord": "1234",
      "userSex": "MAN",
      "nickName": "324"
    },
    {
      "id": 29,
      "userName": "12",
      "passWord": "12",
      "userSex": "MAN",
      "nickName": null
    }
  ],
  "prePage": 0,
  "nextPage": 0,
  "isFirstPage": true,
  "isLastPage": true,
  "hasPreviousPage": false,
  "hasNextPage": false,
  "navigatePages": 8,
  "navigatepageNums": [
    1
  ],
  "navigateFirstPage": 1,
  "navigateLastPage": 1,
  "lastPage": 1,
  "firstPage": 1
}
```

当然，这只是个简单入门整合，但是已经足够大家进行使用了，好了玩的开心！