# Task ID

TASK-002

# Title

Baseline quality hardening

# Objective

Improve repository baseline quality after bootstrap completion by adding linting, minimum CI verification, and logging consistency without introducing product features.

# In Scope

- Configure real linting for the monorepo
- Ensure root and package scripts are consistent
- Replace remaining `console.log` usage in `apps/api` with framework-consistent logging
- Add a minimal GitHub Actions CI workflow for install, typecheck, and build
- Keep changes minimal and explicit

# Out of Scope

- Auth
- Ticket CRUD
- Domain logic
- Docker
- Advanced testing
- Database model expansion
- Architectural refactors

# Relevant ADRs

- ADR-001 Monorepo Structure
- ADR-002 API Contract
- ADR-003 Data Access
- ADR-004 AI Engineering Loop

# Affected Areas

- root workspace
- `.github/workflows`
- `apps/api`
- `apps/web`
- `packages/shared`

# Acceptance Criteria

- Monorepo lint configuration exists and is reusable across packages
- `lint` scripts exist and are consistent across packages
- API startup logging uses framework logger instead of `console.log`
- CI workflow runs install, typecheck, and build
- No new product features are introduced
- Repository boundaries remain aligned with accepted ADRs

# Risks

- Introducing tooling complexity beyond the current stage
- Mixing quality hardening with product scope
- Creating package script inconsistencies

# Notes / Constraints

- This task file was reconstructed after implementation to regularize repository task history.
- Content reflects the implemented scope that was reviewed and accepted.
- Prefer minimal, explicit, reviewable changes only.
