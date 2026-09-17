---
title: "fastapi-router-py capability coverage"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-python/skills/fastapi-router-py/references/capabilities.md"
sourceRel: ".github/plugins/azure-sdk-python/skills/fastapi-router-py/references/capabilities.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-sdk-python/skills/fastapi-router-py/references/capabilities.md"
sourceSha256: "fce023b29fd31ca6d44e0f197f04a3e65af8e29e78355dfce1fbd1636b126a96"
pageSha256: "fce023b29fd31ca6d44e0f197f04a3e65af8e29e78355dfce1fbd1636b126a96"
contentMode: "local-full"
zh: ""
---

# fastapi-router-py capability coverage

**SDK/package**: `fastapi`

This reference captures additional non-hero capabilities and API breadth so the main `SKILL.md` can stay focused on copy/paste hero flows.

## Hero scenarios covered in SKILL.md

- `Quick Start`
- `Authentication Patterns`
- `Response Models`
- `HTTP Status Codes`

## Important non-hero scenarios to include when needed

- `Integration Steps`
- `Best Practices`

## API breadth checklist

- Verify dependency lifetimes (`Depends` with `yield`) for resources like DB connections and HTTP clients.
- Confirm request/response validation uses Pydantic models with appropriate field constraints.
- Include proper error responses with `HTTPException` and correct status codes.
- Avoid blocking I/O in `async def` endpoints; use `run_in_executor` or a thread-pool for sync calls.
- Validate middleware, background tasks, and lifespan event patterns for production paths.
