# 🛒 EasyStoreApp-TechLab

**EasyStoreApp-TechLab** es una aplicación web de e-commerce fullstack desarrollada con **Spring Boot** en el backend y **React** en el frontend. Permite gestionar productos, pedidos, usuarios y realizar compras en línea de manera eficiente y segura.

## 🚀 Tecnologías Utilizadas

### Backend:
- Java 17
- Spring Boot
- Spring Security
- JPA / Hibernate
- MySQL
- Maven

### Frontend:
- React
- React Router DOM
- Redux Toolkit
- CSS Modules

## 📦 Funcionalidades Principales

### 👤 Autenticación:
- Inicio de sesión con roles (admin / usuario)
- Seguridad con JWT (Spring Security)

### 📦 Gestión de Productos:
- Listar, buscar, agregar, editar y eliminar productos
- Asociación con categorías
- Validaciones y control de stock

### 🛒 Carrito y Pedidos:
- Agregar productos al carrito
- Crear y confirmar pedidos
- Actualización automática del stock
- Historial de pedidos y gestión de estados

### 🧾 Administración:
- Dashboard exclusivo para administradores
- Gestión de usuarios, roles y stock
- Visualización de estadísticas (opcional)

## 📁 Estructura del Proyecto

EasyStoreApp-TechLab/
├── api/ # Backend Spring Boot
└── client/ # Frontend React


## ⚙️ Cómo ejecutar el proyecto localmente

### Backend

cd api

./mvnw spring-boot:run

Asegurate de tener MySQL corriendo y el archivo application.properties con las credenciales correctas.

### Frontend
cd client
npm install
npm start

🌐 Producción 
Frontend: https://techlab-bamio.vercel.app

Backend API: desplegable en Render 

🧠 Autor
Ezequiel Bamio – Proyecto final para el curso de Back-End Java | TECHLAB
