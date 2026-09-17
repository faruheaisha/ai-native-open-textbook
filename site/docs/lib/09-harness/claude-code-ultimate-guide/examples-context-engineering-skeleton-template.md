---
title: "CLAUDE.md: [Project Name]"
sourceId: "09-harness/claude-code-ultimate-guide"
sourceTitle: "Claude Code Ultimate Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide"
entryUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/context-engineering/skeleton-template.md"
sourceRel: "examples/context-engineering/skeleton-template.md"
rawUrl: "/raw/09-harness/claude-code-ultimate-guide/examples/context-engineering/skeleton-template.md"
sourceSha256: "2bf547099a2a78cb20f0d58b63f670034d00efe29c4d7c43a230b584fdc4de5f"
pageSha256: "2bf547099a2a78cb20f0d58b63f670034d00efe29c4d7c43a230b584fdc4de5f"
contentMode: "local-full"
zh: ""
---

# CLAUDE.md: [Project Name]

## Project Overview

[PROJECT DESCRIPTION]

## Architecture

### Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Language | TypeScript | 5.x |
| Runtime | Node.js | 20.x |
| Framework | [e.g., Express, Fastify, NestJS] | x.x |
| Database | [e.g., PostgreSQL] | x.x |
| ORM / Query Builder | [e.g., Prisma, Drizzle, Knex] | x.x |
| Cache | [e.g., Redis, none] | - |
| Message Queue | [e.g., BullMQ, SQS, none] | - |
| Frontend | [e.g., Next.js, none] | x.x |
| Testing | [e.g., Vitest, Jest] | x.x |
| CI/CD | [e.g., GitHub Actions] | - |

### Folder Structure

```
src/
  [describe key directories and what belongs in each]
  [example: api/ — route handlers only, no business logic]
  [example: services/ — business logic, called by handlers]
  [example: db/ — Prisma schema, migrations, query functions]
```

### Key Architectural Decisions

- [DECISION 1]
- [DECISION 2]

## Code Standards

### TypeScript

- Strict mode is enabled (`"strict": true` in tsconfig). Never use `any` — use `unknown` and narrow.
- All public function signatures must have explicit return types.
- Use `type` for unions and intersections, `interface` for object shapes that may be extended.
- [ADD YOUR RULES]

### Naming

- Files: `kebab-case.ts` (e.g., `user-service.ts`, `create-order.test.ts`)
- Classes: `PascalCase`
- Functions and variables: `camelCase`
- Constants: `SCREAMING_SNAKE_CASE`
- [ADD ANY EXCEPTIONS]

### Error Handling

- [ERROR HANDLING RULES]

### Comments

- [COMMENT RULES]

## Development Workflow

### Git Conventions

- Branch naming: `[type]/[short-description]` — e.g., `feat/add-refund-flow`, `fix/order-status-race`
- Commit format: [Conventional Commits](https://www.conventionalcommits.org/)
  - `feat:` new feature
  - `fix:` bug fix
  - `chore:` maintenance, dependency updates
  - `docs:` documentation only
  - `test:` tests only
  - `refactor:` no behavior change
- Commits should be atomic — one logical change per commit
- [ADD ANY EXCEPTIONS OR ADDITIONAL TYPES]

### PR Requirements

- [PR RULES]

### Local Setup

```bash
# Install dependencies
[INSTALL COMMAND]

# Set up environment
cp .env.example .env
# Edit .env with your local values

# Run database migrations
[MIGRATION COMMAND]

# Start development server
[DEV COMMAND]
```

## Testing

### Framework and Location

- Framework: [e.g., Vitest]
- Test files: colocated with source (`foo.ts` → `foo.test.ts`) OR in `__tests__/` [choose one]
- Run tests: `[TEST COMMAND]`
- Run with coverage: `[COVERAGE COMMAND]`

### What Requires Tests

- All service layer functions (unit tests with mocked dependencies)
- All API routes (integration tests using supertest or equivalent)
- All utility functions that contain branching logic
- **Not required**: pure pass-through functions, simple getters/setters, Prisma model definitions

### Test Structure

```typescript
// Follow this pattern:
describe('[unit under test]', () => {
  describe('[method or scenario]', () => {
    it('[expected behavior in plain English]', async () => {
      // Arrange
      // Act
      // Assert
    })
  })
})
```

### Mocking

- Mock at the boundary: mock external services, never internal modules
- [ADD YOUR MOCKING CONVENTIONS — e.g., "Use vi.mock() at file level, not inside tests"]

## Deployment

### Environments

| Environment | Branch | URL | Notes |
|------------|--------|-----|-------|
| Local | any | localhost:[PORT] | |
| Staging | `main` | [STAGING URL] | Auto-deploys |
| Production | [TAG/BRANCH] | [PROD URL] | Manual trigger |

### Deploy

```bash
# Staging (auto on merge to main — no manual step needed)

# Production
[DEPLOY COMMAND OR PROCESS]
```

### Post-Deploy Checks

- [POST-DEPLOY CHECKS]

## What Claude Should NOT Do

### Technologies Not in Use

- Do NOT suggest GraphQL — REST is the architectural decision for this project
- Do NOT use [LIBRARY NAME] — replaced by [ALTERNATIVE] in [VERSION/DATE]
- [ADD YOUR BANNED TECHNOLOGIES]

### Patterns to Avoid

- [ANTI-PATTERN 1]
- [ANTI-PATTERN 2]
- [ANTI-PATTERN 3]

### Known Problem Areas

- [KNOWN PROBLEM AREA 1]
- [KNOWN PROBLEM AREA 2]
