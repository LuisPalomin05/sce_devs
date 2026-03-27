# 🚀 SCE Devs

Sistema web orientado a la gestión multi-tenant, diseñado para manejar múltiples organizaciones (tenants) dentro de una misma plataforma, permitiendo control de usuarios, roles y acceso segmentado.

---

## 🧠 Descripción

SCE Devs es una aplicación fullstack que implementa una arquitectura multi-tenant, donde un mismo usuario puede pertenecer a diferentes organizaciones y operar en contextos independientes.

El sistema permite:

- Gestión de usuarios
- Asociación de usuarios a múltiples tenants
- Selección dinámica de tenant activo
- Autenticación con tokens
- Control de acceso basado en contexto
- administracion de almacen
- facturacion

---

## 🏗️ Arquitectura

El proyecto está dividido en:

### 🔹 Backend
- Node.js
- Express
- MySQL
- Arquitectura por capas (controllers, services, repositories)

### 🔹 Frontend
- React
- Hooks personalizados
- Manejo de estado global (context)
- Consumo de API 

---

## ⚙️ Características principales

- 🔐 Autenticación 
- 🏢 Soporte multi-tenant
- 👥 Relación usuario ↔ tenant
- 🎯 Selección de activo
- 📦 Persistencia 
- 🔄 Interceptores HTTP

---

## 📂 Estructura del proyecto

```bash
sce_devs/
│
├── backend/
│   ├── controllers/
│   ├── models/
│   └── routes/
│
├── frontend/
│   ├── components/
│   ├── assets/
│   ├── hooks/
│   ├── context/
│   └── services/
│
└── README.md
