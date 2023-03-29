-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 04, 2023 at 04:39 AM
-- Server version: 10.4.25-MariaDB
-- PHP Version: 8.0.23

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bd_sireeea`
--

-- --------------------------------------------------------

--
-- Table structure for table `alumnos`
--

CREATE TABLE `alumnos` (
  `nro_cuenta` varchar(8) NOT NULL,
  `contraseña` varchar(7) NOT NULL,
  `nombre` varchar(45) DEFAULT NULL,
  `apellido_1` varchar(45) DEFAULT NULL,
  `apellido_2` varchar(45) DEFAULT NULL,
  `fecha_nacimiento` date DEFAULT NULL,
  `id_grupo` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `alumnos`
--

INSERT INTO `alumnos` (`nro_cuenta`, `contraseña`, `nombre`, `apellido_1`, `apellido_2`, `fecha_nacimiento`, `id_grupo`) VALUES
('16030117', '0312JSF', 'JUAN DE DIOS', 'SAPIEN ', 'FLORES', '2001-03-12', 1),
('16054156', '0312SVM', 'SEBASTIAN', 'VEGA', 'MONDACA', '2001-03-12', 1);

-- --------------------------------------------------------

--
-- Table structure for table `carreras`
--

CREATE TABLE `carreras` (
  `id_carrera` varchar(2) NOT NULL,
  `nombre` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `carreras`
--

INSERT INTO `carreras` (`id_carrera`, `nombre`) VALUES
('IC', 'INGENIERIA CIVIL'),
('IG', 'INGENIERIA GEODESICA'),
('IP', 'INGENIERIA DE PROCESOS INDUSTRIALES'),
('IS', 'INGENIERIA DE SOFTWARE');

-- --------------------------------------------------------

--
-- Table structure for table `cuestionarios`
--

CREATE TABLE `cuestionarios` (
  `id_cuestionario` int(11) NOT NULL,
  `id_profesor` int(10) NOT NULL,
  `nombre` varchar(45) DEFAULT NULL,
  `descripcion` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `cuestionarios`
--

INSERT INTO `cuestionarios` (`id_cuestionario`, `id_profesor`, `nombre`, `descripcion`) VALUES
(1, 1, 'INVENTARIO DE FELDER', 'Descripcion mamalona del estilo de aprendizaje recomendado para el grupo seleccionado, relleno relleno relleno relleno relleno relleno');

-- --------------------------------------------------------

--
-- Table structure for table `grupos`
--

CREATE TABLE `grupos` (
  `id_grupo` int(10) NOT NULL,
  `grupo` varchar(3) NOT NULL,
  `id_carrera` varchar(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `grupos`
--

INSERT INTO `grupos` (`id_grupo`, `grupo`, `id_carrera`) VALUES
(1, '401', 'IC'),
(2, '401', 'IS');

-- --------------------------------------------------------

--
-- Table structure for table `grupos_asignados`
--

CREATE TABLE `grupos_asignados` (
  `id_profesor` int(10) NOT NULL,
  `id_grupo` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `grupos_asignados`
--

INSERT INTO `grupos_asignados` (`id_profesor`, `id_grupo`) VALUES
(1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `inventario_de_felder`
--

CREATE TABLE `inventario_de_felder` (
  `id` int(11) NOT NULL,
  `nro_cuenta` varchar(8) NOT NULL,
  `respuestas_compactadas` varchar(44) NOT NULL,
  `grupo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `inventario_de_felder`
--

