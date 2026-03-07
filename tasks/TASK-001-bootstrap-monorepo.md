# Task ID

TASK-001

# Title

Bootstrap base del monorepo mini-crm-tickets

# Objective

Crear la base operativa mínima del monorepo con `apps/web`, `apps/api` y `packages/shared`, respetando los límites definidos por los ADR aceptados.

# In Scope

- Inicializar workspace con pnpm
- Configurar Turbo en raíz
- Crear estructura base:
  - `apps/web`
  - `apps/api`
  - `packages/shared`
- Dejar `apps/web` con una app mínima en React + TypeScript
- Dejar `apps/api` con una app mínima en Node + TypeScript + Fastify
- Agregar endpoint `GET /health` en `apps/api`
- Instalar Prisma en `apps/api`
- Crear schema Prisma placeholder sin lógica de negocio
- Configurar scripts mínimos:
  - `dev`
  - `build`
  - `typecheck`
- Dejar `packages/shared` listo para contratos compartidos
- Mantener importaciones y dependencias alineadas con límites de capa

# Out of Scope

- Autenticación
- CRUD de tickets
- Roles y permisos
- Lógica de negocio
- Integración real con PostgreSQL productiva
- Docker
- CI avanzado
- Tests de negocio
- UI compleja
- Integraciones externas

# Relevant ADRs

- ADR-001 Monorepo Structure
- ADR-002 API Contract
- ADR-003 Data Access
- ADR-004 AI Engineering Loop

# Affected Areas

- root workspace
- apps/web
- apps/api
- packages/shared

# Acceptance Criteria

- El repo instala dependencias con `pnpm install`
- `pnpm dev` levanta `apps/web` y `apps/api`
- `apps/api` expone `GET /health` con respuesta exitosa
- `pnpm build` ejecuta sin errores
- `pnpm typecheck` ejecuta sin errores
- `packages/shared` existe y compila sin contener infraestructura
- `apps/web` no accede a Prisma ni a base de datos
- `apps/api` es el único lugar con Prisma
- No se exponen modelos Prisma como contratos públicos
- La implementación respeta estrictamente los límites por capa

# Risks

- Mezclar contratos públicos con modelos Prisma
- Introducir infraestructura dentro de `packages/shared`
- Hacer imports cruzados indebidos entre apps
- Expandir alcance más allá del bootstrap

# Notes / Constraints

- Preferir cambios mínimos y explícitos
- No inventar features no solicitadas
- No agregar abstracciones ceremoniales
- No introducir decisiones estructurales nuevas sin señalarlas
