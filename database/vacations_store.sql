-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: db
-- Generation Time: Apr 15, 2025 at 12:53 PM
-- Server version: 9.2.0
-- PHP Version: 8.2.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `vacations_store`
--
CREATE DATABASE IF NOT EXISTS `vacations_store` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `vacations_store`;

-- --------------------------------------------------------

--
-- Table structure for table `follows`
--

CREATE TABLE `follows` (
  `user_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `vacation_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `follows`
--

INSERT INTO `follows` (`user_id`, `vacation_id`, `created_at`, `updated_at`) VALUES
('77759405-19f5-11f0-aadb-0242ac110002', '11df6c80-19f8-11f0-aadb-0242ac110002', '2025-03-19 15:49:46', '2025-03-19 15:49:46'),
('77759849-19f5-11f0-aadb-0242ac110002', '11df79de-19f8-11f0-aadb-0242ac110002', '2025-03-19 15:49:46', '2025-03-19 15:49:46'),
('77759849-19f5-11f0-aadb-0242ac110002', '11df8d08-19f8-11f0-aadb-0242ac110002', '2025-03-19 15:49:46', '2025-03-19 15:49:46'),
('77759b71-19f5-11f0-aadb-0242ac110002', '11df7743-19f8-11f0-aadb-0242ac110002', '2025-03-19 15:49:46', '2025-03-19 15:49:46'),
('77759e6f-19f5-11f0-aadb-0242ac110002', '11df7c57-19f8-11f0-aadb-0242ac110002', '2025-03-19 15:49:46', '2025-03-19 15:49:46');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `first_name` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `last_name` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(64) COLLATE utf8mb4_general_ci NOT NULL,
  `role` enum('user','admin') COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'user',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `first_name`, `last_name`, `email`, `password`, `role`, `created_at`, `updated_at`) VALUES
('77758093-19f5-11f0-aadb-0242ac110002', 'admin', 'user', 'admin@gmail.com"', '123456', 'admin', '2025-03-18 15:27:06', '2025-03-18 15:27:06'),
('77759405-19f5-11f0-aadb-0242ac110002', 'mishel', 'mimi', 'mishel@gmail.com', '123456', 'user', '2025-03-18 15:27:06', '2025-03-18 15:27:06'),
('77759849-19f5-11f0-aadb-0242ac110002', 'anna', 'anna', 'anna@gmail.com', '123456', 'user', '2025-03-18 15:27:06', '2025-03-18 15:27:06'),
('77759b71-19f5-11f0-aadb-0242ac110002', 'mimi', 'levi', 'levi@gmail.com', '9876543', 'user', '2025-03-18 15:27:06', '2025-03-18 15:27:06'),
('77759e6f-19f5-11f0-aadb-0242ac110002', 'yan', 'belo', 'belo@gmail.com', 'belo12345', 'user', '2025-03-18 15:27:06', '2025-03-18 15:27:06');

-- --------------------------------------------------------

--
-- Table structure for table `vacations`
--

