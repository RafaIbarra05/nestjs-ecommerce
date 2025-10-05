# 🛒 E-commerce API – Proyecto M4 Backend

API REST desarrollada con **NestJS**, **TypeORM** y **PostgreSQL**, que implementa un sistema completo de gestión de usuarios, productos, categorías y órdenes de compra.  
Forma parte del **Proyecto M4 del Bootcamp Soy Henry**, demostrando dominio de arquitectura backend, autenticación, migraciones, despliegue en Docker y Render.

---

## 🧠 Resumen general

Este backend fue diseñado bajo una arquitectura modular y escalable, siguiendo buenas prácticas con **DTOs**, **guards**, **pipes**, **filtros globales** y **documentación con Swagger**.  
El objetivo es ofrecer una base sólida para un e-commerce real, con endpoints seguros y relaciones completas entre entidades.

📦 **Tecnologías clave:**

- NestJS • TypeORM • PostgreSQL
- Docker • JWT • Cloudinary (para imágenes)
- Swagger • Class Validator • Decorators

---

## 🧩 Entidades principales

| Entidad          | Descripción                                     |
| ---------------- | ----------------------------------------------- |
| **Users**        | Registro, login, roles (admin/user), JWT        |
| **Products**     | Gestión de productos, precios, stock e imágenes |
| **Categories**   | Relación uno a muchos con productos             |
| **Orders**       | Creación y detalle de compras por usuario       |
| **OrderDetails** | Relación entre órdenes y productos              |

---

## Ejecución local con Docker

### 1️⃣ Clonar el repositorio

```bash
git clone https://github.com/RafaIbarra05/nestjs-ecommerce
cd ecommerce-rafa-ibarra-05
```

### 2️⃣ Crear el archivo `.env`

```bash
cp .env.example .env
```

### 3️⃣ Levantar la app y la base de datos

```bash
docker compose up --build
```

### 4️⃣ Acceder a la documentación Swagger

📘 **http://localhost:3000/api/docs**

---

## ⚙️ Variables de entorno (`.env`)

```env
# Server
PORT=3000

# Database (para entorno local con Docker)
POSTGRES_USER=
POSTGRES_PASSWORD=
POSTGRES_DB=
DB_HOST=db
DB_PORT=

# JWT
JWT_SECRET=secret_key_example
JWT_EXPIRES=1h

# Cloudinary (si aplica)
CLOUDINARY_CLOUD_NAME=xxxxx
CLOUDINARY_API_KEY=xxxxx
CLOUDINARY_API_SECRET=xxxxx
```

> En Render, se usa una sola variable `DATABASE_URL` con conexión SSL (`sslmode=require`).

---

## 🗄️ Migraciones y seeders

Ejecutar migraciones manualmente:

```bash
npm run migration:run
```

Revertir migraciones:

```bash
npm run migration:revert
```

Endpoints para precargar datos:

- `GET /categories/seeder`
- `GET /products/seeder`

---

## 🔐 Autenticación

Autenticación con JWT y roles.

| Endpoint              | Descripción                                            |
| --------------------- | ------------------------------------------------------ |
| **POST /auth/signup** | Registro de usuario (valida contraseña y confirmación) |
| **POST /auth/signin** | Login con email y password (retorna JWT)               |

Header requerido para rutas protegidas:

```
Authorization: Bearer <token>
```

---

## 📦 Endpoints principales

| Recurso              | Método | Descripción                       |
| -------------------- | ------ | --------------------------------- |
| `/users`             | `GET`  | Listar usuarios (solo admin)      |
| `/users/:id`         | `GET`  | Ver detalles de usuario           |
| `/products`          | `GET`  | Listar productos (paginados)      |
| `/products/:id`      | `GET`  | Detalle de producto               |
| `/products`          | `POST` | Crear producto (admin)            |
| `/orders`            | `POST` | Crear orden (usuario autenticado) |
| `/orders/:id`        | `GET`  | Ver detalle de orden              |
| `/categories/seeder` | `GET`  | Precarga de categorías            |
| `/products/seeder`   | `GET`  | Precarga de productos             |

---

## 🌐 Despliegue en Render

- **API online:**  
  🔗 [https://nestjs-ecommerce-latest-d0tq.onrender.com/api/docs](https://nestjs-ecommerce-latest-d0tq.onrender.com/api/docs)

- **Base de datos:** PostgreSQL alojado en Render con SSL habilitado (`sslmode=require`).

> _Nota:_ En el plan gratuito de Render, la base puede entrar en modo "sleep" tras inactividad, por lo que puede tardar unos segundos en iniciar.

---

## 🧠 Consideraciones técnicas

✅ Validaciones con **class-validator** y **pipes globales**  
✅ Filtros personalizados para manejo de excepciones HTTP  
✅ Guards para rutas protegidas (JWT + Roles)  
✅ Pagínación implementada en endpoints de listado  
✅ Relaciones bidireccionales entre entidades con TypeORM  
✅ Documentación con Swagger y ejemplos reales de uso

---

## 🧰 Scripts útiles

| Comando                      | Descripción                            |
| ---------------------------- | -------------------------------------- |
| `npm run start:dev`          | Levanta el proyecto en modo desarrollo |
| `npm run build`              | Compila TypeScript a JavaScript        |
| `npm run migration:generate` | Genera una nueva migración             |
| `npm run migration:run`      | Ejecuta migraciones pendientes         |
| `npm run migration:revert`   | Revierte la última migración           |

---

## 👨‍💻 Autor

**Rafael Ibarra**  
Full Stack Developer (orientado al Backend)  
📧 [rafaelibbarra0795@gmail.com](mailto:rafaelibarra0795@gmail.com)  
💼 [LinkedIn](https://www.linkedin.com/in/rafael-ibarra-921a42343)  
💻 [GitHub](https://github.com/RafaIbarra05)

---

## 🧾 Licencia

Proyecto de uso educativo, desarrollado como entrega de proyecto backend del Bootcamp **Soy Henry**.  
Libre para uso con fines de aprendizaje o demostración.

---

⭐ Si este proyecto te resultó útil, ¡no dudes en dejar una estrella en el repositorio!
