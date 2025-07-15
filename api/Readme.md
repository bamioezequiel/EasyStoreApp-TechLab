# 🛍️ EasyStoreApp – Backend API

**EasyStoreApp** es una API REST desarrollada en Java con Spring Boot, pensada para manejar los pedidos, productos, roles y autenticación de una tienda digital.  
Fue desarrollada por **Ezequiel Bamio** como parte de un proyecto técnico.

---

## 🚀 Funcionalidades principales

- Autenticación de usuarios con token (JWT)
- Gestión de categorías de productos
- Gestión de pedidos: crear, modificar, confirmar y cancelar
- Administración de roles de usuario

---

## 📌 Endpoints disponibles

---

### 🔐 Autenticación

📍 Base: `/api/auth`

| Método | Ruta       | Descripción                          |
|--------|------------|--------------------------------------|
| POST   | `/login`   | Iniciar sesión con usuario y clave   |
| GET    | `/me`      | Obtener información del usuario logueado |

> Al iniciar sesión, recibís un **token JWT** que debés incluir en las siguientes solicitudes (en los headers).

---

### 🧾 Categorías

📍 Base: `/api/categories`

| Método | Ruta            | Descripción                       |
|--------|------------------|-----------------------------------|
| GET    | `/`              | Ver todas las categorías          |
| GET    | `/{id}`          | Ver una categoría específica      |
| POST   | `/`              | Crear una nueva categoría         |
| PUT    | `/{id}`          | Actualizar una categoría          |
| DELETE | `/{id}`          | Eliminar una categoría            |

---

### 📦 Pedidos

📍 Base: `/api/orders`

| Método  | Ruta                                 | Descripción                                 |
|---------|--------------------------------------|---------------------------------------------|
| GET     | `/`                                  | Ver todos los pedidos                       |
| GET     | `/{id}`                              | Ver un pedido específico                    |
| POST    | `/`                                  | Crear un nuevo pedido                       |
| POST    | `/{orderId}/add-product`             | Agregar producto a un pedido                |
| DELETE  | `/{orderId}/remove-product`          | Quitar producto de un pedido                |
| PUT     | `/{orderId}/confirm`                 | Confirmar un pedido                         |
| PUT     | `/{orderId}/cancel`                  | Cancelar un pedido                          |
| PUT     | `/{orderId}/status?newStatus=VALOR`  | Cambiar estado del pedido                   |

> ⚠️ El estado debe ser uno de los definidos (ej: `PENDING`, `SHIPPED`, `CANCELLED`, etc.)

---

### 🧑‍⚖️ Roles

📍 Base: `/api/role`

| Método | Ruta      | Descripción                      |
|--------|-----------|----------------------------------|
| GET    | `/`       | Ver todos los roles              |
| GET    | `/{id}`   | Ver un rol específico            |
| POST   | `/`       | Crear un nuevo rol               |
| PUT    | `/{id}`   | Actualizar un rol                |
| DELETE | `/{id}`   | Eliminar un rol                  |

---

## 🔐 Seguridad

La mayoría de las rutas requieren **autenticación con token JWT**.  
Este token se obtiene al iniciar sesión y se debe enviar en el header:

