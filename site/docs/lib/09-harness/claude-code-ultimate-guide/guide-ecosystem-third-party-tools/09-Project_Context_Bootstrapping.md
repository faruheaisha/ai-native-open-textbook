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
pageSha256: "0ad0c3d12ad38b622e9891b7a2af5d9580d14072a15d868c5dd3bf4578fa0ba8"
contentMode: "local-full"
zh: ""
---

## Project Context Bootstrapping

Tools that compile structured codebase knowledge before a Claude Code session starts, so the AI understands routes, schema, dependencies, and high-impact files from the first message, without spending tokens on file exploration.

> **Context**: Claude Code explores a codebase by calling Glob, Grep, and Read. On large projects, this costs thousands of tokens before any real work begins. The tools below pre-compile that exploration into a single structured artifact (or a set of targeted wiki articles) that Claude reads once at session start. Think of it as "loading the project into RAM before the session opens."

### codesight

A zero-dependency CLI that analyzes a codebase via AST and generates structured context maps for Claude Code and other AI tools. Saves 7-12x tokens on base scan compared to manual file exploration; up to 83-131x with targeted wiki queries (self-reported on 3 production projects).

| Attribute | Details |
|-----------|---------|
| **Source** | [GitHub: Houseofmvps/codesight](https://github.com/Houseofmvps/codesight) |
| **Install** | `npx codesight` (zero dependencies, zero config) |
| **Language** | TypeScript, borrows the TS compiler from your project when present |
| **License** | MIT |
| **Status** | Early-stage (released April 2026, ~386 stars at time of writing, 1,253 as of 2026-07-27), APIs may evolve |

**Core commands**:

```bash
# Scan current project — generates .codesight/ folder
npx codesight

# Generate wiki knowledge base (.codesight/wiki/) — targeted articles per topic
npx codesight --wiki

# Generate CLAUDE.md, .cursorrules, codex.md, AGENTS.md from project scan
npx codesight --init

# Show blast radius for a file (all files transitively affected by changing it)
npx codesight --blast src/lib/db.ts

# Start as MCP server (11 tools) — Claude calls it on demand
npx codesight --mcp

# Generate optimized config file for a specific AI tool
npx codesight --profile claude-code

# Watch mode — rescans on file changes
npx codesight --watch

# Open interactive HTML report in browser
npx codesight --open
```

**What gets generated**:

| File | Content |
|------|---------|
| `.codesight/CODESIGHT.md` | Combined context map: one file with full project understanding |
| `.codesight/routes.md` | Every API route with method, path, params, and what it touches (auth, db, cache, payments) |
| `.codesight/schema.md` | Every database model with fields, types, primary keys, foreign keys, relations |
| `.codesight/graph.md` | Import graph: which files import what, which files break the most things if changed |
| `.codesight/middleware.md` | Auth, rate limiting, CORS, validation, logging, error handlers |
| `.codesight/config.md` | Every env var (required vs default), config files, key dependencies |
| `.codesight/wiki/` | Persistent knowledge base: one article per topic (`auth.md`, `database.md`, `payments.md`, etc.) |

**Detection coverage**:

- Routes: 25+ frameworks auto-detected (Express, Hono, Fastify, NestJS, tRPC, FastAPI, and more)
- Schema: 10 ORMs (Drizzle, Prisma, TypeORM, Mongoose, SQLAlchemy, ActiveRecord, Ecto, Eloquent, Entity Framework, Sequelize)
- Components: React, Vue, Svelte, Flutter, SwiftUI
- Languages: TypeScript (full AST), JavaScript, Python, Go, Ruby, Elixir, Java, Kotlin, Rust, PHP, Dart, Swift, C# (regex fallback for non-TS)

**MCP integration**: once configured, Claude calls it directly without running `npx`:

```json
{
  "mcpServers": {
    "codesight": {
      "command": "npx",
      "args": ["codesight", "--mcp"]
    }
  }
}
```

Available MCP tools: `codesight_scan`, `codesight_get_wiki_index`, `codesight_get_wiki_article`, `codesight_get_routes`, `codesight_get_schema`, `codesight_get_blast_radius`, `codesight_get_hot_files`, `codesight_get_env`, `codesight_get_summary`, `codesight_lint_wiki`, `codesight_refresh`.

**How the wiki reduces token usage**:

| Question | Without wiki | With wiki |
|----------|-------------|-----------|
| "How does auth work?" | ~12K tokens (8+ file reads) | ~300 tokens (`auth.md`) |
| "What models exist?" | ~5K tokens (full CODESIGHT.md) | ~400 tokens (`database.md`) |
| New session start | ~5K tokens (full reload) | ~200 tokens (`index.md`) |

**At what scale to switch from CODESIGHT.md to wiki**: on small to medium projects (under ~1,500 files), loading `CODESIGHT.md` at session start via CLAUDE.md is practical. On large projects (a 1,700-file Next.js + tRPC monorepo generates a 35K-token CODESIGHT.md), loading the full file becomes counterproductive. Use `--wiki` + MCP server instead: Claude pulls one targeted article (~200-400 tokens) per question rather than loading the entire map upfront.

**Limitations and caveats**:

- Benchmarks are self-reported on 3 production projects, with no independent verification at time of writing
- AST precision applies to TypeScript only; other languages use regex-based fallback
- `--init` generates a CLAUDE.md automatically; it can overwrite an existing one. Back up your CLAUDE.md before running this on a project with an established config
- Early-stage tool (April 2026): API surface may change across releases
- MongoDB projects correctly report 0 schema models (no SQL ORM declarations)
- Cloudflare Workers using raw HTTP handlers (no recognized framework) report 0 routes: the worker runtime falls outside the 25+ supported framework list
- Next.js App Router projects report 0 routes: file-based routing has no explicit route declarations for static analysis to parse; routes are inferred from file paths, not code patterns
- Rust projects produce near-empty output: no AST support, regex fallback captures only top-level module imports (`src/main.rs` → `mod X`); routes, structs, and business logic are invisible. Not useful on Rust codebases

**CI integration** (keeps context fresh on every push):

```yaml
name: codesight
on: [push]
jobs:
  scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm install -g codesight && codesight
      - uses: actions/upload-artifact@v4
        with:
          name: codesight
          path: .codesight/
```

> **Cross-ref**: For CLAUDE.md manual authorship and path-scoping, see [ultimate-guide.md Section 3](/lib/09-harness/claude-code-ultimate-guide/guide-ultimate-guide/index). For context window management strategies, see [context-engineering-tools.md](/lib/09-harness/claude-code-ultimate-guide/guide-ecosystem-context-engineering-tools/index). For MCP server configuration, see [mcp-servers-ecosystem.md](/lib/09-harness/claude-code-ultimate-guide/guide-ecosystem-mcp-servers-ecosystem/index).
