# kettle 开发



```java
#数据库解密
Console.log(KettleEncr.decryptPasswd("Encrypted 2be98afc86aa7f2e4cb79ff228dc6fa8c"));

```

```sql
SELECT DISTINCT
	fa.ID_TRANSFORMATION,
	fa.id_step,
	fa.nr,
	fa.VALUE_STR AS field_name,
	fr.VALUE_STR AS field_rename,
	fl.VALUE_STR AS field_length,
	ra.VALUE_STR AS remove_name,
	mt.VALUE_NUM AS meta_type,
	ml.VALUE_NUM AS meta_length,
	mr.VALUE_STR AS meta_rename,
	mp.VALUE_STR AS meta_precision 
FROM
	(
	SELECT
		rsa.ID_TRANSFORMATION,
		rsa.id_step,
		rsa.nr,
		rsa.VALUE_NUM,
		rsa.VALUE_STR 
	FROM
		r_step_attribute rsa 
	WHERE
		`CODE` = 'field_name' 
	) fa
	LEFT JOIN (
	SELECT
		rsa.ID_TRANSFORMATION,
		rsa.id_step,
		rsa.nr,
		rsa.VALUE_NUM,
		rsa.VALUE_STR 
	FROM
		r_step_attribute rsa 
	WHERE
		`CODE` = 'field_rename' 
	) fr ON fr.ID_TRANSFORMATION = fa.ID_TRANSFORMATION 
	AND fr.nr = fa.nr
	LEFT JOIN (
	SELECT
		rsa.ID_TRANSFORMATION,
		rsa.id_step,
		rsa.nr,
		rsa.VALUE_NUM,
		rsa.VALUE_STR 
	FROM
		r_step_attribute rsa 
	WHERE
		`CODE` = 'field_length' 
	) fl ON fl.ID_TRANSFORMATION = fa.ID_TRANSFORMATION 
	AND fl.nr = fa.nr
	LEFT JOIN (
	SELECT
		rsa.ID_TRANSFORMATION,
		rsa.id_step,
		rsa.nr,
		rsa.VALUE_NUM,
		rsa.VALUE_STR 
	FROM
		r_step_attribute rsa 
	WHERE
		`CODE` = 'remove_name' 
	) ra ON ra.ID_TRANSFORMATION = fa.ID_TRANSFORMATION 
	AND ra.nr = fa.nr
	LEFT JOIN (
	SELECT
		rsa.ID_TRANSFORMATION,
		rsa.id_step,
		rsa.nr,
		rsa.VALUE_NUM,
		rsa.VALUE_STR 
	FROM
		r_step_attribute rsa 
	WHERE
		`CODE` = 'meta_type' 
	) mt ON mt.ID_TRANSFORMATION = fa.ID_TRANSFORMATION 
	AND mt.nr = fa.nr
	LEFT JOIN (
	SELECT
		rsa.ID_TRANSFORMATION,
		rsa.id_step,
		rsa.nr,
		rsa.VALUE_NUM,
		rsa.VALUE_STR 
	FROM
		r_step_attribute rsa 
	WHERE
		`CODE` = 'meta_length' 
	) ml ON ml.ID_TRANSFORMATION = fa.ID_TRANSFORMATION 
	AND ml.nr = fa.nr
	LEFT JOIN (
	SELECT
		rsa.ID_TRANSFORMATION,
		rsa.id_step,
		rsa.nr,
		rsa.VALUE_NUM,
		rsa.VALUE_STR 
	FROM
		r_step_attribute rsa 
	WHERE
		`CODE` = 'meta_precision' 
	) mp ON mp.ID_TRANSFORMATION = fa.ID_TRANSFORMATION 
	AND mp.nr = fa.nr
	LEFT JOIN (
	SELECT
		rsa.ID_TRANSFORMATION,
		rsa.id_step,
		rsa.nr,
		rsa.VALUE_NUM,
		rsa.VALUE_STR 
	FROM
		r_step_attribute rsa 
	WHERE
		`CODE` = 'meta_rename' 
	) mr ON mr.ID_TRANSFORMATION = fa.ID_TRANSFORMATION 
	AND mr.nr = fa.nr 
WHERE
	fa.ID_TRANSFORMATION = '12'
```

```sql
SELECT
	tf.ID_TRANSFORMATION,
	rd.ID_DATABASE_TYPE,
	rd.HOST_NAME,
	rd.USERNAME,
	rd.`PASSWORD`,
	rd.`PORT`,
	rd.DATABASE_NAME,
	sd.ID_STEP,
	ta.CODE,
	ta.VALUE_STR 
FROM
	r_transformation tf
	LEFT JOIN r_step_attribute ta ON ta.ID_TRANSFORMATION = tf.ID_TRANSFORMATION
	LEFT JOIN r_step_database sd ON sd.ID_TRANSFORMATION = tf.ID_TRANSFORMATION 
	AND sd.ID_STEP = ta.ID_STEP
	LEFT JOIN r_database rd ON rd.ID_DATABASE = sd.ID_DATABASE 
WHERE
	tf.NAME = 'ZH-MYSQL-TO-MYSQL' 
	AND ta.`CODE` IN ( 'sql' );
```

