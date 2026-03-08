# Task ID

TASK-008

# Title

Dev quality gates

# Objective

Improve the local and CI validation flow so basic linting and formatting issues are detected earlier, consistently, and with minimal friction before changes are pushed.

# In Scope

- Add explicit formatting tooling and root scripts for formatting and verification
- Add a root `verify` script that runs the repository quality checks in sequence
- Update CI to run formatting check and lint in addition to existing typecheck and build
- Add Husky-based git hooks
- Add a pre-commit hook for staged-file quality checks
- Add a pre-push hook for repository-level verification
- Keep the implementation minimal and consistent with the current monorepo structure

# Out of Scope

- New product features
- Auth
- Ticket domain expansion
- Advanced test strategy
- Release automation
- Commit message linting
- Semantic versioning automation
- Docker changes
- Broad repository refactors

# Relevant ADRs

- ADR-001 Monorepo Structure
- ADR-002 API Contract
- ADR-003 Data Access
- ADR-004 AI Engineering Loop

# Affected Areas

- root workspace
- `.github/workflows`
- git hooks configuration
- package scripts

# Acceptance Criteria

- Root formatting scripts exist and are documented by package scripts
- Root `verify` script exists and runs the agreed quality checks
- CI runs format check, lint, typecheck, and build
- Pre-commit hook checks staged changes with minimal friction
- Pre-push hook runs repository-level verification
- Existing repository boundaries remain aligned with accepted ADRs

# Risks

- Adding too much local friction with heavy hooks
- Duplicating checks unnecessarily between hooks and CI
- Introducing tooling complexity beyond the current stage
- Making hooks slow enough that developers try to bypass them

# Notes / Constraints

- Prefer minimal, explicit, reviewable changes
- Keep pre-commit fast
- Keep pre-push useful but not theatrical
- Do not expand scope into unrelated tooling or release automation
