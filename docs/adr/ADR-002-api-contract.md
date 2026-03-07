# ADR-002: API Contract

## Decisión

Definir contratos de API mediante tipos TypeScript compartidos y documentar con OpenAPI/Swagger (pendiente).

## Contexto

Frontend y backend necesitan un acuerdo claro sobre:

- Estructura de requests/responses
- Códigos de error
- Paginación y filtrado
- Autenticación

## Consecuencias

**Positivas:**

- Contrato claro entre frontend y backend
- Facilita testing
- Documentación automática posible

**Negativas:**

- Requiere sincronización de cambios
- Overhead inicial

## Alternativas Rechazadas

- GraphQL: Complejidad innecesaria para este proyecto
- Protobuf: Overkill para REST simple

## Status

PROPOSED
