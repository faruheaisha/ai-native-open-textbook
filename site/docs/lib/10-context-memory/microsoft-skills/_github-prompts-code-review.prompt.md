---
title: "Code Review Checklist"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/prompts/code-review.prompt.md"
sourceRel: ".github/prompts/code-review.prompt.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/prompts/code-review.prompt.md"
sourceSha256: "a4068c8c1506dd9fcf35c3f82600e39d1e1a76367c908115d35e6370ad955377"
pageSha256: "a4068c8c1506dd9fcf35c3f82600e39d1e1a76367c908115d35e6370ad955377"
contentMode: "local-full"
zh: ""
---

# Code Review Checklist

Use this checklist when reviewing code changes in CoreAI DIY.

## General

- [ ] Code follows the patterns in AGENTS.md
- [ ] No TypeScript `any` types
- [ ] No hardcoded colors (use design tokens)
- [ ] No console.log statements in production code
- [ ] No commented-out code blocks
- [ ] Clear, descriptive variable/function names
- [ ] Appropriate error handling

## Frontend (React/TypeScript)

### Components
- [ ] Uses `memo()` + named function pattern for React Flow nodes
- [ ] Proper TypeScript types (no implicit any)
- [ ] Uses design tokens (`--frontier-*`, `--foundry-*`)
- [ ] Conditional classes use `cn()` utility
- [ ] Barrel export in component folder

### State (Zustand)
- [ ] Uses `subscribeWithSelector` middleware
- [ ] Selects specific state (not entire store)
- [ ] Actions properly update immutably
- [ ] Types exported (State, Actions, Store)

### React Flow Nodes
- [ ] Respects `canvasMode` (viewing vs editing)
- [ ] Has proper Handle components
- [ ] NodeResizer only in editing mode
- [ ] Uses `NodeProps<Node<DataType>>`

## Backend (FastAPI/Python)

### Pydantic Models
- [ ] Multi-model pattern (Base → Create → Update → Response → InDB)
- [ ] Uses `Field(..., alias="camelCase")` for JSON compatibility
- [ ] Config has `populate_by_name = True`
- [ ] Response model has `from_attributes = True`

### Routers
- [ ] Proper auth dependency (`get_current_user` vs `get_current_user_required`)
- [ ] Returns proper HTTP status codes
- [ ] Has response_model defined
- [ ] Raises HTTPException for errors

### Services
- [ ] Handles Cosmos DB availability (`_use_cosmos()`)
- [ ] Proper async/await usage
- [ ] Error handling for database operations

## Security

- [ ] No secrets in code or comments
- [ ] Auth required for write operations
- [ ] Input validation via Pydantic
- [ ] No SQL/NoSQL injection vulnerabilities

## Performance

- [ ] React components properly memoized
- [ ] No unnecessary re-renders (use selectors)
- [ ] Expensive computations memoized
- [ ] API calls not in render path

## Testing

- [ ] Unit tests for new functions
- [ ] Component tests for new UI
- [ ] API tests for new endpoints
- [ ] Tests pass locally

## Documentation

- [ ] Complex logic has comments
- [ ] Public APIs have docstrings
- [ ] README updated if needed
- [ ] Types are self-documenting

## Commit

- [ ] Follows conventional commit format
- [ ] Commit message describes why, not just what
- [ ] No unrelated changes bundled
- [ ] `pnpm lint` passes
- [ ] `pnpm build` passes
- [ ] `uv run pytest` passes
