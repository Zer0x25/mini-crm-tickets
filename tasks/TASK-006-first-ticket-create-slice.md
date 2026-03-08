# Task ID

TASK-006

# Title

First ticket create slice

# Objective

Implement the first minimal public create flow for tickets, preserving strict separation between public API contracts and persistence models.

# In Scope

- Define the minimal public request DTO for ticket creation in `packages/shared`
- Define the minimal public response DTO for created ticket data in `packages/shared`
- Add a `POST /tickets` endpoint in `apps/api`
- Validate and map the public request into persistence input inside `apps/api`
- Persist the new ticket using Prisma in `apps/api`
- Return a public response DTO from `apps/api`
- Add the minimum frontend UI needed to submit a new ticket and refresh visible ticket data

# Out of Scope

- Ticket update
- Ticket deletion
- Authentication
- Authorization
- Advanced validation rules
- Status workflow expansion
- Filtering
- Pagination
- Advanced UI/UX
- Docker changes
- Broad refactors

# Relevant ADRs

- ADR-001 Monorepo Structure
- ADR-002 API Contract
- ADR-003 Data Access
- ADR-004 AI Engineering Loop

# Affected Areas

- `packages/shared`
- `apps/api/src`
- `apps/api/prisma`
- `apps/web/src`

# Acceptance Criteria

- Public create-ticket request contract exists in `packages/shared`
- Public create-ticket response contract exists in `packages/shared`
- `apps/api` exposes `POST /tickets`
- `POST /tickets` persists a new ticket through Prisma
- Persistence models are not exposed directly as public API contracts
- `apps/web` submits ticket creation through the backend only
- Existing `GET /tickets` flow continues working
- Repository boundaries remain aligned with accepted ADRs

# Risks

- Exposing Prisma model shape as request or response contract
- Letting persistence concerns leak outside `apps/api`
- Expanding create flow into broader ticket lifecycle logic
- Adding unnecessary frontend complexity

# Notes / Constraints

- Prefer minimal, explicit, reviewable changes
- Keep the initial create flow intentionally small
- Avoid speculative domain modeling
- Do not add auth, role logic, or non-essential abstractions
