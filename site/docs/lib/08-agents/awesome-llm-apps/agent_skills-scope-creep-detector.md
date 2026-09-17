---
title: "🔭 Scope Creep Detector"
sourceId: "08-agents/awesome-llm-apps"
sourceTitle: "Awesome LLM Apps"
sourceKind: "清单与速查"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "08-agents"
sourceUrl: "https://github.com/Shubhamsaboo/awesome-llm-apps"
entryUrl: "https://github.com/Shubhamsaboo/awesome-llm-apps/blob/9848ec842c5f559ad42654288cc6a38db6b175fb/agent_skills/scope-creep-detector/README.md"
sourceRel: "agent_skills/scope-creep-detector/README.md"
rawUrl: "/raw/08-agents/awesome-llm-apps/agent_skills/scope-creep-detector/README.md"
sourceSha256: "b233cc8b6113a01f27f952f37d3bbb1aeaa6f2dda9718efd7bf57ccafb54d6a0"
pageSha256: "b233cc8b6113a01f27f952f37d3bbb1aeaa6f2dda9718efd7bf57ccafb54d6a0"
contentMode: "local-full"
zh: ""
---

# 🔭 Scope Creep Detector 

Checks a working, staged, saved, or branch diff against a one-line intent. It
flags unrelated paths, new dependencies, public API renames, config or CI
edits, oversized hunks, formatting-only files, and subsystem spread. The output
is a local JSON report for keep, split, or justify decisions.

![Scope Creep Detector demo](https://github.com/mvanhorn/awesome-llm-apps/releases/download/demo-assets/scope-creep-detector.gif)

The demo analyzes a "fix null deref in parser" change that also touched CI
config, added a dependency, and dropped in an unrelated file. The parser fix is
kept; the rest is flagged.

## Install

```bash
npx skills add https://github.com/Shubhamsaboo/awesome-llm-apps/tree/main/agent_skills/scope-creep-detector
```

## Run

Ask the agent:

> Did my change grow beyond the parser fix I intended?

Or run the deterministic core directly:

```bash
python3 scripts/scope_creep.py --repo /path/to/repo \
  --intent "fix null dereference in parser" --json
```

Use `--staged` for the index, `--base main` for a branch diff, or `--diff -`
for unified diff input on stdin. The script uses only the Python standard
library, makes no network calls, and does not modify the repository.
