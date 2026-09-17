---
title: "Pi Subagents Guide"
sourceId: "10-context-memory/hf-context-course"
sourceTitle: "The Context Course"
sourceKind: "系统课程"
licenseLabel: "仅引用"
lang: "英文"
tier: 1
volume: "10-context-memory"
sourceUrl: "https://github.com/huggingface/context-course"
entryUrl: "https://github.com/huggingface/context-course/blob/0448a7ca721a63a81531e1ba94f46f897c70645b/projects/post-training/docs/pi-subagents-guide.md"
sourceRel: "projects/post-training/docs/pi-subagents-guide.md"
rawUrl: "/raw/10-context-memory/hf-context-course/projects/post-training/docs/pi-subagents-guide.md"
sourceSha256: "07e2aaad6f1dc9ba87c45977c04c56d75987d848feca06077a58a84f224d9629"
pageSha256: "07e2aaad6f1dc9ba87c45977c04c56d75987d848feca06077a58a84f224d9629"
contentMode: "local-full"
zh: ""
---

# Pi Subagents Guide

This guide describes the Pi-native `/posttrain` workflow for the NanoChat
post-training project. It is separate from the pre-training `/autolab` flow.

## Checked-In Pi Assets

- `.pi/settings.json`
  Project Pi settings. It declares `pi-subagents` and keeps Pi session files
  under `.runtime/`.
- `.pi/APPEND_SYSTEM.md`
  Parent-session coordinator guidance appended to Pi's default prompt.
- `.pi/agents/`
  Project agents: `planner`, `reviewer`, `researcher`, `reporter`,
  `memory-keeper`, and `experiment-worker`.
- `.pi/prompts/posttrain.md`
  The reusable `/posttrain` parent-session kickoff prompt.
- `scripts/print_pi_kickoff.py`
  Prints a copy-paste parent-session prompt.

## Setup

Install Pi once if it is not already available:

```bash
npm install -g @mariozechner/pi-coding-agent
```

From the post-training project root, start Pi:

```bash
cd /Users/ben/code/multiautoresearch/post-training
pi
```

The project `.pi/settings.json` declares `npm:pi-subagents@0.22.0`. Pi should
install missing project packages on startup. If needed:

```bash
pi install npm:pi-subagents@0.22.0 -l
```

For managed Hugging Face Jobs runs:

```bash
hf auth whoami
