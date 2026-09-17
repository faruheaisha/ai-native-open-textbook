---
title: "Workflow — Development Workflows"
sourceId: "09-harness/claude-code-best-practice"
sourceTitle: "Claude Code Best Practice"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "09-harness"
sourceUrl: "https://github.com/shanraisshan/claude-code-best-practice"
entryUrl: "https://github.com/shanraisshan/claude-code-best-practice/blob/2d6ea151c0d7189c3eaf364809c5574bd210e545/.claude/commands/workflows/development-workflows.md"
sourceRel: ".claude/commands/workflows/development-workflows.md"
rawUrl: "/raw/09-harness/claude-code-best-practice/.claude/commands/workflows/development-workflows.md"
sourceSha256: "dec867346454acde0051e40dc8419eb9166af990c6b7da3e092c12f56138cd93"
pageSha256: "dec867346454acde0051e40dc8419eb9166af990c6b7da3e092c12f56138cd93"
contentMode: "local-full"
zh: ""
---

# Workflow — Development Workflows

Update the DEVELOPMENT WORKFLOWS table in `README.md` by researching 11 repos in parallel. Launch agents, merge results, present changes, update table if approved.

---

## The 11 Repos

| # | Repo | Owner |
|---|------|-------|
| 1 | `github/spec-kit` | GitHub (John Lam / Den Delimarsky) |
| 2 | `Fission-AI/OpenSpec` | Fission-AI (@0xTab) |
| 3 | `humanlayer/humanlayer` | HumanLayer (Dex Horthy) |
| 4 | `affaan-m/everything-claude-code` | Affaan Mustafa |
| 5 | `gsd-build/get-shit-done` | Lex Christopherson |
| 6 | `obra/superpowers` | Jesse Vincent |
| 7 | `garrytan/gstack` | Garry Tan (YC CEO) |
| 8 | `bmad-code-org/BMAD-METHOD` | BMAD Code Org |
| 9 | `EveryInc/compound-engineering-plugin` | Every.to |
| 10 | `Yeachan-Heo/oh-my-claudecode` | Yeachan Heo (@bellman_ych) |
| 11 | `mattpocock/skills` | Matt Pocock |

---

## Table Format

The README table has these columns:

```markdown
| Name | ★ | Workflow | <img src="!/tags/a.svg" height="14"> | <img src="!/tags/c.svg" height="14"> | <img src="!/tags/s.svg" height="14"> |
```

- **Name**: `[Short Name](https://github.com/shanraisshan/claude-code-best-practice/blob/2d6ea151c0d7189c3eaf364809c5574bd210e545/.claude/commands/workflows/github-url/README.md)` — use project name, not owner/repo
- **★**: Star count rounded to `k` (e.g., 98k, 10k, 4.1k). Under 1000 show exact number
- **Workflow**: The canonical end-to-end pipeline as a flat left-to-right sequence of shields.io badges joined by ` → `. Each step is the actual command/skill/agent name from the repo (e.g. `/speckit.plan`, `bmad-create-prd`, `subagent-driven-development`). **Flat only** — no parentheticals, no English qualifiers ("loop", "per story", "parallel waves"), no `+` connectors. If a step has internal sub-steps that matter, list them as siblings in the main chain and **color them yellow (`fff3b0`)** to mark them as sub-loops; top-level steps stay light blue (`ddf4ff`). Trace the README's "how to use" / "workflow" section for the canonical happy path: idea → spec/plan → tasks → implement → review → ship.
- **Agent/Command/Skill counts**: Just the number (e.g., `25`, `0`, `108+`)

### Workflow badge encoding (shields.io)

Each step renders as an **HTML `<img>` tag with `align="middle"`** (not markdown image syntax) so the arrow stays vertically centered with the badges. Two background colors:

| Color | Hex | When to use |
|---|---|---|
| Light blue | `ddf4ff` | Top-level workflow steps |
| Soft yellow | `fff3b0` | Sub-loop steps (repeat per task/story/until verified inside a parent step) |

Template:

```html
