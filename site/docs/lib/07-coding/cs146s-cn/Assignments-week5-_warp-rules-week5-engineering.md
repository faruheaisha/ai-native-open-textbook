---
title: "Week 5 engineering rules"
sourceId: "07-coding/cs146s-cn"
sourceTitle: "动手学 CS146S 中文版"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "中文"
tier: 1
volume: "07-coding"
sourceUrl: "https://github.com/ShouZhengAI/CS146S_CN"
entryUrl: "https://github.com/ShouZhengAI/CS146S_CN/blob/0d65f36f6673147d6c298670da4f9b4bd7f991fa/Assignments/week5/.warp/rules/week5-engineering.md"
sourceRel: "Assignments/week5/.warp/rules/week5-engineering.md"
rawUrl: "/raw/07-coding/cs146s-cn/Assignments/week5/.warp/rules/week5-engineering.md"
sourceSha256: "5ee90d569912d44d8b72ae1efc7444b60b1a2895d6c5d9a24ccd519372c28537"
pageSha256: "5ee90d569912d44d8b72ae1efc7444b60b1a2895d6c5d9a24ccd519372c28537"
contentMode: "local-full"
zh: ""
---

# Week 5 engineering rules

- Read `docs/TASKS.md` and the affected router, schema, model, and test before editing.
- Keep each agent inside an explicit file scope; one integration agent owns shared schemas and final review.
- API success is `\{ "ok": true, "data": ... \}`; API failure is `\{ "ok": false, "data": null, "error": \{ "code": ..., "message": ... \} \}`.
- Collection data contains `items`, `total`, `page`, and `page_size`; `page >= 1` and `1 <= page_size <= 100`.
- Validate nonblank text at the Pydantic boundary. Return 404 for absent resources and 409 for unique-name conflicts.
- Check every bulk-operation ID before mutation so one missing ID rolls back the whole request.
- Frontend optimistic edits must snapshot old state and restore it when the request fails.
- Prefer focused endpoint checks during implementation; run the complete suite only after branches are integrated.
- Never commit secrets, local databases, generated caches, or unrelated changes.
