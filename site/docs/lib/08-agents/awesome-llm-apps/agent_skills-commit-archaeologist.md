---
title: "🏺 Commit Archaeologist Agent Skill"
sourceId: "08-agents/awesome-llm-apps"
sourceTitle: "Awesome LLM Apps"
sourceKind: "清单与速查"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "08-agents"
sourceUrl: "https://github.com/Shubhamsaboo/awesome-llm-apps"
entryUrl: "https://github.com/Shubhamsaboo/awesome-llm-apps/blob/9848ec842c5f559ad42654288cc6a38db6b175fb/agent_skills/commit-archaeologist/README.md"
sourceRel: "agent_skills/commit-archaeologist/README.md"
rawUrl: "/raw/08-agents/awesome-llm-apps/agent_skills/commit-archaeologist/README.md"
sourceSha256: "3351a9a6c8655bf71662885a862cb0e1183e7a3fea9ab7ac4c3997a409b9b9e7"
pageSha256: "3351a9a6c8655bf71662885a862cb0e1183e7a3fea9ab7ac4c3997a409b9b9e7"
contentMode: "local-full"
zh: ""
---

# 🏺 Commit Archaeologist Agent Skill

`git blame` tells you who last changed a line. Commit Archaeologist reconstructs
why the line exists.

Point it at a tracked file and an optional line range. Its local Python script
finds the introducing commit, orders later modifications, classifies commit
messages, summarizes current authorship, detects repeatedly co-changed files,
and flags issue references, reverts, workarounds, temporary choices, and TODOs.
The agent turns that evidence into a readable history and a change-risk note.

![demo](https://github.com/mvanhorn/awesome-llm-apps/releases/download/demo-assets/commit-archaeologist.gif)

## Install

```bash
npx skills add https://github.com/Shubhamsaboo/awesome-llm-apps/tree/main/agent_skills/commit-archaeologist
```

The [skills CLI](https://skills.sh) installs the folder for compatible coding
agents. You can also copy this directory into an agent's skills directory.

## Run

Ask your agent:

> Why does `src/cache.py` lines 40-72 exist, and what should I know before I
> change it?

Or run the deterministic core from a clone of this repository:

```bash
python3 agent_skills/commit-archaeologist/scripts/archaeologist.py \
  /path/to/repo src/cache.py --lines 40-72 --json
```

Omit `--lines` to follow the entire file history. Omit `--json` for a compact
terminal summary.

## Output

The JSON dig report contains:

- the normalized region, historical path aliases, and co-change threshold
- the introducing commit
- an oldest-to-newest timeline with changed files and intent categories
- repeated co-changes and their supporting commits
- current blamed-line counts alongside historical commit counts
- intent signals grounded in commit subjects and bodies

Everything runs locally with Python's standard library and git. The script is
read-only and makes no network calls.

## Verify

```bash
python3 agent_skills/evals/commit-archaeologist/test_archaeologist.py
```

The eval builds its own temporary repository and checks ordering, co-changes,
authorship, intent signals, deterministic JSON, and validation errors.

## Files

```text
commit-archaeologist/
|-- SKILL.md
|-- README.md
|-- scripts/archaeologist.py
`-- references/reading-git-history.md
```

Part of [awesome-llm-apps](https://github.com/Shubhamsaboo/awesome-llm-apps).
Apache-2.0. Last verified: July 2026.
