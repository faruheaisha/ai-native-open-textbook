---
title: "FastAPI Review"
sourceId: "09-harness/ecc"
sourceTitle: "ECC —— Harness 性能优化系统"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/affaan-m/ECC"
entryUrl: "https://github.com/affaan-m/ECC/blob/928c1dea72f5c330442fc1f595563398b8f389f7/commands/fastapi-review.md"
sourceRel: "commands/fastapi-review.md"
rawUrl: "/raw/09-harness/ecc/commands/fastapi-review.md"
sourceSha256: "758f6c55befc3255e5b1c1dc6df41453b21543a93b6aa9df0fb1be9e334831a8"
pageSha256: "758f6c55befc3255e5b1c1dc6df41453b21543a93b6aa9df0fb1be9e334831a8"
contentMode: "local-full"
zh: ""
---

# FastAPI Review

Invoke the `fastapi-reviewer` agent for a focused FastAPI review.

## Usage

```text
/fastapi-review [file-or-directory]
```

## Review Areas

- App factory, router boundaries, middleware, and exception handlers.
- Pydantic request and response schema separation.
- Dependency injection for database sessions, auth, pagination, and settings.
- Async database and external HTTP patterns.
- CORS, auth, rate limits, logging, and secret handling.
- OpenAPI metadata and documented response models.
- Test client setup and dependency overrides.

## Expected Output

```text
[SEVERITY] Short issue title
File: path/to/file.py:42
Issue: What is wrong and why it matters.
Fix: Concrete change to make.
```

## Related

- Agent: `fastapi-reviewer`
- Skill: `fastapi-patterns`
- Command: `/python-review`
- Skill: `security-scan`
