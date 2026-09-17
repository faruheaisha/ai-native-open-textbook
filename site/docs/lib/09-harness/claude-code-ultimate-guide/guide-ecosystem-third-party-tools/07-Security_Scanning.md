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
pageSha256: "c823d5844fd4644d94762844d68b80099628365420b02d84cdbf3aae06a11a4e"
contentMode: "local-full"
zh: ""
---

## Security Scanning

Two complementary layers: tools that audit your Claude Code configuration for misconfigs, hook injection, and MCP risks; and agent-powered scanners that find logic-level vulnerabilities in the application code itself.

### AgentShield

A security scanner that grades your `.claude/` directory on a 0–100 scale (A–F) across 102 rules in 5 categories. Built at the Claude Code Hackathon (Cerebral Valley x Anthropic, Feb 2026).

| Attribute | Details |
|-----------|---------|
| **Source** | [GitHub: affaan-m/agentshield](https://github.com/affaan-m/agentshield) |
| **Install** | `npx ecc-agentshield scan` (zero-install) or `npm install -g ecc-agentshield` |
| **Language** | TypeScript (Node.js) |
| **License** | MIT |
| **Status** | Early-stage (released Feb 2026): rules not independently audited |

**Key features**:

- **5 scan categories**: secrets (14 patterns: `sk-ant-`, `ghp_`, AWS, Stripe…), permissions (wildcard `Bash(*)`, missing deny lists), hooks (34 rules: command injection via `$\{var\}`, data exfiltration, silent errors, reverse shells), MCP servers (23 rules: supply-chain, `npx -y`, remote transport), agents (25 rules: auto-run instructions, hidden Unicode directives, prompt reflection)
- **Auto-fix**: `agentshield scan --fix` replaces hardcoded secrets with env var references
- **Multiple output formats**: terminal (default), JSON (`--format json`), Markdown, self-contained HTML
- **GitHub Action**: posts inline annotations on affected files, emits `score` and `grade` outputs, supports `fail-on-findings` threshold
- **Opus adversarial analysis** (`--opus --stream`): three-agent pipeline (Attacker → Defender → Auditor) using Opus 4.6 for deep threat modeling

```bash
# Scan your Claude Code config (no install required)
npx ecc-agentshield scan

# Auto-fix safe issues
agentshield scan --fix

# JSON output for CI
agentshield scan --format json

# Three-agent adversarial analysis (requires ANTHROPIC_API_KEY — incurs API cost)
agentshield scan --opus --stream
```

**GitHub Action**:

```yaml
- name: AgentShield Security Scan
  uses: affaan-m/agentshield@v1
  with:
    path: "."
    min-severity: "medium"
    fail-on-findings: "true"
```

**`runtimeConfidence` context**: findings are weighted by source: `active-runtime` (full weight) vs `template-example` (0.25x) vs `docs-example` (0.25x), so a large MCP template catalog doesn't inflate the score like dozens of active servers.

**Limitations**:
- Rules are not independently audited; treat the grade as a useful signal, not a compliance certification
- `--opus` mode triggers Opus 4.6 API calls; budget accordingly before enabling in CI
- Project is 2 months old, so the API surface may evolve; pin to a specific version in production

> **See also**: [Security Hardening guide](/lib/09-harness/claude-code-ultimate-guide/guide-security-security-hardening/index) for manual hook and permission patterns.

### DeepSec

An agent-powered vulnerability scanner from Vercel Labs that finds logic-level security bugs in application code, the kind that regex-based SAST tools miss. Where AgentShield above audits your Claude Code configuration, DeepSec audits the application itself.

| Attribute | Details |
|-----------|---------|
| **Source** | [GitHub: vercel-labs/deepsec](https://github.com/vercel-labs/deepsec) |
| **Install** | `npx deepsec init` (bootstraps a `.deepsec/` directory at repo root) |
| **Language** | TypeScript |
| **License** | Apache 2.0 |
| **Status** | Vercel Labs: experimental, not production-ready |

**How it works**: DeepSec runs a 5-step pipeline. First a fast regex scan identifies sensitive zones (auth flows, crypto calls, user inputs). Then AI agents trace data flows through each candidate file and produce findings. A second agent pass revalidates those findings and consults git history to filter already-patched issues. Final output is structured Markdown or JSON, ready to paste into tickets.

**AI models used**: Claude Opus 4 with extended thinking (default) and GPT-5.5, via your existing Anthropic or OpenAI subscription. Vercel AI Gateway is recommended for production scans.

**False positive rate**: roughly 10–20% after the revalidation step.

```bash
# Initialize at repo root
npx deepsec init
cd .deepsec && pnpm install

# Run the full pipeline
pnpm deepsec scan       # fast regex pass
pnpm deepsec process    # AI agent investigation (slow, costs tokens)
pnpm deepsec triage     # P0/P1/P2 classification
pnpm deepsec revalidate # reduce false positives
pnpm deepsec export --format md-dir --out ./findings

# PR mode: scan only changed files (much cheaper)
pnpm deepsec process --diff

# Distributed mode for large monorepos (Vercel Sandboxes)
pnpm deepsec sandbox process --sandboxes 10 --concurrency 4
```

**When to use it**: DeepSec finds edge cases in authentication conditions and subtle data-flow issues that pattern-based tools won't surface. It's well-suited for a periodic deep audit on critical services or as a `--diff` gate on security-sensitive PRs, not as a per-commit scanner.

**Cost warning**: a full scan on a 50K-line codebase can cost $10–50 in Claude Opus tokens. Large monorepos can reach thousands of dollars. Run `--diff` mode for routine use; reserve full scans for targeted audits.

**Configuration**: create `.deepsec/INFO.md` (50–100 lines) documenting project-specific auth patterns and sensitive zones. Without it, agents reason without context and produce more false positives. A plugin system allows custom regex matchers aligned to your architecture.

**Security posture**: DeepSec has full shell access; treat it like a coding agent. Vercel recommends deploying in Sandbox microVMs (Firecracker) so API keys cannot be exfiltrated from worker processes.

> **See also**: [Vercel blog announcement](https://vercel.com/blog/introducing-deepsec-find-and-fix-vulnerabilities-in-your-code-base) for architecture details and real-world examples.

### SkillSpector

A security scanner from NVIDIA that vets skills before you install them. AgentShield audits your live config; DeepSec audits your application code. SkillSpector fills the gap that neither covers: static analysis of a skill file or repository before it touches your machine.

The motivation is concrete: a 2026 study (Liu et al.) on 42,447 skills from major marketplaces found 26.1% contained at least one vulnerability, and 5.2% showed likely malicious intent. Skills with executable scripts were 2.12x more likely to be vulnerable.

| Attribute | Details |
|-----------|---------|
| **Source** | [GitHub: NVIDIA/SkillSpector](https://github.com/NVIDIA/SkillSpector) |
| **Install** | `uv venv .venv && source .venv/bin/activate && make install` |
| **Language** | Python 3.12+ |
| **License** | Apache 2.0 |
| **Status** | Active (NVIDIA-maintained) |

**Detection coverage**

64 patterns across 16 categories. The categories most relevant to Claude Code users:

- **Prompt injection** (5 patterns): instruction overrides, hidden directives in comments, exfiltration commands, behavior manipulation, harmful content
- **Data exfiltration** (4 patterns): external transmission, env variable harvesting, file system enumeration, context leakage
- **MCP tool poisoning** (4 patterns): hidden instructions in metadata (HTML comments, zero-width chars, base64), unicode deception (homoglyphs, RTL overrides), parameter description injection, description-behavior mismatch
- **Trigger abuse** (3 patterns): overly broad trigger keywords, shadow commands (skill overriding a built-in), keyword baiting
- **Supply chain** (6 patterns): unpinned dependencies, `curl | bash` patterns, obfuscated/encoded execution, live CVE lookup via OSV.dev, abandoned packages, typosquatting
- **Rogue agent** (2 patterns): self-modification at runtime, unauthorized persistence via cron/startup scripts

The SC4 pattern is notable: it queries [OSV.dev](https://osv.dev) in real time to check declared dependencies against the full advisory database. No API key required; results are cached in-memory for 1 hour. Falls back to a static list if the network is unreachable.

**Two-stage pipeline**

Stage 1 is fast static analysis (regex + AST inspection on all files). Stage 2 is optional LLM semantic evaluation that filters false positives and adds human-readable explanations. The LLM prompt includes anti-jailbreak protections to prevent a malicious skill from manipulating its own audit.

```bash
# Scan a local skill directory (static only)
skillspector scan ./my-skill/ --no-llm

# Scan a GitHub repository
skillspector scan https://github.com/user/my-skill

# Scan a single SKILL.md
skillspector scan ./SKILL.md

# With LLM analysis (Anthropic)
export SKILLSPECTOR_PROVIDER=anthropic
export ANTHROPIC_API_KEY=sk-ant-...
skillspector scan ./my-skill/

# JSON output for scripting
skillspector scan ./my-skill/ --no-llm --format json --output report.json

# SARIF for IDE tooling and CI
skillspector scan ./my-skill/ --format sarif --output report.sarif
```

**Risk scoring**: CRITICAL findings add 50 points, HIGH add 25, MEDIUM add 10, LOW add 5. Skills containing executable scripts get a 1.3x multiplier. Scores above 50 trigger a "DO NOT INSTALL" recommendation.

**Docker option** for air-gapped environments or CI without Python:

```bash
docker build -t skillspector .
docker run --rm -v "$PWD:/scan" skillspector scan ./my-skill/ --no-llm
```

**When to use it**: before installing any skill from an unfamiliar source, especially those with executable scripts (`scripts/`, `.sh`, `.py` alongside the SKILL.md). Running with `--no-llm` takes a few seconds and catches the majority of supply-chain and exfiltration patterns. Enable LLM analysis for skills you're considering adding to a shared team setup.

**Reported precision**: ~87% after the LLM revalidation pass. Static-only mode has higher recall but more false positives on legitimate patterns like `subprocess` in build tools.

> **See also**: [NVIDIA SkillSpector README](https://github.com/NVIDIA/SkillSpector) for the full pattern catalog and Docker deployment guide.
