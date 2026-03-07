# ADR-002: API Contract Ownership and Boundaries

## Status

ACCEPTED

## Context

The project includes a frontend (`apps/web`) and a backend (`apps/api`) that must evolve without uncontrolled coupling.

Because this repository is also a testbed for an AI Engineering Loop, we need contracts that:

- reduce ambiguity for implementation agents
- make frontend/backend integration predictable
- allow review agents to detect boundary violations
- keep future refactors manageable

Without explicit contract ownership, AI agents tend to:

- duplicate types
- invent response shapes
- couple UI directly to persistence structures
- create silent breaking changes

## Decision

The backend owns the API behavior.
Shared contract definitions may exist in `packages/shared`, but only as public transport-level artifacts.

The contract boundary is defined as:

- request DTOs
- response DTOs
- shared enums
- validation-friendly data shapes

The following are not part of the shared contract layer:

- database models as persistence truth
- ORM entities
- backend internal service objects
- frontend UI state models

## Architectural Rules

1. `apps/api` defines and enforces API behavior.
2. `apps/web` may only rely on public API contracts, never internal backend models.
3. `packages/shared` may contain DTOs, enums, and schema-friendly shared shapes.
4. Prisma models must not be treated as frontend contracts by default.
5. Any contract change must be deliberate and reviewed for backward compatibility.
6. If a transport shape differs from a persistence shape, the backend must map explicitly.

## Consequences

### Positive

- reduces accidental coupling
- improves testability
- makes API review easier
- prevents frontend leakage into backend internals
- improves predictability for AI-generated code

### Negative

- requires explicit mapping in some cases
- introduces small maintenance overhead for DTO definitions
- may feel slower than reusing persistence types directly

## Rejected Alternatives

### Reuse Prisma models everywhere

Rejected because persistence models and transport contracts serve different concerns and evolve differently.

### Let frontend infer shapes from examples

Rejected because it creates fragile, undocumented integration behavior and makes AI outputs drift.

### Keep contracts only in backend

Rejected because selected transport contracts need a stable shared location for cross-layer use.

## Follow-up Rules

- Treat DTOs as API-facing artifacts, not storage artifacts
- Prefer explicit names like `CreateTicketRequest` or `TicketResponse`
- Do not expose internal nullable or relational persistence details unless intentionally part of the API
- Any breaking contract change must update tasks, prompts, and review criteria
