---
title: "Legacy Control Planes"
sourceId: "10-context-memory/hf-context-course"
sourceTitle: "The Context Course"
sourceKind: "系统课程"
licenseLabel: "仅引用"
lang: "英文"
tier: 1
volume: "10-context-memory"
sourceUrl: "https://github.com/huggingface/context-course"
entryUrl: "https://github.com/huggingface/context-course/blob/0448a7ca721a63a81531e1ba94f46f897c70645b/projects/pre-training/docs/archive/legacy-control-planes.md"
sourceRel: "projects/pre-training/docs/archive/legacy-control-planes.md"
rawUrl: "/raw/10-context-memory/hf-context-course/projects/pre-training/docs/archive/legacy-control-planes.md"
sourceSha256: "29b25ed1c53e727b530256d452f4aa6d7d7b86e9a4ab68b589d997dcdb17fb6a"
pageSha256: "29b25ed1c53e727b530256d452f4aa6d7d7b86e9a4ab68b589d997dcdb17fb6a"
contentMode: "local-full"
zh: ""
---

# Legacy Control Planes

This repo used to ship three alternative control-plane scaffolds:

- Gastown rig assets
- Codex repo-local subagents
- Claude Code repo-local subagents

They were removed in favor of a single OpenCode-based control plane with:

- repo-local agents under `.opencode/agent/`
- shared skills under `.agents/skills/`
- neutral campaign and experiment templates under `research/templates/`
- isolated worker launches through `scripts/opencode_worker.py`
- HF Jobs for remote execution
- Trackio for observability

If you need the old Gastown, Codex, or Claude-specific material, use git
history from before the OpenCode migration instead of reviving those files in
the active setup path.
