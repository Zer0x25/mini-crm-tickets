# Repository Rules

## Structural Authority

1. Accepted ADRs are the law of the repository.
2. Task scope overrides assumptions.
3. No implementation may violate accepted ADRs.

## Layer Boundaries

### apps/api

- only runtime allowed to access the database
- owns persistence, business rules and API exposure
- may use Prisma and infrastructure code

### apps/web

- consumes only public backend contracts
- must not access database directly
- must not import server-only infrastructure

### packages/shared

- contains only public/shared cross-layer artifacts:
  - DTOs
  - enums
  - schemas
  - pure utilities
- contains no database access
- contains no framework-bound infrastructure
- contains no runtime side effects

## Public Contract Rules

- API contracts are not persistence models.
- Prisma models must never be exposed directly to the frontend.
- Shared types must represent public exchange contracts, not storage shape.

## Change Rules

- Prefer minimal, explicit and reviewable changes.
- Do not mix architecture, planning, implementation and review in a single artifact.
- Do not introduce placeholders disguised as completed work.
- Do not expand scope without updating the task.

## ADR Rules

Create or update an ADR when a change affects:

- boundaries between layers
- ownership of data access
- public contract shape strategy
- build/runtime topology
- cross-cutting technical standards with structural impact

## Task Execution Rule

- Every non-trivial implementation request to the Coding Agent must start from a task file in `tasks/`.
- Chat instructions alone are not a sufficient execution source for material repository changes.
- Each task file must define:
  - objective
  - in scope
  - out of scope
  - relevant ADRs
  - affected areas
  - acceptance criteria
  - risks or constraints
- Reviews must validate changes against the task file and accepted ADRs.
- If scope changes materially, the task file must be updated before further implementation.
