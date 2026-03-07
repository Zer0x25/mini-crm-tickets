# Task ID

TASK-003

# Title

First public ticket read slice

# Objective

Implement the first minimal public read-only ticket slice across shared contracts, API, and web, while preserving architectural boundaries.

# In Scope

- Define minimal public ticket DTOs in `packages/shared`
- Add a minimal read-only `/tickets` endpoint in `apps/api`
- Consume that endpoint from `apps/web`
- Keep all logic placeholder/simple and aligned with current bootstrap stage

# Out of Scope

- Auth
- Ticket creation or mutation
- Database-backed persistence
- Role logic
- Advanced UI
- Docker
- Advanced tests
- Architectural refactors

# Relevant ADRs

- ADR-001 Monorepo Structure
- ADR-002 API Contract
- ADR-003 Data Access
- ADR-004 AI Engineering Loop

# Affected Areas

- `packages/shared`
- `apps/api`
- `apps/web`

# Acceptance Criteria

- Public ticket DTOs exist in `packages/shared`
- `apps/api` exposes a read-only `/tickets` endpoint
- `apps/web` consumes `/tickets` through public backend access
- No persistence models are exposed as public contracts
- `apps/web` does not access database or backend internals directly
- Scope remains limited to a read-only vertical slice

# Risks

- Leaking persistence shape into public contracts
- Introducing direct frontend dependency on backend internals
- Expanding into CRUD prematurely

# Notes / Constraints

- This task file was reconstructed after implementation to regularize repository task history.
- Content reflects the implemented scope that was reviewed and accepted.
- Use only public contracts across layers.
