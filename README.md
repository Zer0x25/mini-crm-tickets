# mini-crm-tickets

Repositorio monorepo para un mini CRM de tickets, gobernado por ADRs y ejecutado bajo un AI Dev Loop con separación explícita entre arquitectura, planificación, implementación y revisión.

## Objetivo

Construir una base técnica mínima, estable y revisable para evolucionar un sistema con:

- frontend web
- backend API
- base de datos PostgreSQL
- contratos compartidos estrictamente tipados
- gobernanza arquitectónica explícita

## Stack base

- Monorepo
- pnpm workspaces
- Turbo
- React + TypeScript
- Node.js + TypeScript
- Fastify
- PostgreSQL
- Prisma
- Zod

## Estructura del repositorio

```text
apps/
  web/       # frontend
  api/       # único runtime con acceso a base de datos

packages/
  shared/    # DTOs, enums, schemas y utilidades puras

docs/
  adr/       # decisiones arquitectónicas aceptadas

prompts/
  architect-agent.md
  planning-agent.md
  coding-agent.md
  reviewer-agent.md

tasks/
  TASK-*.md
Reglas estructurales

Los ADR aceptados son ley del repositorio.

apps/api es el único runtime con acceso a base de datos.

apps/web consume solo contratos públicos del backend.

packages/shared contiene solo DTOs, enums, schemas y utilidades puras.

No se usan modelos de persistencia como contratos públicos.

No se mezclan planificación, implementación y revisión en una sola responsabilidad.

AI Dev Loop
Roles

Architect: define límites, coherencia estructural y necesidad de ADRs.

Planner: convierte objetivos en tareas ejecutables, acotadas y revisables.

Coding Agent: implementa solo la tarea asignada.

Reviewer: valida cambios contra tarea, ADRs y límites de arquitectura.

Flujo

Definir o actualizar contexto y ADRs si corresponde.

Crear una tarea explícita en tasks/.

Ejecutar implementación acotada.

Revisar contra aceptación y arquitectura.

Corregir antes de ampliar alcance.

Estado inicial esperado

Bootstrap estructural del monorepo con:

workspace operativo

apps mínimas web y api

paquete shared

Prisma instalado en apps/api

scripts base de desarrollo, build y typecheck

Comandos esperados
pnpm install
pnpm dev
pnpm build
pnpm typecheck
Gobernanza

Antes de introducir cambios estructurales:

revisar ADRs en docs/adr

evitar mezclar contratos públicos con modelos de persistencia

mantener cambios mínimos, explícitos y revisables

Nota

Este repositorio prioriza:

estabilidad estructural

claridad de contratos

separación de capas

revisabilidad del trabajo

velocidad solo cuando no compromete lo anterior
```
