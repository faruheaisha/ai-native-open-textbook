---
title: "Handoff Protocol"
sourceId: "07-coding/ai-engineering-from-scratch"
sourceTitle: "AI Engineering from Scratch（英文原版）"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "07-coding"
sourceUrl: "https://github.com/rohitg00/ai-engineering-from-scratch"
entryUrl: "https://github.com/rohitg00/ai-engineering-from-scratch/blob/d18b8fe5a913c46011a3b06cb6ebd6a924414fd3/phases/14-agent-engineering/42-agent-workbench-capstone/outputs/agent-workbench-pack/docs/handoff-protocol.md"
sourceRel: "phases/14-agent-engineering/42-agent-workbench-capstone/outputs/agent-workbench-pack/docs/handoff-protocol.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch/phases/14-agent-engineering/42-agent-workbench-capstone/outputs/agent-workbench-pack/docs/handoff-protocol.md"
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
