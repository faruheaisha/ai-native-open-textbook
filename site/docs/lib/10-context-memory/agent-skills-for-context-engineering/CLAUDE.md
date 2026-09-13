---
title: "CLAUDE.md"
sourceId: "10-context-memory/agent-skills-for-context-engineering"
sourceTitle: "Agent Skills for Context Engineering"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/muratcankoylan/Agent-Skills-for-Context-Engineering"
entryUrl: "https://github.com/muratcankoylan/Agent-Skills-for-Context-Engineering/blob/6dbe1a1d868eab51a3bc9011b0f55e2891513e40/README.md"
zh: ""
---

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Agent Skills for Context Engineering is an open collection of Agent Skills teaching context engineering and harness engineering principles for production AI agent systems. Skills are platform-agnostic (Claude Code, Cursor, Codex/OpenAI Agent Skills, GitHub Copilot, any Open Plugins-conformant tool). v2.5.0 adds the long-horizon-prompting skill (pseudo-formal task briefs for long-running autonomous agents and parallel orchestrations) on top of the self-improvement-loops skill (v2.4.0) and the file-based researcher operating system with deterministic gates, cross-platform Agent Skills validation, and a continuous loop. Use the [generated live inventory](https://github.com/muratcankoylan/Agent-Skills-for-Context-Engineering/blob/6dbe1a1d868eab51a3bc9011b0f55e2891513e40/researcher/generated/corpus-summary.md) for current corpus counts.

Context engineering is the discipline of curating everything that enters a model's context window (system prompts, tool definitions, retrieved documents, message history, tool outputs) to maximize signal within limited attention budget.

## Repository Structure

- `skills/` - published skill directories, each containing a `SKILL.md` with YAML frontmatter (`name`, `description`) and optional `references/` and `scripts/` subdirectories
- `examples/` - complete demonstration projects; the generated inventory is the count authority
- `docs/` - Research materials and reference documentation
- `researcher/` - File-based research-to-skill operating system: rubrics, mechanism registry, claim provenance, corpus index, run state machine, adversarial benchmarks, continuous loop, launchd service definitions
- `template/SKILL.md` - Canonical skill template (use when creating new skills)
- `SKILL.md` (root) - Collection-level metadata and skill map
- `.claude-plugin/marketplace.json` - Claude Code marketplace manifest (single bundled plugin, v2.5.0)
- `.plugin/plugin.json` - Open Plugins format manifest (v2.5.0)

## Build & Test Commands

No top-level build system. Repo-level gates and per-project tooling below.

### Top-level deterministic gates (run on every PR via CI)

```
python3 -m unittest researcher.scripts.tests.test_skill_frontmatter # parser and strict-YAML regression tests
python3 researcher/scripts/validate_governance.py --check # authority model and generated view
python3 researcher/scripts/build_inventory.py --check    # corpus references and generated inventory
python3 researcher/scripts/validate_platform_compat.py --require-reference-validator # Agent Skills reference validator + Cursor/Claude/Codex install-layout simulation
python3 researcher/scripts/validate_repo.py --strict       # corpus structure, manifests, rubric math, mechanism registry, claims, corpus index, activation cases, benchmark scenarios, run artifacts
python3 researcher/scripts/skill_health.py --strict --no-history  # deterministic skill-body quality gate
python3 researcher/scripts/run_benchmarks.py               # adversarial benchmark harness + repo + activation gates
python3 researcher/scripts/check_activation_cases.py       # skill-boundary regression fixtures
```

### Per-run readiness (active runs only)

```
