# DBUtils 数据库常用操作


## dbcpconfig.properties
```
#连接设置
driverClassName=org.postgresql.Driver
url=jdbc:postgresql://47.81.49.19:5432/postgres
username=postgres
password=postgres

#<!-- 初始化连接 -->
initialSize=10

#最大连接数量
maxActive=100

#<!-- 最大空闲连接 -->
maxIdle=20

#<!-- 最小空闲连接 -->
minIdle=5

#<!-- 超时等待时间以毫秒为单位 6000毫秒/1000等于60秒 -->
maxWait=60000


#JDBC驱动建立连接时附带的连接属性属性的格式必须为这样：[属性名=property;]
#注意："user" 与 "password" 两个属性会被明确地传递，因此这里不需要包含他们。
connectionProperties=useUnicode=true;characterEncoding=utf8

#指定由连接池所创建的连接的自动提交（auto-commit）状态。
defaultAutoCommit=true

#driver default 指定由连接池所创建的连接的只读（read-only）状态。
#如果没有设置该值，则“setReadOnly”方法将不被调用。（某些驱动并不支持只读模式，如：Informix）
defaultReadOnly=

#driver default 指定由连接池所创建的连接的事务级别（TransactionIsolation）。
#可用值为下列之一：（详情可见javadoc。）NONE,READ_UNCOMMITTED, READ_COMMITTED, REPEATABLE_READ, SERIALIZABLE
defaultTransactionIsolation=READ_COMMITTED
```

