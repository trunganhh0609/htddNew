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
  `NUM_CLASS_PERIOD` int(11) DEFAULT NULL,
  `CREATED_DATE` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `FK_attendance_comm_code` (`STATUS`),
  KEY `FK_attendance_user` (`USER_ID`),
  KEY `FK_attendance_class` (`CLASS_ID`),
  CONSTRAINT `FK_attendance_class` FOREIGN KEY (`CLASS_ID`) REFERENCES `class` (`CLASS_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_attendance_comm_code` FOREIGN KEY (`STATUS`) REFERENCES `comm_code` (`COMM_CODE`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_attendance_user` FOREIGN KEY (`USER_ID`) REFERENCES `user` (`USER_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table attendance.attendance: ~16 rows (approximately)
/*!40000 ALTER TABLE `attendance` DISABLE KEYS */;
INSERT INTO `attendance` (`ID`, `USER_ID`, `CLASS_ID`, `LESSON`, `DEVICE_ID`, `STATUS`, `NUM_CLASS_PERIOD`, `CREATED_DATE`) VALUES
	(29, 2, 1, 1, NULL, '01-02', 3, '2023-11-18 16:29:26'),
	(30, 6, 1, 1, NULL, '01-04', 3, '2023-11-18 16:29:26'),
	(31, 7, 1, 1, NULL, '01-04', 3, '2023-11-18 16:29:26'),
	(32, 14, 1, 1, NULL, '01-04', 3, '2023-11-18 16:29:26'),
	(33, 2, 1, 2, NULL, '01-03', 2, '2023-11-18 16:29:26'),
	(34, 6, 1, 2, NULL, '01-04', 3, '2023-11-18 16:29:26'),
	(35, 7, 1, 2, NULL, '01-04', 3, '2023-11-18 16:29:26'),
	(36, 14, 1, 2, NULL, '01-04', 3, '2023-11-18 16:29:26'),
	(45, 2, 1, 14, NULL, '01-04', 0, '2024-01-09 20:50:50'),
	(46, 6, 1, 14, NULL, '01-04', 0, '2024-01-09 20:50:50'),
	(47, 7, 1, 14, NULL, '01-04', 0, '2024-01-09 20:50:50'),
	(48, 14, 1, 14, NULL, '01-04', 0, '2024-01-09 20:50:50'),
	(49, 2, 1, 14, NULL, '01-04', 0, '2024-01-09 21:03:35'),
	(50, 6, 1, 14, NULL, '01-04', 0, '2024-01-09 21:03:35'),
	(51, 7, 1, 14, NULL, '01-04', 0, '2024-01-09 21:03:35'),
	(52, 14, 1, 14, NULL, '01-04', 0, '2024-01-09 21:03:35');
/*!40000 ALTER TABLE `attendance` ENABLE KEYS */;

-- Dumping structure for table attendance.class
CREATE TABLE IF NOT EXISTS `class` (
  `CLASS_ID` int(11) NOT NULL AUTO_INCREMENT,
  `CLASS_CODE` varchar(50) DEFAULT NULL,
  `CLASS_NAME` varchar(50) DEFAULT NULL,
  `TOTAL_CLASS_PERIOD` int(11) DEFAULT NULL,
  `START_DATE` datetime DEFAULT NULL,
  `END_DATE` datetime DEFAULT NULL,
  `STATUS` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`CLASS_ID`),
  KEY `FK_class_comm_code` (`STATUS`),
  CONSTRAINT `FK_class_comm_code` FOREIGN KEY (`STATUS`) REFERENCES `comm_code` (`COMM_CODE`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table attendance.class: ~5 rows (approximately)
/*!40000 ALTER TABLE `class` DISABLE KEYS */;
INSERT INTO `class` (`CLASS_ID`, `CLASS_CODE`, `CLASS_NAME`, `TOTAL_CLASS_PERIOD`, `START_DATE`, `END_DATE`, `STATUS`) VALUES
	(1, 'LTHDT1', 'Lập trình hướng đối tượng', 60, '2023-10-10 00:00:00', '2024-02-10 00:00:00', '02-02'),
	(2, 'LTNC', 'Lập trình nâng cao', 60, '2023-10-10 20:09:46', '2024-01-11 20:09:50', '02-02'),
	(8, 'jjj', 'test', 50, '2023-12-27 00:00:00', '2023-03-27 00:00:00', '02-03'),
	(9, 'eee', 'Lập trình  C#', 90, '2024-01-08 00:00:00', '2024-06-08 00:00:00', '02-01'),
	(10, 'ltc#', 'C#', 80, '2024-01-08 00:00:00', '2024-04-08 00:00:00', '02-01');
/*!40000 ALTER TABLE `class` ENABLE KEYS */;

-- Dumping structure for table attendance.comm_code
CREATE TABLE IF NOT EXISTS `comm_code` (
  `COMM_CODE` varchar(10) NOT NULL,
  `COMM_NAME` varchar(100) DEFAULT NULL,
  `PARENT` varchar(10) CHARACTER SET utf8 DEFAULT NULL,
  PRIMARY KEY (`COMM_CODE`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table attendance.comm_code: ~9 rows (approximately)
/*!40000 ALTER TABLE `comm_code` DISABLE KEYS */;
INSERT INTO `comm_code` (`COMM_CODE`, `COMM_NAME`, `PARENT`) VALUES
	('01', 'Trạng thái điểm danh', NULL),
	('01-01', 'Chưa điểm danh', '01'),
	('01-02', 'Đã điểm danh', '01'),
	('01-03', 'Đi muộn', '01'),
	('01-04', 'Nghỉ học', '01'),
	('02', 'Trạng thái lớp học', NULL),
	('02-01', 'Chưa học', '02'),
	('02-02', 'Đang học', '02'),
	('02-03', 'Đã kết thúc', '02');
/*!40000 ALTER TABLE `comm_code` ENABLE KEYS */;

-- Dumping structure for table attendance.history_of_attendance
CREATE TABLE IF NOT EXISTS `history_of_attendance` (
  `HIS_ID` int(11) NOT NULL AUTO_INCREMENT,
  `CLASS_ID` int(11) DEFAULT NULL,
  `LESSON` int(11) DEFAULT NULL,
  `NUM_CLASS_PERIOD` int(11) DEFAULT NULL,
  `CREATED_DATE` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`HIS_ID`),
  KEY `FK__class` (`CLASS_ID`),
  CONSTRAINT `FK__class` FOREIGN KEY (`CLASS_ID`) REFERENCES `class` (`CLASS_ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table attendance.history_of_attendance: ~3 rows (approximately)
/*!40000 ALTER TABLE `history_of_attendance` DISABLE KEYS */;
INSERT INTO `history_of_attendance` (`HIS_ID`, `CLASS_ID`, `LESSON`, `NUM_CLASS_PERIOD`, `CREATED_DATE`) VALUES
	(6, 1, 1, 3, '2023-11-18 16:29:25'),
	(7, 1, 2, 3, '2023-11-18 16:29:25'),
	(17, 1, 14, 4, '2024-01-09 20:45:49');
/*!40000 ALTER TABLE `history_of_attendance` ENABLE KEYS */;

-- Dumping structure for table attendance.point
CREATE TABLE IF NOT EXISTS `point` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `USER_ID` varchar(50) DEFAULT NULL,
  `CLASS_ID` varchar(50) DEFAULT NULL,
  `POINT` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=465 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table attendance.point: ~4 rows (approximately)
/*!40000 ALTER TABLE `point` DISABLE KEYS */;
INSERT INTO `point` (`ID`, `USER_ID`, `CLASS_ID`, `POINT`) VALUES
	(461, '2', '1', 0),
	(462, '6', '1', 10),
	(463, '7', '1', 10),
	(464, '14', '1', 10);
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
  `CREATED_DATE` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`USER_ID`),
  KEY `ROLE_ID` (`ROLE_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table attendance.user: ~10 rows (approximately)
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` (`USER_ID`, `USER_NAME`, `NAME`, `PASSWORD`, `BIRTH_DATE`, `GENDER`, `EMAIL`, `ROLE_ID`, `CREATED_DATE`) VALUES
	(1, 'gv1', 'Nguyễn Thị Hồng', '$2a$10$Qh2Gi3w4tT3klKIYazWvu.84Qkjj1QV1leeV98Tado5FhxjBnUFEK', '2022-12-15 00:00:00', b'0', 'ltinh1913@gmail.com', 'ROLE002', '2023-12-29 19:54:09'),
	(2, '19810310008', 'Nguyễn Văn Nam', '$2a$10$dt57pi5QQYqPKxvXaBWK/ef6CrNiW93/KqZcw.IseOnclR8voEf5i', '2021-12-14 00:00:00', b'1', 'nam123321@gmail.comm', 'ROLE003', '2023-12-29 19:54:13'),
	(5, 'admin', 'Phan Dung', '$2a$10$Qh2Gi3w4tT3klKIYazWvu.84Qkjj1QV1leeV98Tado5FhxjBnUFEK', '2001-09-05 00:00:00', b'0', NULL, 'ROLE001', '2023-12-29 19:54:06'),
	(6, '19810310009', 'Nguyễn Việt Anh', '$2a$10$dt57pi5QQYqPKxvXaBWK/ef6CrNiW93/KqZcw.IseOnclR8voEf5i', '2022-12-10 20:04:54', b'1', NULL, 'ROLE003', '2023-12-29 19:54:15'),
	(7, '19810310010', 'Trần Thị Ánh', '$2a$10$dt57pi5QQYqPKxvXaBWK/ef6CrNiW93/KqZcw.IseOnclR8voEf5i', '2022-12-10 20:04:54', b'0', NULL, 'ROLE003', '2023-12-29 19:54:11'),
	(13, '19810310016', 'Tạ Văn Nam', '$2a$10$dt57pi5QQYqPKxvXaBWK/ef6CrNiW93/KqZcw.IseOnclR8voEf5i', '2022-12-10 20:04:54', b'1', NULL, 'ROLE003', '2023-12-29 19:54:17'),
	(14, '19810310017', 'Vũ Tiến Long', '$2a$10$dt57pi5QQYqPKxvXaBWK/ef6CrNiW93/KqZcw.IseOnclR8voEf5i', '2022-12-10 20:04:54', b'1', NULL, 'ROLE003', '2023-12-29 19:54:16'),
	(15, 'gv2', 'Nguyễn Văn Tuấn', '$2a$10$Qh2Gi3w4tT3klKIYazWvu.84Qkjj1QV1leeV98Tado5FhxjBnUFEK', '2022-12-15 22:52:53', b'1', NULL, 'ROLE002', '2023-12-29 19:54:10'),
	(18, '695105008', 'Nguyen Van Binh', '$2a$10$HO8YwvbIExmFkC86jd4qwuhj5LnAsN8fDXUp3y3JzORjDI7/Vucoe', '2023-10-30 00:00:00', b'1', 'binh1234@gmail.com', 'ROLE001', '2023-12-29 19:54:08'),
	(19, '19810310018', 'Nguyen Van Hai', '$2a$10$1c3vu41QqTKZ3CkGIWpAAul6YimsAoQcFrY37bxV/LZAySuZhD4HO', '2000-02-02 00:00:00', b'1', 'hai1221@gmail.com', 'ROLE003', '2023-12-29 20:18:45');
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

-- Dumping data for table attendance.user_class: ~12 rows (approximately)
/*!40000 ALTER TABLE `user_class` DISABLE KEYS */;
INSERT INTO `user_class` (`CLASS_ID`, `USER_ID`) VALUES
	(1, 1),
	(1, 2),
	(1, 6),
	(1, 7),
	(1, 14),
	(1, 18),
	(2, 6),
	(2, 13),
	(2, 14),
	(2, 15),
	(8, 15),
	(10, 1);
/*!40000 ALTER TABLE `user_class` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
