---
title: "Credit Note Fixer"
sourceId: "08-agents/openai-agents-python"
sourceTitle: "OpenAI Agents SDK（Python）"
sourceKind: "产品仓库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "08-agents"
sourceUrl: "https://github.com/openai/openai-agents-python"
entryUrl: "https://github.com/openai/openai-agents-python/blob/83c737fd0b8d9a53bd39fa2a0856070417bb0bd3/examples/sandbox/docs/skills/credit-note-fixer/SKILL.md"
sourceRel: "examples/sandbox/docs/skills/credit-note-fixer/SKILL.md"
rawUrl: "/raw/08-agents/openai-agents-python/examples/sandbox/docs/skills/credit-note-fixer/SKILL.md"
sourceSha256: "f3b62900c2f515074535bfd0ac3dc1db33162c1245980782c3b54db006ee211a"
pageSha256: "f3b62900c2f515074535bfd0ac3dc1db33162c1245980782c3b54db006ee211a"
contentMode: "local-full"
zh: ""
---

# Credit Note Fixer

Follow this workflow:

1. Read `repo/task.md`.
2. Inspect `repo/credit_note.sh` and `repo/tests/test_credit_note.sh`.
3. Make the smallest correct change that keeps the output label as `credit` and the amount positive. If you use `apply_patch`, use workspace-root-relative paths such as `repo/credit_note.sh` and `repo/tests/test_credit_note.sh`.
4. Run exactly `sh tests/test_credit_note.sh` from `repo/`.
5. In the final answer, summarize the bug, the fix, and the exact verification command.
