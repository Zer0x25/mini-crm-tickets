# Copilot Instructions for mini-crm-tickets

AI agents working on this repository must follow these guidelines. **Read docs/repository-rules.md first** — it contains enforceable structural rules.

## Core Principles

1. **ADRs are authoritative** → No implementation violates accepted ADRs
2. **Explicit boundaries** → Layer separation is not optional
3. **Task scope is mandate** → Work only on stated objectives
4. **Minimal change principle** → Don't expand scope without explicit task update
5. **Public contracts, not storage shapes** → Types in `packages/shared` represent API exchange, not DB persistence

## Project Structure

```
mini-crm-tickets/
├── apps/
│   ├── api/              # Backend: Node.js + Fastify + TypeScript + Prisma
│   │   ├── src/          # HTTP handlers, services, middleware
│   │   ├── prisma/       # DB schema and migrations
│   │   └── tests/        # API tests
│   └── web/              # Frontend: React 19 + TypeScript + Vite
│       ├── src/          # React components, hooks, pages
│       └── public/       # Static assets
├── packages/
│   └── shared/           # Shared types, DTOs, schemas (no DB access)
├── docs/
│   ├── adr/              # Accepted Architecture Decision Records
│   ├── architecture/     # Deployment, system design diagrams
│   └── repository-rules.md  # Enforceable structural rules
├── prompts/              # AI agent instructions (Planning, Architect, Coding, Reviewer)
└── tasks/                # TASK-XXX formalized work items
```

## Technology Stack

| Component          | Tech       | Version                           |
| ------------------ | ---------- | --------------------------------- |
| Package Manager    | pnpm       | 10.0.0+                           |
| Build System       | Turbo      | 2.5.0+                            |
| Backend Server     | Fastify    | Latest in `apps/api/package.json` |
| Backend Language   | TypeScript | 5.7.0+                            |
| Frontend Framework | React      | 19+                               |
| Frontend Bundler   | Vite       | Latest                            |
| Database ORM       | Prisma     | Latest in `apps/api/package.json` |
| Database           | PostgreSQL | 15 (Docker)                       |

## Common Commands

```bash
# Development
pnpm dev                    # Start dev servers (Turbo runs all apps)
pnpm build                  # Build all apps
pnpm typecheck              # TypeScript check all packages
pnpm lint                   # Lint all packages
pnpm test                   # Run tests all packages

# In specific app
cd apps/api
pnpm dev                    # Dev server for api only
pnpm typecheck              # Typecheck api only

# Database (from apps/api)
pnpm prisma migrate dev     # Create and apply new migration
pnpm prisma generate        # Regenerate Prisma client
```

## Layer Boundaries (Critical)

### apps/api

**Authority**: Database, business logic, API shape

- ✅ Can import from `packages/shared`
- ✅ Can use Prisma models, DB operations, infrastructure
- ✅ Can access environment variables, secrets
- ✅ Can import Node-specific code

**Responsibilities**:

- Define and maintain Prisma schema
- Implement HTTP handlers and validation
- Create migrations
- Export public API contracts to `packages/shared`

### apps/web

**Authority**: User interface, client state

- ✅ Can import from `packages/shared`
- ✅ Can import React, Vite, and browser APIs
- ❌ Cannot import from `apps/api` directly
- ❌ Cannot use Prisma
- ❌ Cannot access server-only code

**Responsibilities**:

- Build UI for contracts defined in `packages/shared`
- Implement client-side state management
- Call API endpoints defined in contracts

### packages/shared

**Authority**: Public contracts between layers

- ✅ Can export TypeScript types, enums, zod schemas
- ✅ Can export pure utility functions
- ✅ Can export validation logic
- ❌ Cannot import from `apps/api` or `apps/web`
- ❌ Cannot use Prisma, database access, framework-specific code
- ❌ Cannot have server-only imports or side effects

**Responsibilities**:

- Define request/response DTOs
- Define validation schemas
- Define domain enums and constants
- Export utility functions usable by both layers

## Working with Tasks

Tasks follow structured format in `tasks/TASK-XXX-*.md`:

```markdown
# [TASK-XXX]

- Title
- Objective: What problem does this solve?
- In Scope: Exactly what will be done
- Out of Scope: What won't be done
- Completion Criteria: How to verify it's done
- Dependencies: Other tasks required first
```

### Before Starting a Task

1. Read the entire task file
2. Check dependencies (must be completed first)
3. Review relevant ADRs in `docs/adr/`
4. Check `docs/repository-rules.md`
5. Ensure you understand scope boundaries

### During Implementation

- Work only within "In Scope"
- Validate against "Completion Criteria"
- Don't violate any accepted ADR
- Use TypeScript strict mode
- Prefer explicit types over `any`

### After Implementation

1. Verify all "Completion Criteria" are met
2. Run tests: `pnpm test`
3. Type check: `pnpm typecheck`
4. Create minimal, focused commit(s)
5. Update task status in the file

## ADR Workflow

Architecture Decision Records document structural decisions.

**When to Create/Update ADR**:

