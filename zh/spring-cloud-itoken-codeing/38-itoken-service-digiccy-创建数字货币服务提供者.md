# itoken-service-digiccy-创建数字货币服务提供者
## 创建项目
创建一个名为 `itoken-service-digiccy` 的服务提供者项目

## 服务所需数据库脚本
```
/*
SQLyog  v12.2.6 (64 bit)
MySQL - 5.7.22 : Database - itoken-service-digiccy
*********************************************************************
*/


/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`itoken-service-digiccy` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;

USE `itoken-service-digiccy`;

DROP TABLE IF EXISTS tb_digiccy_exchange;

-- 交易所表
CREATE TABLE tb_digiccy_exchange
(
	exch_guid varchar(100) NOT NULL COMMENT '交易所编码',
    exch_name varchar(64) NOT NULL COMMENT '交易所名称',
    exch_code varchar(64) NOT NULL COMMENT '交易所代号',
    exch_url varchar(64) NOT NULL COMMENT '交易所网址',
	create_by varchar(64) NOT NULL COMMENT '创建者',
	create_date datetime NOT NULL COMMENT '创建时间',
	update_by varchar(64) NOT NULL COMMENT '更新者',
	update_date datetime NOT NULL COMMENT '更新时间',
	remarks varchar(500) COMMENT '备注信息',
	extend_s1 varchar(500) COMMENT '扩展 String 1',
	extend_s2 varchar(500) COMMENT '扩展 String 2',
	extend_s3 varchar(500) COMMENT '扩展 String 3',
	extend_s4 varchar(500) COMMENT '扩展 String 4',
	extend_s5 varchar(500) COMMENT '扩展 String 5',
	extend_s6 varchar(500) COMMENT '扩展 String 6',
	extend_s7 varchar(500) COMMENT '扩展 String 7',
	extend_s8 varchar(500) COMMENT '扩展 String 8',
	extend_i1 decimal(19) COMMENT '扩展 Integer 1',
	extend_i2 decimal(19) COMMENT '扩展 Integer 2',
	extend_i3 decimal(19) COMMENT '扩展 Integer 3',
	extend_i4 decimal(19) COMMENT '扩展 Integer 4',
	extend_f1 decimal(19,4) COMMENT '扩展 Float 1',
	extend_f2 decimal(19,4) COMMENT '扩展 Float 2',
	extend_f3 decimal(19,4) COMMENT '扩展 Float 3',
	extend_f4 decimal(19,4) COMMENT '扩展 Float 4',
	extend_d1 datetime COMMENT '扩展 Date 1',
	extend_d2 datetime COMMENT '扩展 Date 2',
	extend_d3 datetime COMMENT '扩展 Date 3',
	extend_d4 datetime COMMENT '扩展 Date 4',
	PRIMARY KEY (exch_guid)
) COMMENT = '交易所表';

CREATE INDEX idx_digiccy_exchange_eg ON tb_digiccy_exchange (exch_guid ASC);

-- 交易所市场表
CREATE TABLE tb_digiccy_exchange_mkt
(
	exch_name varchar(64) NOT NULL COMMENT '交易所名称',
    exch_code varchar(64) NOT NULL COMMENT '交易所代号',
    market varchar(64) NOT NULL COMMENT '货币交易对代号',
    market_name varchar(64) NOT NULL COMMENT '主货币显示名称',
    degree varchar(20) NOT NULL COMMENT '涨跌幅，保留小数点后3位',
    open_price varchar(20) NOT NULL COMMENT '开盘价（早8:00）单位美元',
    last_price varchar(20) NOT NULL COMMENT '最新价，单位美元',
    high_price varchar(20) NOT NULL COMMENT '最高价，单位美元',
    low_price varchar(20) NOT NULL COMMENT '最低价，单位美元',
    open_price_cny varchar(20) NOT NULL COMMENT '开盘价（早8:00）单位人民币（元）',
    last_price_cny varchar(20) NOT NULL COMMENT '最新价，单位人民币（元）',
    high_price_cny varchar(20) NOT NULL COMMENT '最高价，单位人民币（元）',
    low_price_cny varchar(20) NOT NULL COMMENT '最低价，单位人民币（元）',
    current_vol varchar(20) NOT NULL COMMENT '当前成交货币量，单位（个）',
    time_updated varchar(20) NOT NULL COMMENT '数据更新时间戳，秒级，东八区时间',

	create_by varchar(64) NOT NULL COMMENT '创建者',
	create_date datetime NOT NULL COMMENT '创建时间',
	update_by varchar(64) NOT NULL COMMENT '更新者',
	update_date datetime NOT NULL COMMENT '更新时间',
	remarks varchar(500) COMMENT '备注信息',
	extend_s1 varchar(500) COMMENT '扩展 String 1',
	extend_s2 varchar(500) COMMENT '扩展 String 2',
	extend_s3 varchar(500) COMMENT '扩展 String 3',
	extend_s4 varchar(500) COMMENT '扩展 String 4',
	extend_s5 varchar(500) COMMENT '扩展 String 5',
	extend_s6 varchar(500) COMMENT '扩展 String 6',
	extend_s7 varchar(500) COMMENT '扩展 String 7',
	extend_s8 varchar(500) COMMENT '扩展 String 8',
	extend_i1 decimal(19) COMMENT '扩展 Integer 1',
	extend_i2 decimal(19) COMMENT '扩展 Integer 2',
	extend_i3 decimal(19) COMMENT '扩展 Integer 3',
	extend_i4 decimal(19) COMMENT '扩展 Integer 4',
	extend_f1 decimal(19,4) COMMENT '扩展 Float 1',
	extend_f2 decimal(19,4) COMMENT '扩展 Float 2',
	extend_f3 decimal(19,4) COMMENT '扩展 Float 3',
	extend_f4 decimal(19,4) COMMENT '扩展 Float 4',
	extend_d1 datetime COMMENT '扩展 Date 1',
	extend_d2 datetime COMMENT '扩展 Date 2',
	extend_d3 datetime COMMENT '扩展 Date 3',
	extend_d4 datetime COMMENT '扩展 Date 4',
	PRIMARY KEY (exch_name)
) COMMENT = '交易所市场表';

CREATE INDEX idx_digiccy_exchange_mkt_eg ON tb_digiccy_exchange_mkt (exch_name ASC);
```