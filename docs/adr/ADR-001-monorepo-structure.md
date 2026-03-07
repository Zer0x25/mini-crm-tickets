# ADR-001: Monorepo Structure

## Status

ACCEPTED

## Context

This repository is a controlled testbed for an AI Engineering Loop.
The project includes:

- a frontend application
- a backend application
- a shared package
- architecture and process documentation
- prompts and task definitions for AI agents

We need a repository structure that:

- supports coordinated cross-layer changes
- enables shared types and contracts
- keeps architectural boundaries explicit
- reduces context fragmentation for human and AI agents

## Decision

We adopt a monorepo structure with the following top-level organization:

- `apps/web` → frontend application
- `apps/api` → backend application
- `packages/shared` → shared types, DTOs, schemas, and pure utilities
- `docs/adr` → architectural decisions
- `prompts` → agent instructions
- `tasks` → implementation tasks
- `.github/workflows` → CI automation

## Architectural Rules

1. `apps/api` is the only runtime allowed to access the database.
2. `apps/web` must consume backend functionality only through public API contracts.
3. `packages/shared` must not contain infrastructure code.
4. Shared code must remain framework-agnostic whenever possible.
5. AI agents must operate within explicit task scope and respect this repository structure.

## Consequences

### Positive

- coordinated changes in a single repository
- easier contract sharing
- simpler architectural visibility
- better input packaging for AI agents
- reduced duplication of shared types

### Negative

- repository tooling is more complex than a single app repo
- weak boundaries can lead to shared-package abuse
- CI may become slower over time if not segmented

## Rejected Alternatives

### Multi-repo

Rejected because it increases coordination cost for a project explicitly designed to test AI-assisted cross-layer work.

### Shared code by copy-paste

Rejected because it destroys contract discipline and makes AI-generated updates inconsistent.

## Follow-up Rules

- No database clients outside `apps/api`
- No frontend-specific code inside `packages/shared`
- No backend framework code inside `packages/shared`
- Any boundary violation must be treated as an architectural defect