INSERT INTO `inventario_de_felder` (`id`, `nro_cuenta`, `respuestas_compactadas`, `grupo`) VALUES
(52, '16030117', 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', 401),
(54, '16030117', 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', 401),
(55, '16030117', 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', 401),
(56, '16030117', 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', 401),
(57, '16030117', 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', 401),
(58, '16030117', 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', 401),
(59, '16030117', 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', 401),
(60, '16030117', 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', 401),
(61, '16030117', 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABBB', 401);

-- --------------------------------------------------------

--
-- Table structure for table `perfil_final_inventario_de_felder`
--

CREATE TABLE `perfil_final_inventario_de_felder` (
  `id` int(11) NOT NULL,
  `nro_cuenta` varchar(8) NOT NULL,
  `grupo` int(11) NOT NULL,
  `activo_reflexivo` varchar(3) NOT NULL,
  `sensorial_intuitivo` varchar(3) NOT NULL,
  `visual_verbal` varchar(3) NOT NULL,
  `secuencial_global` varchar(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `perfil_final_inventario_de_felder`
--

INSERT INTO `perfil_final_inventario_de_felder` (`id`, `nro_cuenta`, `grupo`, `activo_reflexivo`, `sensorial_intuitivo`, `visual_verbal`, `secuencial_global`) VALUES
(1, '16030117', 401, '5A', '5A', '5B', '5A'),
(34, '16030117', 401, '11A', '11A', '11A', '11A'),
(36, '16030117', 401, '11A', '11A', '11A', '11A'),
(37, '16030117', 401, '11A', '11A', '11A', '11A'),
(38, '16030117', 401, '11A', '11A', '11A', '11A'),
(39, '16030117', 401, '11A', '11A', '11A', '11A'),
(40, '16030117', 401, '11A', '11A', '11A', '11A'),
(41, '16030117', 401, '11A', '11A', '11A', '11A'),
(42, '16030117', 401, '11A', '11A', '11A', '11A'),
(43, '16030117', 401, '11A', '9A', '9A', '9A');

-- --------------------------------------------------------

--
-- Table structure for table `preguntas`
--

CREATE TABLE `preguntas` (
  `id_cuestionario` int(11) NOT NULL,
  `num_pregunta` int(10) NOT NULL,
  `pregunta` varchar(100) DEFAULT NULL,
  `respuesta_1` varchar(300) NOT NULL,
  `respuesta_2` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `preguntas`
--

INSERT INTO `preguntas` (`id_cuestionario`, `num_pregunta`, `pregunta`, `respuesta_1`, `respuesta_2`) VALUES
(1, 1, 'Entiendo mejor algo', 'Si lo practico', 'Si pienso en ello'),
(1, 2, 'Me considero', 'Realista', 'Innovador'),
(1, 3, 'Cuando pienso acerca de lo que hice ayer, es mas probable que lo haga sobre la base de', 'Una imagen', 'Palabras'),
(1, 4, 'Tengo tendencia a', 'Entender los detalles de un tema pero no ver claramente su estructura completa', 'Entender la estructura completa pero no ver claramente los detalles'),
(1, 5, 'Cuando estoy aprendiendo algo nuevo, me ayuda', 'Hablar de ello', 'Pensar en ello'),
(1, 6, 'Si yo fuera prefesor, yo preferiria dar cursos', 'Que traten sobre hechos y situaciones reales de la vida', 'Que trate con ideas y teorias'),
(1, 7, 'Prefiero obtener informacion nueva de', 'Imagenes, diagramas, graficas y mapas', 'Instrucciones escritas o informacion verbal'),
(1, 8, 'Una vez que entiendo', 'todas las partes, entiendo el total', 'El total de algo, entiendo como encaja sus partes'),
(1, 9, 'En un grupo de estudio que trabaja con un material dificil, es mas probable que', 'Participe y contribuya con ideas', 'No participe y solo escuche'),
(1, 10, 'Es mas facil para mi', 'Aprender hechos', 'Aprender conceptos'),
(1, 11, 'En un libro con muchas imagenes y graficas es mas probable que', 'Revise cuidadosamente las imagenes y graficas', 'Me concentre en el texto escrito'),
(1, 12, 'Cuando resuelvo problemas de matematias', 'Generalmente trabajo sobre las soluciones con un paso a la vez', 'Frecuentemente se cuales son las soluciones, pero luego tengo dificultad para imaginarme los pasos para llegar a ellas'),
(1, 13, 'En las clases a las que he asistido', 'He llegado a saber como son muchos de los estudiantes', 'Realmente llego a saber como son muchos de los estudiantes'),
(1, 14, 'Cuando leo temas que no son de ficcion, prefiero', 'Algo que me ensele nuevos hechos o me diga como hacer algo', 'Algo que me de nuevas ideas en las que pensar'),
(1, 15, 'Me gustan los maestros', 'Que utilizan muchos esquemas en el pizarron', 'Que toman muchos tiempo para explicar'),
(1, 16, 'Cuando estoy analizando un cuento o una novela', 'Pienso en los incidentes y trato de acomodarlos para configurar los temas', 'Me doy cuenta de cuales son los temas cuando termino de leer y luego tengo que regresar y encontrar los incidentes que los demuestran'),
(1, 17, 'Cuando comienzo a resolver un problema de tarea, es mas probable que', 'Comience a trabajar en su solucion inmediatamente', 'Primero tratare de entender completamente el problema'),
(1, 18, 'Prefiero la idea de', 'Certeza', 'Teoria'),
(1, 19, 'Recuerdo mejor', 'Lo que veo', 'Lo que oigo'),
(1, 20, 'Es mas importante para mi que un profesor', 'Exponga el material en pasos secuenciale claros', 'Me de un panorama general y relacione le material con otros temas'),
(1, 21, 'Prefiero estudiar', 'En grupo de estudio', 'Solo'),
(1, 22, 'Me concidero', 'Cuidadoso en los detalles de mi trabajo', 'Creativo en la forma en la que hago mi trabajo'),
(1, 23, 'Cuando alguien me da direcciones de nuevos lugares, perfiero', 'Un mapa', 'Instrucciones escritas'),
(1, 24, 'Aprendo', 'A un paso constante, Si estudio con ahinco consigo lo que deso', 'En inicios y pausas. Me llego a confundir y subitamente lo entiendo'),
(1, 25, 'Prefiero primero', 'Hacer algo y ver que sucede', 'Pensar como voy a hacer algo'),
(1, 26, 'Cuando leo por diversion, me gusta los escritos que', 'Dicen claramente lo que desean dar a entender', 'Dicen las cosas en forma creativa e interesante'),
(1, 27, 'Cuando veo un esquema o bosquejo en clase, es mas probable que recuerde', 'La imagen', 'Lo que el profesor dijo de ella'),
(1, 28, 'Cuando me enfrento a un cuerpo de informacion', 'Me concentro en los detalles y pierdo de vista el total de la misma', 'Trato de entender el todo antes de ir a los detalles'),
(1, 29, 'Recuerdo mas facilmente', 'Algo que he hecho', 'Algo en lo que he pensado mucho'),
(1, 30, 'Cuando tengo que hacer un trabajo, prefiero', 'Dominar una forma de hacerlo', 'Intentar nuevas formas de hacerlo'),
(1, 31, 'Cuando alguien me enseña datos, prefiero', 'Graficas', 'Resumenes con texto'),
(1, 32, 'Cuando escribo un trabajo, es mas probable que', 'Lo haga (piense o escriba) desde el principio y avance', 'Lo haga (piense o escriba) en diferentes partes y luego las ordene'),
(1, 33, 'Cuando tengo que trabajar en un proyecto de grupo, primero quiero', 'Realizar un a \"termenta de ideas\" donde cada uno contribuye con ideas', 'Realizar la \"termenta de ideas\" en forma personal y luego juntarme con el grupo para comparar ideas'),
(1, 34, 'Considero que es mejor elogio llamr a alguien', 'Sencible', 'Imaginativo'),
(1, 35, 'Cuando conozco gente en una fiesta, es mas probable que recuerde', 'Como es su apariencia', 'Lo que dice de si mismo'),
(1, 36, 'Cuando estoy aprendiendo un tema, prefiero', 'Mantenerme concentrado en ese tema, aprendiendo lo mas que pueda de el', 'hacer conexiones entre ese tema y temas relacionados'),
(1, 37, 'Me considero', 'Abierto', 'Reservado'),
(1, 38, 'Prefiero cursos que dan mas importancia a', 'Material concreto (hechos, datos)', 'Material abstracto (conceptos, teorias)'),
(1, 39, 'Para divertirme, prefiero', 'Ver television', 'Leer un libro'),
(1, 40, 'Algunos prefesores inician sus clases haciendo un bosquejo de lo que enseñaran. Esos bosquejos son', 'Algo utiles para mi', 'No me parece bien'),
(1, 41, 'La idea de hacer una tarea en grupo con una sola califcacion para todos', 'Me parece bien', 'No me parece bien'),
(1, 42, 'Cuando hago grandes calculos', 'Tiendo a repetir todos los pasos y revisar cuidadosamente mi trabajo', 'Me cansa haer su revision y tengo que esforzarme para hacerlo'),
(1, 43, 'Tiendo a recordar lugares en los que he estado', 'Facilmente con bastante exactitud', 'Con dificultad y sin mucho detalle'),
(1, 44, 'Cuando resuelvo problemas en grupo, es mas probable que yo', 'Piense en los pasos para la solucion de los problemas', 'Piense en las posibles consecuencias o aplicaciones de la solucion en un amplio rango de campos');

-- --------------------------------------------------------

--
-- Table structure for table `respuestas`
--

CREATE TABLE `respuestas` (
  `nro_cuenta` varchar(8) NOT NULL,
  `id_cuestionario` int(11) NOT NULL,
  `num_pregunta` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `respuestas`
--

INSERT INTO `respuestas` (`nro_cuenta`, `id_cuestionario`, `num_pregunta`) VALUES
('16030117', 1, '1');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `alumnos`
--
ALTER TABLE `alumnos`
  ADD PRIMARY KEY (`nro_cuenta`);

--
-- Indexes for table `carreras`
--
ALTER TABLE `carreras`
  ADD PRIMARY KEY (`id_carrera`);

--
-- Indexes for table `cuestionarios`
--
ALTER TABLE `cuestionarios`
  ADD PRIMARY KEY (`id_cuestionario`);

--
-- Indexes for table `grupos`
--
ALTER TABLE `grupos`
  ADD PRIMARY KEY (`id_grupo`);

--
-- Indexes for table `grupos_asignados`
--
ALTER TABLE `grupos_asignados`
  ADD PRIMARY KEY (`id_profesor`,`id_grupo`);

--
-- Indexes for table `inventario_de_felder`
--
ALTER TABLE `inventario_de_felder`
  ADD PRIMARY KEY (`id`,`nro_cuenta`),
  ADD UNIQUE KEY `id_UNIQUE` (`id`);

--
-- Indexes for table `perfil_final_inventario_de_felder`
--
ALTER TABLE `perfil_final_inventario_de_felder`
  ADD PRIMARY KEY (`id`,`nro_cuenta`),
  ADD UNIQUE KEY `id_UNIQUE` (`id`);

--
-- Indexes for table `preguntas`
--
ALTER TABLE `preguntas`
  ADD PRIMARY KEY (`id_cuestionario`,`num_pregunta`);

--
-- Indexes for table `respuestas`
--
ALTER TABLE `respuestas`
  ADD PRIMARY KEY (`nro_cuenta`,`id_cuestionario`),
  ADD KEY `FK_RESPUESTAS_CUESTIONARIO_idx` (`id_cuestionario`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `inventario_de_felder`
--
ALTER TABLE `inventario_de_felder`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;

--
-- AUTO_INCREMENT for table `perfil_final_inventario_de_felder`
--
ALTER TABLE `perfil_final_inventario_de_felder`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `grupos`
--
ALTER TABLE `grupos`
  ADD CONSTRAINT `FK_GRUPOS_CARRERAS` FOREIGN KEY (`id_carrera`) REFERENCES `carreras` (`id_carrera`);

--
-- Constraints for table `preguntas`
--
ALTER TABLE `preguntas`
  ADD CONSTRAINT `FK_PREGUNTAS_CUESTIONARIOS` FOREIGN KEY (`id_cuestionario`) REFERENCES `cuestionarios` (`id_cuestionario`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
