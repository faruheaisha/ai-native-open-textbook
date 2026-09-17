---
title: "Lessons Learned"
sourceId: "09-harness/ecc"
sourceTitle: "ECC —— Harness 性能优化系统"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/affaan-m/ECC"
entryUrl: "https://github.com/affaan-m/ECC/blob/928c1dea72f5c330442fc1f595563398b8f389f7/.kiro/steering/lessons-learned.md"
sourceRel: ".kiro/steering/lessons-learned.md"
rawUrl: "/raw/09-harness/ecc/.kiro/steering/lessons-learned.md"
sourceSha256: "adae87c6158febc17b9a91e04f88ffe0ea9e9674a6ee02144f780d23c3a5a170"
pageSha256: "adae87c6158febc17b9a91e04f88ffe0ea9e9674a6ee02144f780d23c3a5a170"
contentMode: "local-full"
zh: ""
---

# Lessons Learned

This file captures project-specific patterns, coding preferences, common pitfalls, and architectural decisions that emerge during development. It serves as a workaround for continuous learning by allowing you to document patterns manually.

**How to use this file:**
1. The `extract-patterns` hook will suggest patterns after agent sessions
2. Review suggestions and add genuinely useful patterns below
3. Edit this file directly to capture team conventions
4. Keep it focused on project-specific insights, not general best practices

---

## Project-Specific Patterns

*Document patterns unique to this project that the team should follow.*

### Example: API Error Handling
```typescript
// Always use our custom ApiError class for consistent error responses
throw new ApiError(404, 'Resource not found', { resourceId });
```

---

## Code Style Preferences

*Document team preferences that go beyond standard linting rules.*

### Example: Import Organization
```typescript
// Group imports: external, internal, types
import { useState } from 'react';
import { Button } from '@/components/ui';
import type { User } from '@/types';
```

---

## Kiro Hooks

### `install.sh` is additive-only — it won't update existing installations
The installer skips any file that already exists in the target (`if [ ! -f ... ]`). Running it against a folder that already has `.kiro/` will not overwrite or update hooks, agents, or steering files. To push updates to an existing project, manually copy the changed files or remove the target files first before re-running the installer.

### README.md mirrors hook configurations — keep them in sync
The hooks table and Example 5 in README.md document the action type (`runCommand` vs `askAgent`) and behavior of each hook. When changing a hook's `then.type` or behavior, update both the hook file and the corresponding README entries to avoid misleading documentation.

### Prefer `askAgent` over `runCommand` for file-event hooks
`runCommand` hooks on `fileEdited` or `fileCreated` events spawn a new terminal session every time they fire, creating friction. Use `askAgent` instead so the agent handles the task inline. Reserve `runCommand` for `userTriggered` hooks where a manual, isolated terminal run is intentional (e.g., `quality-gate`).

---

## Common Pitfalls

*Document mistakes that have been made and how to avoid them.*

### Example: Database Transactions
- Always wrap multiple database operations in a transaction
- Remember to handle rollback on errors
- Don't forget to close connections in finally blocks

---

## Architecture Decisions

*Document key architectural decisions and their rationale.*

### Example: State Management
- **Decision**: Use Zustand for global state, React Context for component trees
- **Rationale**: Zustand provides better performance and simpler API than Redux
- **Trade-offs**: Less ecosystem tooling than Redux, but sufficient for our needs

---

## Notes

- Keep entries concise and actionable
- Remove patterns that are no longer relevant
- Update patterns as the project evolves
- Focus on what's unique to this project
