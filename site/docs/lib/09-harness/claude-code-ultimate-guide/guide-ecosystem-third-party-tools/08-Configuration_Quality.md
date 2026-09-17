---
title: "Claude Code Ultimate Guide"
sourceId: "09-harness/claude-code-ultimate-guide"
sourceTitle: "Claude Code Ultimate Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide"
entryUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/ecosystem/third-party-tools.md"
sourceRel: "guide/ecosystem/third-party-tools.md"
rawUrl: "/raw/09-harness/claude-code-ultimate-guide/guide/ecosystem/third-party-tools.md"
sourceSha256: "b3e2f559e8457efd6710fab561c9ec7cd746c62b9885fa5535509f700f4a2677"
pageSha256: "111fb5c34217f17cff3a7b8468b2bac5867a71cc45f3599f56a388d99ff3f196"
contentMode: "local-full"
zh: ""
---

## Configuration Quality

Tools that score, audit, and maintain the quality of existing AI agent configs over time, as opposed to creating them from scratch.

> **Context**: CLAUDE.md is not a one-time artifact. As a codebase evolves, the context it provides to the AI can drift: paths referenced no longer exist, domain knowledge becomes stale, new patterns emerge without being documented. The tools below address this maintenance layer.

### Caliber

A CLI that scores your AI agent config quality (0-100), generates tailored configs from codebase fingerprinting, and detects drift between your code and your CLAUDE.md. Works for Claude Code, Cursor, and Codex.

