# TASK-004: Ticket Entity y CRUD Básico

## Context

Crear la entidad Ticket en la base de datos y endpoints CRUD básicos.

Este es el nucleus de la funcionalidad del sistema.

## Requirements

- Modelo Ticket en Prisma schema
- Campos: id, title, description, status, createdAt, updatedAt
- Endpoints CRUD:
  - POST /api/tickets (crear)
  - GET /api/tickets (listar)
  - GET /api/tickets/:id (detalle)
  - PATCH /api/tickets/:id (actualizar)
  - DELETE /api/tickets/:id (eliminar)
- Validación básica
- Errores consistentes

## Subtasks

- [ ] Definir modelo Ticket en schema.prisma
- [ ] Crear migración de BD
- [ ] Crear controlador de tickets
- [ ] Implementar endpoints CRUD
- [ ] Agregar validación
- [ ] Documentar API en README

## Acceptance Criteria

- [ ] Modelo Ticket existe en BD
- [ ] 5 endpoints CRUD funcionan
- [ ] CRUD retorna status HTTP correctos (201 para POST, 200 para GET, etc.)
- [ ] Validación rechaza datos inválidos
- [ ] Errores retornan JSON consistente

## Dependencies

- TASK-001: Bootstrap monorepo
- TASK-003: PostgreSQL y Prisma setup

## Estimation

Medium (1-2 días)

## Technical Notes

- Ticket.status: 'open' | 'in_progress' | 'closed'
- Timestamps automáticos con Prisma
- Sin autenticación/autorización aún (todos pueden acceder)

## Status

⏳ PENDING
