CREATE TABLE `usuarios` (
  `id` int UNIQUE PRIMARY KEY NOT NULL AUTO_INCREMENT COMMENT 'Identificador unico del usuario',
  `nombre` varchar(50) NOT NULL COMMENT 'Nombre del usuario'
);

CREATE TABLE `tareas` (
  `id` int UNIQUE PRIMARY KEY NOT NULL AUTO_INCREMENT COMMENT 'Identificador unico de la tarea',
  `titulo` varchar(100) NOT NULL COMMENT 'Título de la tarea',
  `descripcion` text NOT NULL COMMENT 'Descripción de la tarea',
  `completado` binary NOT NULL DEFAULT false COMMENT 'Estado de compleción de la tarea, true para completada y false para no completada',
  `fecha_entrega` date NOT NULL COMMENT 'Fecha de entrega de la tarea',
  `comentarios` text COMMENT 'Comentarios opcionales de la tarea',
  `responsable` int COMMENT 'Identificador opcional del usuario responsable de la tarea',
  `creador` int NOT NULL COMMENT 'Identificador unico del usuario creador de la tarea'
);

CREATE TABLE `tags` (
  `id` int UNIQUE PRIMARY KEY NOT NULL AUTO_INCREMENT COMMENT 'Identificador unico del tag',
  `titulo` varchar(50) NOT NULL COMMENT 'Título del tag'
);

CREATE TABLE `tareas_tags` (
  `id` int UNIQUE PRIMARY KEY NOT NULL AUTO_INCREMENT COMMENT 'Identificador unico de la relación entre tarea y tags',
  `id_tarea` int NOT NULL COMMENT 'Identificador unico de la tarea',
  `id_tag` int NOT NULL COMMENT 'Identificador unico del tag'
);

ALTER TABLE `usuarios` COMMENT = 'Tabla con la información de los usuarios';

ALTER TABLE `tareas` COMMENT = 'Tabla con la información de las tareas';

ALTER TABLE `tags` COMMENT = 'Tabla con la información de los tags';

ALTER TABLE `tareas_tags` COMMENT = 'Tabla para la relación entre tareas y tags';

ALTER TABLE `tareas` ADD FOREIGN KEY (`creador`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

ALTER TABLE `tareas` ADD FOREIGN KEY (`responsable`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

ALTER TABLE `tareas_tags` ADD FOREIGN KEY (`id_tarea`) REFERENCES `tareas` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

ALTER TABLE `tareas_tags` ADD FOREIGN KEY (`id_tag`) REFERENCES `tags` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;
