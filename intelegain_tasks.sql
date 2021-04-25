-- phpMyAdmin SQL Dump
-- version 4.6.6deb5ubuntu0.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Apr 26, 2021 at 01:38 AM
-- Server version: 5.7.32-0ubuntu0.18.04.1
-- PHP Version: 7.2.24-0ubuntu0.18.04.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `intelegain_tasks`
--

-- --------------------------------------------------------

--
-- Table structure for table `tasks`
--

CREATE TABLE `tasks` (
  `id` int(11) NOT NULL,
  `title` varchar(500) NOT NULL,
  `description` text NOT NULL,
  `due_date` datetime NOT NULL,
  `status_id` tinyint(4) NOT NULL DEFAULT '0',
  `created_by` int(11) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tasks`
--

INSERT INTO `tasks` (`id`, `title`, `description`, `due_date`, `status_id`, `created_by`, `created_at`, `updated_at`) VALUES
(1, 'UI Design for login page', 'Complete the login page UI Design as per wireframe.', '2021-04-28 00:00:00', 1, 1, '2021-04-25 21:45:24', '2021-04-25 21:45:24'),
(2, 'Design Signup Page', 'Complete the signup page as per wireframe', '2021-04-29 00:00:00', 1, 1, '2021-04-25 21:47:56', '2021-04-25 21:47:56');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `mobile` varchar(10) NOT NULL,
  `password` varchar(280) NOT NULL,
  `status_id` tinyint(4) NOT NULL DEFAULT '1',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `mobile`, `password`, `status_id`, `created_at`, `modified_at`) VALUES
(1, 'Anvesh', 'anvesh@gmail.com', '9999999990', '81dc9bdb52d04dc20036dbd8313ed055', 1, '2021-04-22 00:00:39', '2021-04-22 00:00:39'),
(2, 'John', 'john@gmail.com', '9999999991', '81dc9bdb52d04dc20036dbd8313ed055', 1, '2021-04-22 00:00:39', '2021-04-22 00:00:39'),
(3, 'Wesley', 'wesley@gmail.com', '9999999992', '81dc9bdb52d04dc20036dbd8313ed055', 1, '2021-04-22 00:00:39', '2021-04-22 00:00:39'),
(4, 'Digvijay', 'digvijay@gmail.com', '9999999993', '81dc9bdb52d04dc20036dbd8313ed055', 1, '2021-04-22 00:00:39', '2021-04-22 00:00:39');

-- --------------------------------------------------------

--
-- Table structure for table `user_tasks`
--

CREATE TABLE `user_tasks` (
  `user_id` int(11) NOT NULL,
  `task_id` int(11) NOT NULL,
  `status_id` tinyint(4) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user_tasks`
--

INSERT INTO `user_tasks` (`user_id`, `task_id`, `status_id`, `created_at`, `updated_at`) VALUES
(2, 2, 1, '2021-04-25 21:47:56', '2021-04-25 21:47:56'),
(4, 1, 1, '2021-04-25 21:45:24', '2021-04-25 21:45:24');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tasks`
--
ALTER TABLE `tasks`
  ADD PRIMARY KEY (`id`);
ALTER TABLE `tasks` ADD FULLTEXT KEY `title` (`title`,`description`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `mobile` (`mobile`);

--
-- Indexes for table `user_tasks`
--
ALTER TABLE `user_tasks`
  ADD UNIQUE KEY `user_id` (`user_id`,`task_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tasks`
--
ALTER TABLE `tasks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
