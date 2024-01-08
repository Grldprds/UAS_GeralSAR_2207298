-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 08, 2024 at 08:36 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_2207298_geralseptiraalfarizirades_uas`
--

-- --------------------------------------------------------

--
-- Table structure for table `pasien_puskesmas_geralseptiraalfarizirades`
--

CREATE TABLE `pasien_puskesmas_geralseptiraalfarizirades` (
  `id` int(11) NOT NULL,
  `nama` varchar(100) NOT NULL,
  `usia` int(11) NOT NULL,
  `jenis_kelamin` varchar(100) NOT NULL,
  `alamat` varchar(100) NOT NULL,
  `deskripsi` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pasien_puskesmas_geralseptiraalfarizirades`
--

INSERT INTO `pasien_puskesmas_geralseptiraalfarizirades` (`id`, `nama`, `usia`, `jenis_kelamin`, `alamat`, `deskripsi`) VALUES
(59, 'Geral Septira Alfarizi Rades ', 20, 'L', 'Bogor', 'Demam'),
(60, 'Sahrul Mubarok', 22, 'L', 'Subang', 'Sakit Perut'),
(61, 'Danis Keysara Saputra', 19, 'L', 'Bandung', 'Bersin dan Batuk Berdahak');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `pasien_puskesmas_geralseptiraalfarizirades`
--
ALTER TABLE `pasien_puskesmas_geralseptiraalfarizirades`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `pasien_puskesmas_geralseptiraalfarizirades`
--
ALTER TABLE `pasien_puskesmas_geralseptiraalfarizirades`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=65;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
