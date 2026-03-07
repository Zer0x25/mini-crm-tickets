# Mini CRM Tickets

Monorepo para un sistema de gestión de tickets personal con AI Engineering Loop.

## Estructura

- **apps/web**: Frontend React
- **apps/api**: Backend Node.js + Express + Prisma
- **packages/shared**: Tipos y utilidades compartidas
- **docs**: Arquitectura y decisiones (ADRs)
- **prompts**: Definiciones de agentes AI
- **tasks**: Tareas del proyecto

## Inicio rápido

```bash
# Cambiar directorio
cd mini-crm-tickets

# Docker
docker-compose up -d

# Instalar dependencias (pendiente)
# npm install

# Correr migraciones (pendiente)
# npm run migrate
```

## AI Engineering Loop

Este proyecto utiliza un loop de AI Engineering con agentes especializados:

- Planning Agent: Análisis y planificación
- Architect Agent: Decisiones de arquitectura (ADRs)
- Coding Agent: Implementación
- Reviewer Agent: Revisión de código

Ver `prompts/` para definiciones detalladas.

## Status

🟡 En bootstrap inicial - Estructura base creada
