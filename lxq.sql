/*
SQLyog Ultimate - MySQL GUI v8.2 
MySQL - 5.5.27 : Database - db_movie
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`db_movie` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `db_movie`;

/*Table structure for table `discuss` */

DROP TABLE IF EXISTS `discuss`;

CREATE TABLE `discuss` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键Id',
  `content` varchar(255) DEFAULT NULL COMMENT '评论内容',
  `uId` int(11) DEFAULT NULL COMMENT '用户Id',
  `mId` int(11) DEFAULT NULL COMMENT '影片Id',
  `createTime` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

/*Data for the table `discuss` */

insert  into `discuss`(`id`,`content`,`uId`,`mId`,`createTime`) values (1,'11111',28,1,'2019-11-21 15:00:08'),(2,'222222',28,1,'2019-11-21 15:00:15'),(3,'444',28,1,'2019-11-21 16:31:31'),(4,'6666',28,1,'2019-11-21 16:32:30'),(5,'快快快快快',28,1,'2019-11-21 16:33:32'),(6,'就看看扩扩',28,1,'2019-11-21 16:34:57'),(7,'kkkkk',28,1,'2019-11-21 16:38:58');

/*Table structure for table `favorite` */

DROP TABLE IF EXISTS `favorite`;

CREATE TABLE `favorite` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键Id',
  `mId` int(11) DEFAULT NULL COMMENT '电影Id',
  `uId` int(11) DEFAULT NULL COMMENT '用户Id',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `favorite` */

/*Table structure for table `movies` */

DROP TABLE IF EXISTS `movies`;

CREATE TABLE `movies` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键Id',
  `title` varchar(255) DEFAULT NULL COMMENT '影片名',
  `cover` varchar(255) DEFAULT NULL COMMENT '影片图片',
  `createTime` varchar(255) DEFAULT NULL COMMENT '影片制作时间',
  `rate` varchar(255) DEFAULT NULL COMMENT '评分',
  `mType` int(2) DEFAULT NULL COMMENT '电影分类查询',
  `mDesc` varchar(255) DEFAULT NULL COMMENT '电影简介',
  `category` varchar(255) DEFAULT NULL COMMENT '电影类型分类',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

/*Data for the table `movies` */

insert  into `movies`(`id`,`title`,`cover`,`createTime`,`rate`,`mType`,`mDesc`,`category`) values (1,'小丑','https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2567198874.jpg','2019-08-31(威尼斯电影节) / 2019-10-04(美国)','8.9',0,'电影《小丑》以同名DC漫画角色为基础，由华纳兄弟影业公司发行，计划于2019年10月4日上映。本片的故事将独立于DCEU之外，故事背景设置在20世纪80年代，讲述了一位生活陷入困境的脱口秀喜剧演员渐渐走向精神的崩溃，在哥谭市开始了疯狂的犯罪生涯，最终成为了蝙蝠侠的宿敌“小丑”的故事。 \r\n　　本片由《宿醉》的导演托德菲利普斯执导，他与编剧斯科特西尔弗一起撰写了编剧。杰昆菲尼克斯本片中饰演主人公“小丑”，其他的主演包括罗伯特德尼罗、莎姬贝兹、马克马龙等。','军事'),(2,'小丑1','https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2567198874.jpg','2019-08-31(威尼斯电影节) / 2019-10-04(美国)','8.7',0,'本片由《宿醉》的导演托德菲利普斯执导，他与编剧斯科特西尔弗一起撰写了编剧。杰昆菲尼克斯本片中饰演主人公“小丑”，其他的主演包括罗伯特德尼罗、莎姬贝兹、马克马龙等。','言情'),(3,'小丑2','https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2567198874.jpg','2019-08-31(威尼斯电影节) / 2019-10-04(美国)','8.7',1,'本片由《宿醉》的导演托德菲利普斯执导，他与编剧斯科特西尔弗一起撰写了编剧。杰昆菲尼克斯本片中饰演主人公“小丑”，其他的主演包括罗伯特德尼罗、莎姬贝兹、马克马龙等。','言情');

/*Table structure for table `users` */

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键Id',
  `userName` varchar(255) DEFAULT NULL COMMENT '用户名',
  `passWord` varchar(255) DEFAULT NULL COMMENT '密码',
  `cover` varchar(255) DEFAULT 'http://www.16sucai.com/uploadfile/2013/0616/20130616030824963.png',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8;

/*Data for the table `users` */

insert  into `users`(`id`,`userName`,`passWord`,`cover`) values (27,'yyy','698d51a19d8a121ce581499d7b701668','http://www.16sucai.com/uploadfile/2013/0616/20130616030824963.png'),(28,'yyyy','e10adc3949ba59abbe56e057f20f883e','http://www.16sucai.com/uploadfile/2013/0616/20130616030824963.png');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
