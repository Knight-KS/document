# oracle

```
create tablespace ODS_DATA
datafile '/u01/app/oracle/oradata/ods/ODS_DATA.dbf' size 1000M 
autoextend on next 100M maxsize unlimited logging
extent management local autoallocate
segment space management auto;


create temporary tablespace ODS_TEMP
tempfile '/u01/app/oracle/oradata/ods/ODS_TEMP.dbf'
Size 100m
Autoextend on
Next 100m maxsize 20480m
Extent management local;

create user ods identified by ods --(注意这里的密码不能有特殊字符，否则会报错)
account unlock
DEFAULT tablespace ods_data
Temporary tablespace ods_temp;

grant create table to ods;
grant unlimited tablespace to ods;
grant create tablespace to ods;
grant alter tablespace to ods;
grant drop tablespace to ods;
grant manage tablespace to ods;
grant create session,resource to ods
```

