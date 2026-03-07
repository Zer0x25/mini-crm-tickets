# TASK-001: Bootstrap Monorepo

## Context

Preparar la estructura base del monorepo para desarrollo.

Este es el primer paso para establecer la base del proyecto y preparar las herramientas necesarias.

## Requirements

- Estructura de carpetas definida
- Archivos base creados
- Docker compose con PostgreSQL
- Configuración inicial de la base de datos
- .gitignore configurado

## Subtasks

- [ ] Crear estructura de carpetas (apps/web, apps/api, packages/shared)
- [ ] Crear README.md principal
- [ ] Crear .gitignore
- [ ] Crear docker-compose.yml con PostgreSQL
- [ ] Crear archivos base en cada sección

## Acceptance Criteria

- [ ] Repositorio tiene estructura clara visible
- [ ] git init funciona sin problemas
- [ ] docker-compose up inicia PostgreSQL correctamente
- [ ] Todos los archivos base existen

## Dependencies

None - Esta es la tarea de inicio

## Estimation

Small (< 1 día)

## Technical Notes

- Se puede usar pnpm workspaces o npm workspaces
- Docker debe estar instalado en máquina de desarrollo
- PostgreSQL 15 es suficiente para desarrollo

## Status

✅ COMPLETED
