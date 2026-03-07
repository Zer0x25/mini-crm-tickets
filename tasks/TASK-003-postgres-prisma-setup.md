# TASK-003: PostgreSQL y Prisma Setup

## Context

Configurar base de datos PostgreSQL y Prisma ORM con migraciones versionadas.

Necesario para persistencia de datos en el backend.

## Requirements

- Prisma configurado en apps/api
- Conexión a PostgreSQL en docker-compose
- Variables de entorno (.env.example)
- Prisma CLI funcional
- Primera migración vacía

## Subtasks

- [ ] Instalar prisma en apps/api
- [ ] Crear .env y .env.example con DATABASE_URL
- [ ] Configurar prisma/schema.prisma
- [ ] Conectar a PostgreSQL del docker-compose
- [ ] Crear y ejecutar primera migración
- [ ] Documentar en README

## Acceptance Criteria

- [ ] Prisma conecta exitosamente a BD
- [ ] `prisma db push` funciona sin errores
- [ ] `prisma migrate dev` funciona
- [ ] .env.example documenta variables necesarias
- [ ] Schema.prisma compilable

## Dependencies

- TASK-001: Bootstrap monorepo
- TASK-002: Backend health check (no estricto, parallelizable)

## Estimation

Medium (1-2 días)

## Technical Notes

- PostgreSQL 15 en docker-compose
- Prisma 5.x
- User/password desde .env
- Primera migración típicamente vacía

## Status

⏳ PENDING
