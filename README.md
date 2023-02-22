# Reto Nextline

API REST que permite el funcionamiento de un sistema de gestión
de tareas, utilizando Node.js y Express.

Para indicarle el usuario que está usando la plataforma se pasa un token Bearer que contiene el id del usuario.

## BD

La base de datos fue modelada utilizando la ayuda de la plataforma [dbdiagram.io](https://dbdiagram.io/home)

**Diagrama ER:**
![Diagrama ER](https://i.imgur.com/Qjh862I.png)

## Documentación

La documentación de los endpoints fue hecha con [Swagger](https://swagger.io/) y está en la ruta /docs

[Documentación de los endpoints](https://reto-nextline-production.up.railway.app/docs)

La documentación de la BD fue hecha con [dbdocs.io](https://dbdocs.io/)

[Documentación de la BD](https://dbdocs.io/opnfuso/reto_nextline)

## Uso

Comandos para iniciar el proyecto (Se necesita tener MySQL)

```bash
  git clone https://github.com/opnfuso/reto-nextline.git
  cd reto-nextline
  npm install
  npm run start
```

## Tech Stack

**Server:** Node, Express

**Validación de Datos:** [Joi](https://joi.dev/)

**Conexión a la BD:** [mysql2](https://github.com/sidorares/node-mysql2)

**Testing:** [Jest](https://jestjs.io/), [Supertest](https://github.com/ladjs/supertest)

**BD:** MySQL

## Autor

- [@opnfuso](https://www.github.com/opnfuso)
