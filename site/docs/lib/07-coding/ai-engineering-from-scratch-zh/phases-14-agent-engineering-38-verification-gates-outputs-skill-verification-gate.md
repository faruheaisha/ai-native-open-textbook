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
entryUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh/blob/109181ce68128c1bf27ec20867177007a8bace89/phases/14-agent-engineering/38-verification-gates/outputs/skill-verification-gate.md"
sourceRel: "phases/14-agent-engineering/38-verification-gates/outputs/skill-verification-gate.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch-zh/phases/14-agent-engineering/38-verification-gates/outputs/skill-verification-gate.md"
sourceSha256: "ecac676fafbb6ee2957f166955652835cc9907156c8cb7560b9c7009a8400946"
pageSha256: "ecac676fafbb6ee2957f166955652835cc9907156c8cb7560b9c7009a8400946"
contentMode: "local-full"
zh: ""
---

# AI 工程从零到一（中文）

Given a project's acceptance criteria and existing workbench artifacts, produce the verification gate and override audit log.

Produce:

1. `tools/verify_agent.py` exposing `verify(task_id, artifacts) -> VerdictReport`. Pure function, deterministic, no LLM calls.
2. `outputs/verification/<task_id>.json` as the single source of truth verdict.
3. `tools/override.py` that appends signed override entries to `outputs/verification/overrides.jsonl` (must include reason, user id, timestamp, finding code).
4. CI workflow that fails on `passed: false` and surfaces the report inline.
5. `docs/verification.md` listing every check, its severity, its source artifact, and the override policy.

Hard rejects:

- A check that calls an LLM. The gate is deterministic plumbing; LLM judgment belongs to the reviewer.
- An override path the agent can take without a signed entry. Overrides are human-only.
- A verification report that omits the artifact paths it consumed. Reports must be auditable.
- Block-severity findings the workflow can silently downgrade. Severity is fixed at write time, not at read time.

Refusal rules:

- If the project has no acceptance command, refuse to ship the gate until one exists. A gate that proves nothing is theater.
- If the rule report does not exist, refuse to skip the rule check; fail closed.
- If the feedback log does not exist, refuse to skip the acceptance check; missing logs are themselves a block.
- If override entries are not version-controlled, refuse to wire the override path; off-the-record overrides defeat the gate.

Output structure:

```
<repo>/
├── tools/
│   ├── verify_agent.py
│   └── override.py
├── outputs/verification/
│   ├── overrides.jsonl
│   └── <task_id>.json
├── docs/verification.md
└── .github/workflows/verify.yml
```

End with "what to read next" pointing to:

- Lesson 39 for the reviewer agent that picks up after a green verdict.
- Lesson 40 for the handoff generator that includes the verdict in the packet.
- Lesson 41 for running the gate against a real-style sample app.
