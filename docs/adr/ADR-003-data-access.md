# ADR-003: Data Access Pattern

## Decisión

Usar Prisma ORM como capa de acceso a datos para abstracción y seguridad.

## Contexto

Necesitamos:

- Type-safety en queries de BD
- Migraciones versionadas
- Protección contra SQL injection
- Generación de tipos automática

## Consecuencias

**Positivas:**

- Type-safety end-to-end
- Migraciones simples y reversibles
- Generación de client automática
- Menos código boilerplate

**Negativas:**

- Abstracción con overhead
- Queries complejas pueden ser limitantes
- Vendor lock-in relativo (pero mitigado)

## Alternativas Rechazadas

- Raw SQL: Menos seguridad, más código
- TypeORM: Más pesado, similar valor agregado

## Status

PROPOSED
