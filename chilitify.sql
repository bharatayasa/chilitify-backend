-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 101.128.64.219:3306
-- Waktu pembuatan: 27 Jul 2024 pada 10.42
-- Versi server: 10.11.5-MariaDB-log
-- Versi PHP: 8.2.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `chilitify`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `description`
--

CREATE TABLE `description` (
  `id` int(11) NOT NULL,
  `class` varchar(25) NOT NULL,
  `description` text NOT NULL,
  `prevention` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `description`
--

INSERT INTO `description` (`id`, `class`, `description`, `prevention`) VALUES
(1, 'Healthy', 'Tanaman cabai sehat menunjukkan pertumbuhan yang normal dengan daun hijau segar tanpa tanda-tanda kerusakan atau infeksi penyakit. Batang dan buah juga tampak sehat tanpa gejala abnormal', 'Menjaga kesehatan tanaman cabai memerlukan pendekatan holistik. Penting untuk menjaga kebersihan lingkungan tanam dan memastikan tanaman mendapat cukup nutrisi serta air. Rotasi tanaman juga sangat disarankan untuk mencegah penumpukan patogen di tanah. Pemantauan rutin perlu dilakukan untuk mendeteksi dini adanya tanda-tanda penyakit sehingga tindakan cepat bisa diambil.'),
(2, 'Leaf Curl', 'Penyakit ini menyebabkan daun tanaman cabai mengeriting dan menggulung. Biasanya disebabkan oleh virus, kutu daun, atau hama lainnya yang menghisap cairan dari daun.', 'Pengendalian keriting daun bisa dimulai dengan mengontrol populasi kutu daun menggunakan insektisida atau predator alami seperti ladybugs. Penting juga untuk menjaga kebersihan alat-alat pertanian guna mencegah penyebaran virus. Menanam varietas cabai yang tahan terhadap penyakit keriting daun sangat dianjurkan. Selain itu, tanaman yang sudah terinfeksi harus segera dihilangkan dan dibakar untuk mencegah penyebaran lebih lanjut.'),
(3, 'Leaf Spot', 'Penyakit ini ditandai dengan munculnya bercak-bercak coklat atau hitam pada daun. Penyebab utamanya adalah infeksi jamur atau bakteri', 'Pencegahan bercak daun bisa dilakukan dengan menjaga kelembaban lingkungan tanam agar tidak terlalu tinggi. Penggunaan fungisida atau bakterisida yang tepat sesuai dengan penyebab infeksi sangat penting. Daun yang terinfeksi harus segera dibuang dan dibakar untuk mencegah penyebaran. Menghindari penyiraman dari atas juga dapat mengurangi penyebaran spora jamur atau bakteri yang menjadi penyebab utama penyakit ini.'),
(4, 'Whitefly', 'Hama lalat putih menghisap cairan tanaman dan menyebabkan daun menjadi kuning, layu, dan rontok. Mereka juga dapat menyebarkan berbagai penyakit tanaman', 'Untuk mengatasi lalat putih, gunakan perangkap lengket berwarna kuning yang efektif dalam mengurangi populasi lalat putih. Penyemprotan tanaman dengan insektisida berbasis minyak neem atau sabun insektisida juga dianjurkan. Menjaga kebersihan lingkungan sekitar tanaman membantu mengurangi tempat bertelur lalat putih. Selain itu, memperkenalkan predator alami seperti lacewing atau ladybugs dapat menjadi solusi biologis yang efektif.'),
(5, 'Yellowish', 'Tanaman cabai yang mengalami kekuningan biasanya menunjukkan gejala daun yang menguning akibat defisiensi nutrisi, overwatering, atau serangan hama/penyakit', 'Memastikan tanaman mendapatkan nutrisi yang cukup, terutama nitrogen, magnesium, dan zat besi sangat penting untuk mencegah daun kekuningan. Penyiraman harus diatur agar tidak berlebihan, dengan menjaga kelembaban tanah yang optimal. Mengontrol populasi hama seperti kutu daun dan tungau juga krusial untuk mencegah kekuningan. Melakukan pemupukan secara teratur dengan pupuk yang seimbang akan membantu tanaman tetap sehat dan hijau.');

-- --------------------------------------------------------

--
-- Struktur dari tabel `Predictions`
--

CREATE TABLE `Predictions` (
  `id` int(11) NOT NULL,
  `description_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `confidence` decimal(5,4) NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `Predictions`
--

INSERT INTO `Predictions` (`id`, `description_id`, `user_id`, `confidence`, `created_at`, `deleted_at`) VALUES
(1, 5, 3, 0.3689, '2024-07-27 09:54:12', NULL),
(2, 5, 3, 0.3689, '2024-07-27 09:55:25', NULL),
(3, 5, 3, 0.3689, '2024-07-27 09:55:46', NULL),
(4, 5, 3, 0.3689, '2024-07-27 09:57:37', NULL),
(5, 2, 3, 0.9474, '2024-07-27 09:58:49', NULL),
(6, 2, 3, 0.9474, '2024-07-27 09:59:59', NULL),
(7, 2, 3, 0.9474, '2024-07-27 10:03:32', NULL),
(8, 2, 3, 0.9474, '2024-07-27 10:03:48', NULL),
(9, 2, 3, 0.9474, '2024-07-27 10:06:21', NULL),
(10, 4, 3, 0.8270, '2024-07-27 10:06:45', NULL),
(11, 4, 3, 0.8270, '2024-07-27 10:11:01', NULL),
(12, 4, 3, 0.8270, '2024-07-27 10:11:18', NULL),
(13, 5, 3, 0.3689, '2024-07-27 10:11:37', NULL),
(14, 5, 1, 0.3689, '2024-07-27 10:34:40', NULL),
(15, 3, 1, 0.9370, '2024-07-27 10:35:33', NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','user') NOT NULL DEFAULT 'user',
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id`, `username`, `name`, `email`, `password`, `role`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'user', 'name', 'email@ss.cc', '$2b$10$zXqu/fd0ePiAtSlTksnxGu6r4yEHkf0PuT0XkkSa/lVdtk7yT1LCe', 'user', '2024-07-27 08:56:25', '2024-07-27 08:56:25', NULL),
(2, 'admin', 'name', 'email@ss.cc2', '$2b$10$prSs8VJbgcFSt1SKygHP0ejqxjh0u7uNyNWE3NuHmDfIwfMap9kyW', 'admin', '2024-07-27 09:02:42', '2024-07-27 09:19:29', NULL),
(3, 'user2', 'hehe', 'email@ss.cc22', '$2b$10$XVcc4IVPRerDh/w5XqLgTuT186DOolpxIFMTCIXLvhoL6wZUcCvi6', 'user', '2024-07-27 09:41:03', '2024-07-27 09:41:03', NULL);

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `description`
--
ALTER TABLE `description`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `Predictions`
--
ALTER TABLE `Predictions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `description_id` (`description_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `description`
--
ALTER TABLE `description`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT untuk tabel `Predictions`
--
ALTER TABLE `Predictions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `Predictions`
--
ALTER TABLE `Predictions`
  ADD CONSTRAINT `Predictions_ibfk_1` FOREIGN KEY (`description_id`) REFERENCES `description` (`id`),
  ADD CONSTRAINT `Predictions_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
