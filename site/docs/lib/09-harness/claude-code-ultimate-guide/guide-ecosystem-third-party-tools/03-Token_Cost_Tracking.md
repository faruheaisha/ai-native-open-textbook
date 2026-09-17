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
pageSha256: "f168f4f694250154e0ddec8f076536bd13c309b00fa0b5b83435fffbe1f5a234"
contentMode: "local-full"
zh: ""
---

## Token & Cost Tracking

### ccusage

The most mature cost tracking tool for Claude Code. Parses local session data to produce cost reports by day, month, session, or 5-hour billing window.

| Attribute | Details |
|-----------|---------|
| **Source** | [npm: ccusage](https://www.npmjs.com/package/ccusage) / [ccusage.com](https://ccusage.com) |
| **Install** | `bunx ccusage` (fastest) or `npx ccusage` |
| **Language** | TypeScript (Node.js 18+) |
| **Version** | 18.x (actively maintained) |

**Key features**:

- `ccusage daily` / `ccusage monthly` / `ccusage session` - aggregated cost reports
- `ccusage blocks --live` - real-time monitoring against 5-hour billing windows
- `--breakdown` flag for per-model cost split (Opus/Sonnet/Haiku)
- `--since` / `--until` date filtering
- JSON output (`--json`) for programmatic access
- Offline mode with cached pricing data
- MCP server integration (`@ccusage/mcp`)
- macOS widget (`ccusage-widget`) and [Raycast extension](https://www.raycast.com/nyatinte/ccusage)

**Limitations**: Relies on local JSONL parsing; cost estimates may differ from official Anthropic billing. No team aggregation without manual log merging.

> **Cross-ref**: The main guide covers basic ccusage commands at [ultimate-guide.md Section 2.4](/lib/09-harness/claude-code-ultimate-guide/guide-ultimate-guide/index) (cost monitoring).
> For DIY cost tracking with hooks, see [Observability](/lib/09-harness/claude-code-ultimate-guide/guide-ops-observability).

---

### CodeBurn

CodeBurn reads the same `~/.claude/projects/` JSONL session logs as ccusage, but answers a different question. Where ccusage answers "how much did I spend?", CodeBurn answers "what did I spend it on?" by breaking token usage down by turn type and correlating spend with git history via its `yield` command.

| Attribute | Details |
|-----------|---------|
| **Source** | [GitHub: getagentseal/codeburn](https://github.com/getagentseal/codeburn) |
| **Install** | `npm install -g codeburn` or `npx codeburn` |
| **Stars** | 8,100+ (June 2026; third-party indexers may show ~2.7K due to update lag) |
| **Language** | Node.js 22.13+ |
| **Version** | v0.9.13 (June 14, 2026) |
| **Multi-provider** | Claude Code, Codex, Gemini CLI, Cursor, Cline/Roo |

**Key features**:

- `codeburn` - interactive TUI dashboard (last 7 days by default)
- `codeburn today` / `codeburn month` / `codeburn overview` / `codeburn report` - time-scoped summaries
- `codeburn optimize` - scans for waste patterns: retry loops, redundant re-reads, abandoned sessions
- `codeburn compare` - side-by-side model performance breakdown
- `codeburn yield` - correlates sessions with git commits (which sessions shipped code vs. which were abandoned or reverted)
- `codeburn models` - per-model token and cost breakdown
- `codeburn export` - CSV or JSON output
- `codeburn menubar` - macOS menu bar widget (SwiftBar)
- `codeburn plan set [claude-max|claude-pro|custom]` - subscription plan tracking
- MCP server (v0.9.12+): exposes usage and savings data to other agents

**Turn classification**: CodeBurn classifies every turn into 13 categories using local deterministic pattern matching (no LLM calls). Categories include Coding, Debugging, Refactoring, Testing, Exploration, Brainstorming, Planning, Feature Dev, Delegation, Git Ops, and Conversation. The most diagnostic finding in practice: "Conversation" turns (model responding without tool use) often account for 40-56% of session spend. Creator-reported examples include a JWT auth task where 5,200 of 15,600 tokens went to type corrections, and a PostgreSQL migration where 19,400 of 40,700 tokens went to foreign key debugging. These are illustrative data points, not reproducible benchmarks.

**Limitations**: Read-only, so it cannot interrupt a runaway session. Cost estimates use LiteLLM pricing rather than Anthropic billing API data, so figures can differ by $1-2/session from invoices. Format-dependent: an Anthropic JSONL schema change will break parsing until CodeBurn updates. Not listed in the awesome-claude-code registry.

**When to use CodeBurn vs ccusage**: ccusage is the right default for cost monitoring and billing-window tracking. CodeBurn adds forensic analysis: which turn types drive your spend, which sessions produced code that shipped, where retry loops inflate costs. Use both together.

---

### ccburn

A Python TUI for visual token burn-rate tracking. Displays charts showing consumption rate relative to Claude's billing windows.

| Attribute | Details |
|-----------|---------|
| **Source** | [GitHub: JuanjoFuchs/ccburn](https://github.com/JuanjoFuchs/ccburn) / [Blog post](https://juanjofuchs.github.io/ai-development/2026/01/13/introducing-ccburn-visual-token-tracking.html) |
| **Install** | `pip install ccburn` |
| **Language** | Python 3.10+ (Rich + Plotext) |

**Key features**:

- Terminal charts showing token consumption over time
- Burn-rate indicators (on-track / slow-down warnings)
- Compact display mode
- Visual budget tracking against limits

**Limitations**: Python-only ecosystem. Smaller community than ccusage. No MCP integration.

**When to choose ccburn over ccusage**: If you prefer visual burn-rate charts over tabular reports, or if your toolchain is Python-based.

---

### Straude

A social dashboard for tracking and sharing Claude Code (and OpenAI Codex) usage stats. Push your daily token consumption and costs to a public leaderboard to track your streak, weekly spend, and global rank.

| Attribute | Details |
|-----------|---------|
| **Source** | [npm: straude](https://www.npmjs.com/package/straude) |
| **Website** | [straude.com](https://straude.com) |
| **Install** | `npx straude@latest` |
| **Language** | TypeScript (Node.js 18+) |
| **Version** | 0.1.9 (active development, created Feb 2026) |
| **Maintainer** | Community (oscar.hong2015@gmail.com) |

**Key features**:

- `straude`: smart sync, authenticate + push usage in one command
- `straude push --dry-run`: preview what would be submitted without sending
- `straude push --days N`: backfill last N days (max 7)
- `straude status`: streak, weekly spend, token totals, global rank
- Tracks both Claude Code (`ccusage`) and OpenAI Codex (`@ccusage/codex`)

**What is sent to the Straude server**:

Per day: cost in USD, token counts (input/output/cache creation/cache read), model names used (e.g. `claude-sonnet-4-6`), per-model cost breakdown. Plus: a SHA256 hash of the raw data, a random device UUID, and your machine hostname.

Your source code, API keys, and conversation content are **not** accessed or transmitted.

**Security notes**:

- Auth token stored in `~/.straude/config.json` with `0600` permissions (owner-only)
- Project is very young (created 2026-02-18, rapid iteration) and has no public security audit
- Machine hostname is sent as `device_name`
- No published privacy policy as of March 2026
- Use `--dry-run` to verify what would be submitted before your first push

**When to choose Straude over ccusage/ccburn**:

Straude is one of two social tools in this list: it uploads your stats to a shared platform. If you want a leaderboard, streak tracking, or to benchmark your usage against other developers, Straude or viberank (below) both fit; ccusage and ccburn stay local-only with no data-sharing implications.

> **Security reminder**: Before running any community CLI tool with `npx`, review its npm page and source for red flags. For Straude, the compiled source is readable and consistent with its stated purpose. See the [resource evaluation](/lib/09-harness/claude-code-ultimate-guide/docs-resource-evaluations-straude-evaluation) for the full analysis.

---

### viberank

A public leaderboard for AI coding usage, reading the same local `ccusage` data as Straude but scoped wider: submissions come from Claude Code, Codex, Gemini CLI, Copilot, OpenCode, and other tools ccusage tracks, not Claude Code and Codex alone.

| Attribute | Details |
|-----------|---------|
| **Source** | [GitHub: sculptdotfun/viberank](https://github.com/sculptdotfun/viberank) |
| **Website** | [viberank.app](https://viberank.app) |
| **Install** | `npx viberank-cli` |
| **Stars** | 114 (2026-08-24) |
| **License** | MIT |
| **Language** | TypeScript |
| **Created** | July 3, 2025 |

**Key features**:

- Global and per-tool leaderboards (Claude Code, Codex, OpenCode, and more), ranked by measured token spend
- Spend tiers from Spark ($0+) to Supernova ($50K+)
- Verified GitHub profile linking and README badges
- Submission via `npx viberank-cli`, a curl command, or manual web upload
- Publishes aggregate spend distribution through a free JSON API under CC BY 4.0

**What is sent to the viberank server**: aggregate totals only, tokens, cost, dates, and model names, per the CLI's stated behavior. Unlike Straude, no hostname or device UUID.

**When to choose viberank over Straude**: viberank covers more tools than Claude Code and Codex, and its dataset is published openly rather than staying behind the leaderboard UI. Straude adds streak tracking and a workout-app-styled presentation; pick whichever social framing and tool coverage fits.

---

### RTK (Rust Token Killer)

A CLI proxy that filters command outputs **before** they reach Claude's context. 73,531 stars, 4,597 forks (GitHub API, 2026-07-27), up from 69,042 on 2026-07-07, 446 in March 2026, and 24,397 in April 2026, continuing the same steep growth curve that's worth checking against the full star-history graph before quoting in a high-stakes context.

| Attribute | Details |
|-----------|---------|
| **Source** | [GitHub: rtk-ai/rtk](https://github.com/rtk-ai/rtk) |
| **Website** | [rtk-ai.app](https://www.rtk-ai.app/) |
| **Install** | `brew install rtk` or `cargo install --git https://github.com/rtk-ai/rtk` |
| **Language** | Rust (standalone binary) |
| **Version** | v0.28.0 |

**Key features**:

- `rtk git log` (92% reduction), `rtk git status` (76% reduction), `rtk git diff` (56% reduction)
- `rtk vitest run`, `rtk prisma`, `rtk pnpm` (70-90% reduction)
- `rtk python pytest`, `rtk mypy`, `rtk go test` (multi-language support)
- `rtk cargo test/build/clippy/nextest` (Rust toolchain)
- `rtk aws`, `rtk psql`, `rtk docker compose`, `rtk gt` (Graphite CLI)
- `rtk wc` - compact word/line/byte counts
- `rtk init --global` - hook-first install with settings.json auto-patch
- `rtk gain` / `rtk gain -p` - token savings analytics (global + per-project)
- **TOML Filter DSL**: add custom output filters for any command without writing Rust, via `.rtk/filters.toml` (project) or `~/.config/rtk/filters.toml` (global), 33+ built-in filters
- `rtk rewrite` - single source of truth for hook command mapping (v0.25.0+, requires `rtk init --global` after upgrade)
- `exclude_commands` config to exclude specific commands from auto-rewriting

**When to choose RTK vs ccusage/ccburn**:

- RTK **reduces** token consumption (preprocessing)
- ccusage/ccburn **monitor** it (postprocessing)
- Use both together for maximum efficiency

**Limitations**: Not suitable for interactive commands or very small outputs (<100 chars).

> **Cross-ref**: Full docs at [ultimate-guide.md Section 9](#command-output-optimization-with-rtk)

---

### Claude Code Usage Monitor

Real-time usage monitor with burn-rate predictions and session-level warnings. The highest-starred dedicated monitoring tool for Claude Code as of May 2026, with approximately 7,955 stars (8,540 as of 2026-07-27).

| Attribute | Details |
|-----------|---------|
| **Source** | [GitHub: Maciek-roboblog/Claude-Code-Usage-Monitor](https://github.com/Maciek-roboblog/Claude-Code-Usage-Monitor) |
| **Install** | `npx ccusage@latest` (CLI) or web UI (see GitHub) |
| **Stars** | ~7,955 (May 2026) |

**Key features**:

- Tracks token consumption, message counts, and cost over 5-hour session billing windows
- Shows current burn rate and forecasts when the session limit will be reached
- Displays warnings before limits are hit, not after
- Works regardless of billing mode: parses local session files on disk rather than intercepting API traffic, so it covers both API key billing and Claude Max/Pro subscriptions equally

**When to choose over ccusage**: If you primarily want real-time warnings and a burn-rate forecast rather than historical reports and aggregated analytics. Both read the same local session files; the difference is the interface and emphasis.

---

### claude-spend

One-shot spend check for Claude Code sessions. The simplest entry point for occasional cost visibility without setting up a full monitoring dashboard.

| Attribute | Details |
|-----------|---------|
| **Install** | `npx claude-spend` |

**Key features**:

- Single command: no configuration required
- Reads local Claude Code session files (same source as ccusage)
- Shows per-conversation and per-model token consumption

**When to use**: Ad-hoc cost checks without committing to a persistent monitoring setup. For recurring tracking, ccusage provides more depth.

---

### cc-statistics

Cross-agent statistics dashboard that aggregates cost and token data across multiple AI coding tools in a single view.

| Attribute | Details |
|-----------|---------|
| **Source** | [GitHub: androidZzT/cc-statistics](https://github.com/androidZzT/cc-statistics) |
| **Stars** | 109 (GitHub API, 2026-07-07), up from 87 in May 2026, slow steady growth rather than a breakout |

**Key features**:

- Covers Claude Code, Gemini CLI, OpenAI Codex, and Cursor in one dashboard
- Costs, token counts, and efficiency metrics across agents
- Useful for teams running multiple AI tools who want a unified view

**When to use**: If your workflow spans more than one AI coding assistant and you want to compare cost and usage across them.

---

### claude-context-optimizer

Claude Code plugin focused on surfacing where context budget is actually going, rather than just reporting total spend.

| Attribute | Details |
|-----------|---------|
| **Stars** | ~48 (May 2026) |

**Key features**:

- Context heatmaps: visualizes which files and instructions consume the most tokens
- Wasted context detection: flags instructions that rarely influence model output
- Git-aware analysis: cross-references file context consumption against edit frequency to identify high-cost, low-edit files
- ROI reports and budget alerts

**When to use**: When you have a context efficiency problem (context growing too fast, adherence degrading) and need to identify the specific sources, rather than just the total size.

---

### A note on the Layer 4 billing blind spot

API-level gateways (Helicone, Portkey, Langfuse, Bifrost, Compresr) intercept HTTP calls and measure token usage at the API layer. This works well for applications calling the Anthropic API directly. It does not work for Claude Code Max or Pro subscriptions, because Claude Code connects directly to Anthropic servers using subscription credentials rather than an API key. There is no HTTP layer for a gateway to intercept.

All four tools above (Claude Code Usage Monitor, claude-spend, cc-statistics, claude-context-optimizer) work by parsing local session files that Claude Code writes to disk. This approach is billing-mode-agnostic: it works equally on API key billing and on Max/Pro subscriptions. If you are on a Max subscription and your gateway shows zero Claude Code traffic, that is expected behavior, not a misconfiguration.
