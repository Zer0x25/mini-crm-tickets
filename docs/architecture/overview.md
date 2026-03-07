# Architecture Overview

## Sistema

Mini CRM Tickets es un sistema de gestión de tickets personales.

## Componentes

### Frontend (apps/web)

- React + TypeScript
- Interfaz de usuario para gestión de tickets
- Comunicación con API

### Backend (apps/api)

- Express.js + TypeScript
- API REST para operaciones CRUD
- PostgreSQL para persistencia
- Prisma como ORM

### Shared (packages/shared)

- Tipos TypeScript compartidas
- Constantes y utilidades
- Reutilizable entre frontend y backend

### Base de Datos

- PostgreSQL 15
- Versionada mediante migraciones de Prisma
- Documentada en Prisma schema

## Flujo

```
Cliente (React) → API REST (Express) → Base de Datos (PostgreSQL)
                  ↓
           Shared Types (TypeScript)
```

## Deployment

- Contenedores docker (postgresql)
- Backend posiblemente en serverless o VPS
- Frontend posiblemente en CDN o vercel

## Seguridad (Pendiente)

- Autenticación: JWT (por definir)
- Autorización: RBAC simple (por definir)
- HTTPS en producción
- CORS configurado

## Monitoreo (Pendiente)

- Logs centralizados
- Métricas básicas (requests, errores)
- Health checks

## Status

🟡 En bootstrap - Estructura base definida, implementación pendiente
