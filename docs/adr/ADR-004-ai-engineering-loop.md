# ADR-004: AI Engineering Loop Governance

## Status

ACCEPTED

## Context

This repository is intentionally designed as a controlled environment to test an AI Engineering Loop.

The goal is not to let a single model improvise the whole system.
The goal is to separate responsibilities so that:

- planning is explicit
- implementation is scoped
- review is independent
- architecture remains stable over time

Without role separation, AI-assisted development tends to degrade into:

- ambiguous task execution
- uncontrolled cross-layer edits
- hidden architectural drift
- self-approval by the same reasoning path that introduced the change

We need a governance model that makes AI assistance useful without turning the repository into probabilistic chaos.

## Decision

We adopt an AI Engineering Loop with distinct roles:

1. Human Architect
2. Planning Agent
3. Coding Agent
4. Reviewer Agent
5. CI Verifier

These roles may be executed through different tools, but their responsibilities must remain logically separate.

## Role Definitions

### 1. Human Architect

Owns:

- scope decisions
- architecture
- ADR approval
- final acceptance of important changes

The Human Architect does not delegate architectural truth to an implementation agent.

### 2. Planning Agent

Owns:

- task decomposition
- implementation planning
- scope framing
- identifying affected files and risks

The Planning Agent must not generate production code as its main output.

### 3. Coding Agent

Owns:

- implementation of explicit tasks
- limited-scope repository changes
- code updates aligned with ADRs and task constraints

The Coding Agent must not redefine architecture or silently widen scope.

### 4. Reviewer Agent

Owns:

- architectural review
- boundary enforcement
- maintainability review
- detection of unnecessary or risky changes

The Reviewer Agent should evaluate changes independently from the implementation step whenever possible.

### 5. CI Verifier

Owns:

- automated validation
- build checks
- type checks
- tests
- repository-wide mechanical quality gates

CI is the final automated gate and must not be bypassed for normal feature work.

## Architectural Rules

1. Planning, implementation, and review are distinct responsibilities.
2. No single agent should be treated as planner, implementer, and reviewer for the same change without explicit human awareness.
3. Every implementation task must be grounded in a task file or equivalent scoped instruction.
4. Coding agents must respect ADRs as repository law.
5. Reviewer output must be allowed to reject or request changes.
6. CI failure blocks merge readiness.
7. Prompt files and tasks are part of repository governance, not disposable notes.

## Tool Mapping for This Repository

The expected logical mapping is:

- Human Architect -> repository owner / maintainer
- Planning Agent -> ChatGPT with repository context
- Coding Agent -> IDE-based coding agent
- Reviewer Agent -> ChatGPT or equivalent review-oriented agent
- CI Verifier -> GitHub Actions or equivalent pipeline

Tool choice may evolve, but role separation must remain.

## Consequences

### Positive

- clearer accountability
- better architectural stability
- easier review of AI-generated changes
- lower risk of uncontrolled repository drift
- reusable operating model for future projects

### Negative

- more process overhead than ad hoc prompting
- requires disciplined task writing
- weak prompts can still produce bad outputs
- role separation can be ignored unless enforced intentionally

## Rejected Alternatives

### Single super-agent workflow

Rejected because combining planning, implementation, and approval into one loop increases error propagation and reduces independent scrutiny.

### Human-only review without task structure

Rejected because unscoped AI outputs create inconsistent change quality and make review harder.

### Fully autonomous merge flow from day one

Rejected because this repository is a learning and governance testbed, not an autonomy-first production environment.

## Follow-up Rules

- Every non-trivial change should start from a task
- Every task should reference relevant ADRs
- Review should check both correctness and boundary discipline
- CI should evolve from placeholder to mandatory gate
- If a repeated class of agent error appears, prompts or ADRs must be updated
