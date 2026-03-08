# Task ID

TASK-005

# Title

First ticket persistence read

# Objective

Introduce the first real persisted ticket read flow in `apps/api` using Prisma, while preserving strict separation between persistence models and public API contracts.

# In Scope

- Define a minimal Ticket model in `apps/api/prisma/schema.prisma`
- Add the minimum Prisma setup needed for persisted ticket reads
- Update `GET /tickets` to read from persistence instead of in-memory records
- Map persisted ticket records explicitly into public DTOs
- Keep `packages/shared` as the source of public ticket contracts
- Keep the frontend consuming the existing public `/tickets` contract

# Out of Scope

- Ticket creation
- Ticket update or deletion
- Authentication
- Authorization
- Advanced filtering
- Pagination
- Domain workflow/state machine expansion
- Docker changes
- Large UI refactors

# Relevant ADRs

- ADR-001 Monorepo Structure
- ADR-002 API Contract
- ADR-003 Data Access
- ADR-004 AI Engineering Loop

# Affected Areas

- `apps/api/prisma`
- `apps/api/src`
- `packages/shared`
- `apps/web` (only if needed to preserve compatibility)

# Acceptance Criteria

- A minimal persisted Ticket model exists in Prisma
- `GET /tickets` reads from persistence in `apps/api`
- Public API response shape remains based on shared DTOs
- Prisma models are not exposed directly to the frontend
- `apps/web` continues consuming the public contract only
- Repository boundaries remain aligned with accepted ADRs

# Risks

- Exposing persistence shape as public contract
- Letting data access concerns leak outside `apps/api`
- Expanding into CRUD or domain logic prematurely

# Notes / Constraints

- Prefer minimal, explicit, reviewable changes
- Preserve current read-only behavior
- Do not introduce product scope beyond persisted reads
