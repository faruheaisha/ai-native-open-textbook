---
title: "Handoff Protocol"
sourceId: "07-coding/ai-engineering-from-scratch-zh"
sourceTitle: "AI 工程从零到一（中文）"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "中文"
tier: 1
volume: "07-coding"
sourceUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh"
entryUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh/blob/109181ce68128c1bf27ec20867177007a8bace89/phases/14-agent-engineering/42-agent-workbench-capstone/outputs/agent-workbench-pack/docs/handoff-protocol.md"
sourceRel: "phases/14-agent-engineering/42-agent-workbench-capstone/outputs/agent-workbench-pack/docs/handoff-protocol.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch-zh/phases/14-agent-engineering/42-agent-workbench-capstone/outputs/agent-workbench-pack/docs/handoff-protocol.md"
sourceSha256: "a8894cc357eb60b7ee79f8896365935e225a40ab960eb7bb8bca9a4e51ce3b52"
pageSha256: "a8894cc357eb60b7ee79f8896365935e225a40ab960eb7bb8bca9a4e51ce3b52"
contentMode: "local-full"
zh: ""
---

# Handoff Protocol

Every session ends with a handoff packet containing:

- summary
- changed_files
- commands_run
- failed_attempts
- open_risks (severity + detail)
- next_action (one concrete step)
- verdict_pointer (paths to verification + review reports)

The packet ships as both handoff.md (humans) and handoff.json (next agent).
Missing fields halt the session-end hook.
