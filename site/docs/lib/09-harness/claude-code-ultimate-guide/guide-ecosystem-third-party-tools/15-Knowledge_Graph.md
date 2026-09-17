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
pageSha256: "1e0a48ef4a26e65b223ba1998924ce7b5e635964489cca9a830dcfdc24596cdc"
contentMode: "local-full"
zh: ""
---

## Knowledge Graph

### Graphify

A CLI tool that maps a codebase (plus any mix of docs, PDFs, images, and videos) into a queryable knowledge graph. Instead of asking Claude Code to re-read files every session to understand structure, you build the graph once and query it. The payoff: far fewer tokens spent on orientation, and surfaced connections that grep and manual browsing miss.

**GitHub**: [github.com/safishamsi/graphify](https://github.com/safishamsi/graphify)
**PyPI**: `graphifyy` (note the double-y: the single-y package is a different, unrelated project)
**License**: MIT | **Language**: Python 3.10+

| Attribute | Details |
|-----------|---------|
| **Install** | `uv tool install graphifyy` (recommended) or `pipx install graphifyy` |
| **Platforms** | Claude Code, Cursor, Copilot CLI, Aider, Codex, Gemini CLI, OpenCode, and 8+ more |
| **Verified** | May 2026 (v0.8.9) |

**Outputs per run:**

| File | Contents |
|------|---------|
| `graphify-out/graph.html` | Interactive visualization with clickable nodes and filtering |
| `graphify-out/GRAPH_REPORT.md` | Key concepts, surprising connections, suggested questions |
| `graphify-out/graph.json` | Structured graph data reused on every query |

**Under the hood: cache files in `graphify-out/`:**

Beyond the 3 public files, Graphify keeps a cache layer that powers incremental rebuilds. These hidden files appear after the first run:

| File | Role |
|------|------|
| `.graphify_ast.json` | Raw AST from tree-sitter, all code, no API call, often 15-20 MB |
| `.graphify_detect.json` | Output of `collect_files()`: the full file manifest |
| `.graphify_chunk_XX.json` | Batches of files sent to the AI API for semantic extraction |
| `.chunk_manifest_XX.json` | Which files belong to each chunk, used by `--update` to isolate changes |
| `.graphify_semantic.json` | Semantic embeddings after entity deduplication |
| `.graphify_uncached.txt` | Files not yet cached in the last run |
| `cache/` | Content hashes per file for change detection |

On `--update`: Graphify compares current content hashes against the cache, identifies which files changed, re-processes only their chunks via the AI API, then reconstructs `graph.json` from unchanged chunks plus the new ones. Files that haven't changed cost zero API tokens.

**Init in a project:**

```bash
# 1. Build the graph from project root
graphify .

# 2. Register with Claude Code — installs the /graphify skill
graphify install --platform claude

# 3. Commit the output so teammates start with a pre-built map
git add graphify-out/ && git commit -m "chore: add graphify knowledge graph"
# Or exclude it entirely: echo "graphify-out/" >> .gitignore

# 4. Subsequent runs: --update uses semantic caching by content hash
#    Only changed files get re-processed — saves API cost on large repos
graphify . --update
```

**Querying the graph:**

```bash
graphify query "what connects auth to the database?"
graphify path "UserService" "DatabasePool"
```

Once registered with Claude Code, the installed skill lets Claude read `graph.json` directly instead of crawling files, so queries happen inside the conversation without re-reading source.

**Key analytical features:**

- **God nodes**: highly-connected architectural hubs, the components that everything else depends on
- **Surprising connections**: cross-module links ranked by an unexpectedness score
- **Design rationale extraction**: pulls the WHY from inline comments and docstrings, not just the WHAT
- **Confidence tagging**: every relationship is tagged `EXTRACTED` (explicit import/call), `INFERRED` (deduced from context), or `AMBIGUOUS` (flagged for review)

**File support**: 31 programming languages, Markdown, RST, YAML, HTML, PDFs. Videos and audio: `pip install graphifyy[video]` (local faster-whisper, no external API call). Office documents: `pip install graphifyy[office]`.

**MCP server mode:**

```bash
# Exposes: query, shortest_path, god_nodes, neighbor_traversal tools
graphify mcp
```

For large codebases (graph.json above ~5 MB), MCP mode is significantly more efficient. Without it, Claude loads `GRAPH_REPORT.md` first for orientation, then pulls targeted sections of `graph.json` as needed. With MCP running, Claude calls `god_nodes`, `query "auth flow"`, or `shortest_path` directly and receives only the relevant subgraph, no full graph load into context. A 22 MB `graph.json` loaded in full costs far more tokens than 4-5 targeted MCP tool calls returning the same answer.

**How Claude uses the installed skill:**

After `graphify install --platform claude`, the skill injects a rule: if `graphify-out/` exists in the current project, treat architecture questions as graph queries rather than file reads. The resolution order in practice:

1. Claude reads `GRAPH_REPORT.md` first, compact (typically 150-200 KB), gives orientation on god nodes and surprising connections
2. For specific queries, Claude consults targeted sections of `graph.json`
3. With MCP server running: Claude calls `query`, `shortest_path`, `god_nodes`, or `neighbor_traversal` tools directly, far cheaper at scale

Without Graphify: Claude re-reads source files every session to understand structure, burning tokens on orientation. With Graphify: that cost is paid once at build time, then amortized across all sessions.

**Additional exports**: Wikipedia-style wiki with cross-community wikilinks, Obsidian vault with Canvas layouts, D3 collapsible-tree HTML, Mermaid call-flow diagrams with interactive zoom/pan, Neo4j graph push.

**Privacy**: Code files are processed locally via tree-sitter, no API calls for code analysis. Documents and PDFs are sent to your configured AI model API. For fully local inference: `pip install graphifyy[ollama]`.

**Team workflow**: Committing `graphify-out/` to git gives every teammate a shared map on clone. Graphify ships a git merge driver that prevents conflict markers in `graph.json`, and optional git hooks for automatic rebuilds on commit.

**Pipeline:** `detect() → extract() → build_graph() → cluster() → analyze() → report() → export()`: each stage isolated, no shared state. Adding a language requires registering an extractor in `extract.py` plus tree-sitter dependencies.

**Limitations:**

- Package name `graphifyy` (double-y) is the main friction point: `pip install graphify` installs an unrelated tool without any error
- Doc/PDF extraction makes AI API calls; cost scales with documentation volume, not code size
- v0.8.x evolves fast; some CLI flags shift between minor versions, check the changelog before upgrading

**When to use**: Large or unfamiliar codebases where Claude Code burns tokens re-reading files just to understand structure. Build the graph once, then query it. High-value for legacy code onboarding, monorepo navigation, and pre-PR architecture review.
