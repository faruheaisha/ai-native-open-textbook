---
title: "Run backend tests"
sourceId: "07-coding/cs146s-cn"
sourceTitle: "动手学 CS146S 中文版"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "中文"
tier: 1
volume: "07-coding"
sourceUrl: "https://github.com/ShouZhengAI/CS146S_CN"
entryUrl: "https://github.com/ShouZhengAI/CS146S_CN/blob/0d65f36f6673147d6c298670da4f9b4bd7f991fa/Assignments/week4/.claude/commands/tests.md"
sourceRel: "Assignments/week4/.claude/commands/tests.md"
rawUrl: "/raw/07-coding/cs146s-cn/Assignments/week4/.claude/commands/tests.md"
sourceSha256: "257436e057e1bc13175e9f5c2d6b2214f2437d665de3254ffc33921001675813"
pageSha256: "257436e057e1bc13175e9f5c2d6b2214f2437d665de3254ffc33921001675813"
contentMode: "local-full"
zh: ""
---

# Run backend tests

Run the Week 4 backend test workflow. Build `TEST_ARGS` from `$ARGUMENTS`: use `backend/tests` when it is empty; prepend `backend/tests` when it starts with an option such as `-k`; otherwise use the supplied path or node ID as-is.

1. From `week4/`, run `pytest -q $TEST_ARGS --maxfail=1 -x`.
2. If a test fails, stop. Report the failing test, the first relevant traceback, the likely source file, and one concrete next step. Do not report coverage from a failed run.
3. If it passes, run `pytest -q $TEST_ARGS --cov=backend.app --cov-report=term-missing`.
4. Summarize passed/skipped counts, total coverage, and uncovered line ranges. Do not change code unless explicitly asked.

Keep both invocations read-only and deterministic. Never delete the database or rewrite fixtures.