- Boundary between layers changes
- Data ownership shifts
- Public contract shape strategy changes
- Build/runtime topology changes
- Cross-cutting standards need defining

**ADR Location**: `docs/adr/ADR-NNN-title.md`

**ADR Template**:

```markdown
# ADR-NNN: Title

## Decision

One sentence summary.

## Context

Why this decision matters, constraints, alternatives considered.

## Consequences

Benefits and trade-offs.

## Status

PROPOSED | ACCEPTED | SUPERSEDED | DEPRECATED
```

## Commit Conventions

- Prefix with component: `api:`, `web:`, `shared:`, `docs:`, `ci:`
- Be specific: Avoid generic "fix bug" or "update code"
- Include task reference: `api: TASK-002 implement health check endpoint`
- Keep commits atomic: One logical change per commit
- Write clear messages useful for future readers

Example:

```
api: TASK-002 implement GET /health endpoint with status and timestamp
shared: TASK-003 add HealthResponse DTO to public contracts
```

## Type Safety Standards

- TypeScript strict mode enabled in all apps
- No `any` unless absolutely necessary (document with `// @ts-ignore` comment)
- Use `unknown` for dynamic values, narrow with type guards
- Export explicit public types from modules
- Use semantic names: avoid `Data`, `Result`, `Response` without qualifier

## Testing Expectations

- Unit tests for business logic in `apps/api/src/**`
- Integration tests for API endpoints
- Type checking passes: `pnpm typecheck`
- Linting passes: `pnpm lint`

## Prompt Navigation

When facing a complex decision, refer to role-specific prompts in `prompts/`:

| Role                 | Purpose                             | When to Use           |
| -------------------- | ----------------------------------- | --------------------- |
| `planning-agent.md`  | Decompose requirements into tasks   | Planning phase        |
| `architect-agent.md` | Design and document decisions       | Before implementation |
| `coding-agent.md`    | Implement based on task and ADRs    | During development    |
| `reviewer-agent.md`  | Validate code quality and adherence | Before merge          |

## Common Pitfalls

❌ **Don't**: Import Prisma models in `apps/web` or `packages/shared`

- **Do**: Export DTO types from `packages/shared`, use those in `apps/web`

❌ **Don't**: Add business logic to `packages/shared`

- **Do**: Keep it pure utilities and contract definitions only

❌ **Don't**: Expand task scope without updating the task file

- **Do**: Create new task if additional work is needed

❌ **Don't**: Skip TypeScript type checking

- **Do**: Run `pnpm typecheck` before committing

❌ **Don't**: Mix roles (planning + implementation + review) in one pass

- **Do**: Follow the workflow: Plan → Architect → Code → Review

## Repository Health Checks

Before creating a commit:

- [ ] All code is TypeScript with strict mode
- [ ] No imports violate layer boundaries
- [ ] Task completion criteria are met
- [ ] Tests pass: `pnpm test`
- [ ] Types check: `pnpm typecheck`
- [ ] Lint passes: `pnpm lint`
- [ ] Commit message references task
- [ ] No placeholders or XXX comments left behind

## File Structure Examples

### Good: Public contract in shared

```typescript
// packages/shared/src/tickets.ts
export type CreateTicketRequest = {
  title: string;
  description: string;
};

export type TicketResponse = {
  id: string;
  title: string;
  description: string;
  status: "open" | "closed";
  createdAt: string;
};
```

### Good: Using contract in API

```typescript
// apps/api/src/handlers/tickets.ts
import { CreateTicketRequest, TicketResponse } from "@shared/tickets";

export async function createTicket(
  req: CreateTicketRequest,
): Promise<TicketResponse> {
  // Implementation using Prisma
}
```

### Good: Using contract in Web

```typescript
// apps/web/src/api.ts
import { CreateTicketRequest, TicketResponse } from "@shared/tickets";

export async function createTicket(
  payload: CreateTicketRequest,
): Promise<TicketResponse> {
  return fetch("/api/tickets", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
```

### ❌ Bad: DB model in shared

```typescript
// packages/shared/src/models.ts (WRONG!)
import { PrismaClient } from "@prisma/client"; // Don't do this
import type { Ticket } from "@prisma/client"; // Don't do this

export type { Ticket }; // Exposes DB shape, violates layer boundary
```

## Questions Before Starting Work

If a task or requirement is unclear, ask:

1. **Scope**: "Is [X] in or out of scope for this task?"
2. **Boundary**: "Which layer should own [component/logic]?"
3. **Contract**: "Should this be added to `packages/shared` or kept internal?"
4. **Precedent**: "Does an existing ADR address this?"
5. **Task**: "Should I create a new task or expand this one?"

## Support and References

- **Layer boundaries**: See `docs/repository-rules.md`
- **Architecture decisions**: Browse `docs/adr/`
- **Task examples**: See `tasks/TASK-*.md`
- **Agent workflows**: See `prompts/*.md`
- **Implemented patterns**: Review `apps/*/src/` for examples

---

**Last Updated**: 2026-03-07
**Status**: Active guidance