| Attribute | Details |
|-----------|---------|
| **Source** | [GitHub: rely-ai-org/caliber](https://github.com/rely-ai-org/caliber) |
| **Install** | `npx @rely-ai/caliber score` (zero-install) or `npm install -g @rely-ai/caliber` |
| **Language** | TypeScript (Node.js ≥20) |
| **License** | MIT |
| **Status** | Early-stage (released March 2026): APIs may evolve |

**Key features**:

- **Local scoring**: deterministic 100-point rubric across 6 categories (Existence, Quality, Grounding, Accuracy, Freshness, Bonus), no LLM calls, no API keys required
- **Drift detection**: git-based, detects when code commits outpace config updates; cache invalidates on tree signature or HEAD change
- **Config generation**: codebase fingerprinting (languages, frameworks, deps) → generates CLAUDE.md + MCP suggestions via your existing AI subscription (Claude Code seat, Cursor seat, or API key)
- **Review workflow**: score → propose → diff review → accept/decline → backup to `.caliber/backups/` → `caliber undo`
- **GitHub Action**: posts PR comments with score, grade, delta vs base branch; optional `fail-below` threshold blocks merge

```bash
# Score your current config (read-only, zero install)
npx @rely-ai/caliber score

# Generate or improve configs
npx @rely-ai/caliber init

# Detect drift after code changes
caliber refresh

# GitHub Action (fail PR if score < 75)
# uses: rely-ai-org/caliber@v1
# with: { fail-below: 75 }
```

**Score categories**:

| Category | Max | What it measures |
|----------|-----|-----------------|
| Existence | 25 | CLAUDE.md present, skills, MCP config, cross-platform parity |
| Quality | 25 | Token budget, code blocks, concreteness ratio, no duplicates |
| Grounding | 20 | % of project dirs/files referenced in config |
| Accuracy | 15 | Referenced paths exist on disk, commits since last config update |
| Freshness | 10 | Config staleness vs git history, no secrets |
| Bonus | 7 | Hooks configured, AGENTS.md, learned content present |

**Delta vs other config tools in this section**:

| Need | Existing tool | What Caliber adds |
|------|--------------|-------------------|
| Create config from scratch | AIBlueprint | N/A |
| Audit existing config quality | Nothing | Scored rubric + specific failing checks |
| Detect config drift from code | Nothing | Git-based drift detection |
| Distribute standards at org scale | Packmind | N/A |

**Limitations**: Early-stage tool (March 2026, ~65 stars at time of writing; the project has since rebranded to `ai-setup` under caliber-ai-org and reached 1,223 stars by 2026-07-27). Multi-tool support (Claude Code + Cursor + Codex + Copilot) may produce generically adequate configs rather than deeply Claude Code-specific ones. Scoring rubric is not exposed as a standalone document: the categories are deterministic but not user-visible without reading the source.

**Security note**: `caliber refresh` and `caliber watch` have write access to CLAUDE.md. Same risk class as Packmind: review generated output before accepting, particularly when using external sources (`caliber config`). Treat `.caliber/` config files with the same discipline as a secrets manager.

> **Cross-ref**: For scaffolding a config from scratch, see [AIBlueprint](#aiblueprint). For distributing and enforcing standards at org scale, see [Packmind](#packmind). For manual CLAUDE.md authorship, see [ultimate-guide.md Section 3](#31-memory-files-claudemd).

---

### context-evaluator

An OSS tool by Packmind that evaluates CLAUDE.md and AGENTS.md quality using 17 specialized AI evaluators. Available as a pre-compiled binary or Bun source install. The hosted web app documented by the project was unreachable during the 2026-09-02 check.

| Attribute | Details |
|-----------|---------|
| **Source** | [GitHub: PackmindHub/context-evaluator](https://github.com/PackmindHub/context-evaluator) |
| **Install** | Binary from GitHub Releases, or from source with Bun |
| **Language** | TypeScript (Bun) + React frontend |
| **License** | Apache-2.0 |
| **Status** | Active (Packmind experimental project, 2026) |

**Key features**:

- 17 evaluators split into 13 error types (existing issues) and 4 suggestion types (gaps from codebase analysis): content quality, structure/formatting, command completeness, testing guidance, security awareness, contradictory instructions, outdated paths, and more
- AGENTS.md and CLAUDE.md treated equivalently: works with Claude Code, Cursor, GitHub Copilot, and Codex formats
- Codebase fingerprinting: CLOC + folder analysis + config file detection runs first, so each evaluator prompt includes the project's actual languages, frameworks, and key folders. Issues are project-specific, not generic.
- **Unified mode**: when all files fit under 100K tokens, one agent evaluates them together and can detect cross-file contradictions. Above the threshold, agents run independently per file.
- **Automated remediation**: select issues from the web UI, choose a target format (Claude Code, Cursor, GitHub Copilot, Cursor), and the AI generates a `.patch` file. Apply manually with `git apply remediation.patch`. No changes committed without review.
- Multiple AI providers: Claude Code (default), Cursor, OpenCode, GitHub Copilot, OpenAI Codex

**Delta vs Caliber**:

| Feature | Caliber | context-evaluator |
|---------|---------|-------------------|
| No AI provider required | Yes (deterministic) | No (requires AI CLI) |
| Scoring rubric (0-100) | Yes | No |
| Git drift detection | Yes | No |
| LLM-based content review | No | Yes (17 evaluators) |
| Cross-file contradiction detection | No | Yes (unified mode) |
| Automated remediation (patch file) | No | Yes |
| Hosted web version | No | Documented upstream, but unreachable during the 2026-09-02 check |

**When to choose context-evaluator**:

- You want LLM-graded feedback on your CLAUDE.md's actual content, not a structural rubric
- Your config may have contradictory instructions, stale paths, or missing framework conventions that a deterministic score would not catch
- You want automated remediation with a reviewable diff (not an in-place rewrite)

**When to choose Caliber instead**:

- You need zero-LLM scoring for CI gates (`fail-below` threshold)
- You want git-based drift detection as code evolves

**Limitations**: Requires an AI provider with CLI access. Processing takes 1-3 minutes. No deterministic score for CI. No git drift detection.

> **Cross-ref**: For deterministic config scoring, see [Caliber](#caliber). For config generation from scratch, see [AIBlueprint](#aiblueprint). The Runtime Prompt Logging and Adaptive Unified/Parallel Mode patterns from this tool's source are documented in [Skill Design Patterns](/lib/09-harness/claude-code-ultimate-guide/guide-core-skill-design-patterns).
