-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 06, 2019 at 12:12 PM
-- Server version: 10.1.37-MariaDB
-- PHP Version: 7.3.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `r_server`
--

-- --------------------------------------------------------

--
-- Table structure for table `beverages`
--

CREATE TABLE `beverages` (
  `id` double NOT NULL,
  `resto_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `price` double NOT NULL,
  `img_name` varchar(100) NOT NULL,
  `date_created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `beverages`
--

INSERT INTO `beverages` (`id`, `resto_id`, `name`, `price`, `img_name`, `date_created`) VALUES
(2, 346, 'sample drink', 250, '1556600174.jpg', '2019-04-29 22:56:14'),
(3, 346, 'cafe', 250, '1556610317.jpg', '2019-04-30 01:45:17'),
(4, 351, 'dr8nks', 250, '1556850523.jpg', '2019-05-02 20:28:43'),
(22, 348, 'sample', 250, '5ccc3a3c953d415568881240.jpg', '2019-05-03 12:55:24'),
(23, 348, 'sample', 250, '5ccc3a5dde50315568881570.jpg', '2019-05-03 12:55:57');

-- --------------------------------------------------------

--
-- Table structure for table `beveragesreviews`
--

CREATE TABLE `beveragesreviews` (
  `id` int(11) NOT NULL,
  `beverages_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `review` varchar(150) NOT NULL,
  `rate` int(11) DEFAULT '5',
  `date_created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `beveragesreviews`
--

INSERT INTO `beveragesreviews` (`id`, `beverages_id`, `user_id`, `review`, `rate`, `date_created`) VALUES
(1, 2, 1, 'awd646', 5, '2019-05-03 15:28:19'),
(2, 2, 1, 'drink 1', 5, '2019-05-03 15:37:37'),
(3, 2, 1, 'dring with pics', 5, '2019-05-03 15:38:04'),
(4, 2, 1, 'floating', 5, '2019-05-03 15:47:13'),
(5, 2, 1, 'floating 2', 5, '2019-05-03 15:48:22'),
(6, 2, 1, 'yepey', 3, '2019-05-04 04:34:14'),
(7, 23, 1, 'yehey', 5, '2019-05-04 04:35:16'),
(8, 23, 1, 'yehey2', 2, '2019-05-04 04:35:45');

-- --------------------------------------------------------

--
-- Table structure for table `beveragesreviews_img`
--

CREATE TABLE `beveragesreviews_img` (
  `id` int(11) NOT NULL,
  `beveragesreviews_id` int(11) NOT NULL,
  `img` varchar(50) NOT NULL,
  `date_created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `beveragesreviews_img`
--

INSERT INTO `beveragesreviews_img` (`id`, `beveragesreviews_id`, `img`, `date_created`) VALUES
(1, 2, 'review/5ccc605c28d2715568978840.jpg', '2019-05-03 15:38:04'),
(2, 2, 'review/5ccc605c747b015568978841.jpg', '2019-05-03 15:38:04'),
(3, 4, 'review/5ccc62814557815568984330.jpg', '2019-05-03 15:47:13'),
(4, 4, 'review/5ccc62815b17d15568984331.jpg', '2019-05-03 15:47:13'),
(5, 5, 'review/5ccc62c66a6e415568985020.jpg', '2019-05-03 15:48:22'),
(6, 5, 'review/5ccc62c682fe915568985021.jpg', '2019-05-03 15:48:22'),
(7, 6, 'review/5ccd16467fe5f15569444540.jpg', '2019-05-04 04:34:14'),
(8, 7, 'review/5ccd1684b42b615569445160.jpg', '2019-05-04 04:35:16'),
(9, 8, 'review/5ccd16a1a3c5315569445450.jpg', '2019-05-04 04:35:45'),
(10, 8, 'review/5ccd16a1c3b5a15569445451.jpg', '2019-05-04 04:35:45');

-- --------------------------------------------------------

--
-- Table structure for table `desserts`
--

CREATE TABLE `desserts` (
  `id` double NOT NULL,
  `resto_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `price` double NOT NULL,
  `img_name` varchar(100) NOT NULL,
  `date_created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `desserts`
--

INSERT INTO `desserts` (`id`, `resto_id`, `name`, `price`, `img_name`, `date_created`) VALUES
(1, 346, 'gsghhs', 500, '5ccbff9985c5a15568731130.jpg', '2019-05-03 08:45:13'),
(2, 346, 'gsghhs', 500, '5ccbffa17ea2015568731210.jpg', '2019-05-03 08:45:21');

-- --------------------------------------------------------

--
-- Table structure for table `dessertsreviews`
--

CREATE TABLE `dessertsreviews` (
  `id` int(11) NOT NULL,
  `desserts_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `review` varchar(150) NOT NULL,
  `rate` int(11) NOT NULL DEFAULT '5',
  `date_created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `dessertsreviews`
--

INSERT INTO `dessertsreviews` (`id`, `desserts_id`, `user_id`, `review`, `rate`, `date_created`) VALUES
(1, 1, 1, 'sample bi', 5, '2019-05-03 15:28:43'),
(2, 1, 1, 'sample ', 5, '2019-05-03 15:38:47'),
(3, 1, 1, 'sample qith pics', 5, '2019-05-03 15:39:22'),
(4, 1, 1, 'head ', 5, '2019-05-03 15:49:18');

-- --------------------------------------------------------

--
-- Table structure for table `dessertsreviews_img`
--

CREATE TABLE `dessertsreviews_img` (
  `id` int(11) NOT NULL,
  `dessertsreviews_id` int(11) NOT NULL,
  `img` varchar(50) NOT NULL,
  `date_created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `dessertsreviews_img`
--

INSERT INTO `dessertsreviews_img` (`id`, `dessertsreviews_id`, `img`, `date_created`) VALUES
(1, 1, 'review/5ccc60aa096c915568979620.jpg', '0000-00-00 00:00:00'),
(2, 1, 'review/5ccc60aa23af015568979621.jpg', '0000-00-00 00:00:00'),
(3, 4, 'review/5ccc62fe9a22e15568985580.jpg', '2019-05-03 15:49:18'),
(4, 4, 'review/5ccc62feb16cc15568985581.jpg', '2019-05-03 15:49:18');

-- --------------------------------------------------------

--
-- Table structure for table `food`
--

CREATE TABLE `food` (
  `id` double NOT NULL,
  `resto_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `price` double NOT NULL,
  `img_name` varchar(100) NOT NULL,
  `date_created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `food`
--

INSERT INTO `food` (`id`, `resto_id`, `name`, `price`, `img_name`, `date_created`) VALUES
(12, 346, 'Adobo', 250, '1556164204.jpg', '2019-04-24 21:50:04'),
(13, 347, 'Sagol2', 500, '1556164265.jpg', '2019-05-03 04:00:49'),
(14, 347, 'Embutiso', 250, '1556164287.jpg', '2019-05-03 04:00:53'),
(15, 348, 'escabetse', 250, '1556250146.jpg', '2019-04-25 21:42:26'),
(16, 348, 'hsjsjs', 79796, '1556537283.jpg', '2019-04-29 05:28:03'),
(17, 353, 'kenneth specialy', 50, '1556632685.jpg', '2019-04-30 07:58:05'),
(18, 353, 'kenneth specialy', 50, '1556632685.jpg', '2019-04-30 07:58:05'),
(19, 346, '500', 250, 'awdawd', '2019-05-03 07:54:54'),
(20, 346, '500', 250, 'awdawd', '2019-05-03 07:58:05'),
(33, 351, 'ghhh', 250, '5ccc3b6a9594015568884260.jpg', '2019-05-03 13:00:26'),
(34, 348, 'taki taki', 250, '5ccd975adf96715569774982.jpg', '2019-05-04 13:44:58'),
(35, 348, 'taki taki', 250, '5ccd975e3559f15569775022.jpg', '2019-05-04 13:45:02'),
(36, 348, 'taki taki', 250, '5ccd9764c95ee15569775082.jpg', '2019-05-04 13:45:08'),
(37, 348, 'taki taki', 250, '5ccd9765be7d615569775092.jpg', '2019-05-04 13:45:09'),
(38, 348, 'taki taki', 250, '5ccd9765d54c315569775092.jpg', '2019-05-04 13:45:09'),
(39, 348, 'taki taki', 250, '5ccd976603bf115569775102.jpg', '2019-05-04 13:45:10'),
(40, 348, 'taki taki', 250, '5ccd9766313e615569775102.jpg', '2019-05-04 13:45:10'),
(41, 348, 'taki taki', 250, '5ccd97665ed2515569775102.jpg', '2019-05-04 13:45:10');

-- --------------------------------------------------------

--
-- Table structure for table `impress`
--

CREATE TABLE `impress` (
  `id` int(11) NOT NULL,
  `resto_id` int(11) NOT NULL,
  `img_name` varchar(25) NOT NULL,
  `date_created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `impress`
--

INSERT INTO `impress` (`id`, `resto_id`, `img_name`, `date_created`) VALUES
(33, 346, 'impress/1556164142.jpg', '2019-04-24 21:49:02'),
(34, 346, 'impress/1556164153.jpg', '2019-04-24 21:49:13'),
(35, 346, 'impress/1556180209.jpg', '2019-04-25 02:16:50'),
(36, 346, 'impress/1556245724.jpg', '2019-04-25 20:28:44'),
(37, 346, 'impress/1556245777.jpg', '2019-04-25 20:29:37'),
(38, 346, 'impress/1556246035.jpg', '2019-04-25 20:33:55'),
(39, 346, 'impress/1556247364.jpg', '2019-04-25 20:56:04');

-- --------------------------------------------------------

--
-- Table structure for table `mealreviews`
--

CREATE TABLE `mealreviews` (
  `id` int(11) NOT NULL,
  `meal_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `review` varchar(150) NOT NULL,
  `rate` int(11) NOT NULL DEFAULT '5',
  `date_created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `mealreviews`
--

INSERT INTO `mealreviews` (`id`, `meal_id`, `user_id`, `review`, `rate`, `date_created`) VALUES
(232, 12, 1, 'sample', 5, '2019-05-04 04:17:21'),
(233, 12, 1, 'shit super', 5, '2019-05-04 04:31:26');

-- --------------------------------------------------------

--
-- Table structure for table `mealreviews_img`
--

CREATE TABLE `mealreviews_img` (
  `id` int(11) NOT NULL,
  `mealreview_id` int(11) NOT NULL,
  `img` varchar(50) NOT NULL,
  `date_created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `mealreviews_img`
--

INSERT INTO `mealreviews_img` (`id`, `mealreview_id`, `img`, `date_created`) VALUES
(44, 232, 'review/5ccd12514ab4d15569434410.jpg', '2019-05-04 04:17:21'),
(45, 232, 'review/5ccd1251663bc15569434411.jpg', '2019-05-04 04:17:21'),
(46, 232, 'review/5ccd12518216015569434412.jpg', '2019-05-04 04:17:21'),
(47, 233, 'review/5ccd159f1829615569442870.jpg', '2019-05-04 04:31:27'),
(48, 233, 'review/5ccd159f2d68615569442871.jpg', '2019-05-04 04:31:27'),
(49, 233, 'review/5ccd159f4660915569442872.jpg', '2019-05-04 04:31:27');

-- --------------------------------------------------------

--
-- Table structure for table `restos`
--

CREATE TABLE `restos` (
  `id` int(11) NOT NULL,
  `resto_name` varchar(50) NOT NULL,
  `user_id` int(11) NOT NULL,
  `resto_contact` varchar(30) NOT NULL,
  `resto_lat` double NOT NULL,
  `resto_long` double NOT NULL,
  `string_address` varchar(100) NOT NULL,
  `date_created` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `restos`
--

INSERT INTO `restos` (`id`, `resto_name`, `user_id`, `resto_contact`, `resto_lat`, `resto_long`, `string_address`, `date_created`) VALUES
(346, 'Gensan Resto Bar', 1, '63y2hhs', 6.1210262, 125.1682935, 'General Santos City, ', '2019-04-24 21:48:45'),
(347, 'awdawdaw', 0, '46456', 7.0817934, 125.6157315, 'General Santos City', '2019-04-25 01:13:10'),
(348, 'Dragon foods and Hotel', 1, 'hshshsjsjs', 6.1210262, 125.1682935, 'General Santos City, ', '2019-04-25 21:34:23'),
(349, 'hzhshh', 0, 'hshshsjsjs', 6.1210262, 125.1682935, 'General Santos City, ', '2019-04-25 21:38:01'),
(350, 'hzhshh', 0, 'hshshsjsjs', 6.1210262, 125.1682935, 'General Santos City, ', '2019-04-25 21:38:16'),
(351, 'awdawd', 1, '34543553', 14.2729216, 120.99338240000002, 'General Santos City', '2019-04-26 04:29:36'),
(352, 'hhsshsh', 1, 'ghssh', 6.123843873394469, 125.17052155348284, 'General Santos City, ', '2019-04-26 05:31:57'),
(353, 'kenety restaurant ', 0, '09109280535', 6.127291255088094, 125.16851053316266, 'General Santos City, ', '2019-04-30 07:57:46');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `beverages`
--
ALTER TABLE `beverages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `beveragesreviews`
--
ALTER TABLE `beveragesreviews`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `beveragesreviews_img`
--
ALTER TABLE `beveragesreviews_img`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `desserts`
--
ALTER TABLE `desserts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `dessertsreviews`
--
ALTER TABLE `dessertsreviews`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `dessertsreviews_img`
--
ALTER TABLE `dessertsreviews_img`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `food`
--
ALTER TABLE `food`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `impress`
--
ALTER TABLE `impress`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `mealreviews`
--
ALTER TABLE `mealreviews`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `mealreviews_img`
--
ALTER TABLE `mealreviews_img`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `restos`
--
ALTER TABLE `restos`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `beverages`
--
ALTER TABLE `beverages`
  MODIFY `id` double NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `beveragesreviews`
--
ALTER TABLE `beveragesreviews`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `beveragesreviews_img`
--
ALTER TABLE `beveragesreviews_img`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `desserts`
--
ALTER TABLE `desserts`
  MODIFY `id` double NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `dessertsreviews`
--
ALTER TABLE `dessertsreviews`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `dessertsreviews_img`
--
ALTER TABLE `dessertsreviews_img`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `food`
--
ALTER TABLE `food`
  MODIFY `id` double NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT for table `impress`
--
ALTER TABLE `impress`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT for table `mealreviews`
--
ALTER TABLE `mealreviews`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=234;

--
-- AUTO_INCREMENT for table `mealreviews_img`
--
ALTER TABLE `mealreviews_img`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- AUTO_INCREMENT for table `restos`
--
ALTER TABLE `restos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=354;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
