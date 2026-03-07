# TASK-002: Backend Health Check Endpoint

## Context

Implementar un endpoint de health check en el backend para verificación operacional.

Este es uno de los primeros endpoints necesarios para monitoreo básico.

## Requirements

- Endpoint GET /health que retorna JSON
- Incluye timestamp y status
- Retorna 200 OK si todo está bien
- Responde en < 100ms

## Subtasks

- [ ] Configurar Express.js básico en apps/api
- [ ] Implementar endpoint /health
- [ ] Agregar middleware básico (CORS, JSON parser)
- [ ] Documentar endpoint en README

## Acceptance Criteria

- [ ] Endpoint existe en GET /health
- [ ] Retorna { status: 'ok', timestamp: ISO8601 }
- [ ] HTTP 200 OK
- [ ] Funciona con curl: `curl http://localhost:3001/health`

## Dependencies

- TASK-001: Bootstrap monorepo

## Estimation

Small (< 1 día)

## Technical Notes

- Express.js con middleware básico
- No requiere BD aún
- TypeScript strict mode

## Status

⏳ PENDING
