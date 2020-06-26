# 自定义函数 split



```
Sql语句最好依次执行创建

/**************************************
 * name:        split
 * author:      sean zhang.
 * date:        2012-09-03.
 * function:    返回字符串被指定字符分割后的表类型。
 * parameters:  p_list: 待分割的字符串。
                p_sep: 分隔符，默认逗号，也可以指定字符或字符串。
 * example:    select * from users where u_id in (select column_value from table (split ('1,2')))
                返回u_id为1和2的两行数据。
 **************************************/
/* 创建一个表类型 */
create or replace type tabletype as table of varchar2(32676)

/* 创建 split 函数 */
create or replace function split (p_list clob, p_sep varchar2 := ',')
  return tabletype
  pipelined

is
  l_idx    pls_integer;
  v_list  varchar2 (32676) := p_list;
begin
  loop
      l_idx  := instr (v_list, p_sep);

      if l_idx > 0
      then
        pipe row (substr (v_list, 1, l_idx - 1));
        v_list  := substr (v_list, l_idx + length (p_sep));
      else
        pipe row (v_list);
        exit;
      end if;
  end loop;
end;

 

/**************************************
 * name:        splitstr
 * author:      sean zhang.
 * date:        2012-09-03.
 * function:    返回字符串被指定字符分割后的指定节点字符串。
 * parameters:  str: 待分割的字符串。
                i: 返回第几个节点。当i为0返回str中的所有字符，当i 超过可被分割的个数时返回空。
                sep: 分隔符，默认逗号，也可以指定字符或字符串。当指定的分隔符不存在于str中时返回sep中的字符。
 * example:    select splitstr('abc,def', 1) as str from dual;  得到 abc
                select splitstr('abc,def', 3) as str from dual;  得到 空
 **************************************/
/* 创建 splitstr 函数 */
create or replace function splitstr(str in clob,
                                    i  in number := 0,
                                    sep in varchar2 := ',') return varchar2 is
  t_i    number;
  t_count number;
  t_str  varchar2(4000);
begin
  if i = 0 then
    t_str := str;
  elsif instr(str, sep) = 0 then
    t_str := sep;
  else
    select count(*) into t_count from table(split(str, sep));
  
    if i <= t_count then
      select str
        into t_str
        from (select rownum as item, column_value as str
                from table(split(str, sep)))
      where item = i;
    end if;
  end if;

  return t_str;
end;
```

### 例子

```
select  split('a,b,c,e,d,f,g')  arrData  from  dual;
## 默认使用逗号分割，可以自定义修改，如：
select split('X-rapido & Lemon','&') arrData from dual;
```

示例：**splitstr(字符串,获取的节点下标,分隔符)**

```
select splitstr('X-rapido&Lemon&Jennifer', 1, '&') word from dual;  -- X-rapido
select splitstr('X-rapido&Lemon&Jennifer', 2, '&') word from dual;  -- Lemon
select splitstr('X-rapido&Lemon&Jennifer', 3, '&') word from dual;  -- Jennifer
select splitstr('X-rapido&Lemon&Jennifer', 4, '&') word from dual; -- 空字符串
```