CREATE TABLE `vacations` (
  `vacation_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `destination` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `vacation_destination` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `starting_date` datetime NOT NULL,
  `ending_date` datetime NOT NULL,
  `price` int NOT NULL,
  `image_url` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vacations`
--

INSERT INTO `vacations` (`vacation_id`, `destination`, `vacation_destination`, `starting_date`, `ending_date`, `price`, `image_url`, `created_at`, `updated_at`) VALUES
('11df6c80-19f8-11f0-aadb-0242ac110002', 'Rome', 'Explore ancient ruins and enjoy authentic Italian cuisine in the Eternal City', '2025-05-01 00:00:00', '2025-05-07 00:00:00', 2200, 'https://i.natgeofe.com/k/a6c9f195-de20-445d-9d36-745ef56042c5/OG_Colosseum_Ancient-Rome_KIDS_1122_3x2.jpg', '2025-03-18 15:31:49', '2025-03-18 15:31:49'),
('11df7470-19f8-11f0-aadb-0242ac110002', 'London', 'Discover royal landmarks and vibrant street life in iconic London', '2025-06-10 00:00:00', '2025-06-17 00:00:00', 3400, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTM9Pje6InJB1hi_zURFy3rqPtgIFRVALN0Zg&s', '2025-03-18 15:31:49', '2025-03-18 15:31:49'),
('11df7743-19f8-11f0-aadb-0242ac110002', 'Barcelona', 'Enjoy sunny beaches and Gaudi architecture in colorful Barcelona', '2025-07-05 00:00:00', '2025-07-12 00:00:00', 3100, 'https://d3dqioy2sca31t.cloudfront.net/Projects/cms/production/000/020/484/original/d0531471711b367b94abfd4dbc29e6ae/spain-barcelona-sagrada-familia-080416-az.jpg', '2025-03-18 15:31:49', '2025-03-18 15:31:49'),
('11df79de-19f8-11f0-aadb-0242ac110002', 'Paris', 'Fall in love with Parisian streets, cafés, and the Eiffel Tower', '2025-08-15 00:00:00', '2025-08-22 00:00:00', 4000, 'https://img.static-af.com/transform/45cb9a13-b167-4842-8ea8-05d0cc7a4d04/', '2025-03-18 15:31:49', '2025-03-18 15:31:49'),
('11df7c57-19f8-11f0-aadb-0242ac110002', 'Athens', 'Step into history with a view of the Acropolis and Greek temples', '2025-09-01 00:00:00', '2025-09-07 00:00:00', 2000, 'https://hhotels.gr/wp-content/uploads/2024/05/shutterstock_2383537395-1-1350x900.jpg', '2025-03-18 15:31:49', '2025-03-18 15:31:49'),
('11df7eca-19f8-11f0-aadb-0242ac110002', 'Prague', 'Wander through charming old streets and fairy-tale castles in Prague', '2025-10-12 00:00:00', '2025-10-19 00:00:00', 2900, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAgYwlGqHyil0TzF0CFOu-36nLGpyDj1gGlg&s', '2025-03-18 15:31:49', '2025-03-18 15:31:49'),
('11df8136-19f8-11f0-aadb-0242ac110002', 'Berlin', 'Dive into a mix of rich history and modern art in Berlin', '2025-11-02 00:00:00', '2025-11-09 00:00:00', 2500, 'https://www.visitberlin.de/system/files/styles/visitberlin_hero_visitberlin_desktop_2x/private/image/Panorama_Berlin_Mitte_GettyImages-648821756_Getty_Images_Foto_bluejayphoto_web.jpg.webp?itok=5fogI9zf', '2025-03-18 15:31:49', '2025-03-18 15:31:49'),
('11df839e-19f8-11f0-aadb-0242ac110002', 'Vienna', 'Experience elegance, classical music, and cozy cafés in Vienna.\"', '2025-12-20 00:00:00', '2025-12-27 00:00:00', 3300, 'https://thetourguy.com/wp-content/uploads/2023/01/TTTD-Vienna-feature-1440-675.jpg', '2025-03-18 15:31:49', '2025-03-18 15:31:49'),
('11df85f1-19f8-11f0-aadb-0242ac110002', 'Amsterdam', 'Cruise along canals and enjoy Dutch culture in Amsterdam', '2026-01-10 00:00:00', '2026-01-17 00:00:00', 3600, 'https://i.natgeofe.com/n/1fee60b1-4bd7-449b-84aa-1ffd3a72b271/2XGHK2T.jpg', '2025-03-18 15:31:49', '2025-03-18 15:31:49'),
('11df8860-19f8-11f0-aadb-0242ac110002', 'New York', 'Feel the energy of the Big Apple with skyscrapers and Broadway shows', '2026-02-15 00:00:00', '2026-02-22 00:00:00', 4500, 'https://idsb.tmgrup.com.tr/ly/uploads/images/2024/04/09/thumbs/800x531/323101.jpg', '2025-03-18 15:31:49', '2025-03-18 15:31:49'),
('11df8ab5-19f8-11f0-aadb-0242ac110002', 'Bangkok', 'Explore vibrant street markets, temples, and Thai street food', '2026-03-10 00:00:00', '2026-03-24 00:00:00', 3700, 'https://static.independent.co.uk/2025/01/03/14/newFile-12.jpg', '2025-03-18 15:31:49', '2025-03-18 15:31:49'),
('11df8d08-19f8-11f0-aadb-0242ac110002', 'Tokyo', 'Immerse yourself in futuristic tech and ancient traditions in Tokyo', '2026-04-01 00:00:00', '2026-04-10 00:00:00', 4200, 'https://images.squarespace-cdn.com/content/v1/5b228bd689c172172ab88d9c/1501f7d6-87ac-445c-a87b-e9ff9551ccaa/_DSF5280-Enhanced-NR.jpg', '2025-03-18 15:31:49', '2025-03-18 15:31:49');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `follows`
--
ALTER TABLE `follows`
  ADD PRIMARY KEY (`user_id`,`vacation_id`),
  ADD UNIQUE KEY `follows_vacationId_userId_unique` (`user_id`,`vacation_id`),
  ADD KEY `vacation_id` (`vacation_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `users_email` (`email`);

--
-- Indexes for table `vacations`
--
ALTER TABLE `vacations`
  ADD PRIMARY KEY (`vacation_id`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `follows`
--
ALTER TABLE `follows`
  ADD CONSTRAINT `follows_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `follows_ibfk_2` FOREIGN KEY (`vacation_id`) REFERENCES `vacations` (`vacation_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
