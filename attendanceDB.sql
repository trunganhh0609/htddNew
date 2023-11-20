-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.4.21-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             11.3.0.6295
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for attendance
CREATE DATABASE IF NOT EXISTS `attendance` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE `attendance`;

-- Dumping structure for table attendance.attendance
CREATE TABLE IF NOT EXISTS `attendance` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `USER_ID` int(11) DEFAULT NULL,
  `CLASS_ID` int(11) DEFAULT NULL,
  `LESSON` int(11) DEFAULT NULL,
  `DEVICE_ID` varchar(100) DEFAULT NULL,
  `STATUS` varchar(10) DEFAULT NULL,
  `CREATED_DATE` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `FK_attendance_comm_code` (`STATUS`),
  KEY `FK_attendance_user` (`USER_ID`),
  KEY `FK_attendance_class` (`CLASS_ID`),
  CONSTRAINT `FK_attendance_class` FOREIGN KEY (`CLASS_ID`) REFERENCES `class` (`CLASS_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_attendance_comm_code` FOREIGN KEY (`STATUS`) REFERENCES `comm_code` (`COMM_CODE`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_attendance_user` FOREIGN KEY (`USER_ID`) REFERENCES `user` (`USER_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table attendance.attendance: ~8 rows (approximately)
/*!40000 ALTER TABLE `attendance` DISABLE KEYS */;
INSERT INTO `attendance` (`ID`, `USER_ID`, `CLASS_ID`, `LESSON`, `DEVICE_ID`, `STATUS`, `CREATED_DATE`) VALUES
	(29, 2, 1, 1, NULL, '01-02', '2023-11-18 16:29:26'),
	(30, 6, 1, 1, NULL, '01-04', '2023-11-18 16:29:26'),
	(31, 7, 1, 1, NULL, '01-04', '2023-11-18 16:29:26'),
	(32, 14, 1, 1, NULL, '01-04', '2023-11-18 16:29:26'),
	(33, 2, 1, 2, NULL, '01-03', '2023-11-18 16:29:26'),
	(34, 6, 1, 2, NULL, '01-04', '2023-11-18 16:29:26'),
	(35, 7, 1, 2, NULL, '01-04', '2023-11-18 16:29:26'),
	(36, 14, 1, 2, NULL, '01-04', '2023-11-18 16:29:26');
/*!40000 ALTER TABLE `attendance` ENABLE KEYS */;

-- Dumping structure for table attendance.class
CREATE TABLE IF NOT EXISTS `class` (
  `CLASS_ID` int(11) NOT NULL AUTO_INCREMENT,
  `CLASS_CODE` varchar(50) DEFAULT NULL,
  `CLASS_NAME` varchar(50) DEFAULT NULL,
  `START_DATE` datetime DEFAULT NULL,
  `END_DATE` datetime DEFAULT NULL,
  PRIMARY KEY (`CLASS_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table attendance.class: ~2 rows (approximately)
/*!40000 ALTER TABLE `class` DISABLE KEYS */;
INSERT INTO `class` (`CLASS_ID`, `CLASS_CODE`, `CLASS_NAME`, `START_DATE`, `END_DATE`) VALUES
	(1, 'LTHDT1', 'Lập trình hướng đối tượng', '2023-10-10 19:49:35', '2024-01-10 19:49:46'),
	(2, 'LTNC', 'Lập trình nâng cao', '2023-10-10 20:09:46', '2024-01-11 20:09:50');
/*!40000 ALTER TABLE `class` ENABLE KEYS */;

-- Dumping structure for table attendance.comm_code
CREATE TABLE IF NOT EXISTS `comm_code` (
  `COMM_CODE` varchar(10) NOT NULL,
  `COMM_NAME` varchar(100) DEFAULT NULL,
  `PARENT` varchar(10) CHARACTER SET utf8 DEFAULT NULL,
  PRIMARY KEY (`COMM_CODE`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table attendance.comm_code: ~5 rows (approximately)
/*!40000 ALTER TABLE `comm_code` DISABLE KEYS */;
INSERT INTO `comm_code` (`COMM_CODE`, `COMM_NAME`, `PARENT`) VALUES
	('01', 'Trạng thái điểm danh', NULL),
	('01-01', 'Chưa điểm danh', '01'),
	('01-02', 'Đã điểm danh', '01'),
	('01-03', 'Đi muộn', '01'),
	('01-04', 'Nghỉ học', '01');
/*!40000 ALTER TABLE `comm_code` ENABLE KEYS */;

-- Dumping structure for table attendance.history_of_attendance
CREATE TABLE IF NOT EXISTS `history_of_attendance` (
  `HIS_ID` int(11) NOT NULL AUTO_INCREMENT,
  `CLASS_ID` int(11) DEFAULT NULL,
  `LESSON` int(11) DEFAULT NULL,
  `CREATED_DATE` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`HIS_ID`),
  KEY `FK__class` (`CLASS_ID`),
  CONSTRAINT `FK__class` FOREIGN KEY (`CLASS_ID`) REFERENCES `class` (`CLASS_ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table attendance.history_of_attendance: ~3 rows (approximately)
/*!40000 ALTER TABLE `history_of_attendance` DISABLE KEYS */;
INSERT INTO `history_of_attendance` (`HIS_ID`, `CLASS_ID`, `LESSON`, `CREATED_DATE`) VALUES
	(6, 1, 1, '2023-11-18 16:29:25'),
	(7, 1, 2, '2023-11-18 16:29:25'),
	(8, 1, 3, '2023-11-19 18:38:00');
/*!40000 ALTER TABLE `history_of_attendance` ENABLE KEYS */;

-- Dumping structure for table attendance.point
CREATE TABLE IF NOT EXISTS `point` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `USER_ID` varchar(50) DEFAULT NULL,
  `CLASS_ID` varchar(50) DEFAULT NULL,
  `SUBJECT_ID` varchar(50) DEFAULT NULL,
  `POINT` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=457 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table attendance.point: ~4 rows (approximately)
/*!40000 ALTER TABLE `point` DISABLE KEYS */;
INSERT INTO `point` (`ID`, `USER_ID`, `CLASS_ID`, `SUBJECT_ID`, `POINT`) VALUES
	(449, '2', '1', NULL, 10),
	(450, '6', '1', NULL, 0),
	(451, '7', '1', NULL, 0),
	(452, '14', '1', NULL, 0);
/*!40000 ALTER TABLE `point` ENABLE KEYS */;

-- Dumping structure for table attendance.user
CREATE TABLE IF NOT EXISTS `user` (
  `USER_ID` int(11) NOT NULL AUTO_INCREMENT,
  `USER_NAME` varchar(200) DEFAULT NULL,
  `NAME` varchar(200) DEFAULT NULL,
  `PASSWORD` varchar(200) DEFAULT NULL,
  `BIRTH_DATE` timestamp NULL DEFAULT NULL,
  `GENDER` bit(1) DEFAULT NULL,
  `EMAIL` varchar(50) DEFAULT NULL,
  `ROLE_ID` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`USER_ID`),
  KEY `ROLE_ID` (`ROLE_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table attendance.user: ~10 rows (approximately)
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` (`USER_ID`, `USER_NAME`, `NAME`, `PASSWORD`, `BIRTH_DATE`, `GENDER`, `EMAIL`, `ROLE_ID`) VALUES
	(1, 'gv1', 'Nguyễn Thị Hồng', '$2a$10$Qh2Gi3w4tT3klKIYazWvu.84Qkjj1QV1leeV98Tado5FhxjBnUFEK', '2022-12-15 00:00:00', b'0', 'ltinh1913@gmail.com', 'ROLE002'),
	(2, '19810310008', 'Nguyễn Văn Nam', '$2a$10$dt57pi5QQYqPKxvXaBWK/ef6CrNiW93/KqZcw.IseOnclR8voEf5i', '2021-12-14 00:00:00', b'1', 'nam123321@gmail.comm', 'ROLE003'),
	(5, 'admin', 'Phan Dung', '$2a$10$Qh2Gi3w4tT3klKIYazWvu.84Qkjj1QV1leeV98Tado5FhxjBnUFEK', '2001-09-05 00:00:00', b'0', NULL, 'ROLE001'),
	(6, '19810310009', 'Nguyễn Việt Anh', '$2a$10$dt57pi5QQYqPKxvXaBWK/ef6CrNiW93/KqZcw.IseOnclR8voEf5i', '2022-12-10 20:04:54', b'1', NULL, 'ROLE003'),
	(7, '19810310010', 'Trần Thị Ánh', '$2a$10$dt57pi5QQYqPKxvXaBWK/ef6CrNiW93/KqZcw.IseOnclR8voEf5i', '2022-12-10 20:04:54', b'0', NULL, 'ROLE003'),
	(13, '19810310016', 'Tạ Văn Nam', '$2a$10$dt57pi5QQYqPKxvXaBWK/ef6CrNiW93/KqZcw.IseOnclR8voEf5i', '2022-12-10 20:04:54', b'1', NULL, 'ROLE003'),
	(14, '19810310017', 'Vũ Tiến Long', '$2a$10$dt57pi5QQYqPKxvXaBWK/ef6CrNiW93/KqZcw.IseOnclR8voEf5i', '2022-12-10 20:04:54', b'1', NULL, 'ROLE003'),
	(15, 'gv2', 'Nguyễn Văn Tuấn', '$2a$10$Qh2Gi3w4tT3klKIYazWvu.84Qkjj1QV1leeV98Tado5FhxjBnUFEK', '2022-12-15 22:52:53', b'1', NULL, 'ROLE002'),
	(18, '695105008', 'Nguyen Van Binh', '$2a$10$HO8YwvbIExmFkC86jd4qwuhj5LnAsN8fDXUp3y3JzORjDI7/Vucoe', '2023-10-30 00:00:00', b'1', 'binh1234@gmail.com', 'ROLE001');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;

-- Dumping structure for table attendance.user_class
CREATE TABLE IF NOT EXISTS `user_class` (
  `CLASS_ID` int(11) NOT NULL,
  `USER_ID` int(11) NOT NULL,
  PRIMARY KEY (`CLASS_ID`,`USER_ID`),
  KEY `FK_user_class_user` (`USER_ID`),
  CONSTRAINT `FK_user_class_class` FOREIGN KEY (`CLASS_ID`) REFERENCES `class` (`CLASS_ID`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `FK_user_class_user` FOREIGN KEY (`USER_ID`) REFERENCES `user` (`USER_ID`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table attendance.user_class: ~9 rows (approximately)
/*!40000 ALTER TABLE `user_class` DISABLE KEYS */;
INSERT INTO `user_class` (`CLASS_ID`, `USER_ID`) VALUES
	(1, 1),
	(1, 2),
	(1, 6),
	(1, 7),
	(1, 14),
	(2, 6),
	(2, 13),
	(2, 14),
	(2, 15);
/*!40000 ALTER TABLE `user_class` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
