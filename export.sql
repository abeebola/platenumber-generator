-- Adminer 4.3.1 MySQL dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

DROP DATABASE IF EXISTS `soft_test`;
CREATE DATABASE `soft_test` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `soft_test`;

DROP TABLE IF EXISTS `loc_g`;
CREATE TABLE `loc_g` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `short_code` varchar(5) NOT NULL,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

TRUNCATE `loc_g`;
INSERT INTO `loc_g` (`id`, `short_code`, `name`) VALUES
(1,	'AGE',	'Agege'),
(2,	'AJI',	'Ajeromi-Ifelodun'),
(3,	'ALI',	'Alimosho'),
(4,	'AMO',	'Amuwo-Odofin'),
(5,	'APA',	'Apapa'),
(6,	'BDG',	'Badagry'),
(7,	'EPE',	'Epe'),
(8,	'ETO',	'Eti-Osa'),
(9,	'IBL',	'Ibeju/Lekki'),
(10,	'IFI',	'Ifako-Ijaye'),
(11,	'IKJ',	'Ikeja'),
(12,	'IKR',	'Ikorodu'),
(13,	'KSF',	'Kosofe'),
(14,	'LGI',	'Lagos Island'),
(15,	'LGM',	'Lagos Mainland'),
(16,	'MSH',	'Mushin'),
(17,	'OJO',	'Ojo'),
(18,	'OSI',	'Oshodi-Isolo'),
(19,	'SHM',	'Shomolu'),
(20,	'SUR',	'Surulere');

DROP TABLE IF EXISTS `plate_nos`;
CREATE TABLE `plate_nos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `loc_id` int(11) NOT NULL,
  `p_code` varchar(15) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

TRUNCATE `plate_nos`;

-- 2017-10-09 23:49:14