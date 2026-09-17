---
title: "Reliability Policy"
sourceId: "07-coding/ai-engineering-from-scratch-zh"
sourceTitle: "AI 工程从零到一（中文）"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "中文"
tier: 1
volume: "07-coding"
sourceUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh"
entryUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh/blob/109181ce68128c1bf27ec20867177007a8bace89/phases/14-agent-engineering/42-agent-workbench-capstone/outputs/agent-workbench-pack/docs/reliability-policy.md"
sourceRel: "phases/14-agent-engineering/42-agent-workbench-capstone/outputs/agent-workbench-pack/docs/reliability-policy.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch-zh/phases/14-agent-engineering/42-agent-workbench-capstone/outputs/agent-workbench-pack/docs/reliability-policy.md"
sourceSha256: "b69cd1dbdece29aa82501791cf20dafd0b7bbc1381b8687e56e020d8e40c6d33"
pageSha256: "b69cd1dbdece29aa82501791cf20dafd0b7bbc1381b8687e56e020d8e40c6d33"
contentMode: "local-full"
zh: ""
---

# Reliability Policy

The workbench absorbs the five industry-recurring failure modes:

1. Hallucinated action — caught by the rule set + verification gate.
2. Scope creep — caught by the scope contract diff check.
3. Cascading errors — caught by feedback records + refuse-on-null-exit.
4. Context loss — absorbed by repo memory; chat is not the source of truth.
5. Tool misuse — caught by the reviewer rubric's verification dimension.

The policy is enforced by the verification gate. The override path is signed
and audited; agents cannot self-override.
