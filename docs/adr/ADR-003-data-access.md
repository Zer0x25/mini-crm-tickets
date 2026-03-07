# ADR-003: Data Access Ownership and Persistence Boundaries

## Status

ACCEPTED

## Context

This repository includes a backend application (`apps/api`) and a shared package (`packages/shared`).
The system will use PostgreSQL as the primary database and Prisma as the persistence tool.

Because this project is also a testbed for an AI Engineering Loop, persistence boundaries must be explicit.
Without strong rules, AI agents tend to:

- leak database concerns into other layers
- couple frontend code to persistence models
- bypass service boundaries
- mix transport, domain, and storage concerns

We need a persistence model that is simple, reviewable, and enforceable.

## Decision

Database access is owned exclusively by `apps/api`.

Prisma is the selected persistence tool for:

- schema definition
- migrations
- type-safe database access
- local development workflow

All database reads and writes must occur through backend-owned code.
No other workspace may instantiate, wrap, or call the database client directly.

## Architectural Rules

1. Only `apps/api` may import or use Prisma Client.
2. `packages/shared` must not contain persistence logic, database queries, or ORM-bound code.
3. `apps/web` must never access database structures directly.
4. Backend handlers must not expose raw persistence structures without intentional mapping.
5. Persistence concerns must remain separated from transport contracts and UI models.
6. Queries should be located in backend modules or services, not scattered across unrelated files.
7. Migrations are part of the repository truth and must be versioned.

## Consequences

### Positive

- clear ownership of persistence
- reduced cross-layer coupling
- easier review of data access patterns
- safer AI-generated changes
- cleaner future refactors

### Negative

- requires explicit mapping when storage and transport shapes differ
- introduces some boilerplate in service boundaries
- may feel slower than directly reusing ORM types everywhere

## Rejected Alternatives

### Allow shared package to expose Prisma-based helpers

Rejected because it weakens architectural boundaries and encourages hidden infrastructure coupling.

### Let frontend depend on persistence shapes

Rejected because storage models are not UI contracts and should not drive presentation structure.

### Use raw SQL everywhere

Rejected for this project because it increases implementation overhead and weakens the speed and consistency benefits needed for loop experimentation.

## Follow-up Rules

- Keep Prisma schema in `apps/api/prisma`
- Keep Prisma Client usage inside backend-only modules
- Treat migrations as mandatory repository artifacts
- Review any new data access path as an architectural change, not a convenience refactor
