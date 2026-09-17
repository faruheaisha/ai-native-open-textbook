---
title: "Synchronize API documentation"
sourceId: "07-coding/cs146s-cn"
sourceTitle: "动手学 CS146S 中文版"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "中文"
tier: 1
volume: "07-coding"
sourceUrl: "https://github.com/ShouZhengAI/CS146S_CN"
entryUrl: "https://github.com/ShouZhengAI/CS146S_CN/blob/0d65f36f6673147d6c298670da4f9b4bd7f991fa/Assignments/week4/.claude/commands/docs-sync.md"
sourceRel: "Assignments/week4/.claude/commands/docs-sync.md"
rawUrl: "/raw/07-coding/cs146s-cn/Assignments/week4/.claude/commands/docs-sync.md"
sourceSha256: "5fe279429f447e8e70d6496b48157adfb4bbf8b06a08fd442f4a2c2b4b4ece0c"
pageSha256: "5fe279429f447e8e70d6496b48157adfb4bbf8b06a08fd442f4a2c2b4b4ece0c"
contentMode: "local-full"
zh: ""
---

# Synchronize API documentation

Synchronize `docs/API.md` with the FastAPI OpenAPI document. `$ARGUMENTS` may contain a server base URL; default to `http://127.0.0.1:8000`.

1. Read the routers and schemas under `backend/app/` and the current `docs/API.md`.
2. Fetch `$ARGUMENTS/openapi.json` (or the default URL). If the server is unavailable, ask the user to run `make run`; do not invent schema fields.
3. Compare every OpenAPI path, method, status code, parameter, request body, and response model with the documentation.
4. Update only `docs/API.md`, preserving its concise endpoint-table format and adding validation/error behavior.
5. Fetch OpenAPI once more and report a diff-style summary: added, changed, removed, and remaining drift.

The operation must be idempotent. Never edit generated OpenAPI JSON, application code, or delete hand-written safety notes.
