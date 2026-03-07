# Task ID

TASK-004

# Title

Read slice hardening

# Objective

Harden the first public read-only ticket slice by replacing hardcoded frontend configuration and making backend CORS explicit and environment-driven.

# In Scope

- Move frontend API base URL configuration out of hardcoded source and into environment-based config
- Introduce a minimal frontend API client module for ticket reads
- Make backend CORS configuration explicit and environment-driven
- Keep the existing `/tickets` read-only slice working
- Keep changes minimal and reviewable

# Out of Scope

- Auth
- Writes or mutations
- Database-backed persistence
- Domain expansion
- Advanced UI
- Docker
- Architectural refactors

# Relevant ADRs

- ADR-001 Monorepo Structure
- ADR-002 API Contract
- ADR-003 Data Access
- ADR-004 AI Engineering Loop

# Affected Areas

- `apps/web`
- `apps/api`
- root environment configuration

# Acceptance Criteria

- Frontend no longer hardcodes API base URL in component code
- Frontend uses a minimal API client module for ticket reads
- Backend CORS is configured explicitly from environment values
- `.env.example` documents required configuration values for the read slice
- Existing read-only `/tickets` behavior remains intact
- Repository boundaries remain aligned with accepted ADRs

# Risks

- Hiding configuration assumptions in source code
- Keeping permissive CORS defaults by inertia
- Expanding hardening into unrelated refactors

# Notes / Constraints

- This task file was reconstructed after implementation to regularize repository task history.
- Content reflects the implemented scope that was reviewed and accepted.
- Keep the slice read-only and avoid product scope expansion.
