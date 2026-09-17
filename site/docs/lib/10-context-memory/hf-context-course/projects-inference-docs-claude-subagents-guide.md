---
title: "Claude Code Subagents Guide"
sourceId: "10-context-memory/hf-context-course"
sourceTitle: "The Context Course"
sourceKind: "系统课程"
licenseLabel: "仅引用"
lang: "英文"
tier: 1
volume: "10-context-memory"
sourceUrl: "https://github.com/huggingface/context-course"
entryUrl: "https://github.com/huggingface/context-course/blob/0448a7ca721a63a81531e1ba94f46f897c70645b/projects/inference/docs/claude-subagents-guide.md"
sourceRel: "projects/inference/docs/claude-subagents-guide.md"
rawUrl: "/raw/10-context-memory/hf-context-course/projects/inference/docs/claude-subagents-guide.md"
sourceSha256: "20fcbee89ab0afbf37670f1862e5afb820f47d21f66e7393b93c30fa04fff7de"
pageSha256: "20fcbee89ab0afbf37670f1862e5afb820f47d21f66e7393b93c30fa04fff7de"
contentMode: "local-full"
zh: ""
---

# Claude Code Subagents Guide

This guide describes the Claude Code-native inference setup.

Claude Code supports project subagents in `.claude/agents/`; each subagent is a
Markdown file with YAML frontmatter and a focused system prompt. Project
settings live in `.claude/settings.json`, while `CLAUDE.md` carries project
memory and startup instructions.

## Checked-In Claude Assets

- `CLAUDE.md`
  Project-level Claude Code instructions.
- `.claude/settings.json`
  Project permissions that keep this inference project separate from sibling
  benchmark projects and avoid reading local env files.
- `.claude/agents/inference-lab.md`
  Parent coordinator.
- `.claude/agents/optimizer.md`
  Read-only speed candidate proposer.
- `.claude/agents/benchmarker.md`
  Local benchmark runner and result recorder.

## Recommended Start

From `inference/`:

```bash
claude --agent inference-lab
```

For a longer prompt skeleton:

```bash
python3 scripts/print_claude_kickoff.py
```

## Workflow

1. Read `AGENTS.md`, `CLAUDE.md`, and this guide.
2. Resolve the target GGUF with `scripts/resolve_hf_gguf.py`.
3. Ask `benchmarker` to record a baseline.
4. Ask `optimizer` for one speed variable to change.
5. Ask `benchmarker` to repeat the same benchmark.
6. Keep the fastest reproducible command in `research/results.tsv`.

Keep comparisons controlled: same model, exact GGUF, prompt, `max_tokens`,
context, and llama.cpp build unless the experiment is explicitly changing one
of those variables.

## References

- `https://code.claude.com/docs/en/settings`
- `https://code.claude.com/docs/en/sub-agents`
