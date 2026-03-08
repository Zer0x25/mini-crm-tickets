# Task ID

TASK-009

# Title

API error boundary hardening

# Objective

Improve API error boundary behavior so public responses distinguish validation failures from internal server failures, while keeping the current ticket read and create slices working.

# In Scope

- Introduce a minimal and explicit API error handling strategy in `apps/api`
- Distinguish invalid client input from internal server errors for current ticket endpoints
- Ensure `POST /tickets` returns a client error only for invalid public request payloads
- Ensure unexpected persistence or internal runtime failures return a server error
- Keep public error responses minimal and consistent
- Keep the current `GET /tickets` and `POST /tickets` flows working
- Keep changes minimal and reviewable

# Out of Scope

- New ticket features
- Ticket update or deletion
- Authentication
- Authorization
- Full observability redesign
- Global domain error model
- Broad frontend refactors
- Docker changes
- Advanced test expansion beyond what is strictly needed for this task

# Relevant ADRs

- ADR-001 Monorepo Structure
- ADR-002 API Contract
- ADR-003 Data Access
- ADR-004 AI Engineering Loop

# Affected Areas

- `apps/api/src`
- `packages/shared` (only if a minimal public error contract is truly needed)
- tests related to current ticket API slices, if present or required

# Acceptance Criteria

- `POST /tickets` returns a 400-level response only for invalid client payloads
- Unexpected internal or persistence errors return a 500-level response
- Error response behavior for current ticket endpoints is explicit and consistent
- Existing `GET /tickets` and `POST /tickets` success flows continue working
- Repository boundaries remain aligned with accepted ADRs
- No persistence model details leak into public error responses

# Risks

- Overengineering error handling for a still-small backend
- Mixing validation concerns with generic runtime error handling
- Introducing public error contracts that are too broad too early
- Expanding scope into framework-wide exception architecture

# Notes / Constraints

- Prefer minimal, explicit, reviewable changes
- Keep the solution focused on current ticket endpoints
- Avoid speculative error abstraction
- Do not introduce new product scope
- Do not move database or persistence concerns outside `apps/api`
