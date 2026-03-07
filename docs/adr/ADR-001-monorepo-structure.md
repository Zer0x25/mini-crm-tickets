# ADR-001: Monorepo Structure

## Decisión

Usar un monorepo (mono-repositorio) para organizar frontend, backend y código compartido en un único repositorio.

## Contexto

Necesitamos compartir tipos y lógica entre frontend y backend con facilidad. Un monorepo simplifica:

- Cambios coordenados (atomic commits)
- Reutilización de código
- Gestión de dependencias

## Consecuencias

**Positivas:**

- Cambios coordinados y consistentes
- Facilita refactoring cross-cutting
- Tipos compartidos

**Negativas:**

- Requiere tooling especial (pnpm workspaces, lerna, etc.)
- CI/CD más complejo
- Mayor tamaño de repositorio

## Alternativas Rechazadas

- Multi-repo: Más complicado para cambios coordinados y compartir tipos
- Submodules: Difíciles de usar y mantener

## Status

PROPOSED