## JdbcUtils
```
package com.vvdd.datacenter.common.utils;

import com.alibaba.druid.pool.DruidDataSourceFactory;

import javax.sql.DataSource;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.Properties;

/**
 *   
 *
 * @author lamb zhenjie.lei@gmail.com  
 * @version V1.0   
 * @Package com.gs.spider.utils
 * @Description: 数据库连接工具类
 * @date 18/4/11 11:18 
 */
public class JdbcUtils {

    private static DataSource ds = null;

    static {
        try {
            Properties prop = new Properties();
            InputStream in = JdbcUtils.class.getClassLoader().getResourceAsStream("dbcpconfig.properties");
            prop.load(in);
            DruidDataSourceFactory factory = new DruidDataSourceFactory();
            ds =factory.createDataSource(prop);
        } catch (Exception e) {
            throw new ExceptionInInitializerError(e);
        }
    }

    public static DataSource getDataSource() {
        return ds;
    }

    public static Connection getConnection() throws SQLException {
        return ds.getConnection();
    }

    /*
     * 工具类里面现在没有必要提供release()方法，因为我们是使用dbutils操作数据库，
     * 即调用dbutils的update()和query()方法操作数据库，他操作完数据库之后，会自动释放掉连接。
     */
}
```
## PostgresqlUtils
```
package com.vvdd.datacenter.modules.search.utils;

import com.vvdd.datacenter.common.persistence.Page;
import com.vvdd.datacenter.common.utils.DateUtils;
import com.vvdd.datacenter.common.utils.JdbcUtils;
import org.apache.commons.dbutils.DbUtils;
import org.apache.commons.dbutils.QueryRunner;
import org.apache.commons.dbutils.handlers.MapListHandler;
import org.apache.commons.dbutils.handlers.ScalarHandler;
import org.apache.commons.lang3.StringUtils;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 *   
 *
 * @author lamb zhenjie.lei@gmail.com  
 * @version V1.0   
 * @Description: 操作es的具体类
 * @date 18/6/26 11:12 
 */

public class PostgresqlUtils {


    /**
     * 删除 批量
     * @param id
     * @return
     * @throws Exception
     */
    public static void  delete(String id) throws Exception {
        QueryRunner runner = new QueryRunner(JdbcUtils.getDataSource());
        // 搜索数据
        String sql = "delete from dc_data_mv where id in("+id+")";

        int row = runner.update(sql);
    }

    /**
     * 新增
     * @param map
     * @return
     * @throws Exception
     */
    public static Map<String, Object> insert(Map<String, Object> map) throws Exception {
        QueryRunner runner = new QueryRunner(JdbcUtils.getDataSource());
        // 搜索数据
        String sql = "INSERT INTO dc_data_mv (id, collect_count, reviews_count, year, images, " +
                "title, countries, language, genres, casts," +
                "original_title, directors, summary, subtype, comments_count, " +
                "ratings_count, rating, average, stars, down_list," +
                "actor, type, movie_status, poster, imdb, " +
                "gather_time, publish_time, douban_id, create_time, update_time) " +
                "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)" ;

        Object[][] params = new Object[1][30];
        params[0] = new Object[]{
                map.get("id"),map.get("collect_count"),map.get("reviews_count"),map.get("year"),map.get("images"),
                map.get("title"),map.get("countries"),map.get("language"),map.get("genres"),map.get("casts"),
                map.get("original_title"),map.get("directors"),map.get("summary"),map.get("subtype"),map.get("comments_count"),
                map.get("ratings_count"),map.get("rating"),map.get("average"),map.get("stars"),map.get("down_list"),
                map.get("actor"),map.get("type"),map.get("movie_status"),map.get("poster"),map.get("imdb"),
                map.get("gather_time"),map.get("publish_time"),map.get("douban_id"), DateUtils.getDateTime(),DateUtils.getDateTime()};
        runner.batch(sql, params);

        return map;
    }


    /**
     * 更新其他搜索下载链接
     * @param map
     * @return
     * @throws Exception
     */
    public static Map<String, Object> updateForSearchDownUrl(Map<String, Object> map) throws Exception {
        QueryRunner runner = new QueryRunner(JdbcUtils.getDataSource());
        // 搜索数据
        String sql = "update dc_data_mv set search_down_url=?" +
                " where id =?";
        Object [] params = new Object[]{map.get("search_down_url").toString(), map.get("id").toString()};
        runner.update(sql, params);
        return map;
    }
    /**
     * 批量添加
     * @param list
     * @return
     * @throws Exception
     */
    public static Map<String, Object> insertBatch(List<Map<String, Object>> list) throws Exception {
        QueryRunner runner = new QueryRunner(JdbcUtils.getDataSource());
        // 搜索数据
        String sql = "INSERT INTO dc_data_mv (id, collect_count, reviews_count, year, images, " +
                "title, countries, language, genres, casts," +
                "original_title, directors, summary, subtype, comments_count, " +
                "ratings_count, rating, average, stars, down_list," +
                "actor, type, movie_status, poster, imdb, " +
                "gather_time, publish_time, douban_id, create_time, update_time) " +
                " VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)" ;

        Object[][] params = new Object[list.size()][30];
        Map<String, Object> map = null;
        for(int i = 0; i<list.size();i++){
            map = new HashMap<>();
            map = list.get(i);
            params[i] = new Object[]{
                    map.get("id"),map.get("collect_count"),map.get("reviews_count"),map.get("year"),map.get("images"),
                    map.get("title"),map.get("countries"),map.get("language"),map.get("genres"),map.get("casts"),
                    map.get("original_title"),map.get("directors"),map.get("summary"),map.get("subtype"),map.get("comments_count"),
                    map.get("ratings_count"),map.get("rating"),map.get("average"),map.get("stars"),map.get("down_list"),
                    map.get("actor").toString(),map.get("type").toString(),map.get("movie_status"),map.get("poster"),map.get("imdb"),
                    map.get("gather_time"),map.get("publish_time"),map.get("douban_id"), DateUtils.getDateTime(),DateUtils.getDateTime()};
        }

        runner.batch(sql, params);
        DbUtils.close(runner.getDataSource().getConnection());

        return map;
    }

    /**
     * 根据ID获取内容
     * @param id
     * @return
     * @throws Exception
     */
    public static Map<String, Object> get(String id) throws Exception {

        StringBuffer sqlSelect=new StringBuffer();
        sqlSelect.append("SELECT id, collect_count, reviews_count, year, images, title," +
                " countries, language, genres, casts, original_title, directors, summary, " +
                "subtype, comments_count, ratings_count, rating, average, stars, down_list, " +
                "actor, type, movie_status, poster, imdb, gather_time, " +
                "publish_time, douban_id, create_time, update_time,search_down_url FROM dc_data_mv where 1=1 ");
        sqlSelect.append(" and id='"+id+"'");
        // 搜索数据
        QueryRunner runner = new QueryRunner(JdbcUtils.getDataSource());
        List<Map<String, Object>> list = runner.query(sqlSelect.toString(), new MapListHandler());
        if(null==list||list.size()==0){
            return null;
        }else{
            for(Map bean:list){
                bean.put("countries",JSONUtils.toJSONArray(bean.get("countries")));
                bean.put("rating",JSONUtils.toJSONObject(bean.get("rating")));
                bean.put("search_down_url",JSONUtils.toJSONObject(bean.get("search_down_url")));
                Object down_list = bean.get("down_list");
                if(down_list!=null&&!down_list.equals("")&&!down_list.toString().equals("[]")){
                    //down_list = down_list.substring(1,down_list.length()-1);
                    bean.put("down_list",JSONUtils.toList(down_list.toString()));
                }else{
                    bean.put("down_list",null);
                }

                bean.put("actor",JSONUtils.toJSONArray(bean.get("actor")));
                bean.put("type",JSONUtils.toJSONArray(bean.get("type")));
            }
            return list.get(0);
        }
    }

    public static void main(String args[]) throws Exception {
        System.out.print(get("10004"));
    }

    /**
     * 分页查询
     * @param paramT
     * @param currentPage
     * @param pageSize
     * @return
     * @throws Exception
     */
    public static Page findByParam(Map<String, String> paramT,int currentPage, int pageSize) throws Exception {


        Map<String, String> param = new HashMap<>();
        param.putAll(paramT);
//        param.put("stype", param.get("stype"));
//        param.put("sclass", param.get("sclass"));
//        param.put("syears", param.get("syears"));
//        param.put("scountry", param.get("scountry"));
//        param.put("slanguage", param.get("slanguage"));

        StringBuffer sqlSelect=new StringBuffer();
        sqlSelect.append("SELECT id, collect_count, reviews_count, year, images, title," +
                " countries, language, genres, casts, original_title, directors, summary, " +
                "subtype, comments_count, ratings_count, rating, average, stars, down_list, " +
                "actor, type, movie_status, poster, imdb, gather_time, " +
                "publish_time, douban_id, create_time, update_time FROM dc_data_mv where 1=1 ");


        StringBuffer sqlOrder=new StringBuffer();
        if (!StringUtils.isBlank(param.get("sorder"))){
            sqlOrder.append(" order by "+param.get("sorder")+" desc");
        }else{
            sqlOrder.append(" order by average desc");
        }


        StringBuffer sqlWhere=new StringBuffer();
        if (!StringUtils.isBlank(param.get("stype"))&&!param.get("stype").equals("0")){
            sqlWhere.append("and type@@'" + param.get("stype") + "'::tsquery ");
        }
        if (!StringUtils.isBlank(param.get("sclass"))&&!param.get("sclass").equals("0")) {
            sqlWhere.append("and type@@'" + param.get("sclass") + "'::tsquery ");
        }
        if (!StringUtils.isBlank(param.get("syears"))&&!param.get("syears").equals("0")){
            if(param.get("syears").toString().equals("99")){
                sqlWhere.append("and year>='1900' and year<='2002' ");
            }else {
                sqlWhere.append("and year@@'" + param.get("syears") + "'::tsquery ");
            }

        }
        if (!StringUtils.isBlank(param.get("scountry"))&&!param.get("scountry").equals("0")) {
            sqlWhere.append("and countries@@'" + param.get("scountry") + "'::tsquery ");
        }
        if (!StringUtils.isBlank(param.get("slanguage"))&&!param.get("slanguage").equals("0")){
            sqlWhere.append("and language@@'" + param.get("slanguage") + "'::tsquery ");
        }

        if (!StringUtils.isBlank(param.get("stitle"))&&!param.get("stitle").equals("0")){
            sqlWhere.append("and title like'%" + param.get("stitle") + "%'");
        }

        StringBuffer sqlPage=new StringBuffer();

        sqlPage.append(" limit "+pageSize+" offset "+pageSize*(currentPage-1));

        //总条数
        StringBuffer sqlCount=new StringBuffer();
        sqlCount.append("select count(1) FROM dc_data_mv where 1=1 ");


        QueryRunner runner = new QueryRunner(JdbcUtils.getDataSource());
        List<Map<String, Object>> list = runner.query(sqlSelect.toString()+sqlWhere.toString()+sqlOrder+sqlPage, new MapListHandler());

        for(Map bean:list){
            bean.put("countries",JSONUtils.toJSONArray(bean.get("countries")));
            bean.put("rating",JSONUtils.toJSONObject(bean.get("rating")));
            //bean.put("down_list",JSONUtils.toJSONObject(bean.get("down_list")));
            bean.put("actor",JSONUtils.toJSONArray(bean.get("actor")));
            bean.put("type",JSONUtils.toJSONArray(bean.get("type")));
        }

        Object totalRows = runner.query(sqlCount.toString()+sqlWhere.toString(),new ScalarHandler());

        Page page = new Page(currentPage, pageSize, (long) totalRows, list);
        page.initialize();
        return page;
    }

}

```