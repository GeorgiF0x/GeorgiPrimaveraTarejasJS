-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 13-05-2024 a las 20:44:28
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.1.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `ejemplo00`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `concesionarios`
--

CREATE TABLE `concesionarios` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `marcaId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `concesionarios`
--

INSERT INTO `concesionarios` (`id`, `nombre`, `marcaId`) VALUES
(15, 'Concesionario Kia', 1),
(16, 'Concesionario Dacia', 3),
(17, 'Concesionario Toyota', 4),
(18, 'Concesionario Peugeot', 5);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `marcas`
--

CREATE TABLE `marcas` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) DEFAULT NULL,
  `cantidad` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `marcas`
--

INSERT INTO `marcas` (`id`, `nombre`, `cantidad`) VALUES
(1, 'Kia', 66245),
(3, 'Dacia', 2147483647),
(4, 'Toyota', 79883),
(5, 'Peugeot', 56176),
(6, 'Volkswagen', 63871),
(7, 'Seat', 58488),
(8, 'Renault', 53176),
(9, 'AUDI', 2222),
(25, 'BMW', 555);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ventas`
--

CREATE TABLE `ventas` (
  `id` int(11) NOT NULL,
  `concesionarioId` int(11) DEFAULT NULL,
  `marcaId` int(11) DEFAULT NULL,
  `Cantidad` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `ventas`
--

INSERT INTO `ventas` (`id`, `concesionarioId`, `marcaId`, `Cantidad`) VALUES
(1, 15, 1, 666);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `concesionarios`
--
ALTER TABLE `concesionarios`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_marcaId` (`marcaId`);

--
-- Indices de la tabla `marcas`
--
ALTER TABLE `marcas`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `ventas`
--
ALTER TABLE `ventas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `nombre_de_la_restriccion` (`marcaId`),
  ADD KEY `otra_restriccion` (`concesionarioId`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `concesionarios`
--
ALTER TABLE `concesionarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT de la tabla `marcas`
--
ALTER TABLE `marcas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT de la tabla `ventas`
--
ALTER TABLE `ventas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `concesionarios`
--
ALTER TABLE `concesionarios`
  ADD CONSTRAINT `concesionarios_ibfk_1` FOREIGN KEY (`marcaId`) REFERENCES `marcas` (`id`),
  ADD CONSTRAINT `fk_marcaId` FOREIGN KEY (`marcaId`) REFERENCES `marcas` (`id`);

--
-- Filtros para la tabla `ventas`
--
ALTER TABLE `ventas`
  ADD CONSTRAINT `nombre_de_la_restriccion` FOREIGN KEY (`marcaId`) REFERENCES `marcas` (`id`),
  ADD CONSTRAINT `otra_restriccion` FOREIGN KEY (`concesionarioId`) REFERENCES `concesionarios` (`id`),
  ADD CONSTRAINT `ventas_ibfk_1` FOREIGN KEY (`concesionarioId`) REFERENCES `concesionarios` (`id`),
  ADD CONSTRAINT `ventas_ibfk_2` FOREIGN KEY (`marcaId`) REFERENCES `marcas` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
