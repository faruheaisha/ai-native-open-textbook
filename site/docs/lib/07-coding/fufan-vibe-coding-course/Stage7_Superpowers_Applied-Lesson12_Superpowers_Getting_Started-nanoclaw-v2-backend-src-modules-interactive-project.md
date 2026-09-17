---
title: "Vibe Coding：AI 编程实战课"
sourceId: "07-coding/fufan-vibe-coding-course"
sourceTitle: "Vibe Coding：AI 编程实战课"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "中英混排"
tier: 1
volume: "07-coding"
sourceUrl: "https://github.com/fufankeji/FuFan-VibeCodingCourse"
entryUrl: "https://github.com/fufankeji/FuFan-VibeCodingCourse/blob/5336ede159a7ac2ce0ee136324fe5bffd56970ca/Stage7_Superpowers_Applied/Lesson12_Superpowers_Getting_Started/nanoclaw-v2-backend/src/modules/interactive/project.md"
sourceRel: "Stage7_Superpowers_Applied/Lesson12_Superpowers_Getting_Started/nanoclaw-v2-backend/src/modules/interactive/project.md"
rawUrl: "/raw/07-coding/fufan-vibe-coding-course/Stage7_Superpowers_Applied/Lesson12_Superpowers_Getting_Started/nanoclaw-v2-backend/src/modules/interactive/project.md"
sourceSha256: "8fd804cc57f372d7b2c61297c0e5a11380185c19071741382a0ec60b2056bcfc"
pageSha256: "8fd804cc57f372d7b2c61297c0e5a11380185c19071741382a0ec60b2056bcfc"
contentMode: "local-full"
zh: ""
---

# Vibe Coding：AI 编程实战课

## Interactive module

Generic ask_user_question flow. Lives in `src/modules/interactive/`.

The container-side MCP tool `ask_user_question` writes a chat-sdk card to outbound.db and polls inbound.db for a `question_response` system message. The host side of this is split:

- **Inline in `src/delivery.ts`:** the `deliverMessage` path intercepts `content.type === 'ask_question'` messages and writes a row to `pending_questions`. Guarded by `hasTable(db, 'pending_questions')`.
- **This module:** registers a `ResponseHandler` that runs when a button-click arrives via the channel adapter's `onAction`. It looks up the `pending_questions` row, writes a `question_response` system message into the session's inbound.db, wakes the container.

The `pending_questions` table is in the core `001-initial.ts` migration — the module doesn't own the schema, just the behavior. Removing the module disables the button-click response path only; cards are still delivered.

`getAskQuestionRender` in `src/db/sessions.ts` resolves card render metadata for `chat-sdk-bridge.ts`. It reads both `pending_questions` and `pending_approvals` and degrades via `hasTable`. Stays in core.
