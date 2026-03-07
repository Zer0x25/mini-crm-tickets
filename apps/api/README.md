# API Backend

Backend Node.js + Express + Prisma para Mini CRM Tickets.

## Descripción

API REST para gestión de tickets personales con base de datos PostgreSQL.

## Estructura

- `src/`: Código TypeScript
- `prisma/`: Esquema y migraciones de base de datos
- `tests/`: Tests (pendiente)

## Desarrollo

```bash
# Instalar dependencias (pendiente)
npm install

# Configurar base de datos
docker-compose up -d

# Ejecutar migraciones
npm run migrate:dev

# Dev server con hot reload (pendiente)
npm run dev
```

## API Endpoints

- `GET /health`: Health check
- `/api/tickets/*`: Endpoints de tickets (pendiente)

## Supuestos

- Express.js
- Prisma ORM
- PostgreSQL
- TypeScript
- dotenv para configuración
