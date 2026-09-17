---
title: "AI 工程从零到一（中文）"
sourceId: "07-coding/ai-engineering-from-scratch-zh"
sourceTitle: "AI 工程从零到一（中文）"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "中文"
tier: 1
volume: "07-coding"
sourceUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh"
entryUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh/blob/109181ce68128c1bf27ec20867177007a8bace89/phases/14-agent-engineering/37-runtime-feedback-loops/outputs/skill-feedback-runner.md"
sourceRel: "phases/14-agent-engineering/37-runtime-feedback-loops/outputs/skill-feedback-runner.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch-zh/phases/14-agent-engineering/37-runtime-feedback-loops/outputs/skill-feedback-runner.md"
sourceSha256: "615f70d295c3a6080a4f61c746f014e7169508996734e7b5712c878060be5422"
pageSha256: "615f70d295c3a6080a4f61c746f014e7169508996734e7b5712c878060be5422"
contentMode: "local-full"
zh: ""
---

# AI 工程从零到一（中文）

Given a project that runs shell commands inside an agent loop, produce a feedback runner and the JSONL it writes.

Produce:

1. `tools/run_with_feedback.py` exposing `run_with_feedback(command: list[str], agent_note: str, timeout_s: float) -> FeedbackRecord`.
2. `feedback_record.jsonl` location under the workbench, one record per line.
3. `tools/feedback_loader.py` that returns the most recent N records for the active task.
4. A `loop_can_advance(record) -> bool` helper the agent loop calls before claiming success.
5. Tests covering: success path, non-zero exit, timeout, missing binary, deterministic head/tail truncation.

Hard rejects:

- `shell=True` anywhere in the runner. Argv-only.
- Truncation that depends on the wall clock or random sampling. Same input must produce the same record.
- Records without `duration_ms`. Slow probes are the first sign of a wedged workbench.
- A loader that returns an unbounded list. Cap at the last N or paginate.

Refusal rules:

- If the project pipes secrets through stdout, refuse to ship the runner without a redaction step. Surface the lines that would have been captured.
- If the project has commands that can hang indefinitely, refuse to ship without a default timeout and an explicit override list.
- If the runner runs inside a worker with shared state, refuse to skip a file lock around the JSONL append. Multiple writers will tear the file.

Output structure:

```
<repo>/
├── feedback_record.jsonl
└── tools/
    ├── run_with_feedback.py
    ├── feedback_loader.py
    └── test_feedback_runner.py
```

End with "what to read next" pointing to:

- Lesson 38 for the verification gate that consumes the records.
- Lesson 39 for the reviewer agent that reads feedback when scoring a run.
- Lesson 23 for OTel GenAI conventions to add to the telemetry side once feedback is solid.
