---
title: "Task"
sourceId: "08-agents/openai-agents-python"
sourceTitle: "OpenAI Agents SDK（Python）"
sourceKind: "产品仓库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "08-agents"
sourceUrl: "https://github.com/openai/openai-agents-python"
entryUrl: "https://github.com/openai/openai-agents-python/blob/83c737fd0b8d9a53bd39fa2a0856070417bb0bd3/examples/sandbox/docs/repo/task.md"
sourceRel: "examples/sandbox/docs/repo/task.md"
rawUrl: "/raw/08-agents/openai-agents-python/examples/sandbox/docs/repo/task.md"
sourceSha256: "5e909a9d36352abdb942615e4c8f72fff66582572f9605886bf18d4b2014302c"
pageSha256: "5e909a9d36352abdb942615e4c8f72fff66582572f9605886bf18d4b2014302c"
contentMode: "local-full"
zh: ""
---

# Task

`credit_note.sh` formats a credit note incorrectly:

- It prints a debit label instead of a credit label.
- It preserves the sign instead of always showing the credited amount as positive.

Use the smallest correct fix, then run this exact verification command from the `repo/` directory:

`sh tests/test_credit_note.sh`

If you use `apply_patch`, the patch paths must still be relative to the sandbox workspace root. That means the file paths should be `repo/credit_note.sh` and `repo/tests/test_credit_note.sh`.

Do not change the test expectations.
