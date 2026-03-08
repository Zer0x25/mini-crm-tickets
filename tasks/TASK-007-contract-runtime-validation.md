# Task ID

TASK-007

# Title

Contract runtime validation

# Objective

Introduce explicit runtime validation for the public ticket contracts so the repository enforces API boundary correctness beyond TypeScript-only typing.

# In Scope

- Add runtime schemas for the current public ticket contracts in `packages/shared`
- Keep schemas aligned with existing DTOs for:
  - ticket summary
  - ticket list response
  - create ticket request
  - create ticket response
- Validate incoming create-ticket payloads in `apps/api`
- Validate or parse persisted-to-public response shapes in `apps/api` where appropriate
- Keep the existing read and create ticket slices working
- Keep changes minimal and reviewable

# Out of Scope

- New ticket features
- Ticket update or deletion
- Authentication
- Authorization
- Advanced domain rules
- Broad frontend refactors
- Docker changes
- Large test expansions
- Architectural refactors unrelated to contract validation

# Relevant ADRs

- ADR-001 Monorepo Structure
- ADR-002 API Contract
- ADR-003 Data Access
- ADR-004 AI Engineering Loop

# Affected Areas

- `packages/shared`
- `apps/api/src`
- `apps/web/src` (only if needed for safe consumption of current contracts)

# Acceptance Criteria

- Runtime schemas exist in `packages/shared` for the current public ticket contracts
- `POST /tickets` validates incoming request payloads using shared runtime contract definitions
- API responses for current ticket slices remain aligned with shared public contracts
- Public contracts are still not coupled to Prisma models
- Existing `GET /tickets` and `POST /tickets` flows continue working
- Repository boundaries remain aligned with accepted ADRs

# Risks

- Duplicating contract logic between DTOs and runtime validation
- Letting persistence concerns leak into shared schemas
- Expanding validation scope beyond the current ticket slice
- Introducing unnecessary abstraction for a still-small codebase

# Notes / Constraints

- Prefer minimal, explicit, reviewable changes
- Keep validation centered on public API contracts
- Do not introduce new product scope
- Do not move database or persistence concerns outside `apps/api`
