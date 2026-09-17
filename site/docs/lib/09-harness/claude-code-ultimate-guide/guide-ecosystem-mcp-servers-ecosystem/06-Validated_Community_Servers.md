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
entryUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/ecosystem/mcp-servers-ecosystem.md"
sourceRel: "guide/ecosystem/mcp-servers-ecosystem.md"
rawUrl: "/raw/09-harness/claude-code-ultimate-guide/guide/ecosystem/mcp-servers-ecosystem.md"
sourceSha256: "1875888571dbb7a38db6c0267188775718596a25164159e18ffc2c8999b0a6b2"
pageSha256: "b987161d54841433745a380796b8dcbbd9e4bb4d52c1a8bc14c09866080c05e3"
contentMode: "local-full"
zh: ""
---

## Validated Community Servers

### Browser Automation

#### Playwright MCP (Microsoft)

**Official Microsoft server** for browser automation optimized for LLMs. Uses accessibility trees instead of screenshots, reducing token usage.

**Use Case**: AI coding agents verify their work in browsers (E2E testing, bug verification).

**Key Features**:

| Capability | Details |
|------------|---------|
| Browser Automation | Navigate, click, fill, hover (Playwright API) |
| Content Extraction | Structured data via accessibility trees |
| Screenshots | Full-page + element-specific |
| JavaScript Execution | Run code in page context |
| Session Management | Persistent browser state |
| Supported Browsers | Chromium, Firefox, WebKit |

**Setup**:

```bash
# Installation
npm install @microsoft/playwright-mcp
# or
npx @microsoft/playwright-mcp
```

**Claude Code Configuration** (`~/.claude.json`):

```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["--yes", "@microsoft/playwright-mcp"]
    }
  }
}
```

**Example Usage**:

```
User: "Navigate to example.com, log in with email test@example.com, then take a screenshot"

Claude: [Uses playwright_navigate → playwright_type → playwright_click → playwright_screenshot]

Result: Screenshot + accessibility tree in context
```

| Dimension | Score | Notes |
|-----------|-------|-------|
| Maintenance | 9/10 | Bi-weekly releases, active Microsoft team |
| Documentation | 9/10 | README complete, examples, Playwright Live videos |
| Tests | 10/10 | Extensive test suite, CI/CD automated |
| Performance | 8/10 | Fast snapshots (~200ms), memory-efficient |
| Adoption | 8/10 | 2890+ uses (Smithery.ai tracking) |

**Limitations & Workarounds**:

| Limitation | Workaround |
|------------|-----------|
| Single browser session | Use session ID to persist state |
| No cross-domain iframe access | Restrict to same-origin content |
| Screenshot size limits (4K max) | Use element snapshots for large pages |

**Alternatives**:

| Server | Advantage | Disadvantage |
|--------|-----------|--------------|
| **Playwright MCP** | Accessibility trees, LLM-native | No vision model support |
| Browserbase MCP | Cloud-based, stealth mode | API costs, latency |
| Puppeteer MCP | Lightweight, JS-only | Less structured data |

**Resources**:
- **GitHub**: https://github.com/microsoft/playwright-mcp
- **Releases**: https://github.com/microsoft/playwright-mcp/releases
- **Playwright Live Demo**: https://youtu.be/CNzg1aPwrKI

---

#### Browserbase MCP

**Official Browserbase server** for cloud browser automation. Includes Stagehand AI agent for autonomous task execution.

**Use Case**: Complex web interactions requiring stealth mode, proxy support, or autonomous execution (web scraping, form filling, data extraction).

**Key Features**:

| Capability | Details |
|------------|---------|
| Browser Control | Chromium via Browserbase cloud |
| Stagehand Agent | Autonomous task execution (e.g., "book a flight") |
| Data Extraction | CSS selectors + schema-based structured extraction |
| Anti-Detection | Stealth mode, proxy support, rotation |
| Multi-Model | OpenAI, Claude, Gemini, custom LLM |

**Setup**:

```bash
npm install @browserbasehq/mcp-server-browserbase
```

**Configuration**:

```json
{
  "mcpServers": {
    "browserbase": {
      "command": "npx",
      "args": ["@browserbasehq/mcp-server-browserbase"],
      "env": {
        "BROWSERBASE_API_KEY": "YOUR_KEY",
        "BROWSERBASE_PROJECT_ID": "YOUR_PROJECT_ID",
        "GEMINI_API_KEY": "YOUR_GEMINI_KEY"
      }
    }
  }
}
```

**Cost**: Freemium (paid API usage), ~$0.10/session

**Limitations**:

| Limitation | Workaround |
|------------|-----------|
| Latency (~500ms cloud) | Batch operations, cache results |
| API costs | Use for high-value extractions only |
| Stagehand limitations | Fall back to manual playwright_* tools |

**Resources**:
- **GitHub**: https://github.com/browserbase/mcp-server-browserbase
- **Official Docs**: https://www.browserbase.com

---

#### Chrome DevTools MCP

**Official Anthropic server** for Chrome DevTools Protocol integration. Provides debugging and inspection capabilities via Chrome's native DevTools APIs.

**Use Case**: Debugging web applications, inspecting runtime state, monitoring network requests, and analyzing performance. Complements Playwright MCP (testing) with development-focused debugging capabilities.

**Key Features**:

| Capability | Details |
|------------|---------|
| Console Access | Read browser console logs, errors, warnings |
| Network Monitor | Inspect HTTP requests, responses, headers |
| DOM Inspection | Query DOM structure, element properties |
| JavaScript Execution | Execute arbitrary JS in page context |
| Performance Profiling | CPU profiles, memory snapshots |

**Setup**:

```bash
npm install @modelcontextprotocol/server-chrome-devtools
```

**Configuration**:

```json
{
  "mcpServers": {
    "chrome-devtools": {
      "command": "npx",
      "args": ["@modelcontextprotocol/server-chrome-devtools"]
    }
  }
}
```

**When to Use**:

| Scenario | Use Chrome DevTools MCP | Use Playwright MCP |
|----------|------------------------|-------------------|
| Debug runtime errors | ✅ Console logs, stack traces | ❌ Limited error visibility |
| Inspect network calls | ✅ Full request/response details | ⚠️ Basic navigation only |
| Test user interactions | ❌ Not designed for testing | ✅ Click, type, navigate |
| Profile performance | ✅ CPU/memory profiling | ❌ No profiling tools |
| Automate workflows | ❌ Manual debugging focus | ✅ E2E test automation |

**Limitations**:
- Requires Chrome browser running with DevTools Protocol enabled
- Manual setup (launch Chrome with `--remote-debugging-port`)
- Not suitable for automated testing (use Playwright for that)
- Performance overhead when profiling enabled

**Resources**:
- **npm**: https://www.npmjs.com/package/@modelcontextprotocol/server-chrome-devtools
- **Chrome DevTools Protocol**: https://chromedevtools.github.io/devtools-protocol/

---

### DevOps & Infrastructure

#### Kubernetes MCP (Red Hat)

**Official Containers Community server** (Red Hat-backed) for Kubernetes/OpenShift management in natural language.

**Use Case**: DevOps/SRE uses Claude to query/configure cluster ("kubectl in natural language").

**Key Features**:

| Capability | Details |
|------------|---------|
| Resource CRUD | Create, Read, Update, Delete any K8s resource |
| Pod Operations | Logs, events, exec, metrics (top) |
| Deployment Management | Scale, rollout, status |
| Config Management | View/update ConfigMaps, Secrets |
| CRD Support | Custom Resource Definitions |
| Multi-Cluster | Switch kubeconfig contexts |
| OpenShift Support | Native OpenShift resources |

**Setup**:

```bash
# Docker
docker run -it --rm \
  --mount type=bind,src=$HOME/.kube/config,dst=/home/mcp/.kube/config \
  ghcr.io/containers/kubernetes-mcp-server

# Native (Go binary)
go install github.com/containers/kubernetes-mcp-server@latest
kubernetes-mcp-server
```

**Claude Desktop Configuration**:

```json
{
  "mcpServers": {
    "kubernetes": {
      "command": "docker",
      "args": [
        "run",
        "-i",
        "--rm",
        "--mount",
        "type=bind,src=/home/user/.kube/config,dst=/home/mcp/.kube/config",
        "ghcr.io/containers/kubernetes-mcp-server"
      ]
    }
  }
}
```

**Example Usage**:

```
User: "Show me all pods in production namespace with memory usage >500Mi"
Claude: [Uses list_resources for pods + metrics]
Result: List of pods with memory stats

User: "Scale the backend deployment to 5 replicas"
Claude: [Uses patch_resource]
Result: Deployment scaled
```

**Security**: RBAC enforcement, kubeconfig auth, no privilege escalation

**Limitations**:

| Limitation | Workaround |
|------------|-----------|
| Requires kubeconfig access | Use ServiceAccount + RBAC for safety |
| Limited node shell access | Use `kubectl exec` for debugging |
| CRD discovery lag | Pre-document CRDs for AI context |

**Resources**:
- **GitHub**: https://github.com/containers/kubernetes-mcp-server
- **Red Hat Docs**: https://developers.redhat.com/articles/2025/09/25/kubernetes-mcp-server-ai-powered-cluster-management

---

#### Vercel MCP

**Community server** for Vercel platform (deployments, projects, env vars, teams).

**Use Case**: AI assistant generates Next.js code, creates Vercel project, configures env vars, triggers deployment: full CI/CD loop without leaving IDE.

**Key Features**:

| Capability | Details |
|------------|---------|
| Deployments | List, get details, create, monitor status |
| Projects | List, create, update settings |
| Environment Variables | Get, set, manage secrets |
| Teams | List, create, manage |
| Domains | List, configure, DNS management |
| Functions | Monitor Vercel Functions, logs |

**Setup**:

```bash
git clone https://github.com/nganiet/mcp-vercel
cd vercel-mcp
npm install
```

**Configuration**:

```json
{
  "mcpServers": {
    "vercel": {
      "command": "npm",
      "args": ["start"],
      "env": {
        "VERCEL_API_TOKEN": "YOUR_VERCEL_TOKEN"
      }
    }
  }
}
```

**Note**: Vercel also has an official MCP server. This community version offers comprehensive API coverage.

**Resources**:
- **GitHub**: https://github.com/nganiet/mcp-vercel
- **Vercel Docs**: https://vercel.com/docs/mcp/deploy-mcp-servers-to-vercel
- **Official Vercel MCP**: https://vercel.com/docs/mcp/vercel-mcp

#### Sentry MCP

**Official Sentry server** for error monitoring and observability. Closes the diagnostic loop: Sentry alert fires → Claude reads issue + stack trace → diagnoses root cause → proposes or writes the patch.

**Repository**: [getsentry/sentry-mcp](https://github.com/getsentry/sentry-mcp)
**License**: MIT
**Maintainer**: Sentry (official)

**Use Case**: A Sentry alert fires in prod. The engineer asks Claude: "What's causing SEN-4521?". Claude reads the full stack trace, traces the regression through the codebase, and drafts a fix, without leaving the IDE. The observability loop closes inside Claude Code.

**Key Features**:

| Tool | Description |
|------|-------------|
| `list_issues` | Fetch unresolved issues with Sentry query syntax (`is:unresolved level:error`) |
| `get_issue` | Full issue details: stack trace, affected users, first/last seen timestamps |
| `get_event` | Specific event by ID, useful for time-scoped investigations |
| `search_events` | Full-text search across raw events with field filters |
| `list_projects` | List projects in your Sentry organization |

**Setup**:

```bash
# Via npx (recommended — verify package name against official docs)
npx -y @sentry/mcp-server

# One-liner for Claude Code
claude mcp add sentry -- npx -y @sentry/mcp-server
```

**Claude Code Configuration** (`~/.claude/settings.json`):

```json
{
  "mcpServers": {
    "sentry": {
      "command": "npx",
      "args": ["-y", "@sentry/mcp-server"],
      "env": {
        "SENTRY_AUTH_TOKEN": "your_auth_token",
        "SENTRY_ORG": "your-org-slug"
      }
    }
  }
}
```

> Auth token: [sentry.io/settings/account/api/auth-tokens/](https://sentry.io/settings/account/api/auth-tokens/), scopes needed: `project:read`, `event:read`, `org:read`

**Example Usage**:

```
User: "What's causing SEN-4521? It's been firing since yesterday's deploy."

Claude:
  [list_issues: query="is:unresolved level:error project:api-service"]
  [get_issue: issue_id="4521"]

Result: NullPointerException in UserController.getProfile() at line 142.
  Introduced in commit a3f8c2 (yesterday 14:32 UTC) — null check removed
  in the profile refactor. Fix: restore Optional.ofNullable at line 142.
  Opening a PR now.
```

**Query Syntax** (critical for effective use, the most common source of call failures):

```
is:unresolved                         # unresolved issues only
is:unresolved level:error             # errors only (excludes warnings, info)
is:unresolved has:user                # issues with identified users
is:unresolved times_seen:>100         # high-frequency issues
project:api-service is:unresolved     # scope to one project
assigned:me is:unresolved             # issues assigned to you
!has:assignee is:unresolved           # unassigned issues
```

> **Reference file**: `examples/skills/mcp-integration-reference/references/sentry-mcp.md` in this repo: complete parameter docs, gotchas, pagination patterns, and a curated noise-exclusion list. Copy it to your CLAUDE.md includes or project skills.

| Dimension | Score | Notes |
|-----------|-------|-------|
| Maintenance | 10/10 | Official Sentry server, enterprise-backed |
| Documentation | 8/10 | Good README + Sentry docs cover edge cases |
| Tests | 8/10 | CI present, TypeScript type safety |
| Performance | 8/10 | API-bound (~200–400ms), pagination required for large orgs |
| Adoption | 9/10 | Sentry is the de facto error monitoring standard (100K+ organizations) |

**Limitations & Workarounds**:

| Limitation | Workaround |
|------------|-----------|
| `organization_slug` ≠ display name | Read slug from URL: `sentry.io/organizations/<slug>/` |
| `search_events` times out in large orgs | Always scope with `project_slug` when searching events |
| 100 issues max per call | Use cursor-based pagination for complete sweeps |
| Read-only by default | Resolve/assign operations need additional token scopes |
| 90-day event retention | Events older than 90 days unavailable on default Sentry plan |

**When to Use vs Alternatives**:

| Tool | Best For | Not Worth It When |
|------|----------|-------------------|
| **Sentry MCP** | Error diagnosis loop: alert → stack trace → patch | Pure alerting (use webhooks or PagerDuty directly) |
| **Datadog MCP** | APM, distributed traces, metrics dashboards | Error-only workflows, overengineered for that use case |
| **Bash + Sentry CLI** | Bulk operations, scripted data exports | Interactive debugging sessions |

**Resources**:
- **GitHub**: https://github.com/getsentry/sentry-mcp
- **Sentry MCP Docs**: https://docs.sentry.io/product/sentry-mcp/
- **Reference File**: `examples/skills/mcp-integration-reference/references/sentry-mcp.md`
- **Auth Token Setup**: https://sentry.io/settings/account/api/auth-tokens/

---

### Security & Code Analysis

#### Semgrep MCP

**Official Semgrep server** for vulnerability scanning (SAST, secrets, supply chain). Includes custom rules engine.

**Use Case**: Claude Code generates code, Semgrep automatically scans for security issues, proposes fixes ("secure by default").

**Key Features**:

| Capability | Details |
|------------|---------|
| Quick Scan | Fast security check on code snippet |
| Full Scan | Comprehensive SAST using p/ci ruleset |
| Custom Rules | Scan with user-provided Semgrep rules |
| AST Generation | Abstract Syntax Tree for analysis |
| Ruleset Support | Pre-built rulesets (OWASP, CWE, etc.) |
| Language Coverage | Python, JS/TS, Java, Go, C#, Rust, PHP, etc. |

**Setup**:

```bash
# Via uvx (recommended)
uvx semgrep-mcp

# Or pip
pip install semgrep-mcp
```

**Claude Code Configuration**:

```bash
claude mcp add semgrep -- uvx semgrep-mcp
```

**Cursor Configuration** (`~/.cursor/mcp.json`):

```json
{
  "mcpServers": {
    "semgrep": {
      "command": "uvx",
      "args": ["semgrep-mcp"],
      "env": {
        "SEMGREP_APP_TOKEN": "your_token"
      }
    }
  }
}
```

**Example Usage**:

```
User: "Scan this Python code for SQL injection vulnerabilities"

Code:
  def search(query):
      return db.execute(f"SELECT * FROM users WHERE name = '{query}'")

Claude: [Uses security_check tool]

Result: [VULNERABLE] SQL injection detected at line 2.
  Fix: Use parameterized queries:
  return db.execute("SELECT * FROM users WHERE name = ?", [query])
```

| Dimension | Score | Notes |
|-----------|-------|-------|
| Maintenance | 10/10 | Official, frequent releases |
| Documentation | 9/10 | Comprehensive docs, examples |
| Tests | 10/10 | Extensive test coverage |
| Performance | 7/10 | Good, complexity-dependent (~500ms per scan) |
| Adoption | 9/10 | Enterprise standard (5000+ companies) |

**Alternatives**:

| Server | Advantage | Disadvantage |
|--------|-----------|--------------|
| **Semgrep** | Comprehensive SAST, custom rules | Slower on large codebases |
| GitGuardian | Secrets-focused, fast | Limited SAST coverage |
| SonarQube | Enterprise, detailed reports | Heavier, more setup |

**Resources**:
- **GitHub**: https://github.com/semgrep/mcp
- **Official README**: https://github.com/semgrep/mcp#readme
- **Rules Registry**: https://semgrep.dev/r
- **Pricing**: https://semgrep.dev/pricing (free tier for MCP)

---

### Code Search & Analysis

#### Grepai MCP

**Community server** for semantic code search and call graph analysis via local Ollama embeddings. Searches code by intent ("payment flow", "auth logic") instead of exact patterns, and traces function call relationships.

**Repository**: [yoanbernabeu/grepai](https://github.com/yoanbernabeu/grepai)
**License**: MIT
**Status**: Active development
**Privacy**: Fully local (Ollama + nomic-embed-text), no data leaves your machine

**Use Case**: Developer needs to understand unfamiliar codebase → grepai finds relevant code by natural language description and maps function dependencies, without reading entire files.

**Key Features**:

| Capability | Details |
|------------|---------|
| `grepai_search` | Semantic search by natural language query (e.g., "error handling middleware") |
| `grepai_trace_callers` | Find all functions that call a given symbol |
| `grepai_trace_callees` | Find all functions called by a given symbol |
| `grepai_trace_graph` | Full call graph (callers + callees) with configurable depth |
| `grepai_index_status` | Health check: indexed files, chunks, configuration |

**Token Efficiency**:

| Workflow | Tokens | Verdict |
|----------|--------|---------|
| Grep + Read files (brute force) | ~15K | Noisy, lots of irrelevant context |
| grepai search + trace | ~4K | Targeted, relevant results only |
| grepai alone (no follow-up) | ~2-3K | Fast discovery |

**Setup**:

```bash
# Install grepai
curl -sSL https://raw.githubusercontent.com/yoanbernabeu/grepai/main/install.sh | sh

# Install Ollama + embedding model
brew install ollama
ollama pull nomic-embed-text

# Initialize in your project
cd /path/to/project
grepai init  # Choose: ollama, nomic-embed-text, gob

# Index your codebase
grepai index

# Optional: watch for file changes (auto-reindex)
grepai watch
```

**Claude Code Configuration**:

```bash
claude mcp add grepai -- grepai mcp
```

**`.mcp.json` (project-scoped)**:

```json
{
  "mcpServers": {
    "grepai": {
      "command": "grepai",
      "args": ["mcp"]
    }
  }
}
```

**Example Usage**:

```
User: "Find the authentication flow in this codebase"

Claude: [Uses grepai_search query="authentication flow" limit=5]

Result: 3 relevant files with line numbers and similarity scores
  - src/auth/middleware.ts:12-45 (0.89)
  - src/routes/login.ts:8-32 (0.85)
  - src/utils/jwt.ts:1-28 (0.78)

User: "What calls the validateToken function?"

Claude: [Uses grepai_trace_callers symbol="validateToken"]

Result: Call graph showing 4 callers across 3 files
  - authMiddleware → validateToken
  - refreshHandler → validateToken
  - wsAuthGuard → validateToken
  - testHelper → validateToken
```

| Dimension | Score | Notes |
|-----------|-------|-------|
| Maintenance | 8/10 | Active development, responsive maintainer |
| Documentation | 7/10 | Good README, MCP integration docs |
| Tests | 7/10 | CI present, growing coverage |
| Performance | 8/10 | Fast local embeddings (~2s search), no network latency |
| Adoption | 9/10 | Growing community, production use in Claude Code setups |

**Limitations & Workarounds**:

| Limitation | Workaround |
|------------|-----------|
| Requires Ollama running locally | `brew services start ollama` (auto-start) |
| Index can become stale | Use `grepai watch` for auto-reindex |
| Not ideal for exact pattern matching | Use native Grep tool for regex patterns |
| Embedding model download (~270MB) | One-time `ollama pull nomic-embed-text` |

**Alternatives**:

| Server | Advantage | Disadvantage |
|--------|-----------|--------------|
| **Grepai** | Local, private, semantic + call graphs | Requires Ollama setup |
| **Semble** | No Ollama required, code + docs + config scope | No call graph analysis |
| Native Grep | Instant, exact patterns | No semantic understanding |
| GitHub Code Search | Cloud-based, cross-repo | Requires GitHub, no call graphs |

**Cross-reference**: See [ultimate-guide.md, MCP Servers: Grepai](/lib/09-harness/claude-code-ultimate-guide/guide-ultimate-guide/index) for detailed usage patterns, prompt strategies, and integration with other MCP servers.

**Resources**:
- **GitHub**: https://github.com/yoanbernabeu/grepai
- **Ollama**: https://ollama.com
- **Embedding Model**: nomic-embed-text (nomic-ai)

---

#### Semble

**Community server** for semantic code search across code, documentation, and configuration files. Uses Model2Vec embeddings with BM25 ranking and RRF fusion, running CPU-only with no external service dependency.

**Repository**: [MinishLab/semble](https://github.com/MinishLab/semble)
**License**: MIT
**Status**: Active (v0.3.3, June 2026), ~5,718 stars (2026-07-27, was ~5,000)
**Privacy**: Fully local (Model2Vec CPU-only), no data leaves your machine

**Use Case**: Developer wants semantic code search without running Ollama locally. Semble builds a local index (Model2Vec + BM25 + RRF) on first run and caches it. Searches code, documentation, and configuration files by natural language query.

**Key Features**:

| Capability | Details |
|------------|---------|
| Semantic search | Natural language queries across code, docs, and config files |
| MCP server | Native integration (`semble mcp`), no CLI wrapper needed |
| No external service | Model2Vec runs CPU-only; no Ollama, no API key required |
| Index | Built on first run, cached automatically (each new directory requires a build) |

**Token Efficiency**:

| Workflow | Tokens | Verdict |
|----------|--------|---------|
| Grep + Read files (brute force) | ~15K | Noisy, lots of irrelevant context |
| Semble search (code + docs + config) | ~2-4K | Targeted results, broader scope than code-only |

**Setup**:

```bash
pip install semble

# Start the MCP server
semble mcp
```

**Claude Code Configuration**:

```bash
claude mcp add semble -- semble mcp
```

**Comparison with Grepai**:

| Aspect | Grepai | Semble |
|--------|--------|--------|
| External service | Yes (Ollama + nomic-embed-text) | No (CPU-only Model2Vec) |
| MCP integration | CLI wraps to MCP | Native MCP server |
| Search scope | Code only | Code + documentation + configuration |
| Call graph analysis | Yes (trace_callers, trace_callees, trace_graph) | No |
| Community traction | Active maintainer | ~5,718 GitHub stars (2026-07-27) |

**When to choose Semble over Grepai**: You want semantic code search but do not run Ollama locally. Semble's broader scope also helps in monorepos where navigating configuration and documentation matters as much as navigating code. Choose Grepai when call graph analysis is essential; Semble does not offer this capability.

> **Note on "index-free" claims**: Some community posts describe Semble as not requiring an index. This is incorrect. Semble builds a local index on first run and caches it. Each new directory requires a separate index build.

**Quality Score**: **7.2/10** (scope: narrow evaluation, pending wider community signal)

**Resources**:
- **GitHub**: https://github.com/MinishLab/semble
- **PyPI**: `pip install semble`
- **Evaluation**: [docs/resource-evaluations/semble-code-search.md](/lib/09-harness/claude-code-ultimate-guide/docs-resource-evaluations-semble-code-search)

---

### Documentation & Knowledge

#### Context7 MCP

**Official Upstash server** for real-time library documentation (LangChain, Anthropic SDK, etc.). Eliminates API hallucination.

**Use Case**: Claude Code needs to use a library API → Context7 provides up-to-date docs + examples.

**Key Features**:

| Capability | Details |
|------------|---------|
| Library Search | Find docs for 500+ libraries |
| Code Examples | Language-specific examples (Python, TS, etc.) |
| API Reference | Detailed function signatures, parameters |
| Version Filtering | Docs for specific library versions |
| Smart Ranking | AI-ranked by relevance + project usage |

**Setup**:

```bash
# Local
npx -y @upstash/context7-mcp --api-key YOUR_API_KEY
```

**Claude Code Configuration (local)**:

```bash
claude mcp add context7 -- npx -y @upstash/context7-mcp --api-key YOUR_API_KEY
```

**Claude Code Configuration (remote/HTTP)**:

```bash
claude mcp add --transport http --header "CONTEXT7_API_KEY: YOUR_API_KEY" \
  context7 https://mcp.context7.com/mcp
```

**Example Usage**:

```
User: "Show me how to use Claude's streaming API with the Python SDK"

Claude: [Uses context7 search]

Result: Official Python SDK docs + example code for streaming
```

**Limitations**:

| Limitation | Workaround |
|------------|-----------|
| Limited library coverage | Fallback to web search for obscure libs |
| Version lag (1-2 days) | Use official repo for cutting-edge |
| Hallucination risk (low but exists) | Cross-verify with official docs |

**Alternatives**:

| Server | Advantage | Disadvantage |
|--------|-----------|--------------|
| **Context7** | Real-time, version-specific | API key required |
| Web Search | Comprehensive, free | Slow, hallucination risk |
| Static RAG | Fast, local | Outdated, no versions |

**Resources**:
- **GitHub**: https://github.com/upstash/context7
- **Official Site**: https://context7.com
- **LobeHub Registry**: https://lobehub.com/mcp/upstash-context7

**ctx7 CLI companion**: Context7 also ships a CLI (`npx ctx7`) that handles skill discovery and MCP setup from the terminal. `ctx7 skills suggest` auto-detects project dependencies and recommends matching skills; `ctx7 setup --claude` runs a wizard that configures MCP or CLI+Skills mode automatically. See §5.5 of the ultimate guide for the full workflow.

---

### Project Management

#### Linear MCP

**Community server** for Linear (project management SaaS). GraphQL API with issue management, projects, teams, comments.

**Use Case**: Claude Code automatically creates tickets, updates status, links issues in Linear (closes loop between development and project management).

**Key Features**:

| Capability | Details |
|------------|---------|
| Issue Management | List, get, create, update, delete, search |
| Projects | List, create, update, assign |
| Teams & Users | Team management, member assignment |
| Comments | Add, list, with position tracking |
| Cycles | Sprint/cycle management |
| Webhooks | Subscribe to Linear events (optional) |

**Setup**:

```bash
# NPM or uvx
npm install mcp-linear
# or
uvx mcp-linear
```

**Claude Code Configuration**:

```bash
claude mcp add linear -- npx -y mcp-linear --api-key YOUR_LINEAR_API_KEY
```

**Example Usage**:

```
User: "Create a bug ticket in Linear for the CSS layout issue I just found"

Claude: [Uses linear.issues.create with team key, title, description]

Result: Ticket created, issue ID returned

User: "Update ticket SOFT-123 status to 'In Progress'"

Claude: [Uses linear.issues.update]

Result: Status changed
```

**Note**: Community-maintained (not Linear Inc.), but active and well-documented.

**Limitations**:

| Limitation | Workaround |
|------------|-----------|
| Timeout issues (fixed after 1h) | Implement heartbeat, firewall checks |
| 65KB field limit | Auto-chunking for comments |
| GraphQL complexity | Split complex queries automatically |

**Alternatives**:

| Server | Advantage | Disadvantage |
|--------|-----------|--------------|
| **Linear MCP** | Modern GraphQL, startup-friendly | Community-maintained |
| Jira MCP | Enterprise, complex workflows | Heavier, older API |
| GitHub Issues | Built-in, free | Limited project management |

**Resources**:
- **GitHub**: https://github.com/tacticlaunch/mcp-linear
- **Linear API**: https://developers.linear.app
- **Docs**: https://jan.ai/docs/desktop/mcp-examples/productivity/linear

---

### Customer Support & CRM

**A note on "official" for this category.** The `modelcontextprotocol/servers` GitHub repo is not a discovery registry: its README explicitly defers to the official MCP Registry (`registry.modelcontextprotocol.io`) for finding published servers, and only carries a handful of steering-group reference implementations that it labels "not production-ready." The official registry itself does list several self-published HubSpot and Zendesk servers (queryable at `/v0/servers?search=<name>`), but registry presence only means a maintainer submitted an entry, not that HubSpot or Zendesk vetted or endorses it. Neither company publishes its own server. The servers below were picked by star count and commit recency on GitHub instead, a stronger signal than registry presence alone at the time of evaluation.

#### HubSpot MCP

**Community servers** exposing the HubSpot API (contacts, companies, deals, engagements) to Claude Code.

**Use Case**: A support or CSM agent reads live account data (plan, ticket history, deal stage) without the human switching tabs, or drafts a reply informed by the client's actual CRM record. See [support-csm-agent.md](/lib/09-harness/claude-code-ultimate-guide/guide-workflows-support-csm-agent) for the full pattern this connects to.

Two servers stand out from the community field:

| Server | Coverage | Notes |
|--------|----------|-------|
| **shinzo-labs/hubspot-mcp** | Contacts, companies, leads, deals, products, engagements, batch operations, associations (read/write) | Broadest object coverage, tagged releases (v2.0.5+) |
| **baryhuang/mcp-hubspot** | Contacts, companies (read/write), conversation retrieval, semantic search over cached data | Highest star count of the field; formerly published as `peakmojo/mcp-hubspot` |

**Setup** (shinzo-labs/hubspot-mcp):

```bash
claude mcp add hubspot -- npx -y @shinzo-labs/hubspot-mcp --api-key YOUR_HUBSPOT_PRIVATE_APP_TOKEN
```

**Note**: Community-maintained, single-maintainer projects. Scope the private app token to read-only where the use case allows it (see [support-csm-agent.md](/lib/09-harness/claude-code-ultimate-guide/guide-workflows-support-csm-agent#security--guardrails) for the least-privilege rationale). Several smaller HubSpot MCP servers exist beyond these two (LokiMCPUniverse, bajwa61, v4lheru); they were evaluated and skipped for low star counts and stale commits (11+ months).

**Resources**:
- **GitHub**: https://github.com/shinzo-labs/hubspot-mcp
- **GitHub (alt)**: https://github.com/baryhuang/mcp-hubspot
- **HubSpot API Docs**: https://developers.hubspot.com/docs/api/overview

---

#### Zendesk MCP

**Community server** for Zendesk (tickets, comments, Help Center articles).

**Use Case**: A support agent checks ticket status or pulls a client's ticket history without leaving the agent context, same pattern as the Linear MCP use case above but for a helpdesk instead of an issue tracker.

**Setup**:

```bash
claude mcp add zendesk -- npx -y zendesk-mcp-server --subdomain YOUR_SUBDOMAIN --email YOUR_EMAIL --token YOUR_API_TOKEN
```

**Note**: Community-maintained (`reminia/zendesk-mcp-server`), most recently updated of the Zendesk community options at evaluation time. A handful of smaller alternatives exist (mattcoatsworth, michaelrice, wlaubernds); this is the one with the healthiest activity level.

**Resources**:
- **GitHub**: https://github.com/reminia/zendesk-mcp-server
- **Zendesk API Docs**: https://developer.zendesk.com/api-reference/

---

### Orchestration

#### MCP-Compose

**Community tool** for managing multiple MCP servers Docker Compose-style. Declarative YAML configuration, multi-transport support (STDIO/HTTP/SSE).

**Use Case**: Developer needs 5+ MCP servers; Docker Compose-like config simplifies lifecycle management.

**Key Features**:

| Capability | Details |
|------------|---------|
| YAML Configuration | Docker Compose-style server definitions |
| Multi-Transport | STDIO, HTTP, SSE, TCP support |
| Container Runtimes | Docker, Podman, native processes |
| Network Management | Automatic Docker network creation |
| Health Monitoring | Connection pooling, session management |
| HTTP Proxy | Single unified HTTP endpoint |
| Hot Reload | Update config without restart |

**Setup**:

```bash
git clone https://github.com/phildougherty/mcp-compose
cd mcp-compose
cargo build --release
```

**Configuration** (`mcp-compose.yaml`):

```yaml
version: "1.0"
mcpServers:
  filesystem:
    command: npx
    args:
      - "@modelcontextprotocol/server-filesystem"
      - "/tmp"
    transport: stdio

  memory:
    command: npx
    args:
      - "@modelcontextprotocol/server-memory"
    transport: stdio
    env:
      DEBUG: "true"

  postgres:
    image: postgres:15
    transport: tcp
    port: 5432
    env:
      POSTGRES_PASSWORD: secret

proxy:
  port: 3000
  listen: "127.0.0.1"
```

**Generate Claude Desktop Config**:

```bash
./mcp-compose create-config --type claude --output ~/.claude.json
```

**Start Servers**:

```bash
./mcp-compose up
# Single unified HTTP proxy at http://localhost:3000
```

**Limitations**:

| Limitation | Workaround |
|------------|-----------|
| Cargo build required | Use pre-built binary (if available) |
| YAML learning curve | Provide templates for common setups |
| Debug complexity | Use mcp-compose logs for troubleshooting |

**Resources**:
- **GitHub**: https://github.com/phildougherty/mcp-compose
- **Docker Compose Docs**: https://docs.docker.com/compose/
- **MCP Protocol Spec**: https://modelcontextprotocol.io

---

#### Packmind

**Community tool** for distributing engineering standards as AI context across multiple agents and repositories. Exposes an MCP server for creating and managing playbook standards directly from Claude Code (or any MCP-capable agent).

**Use Case**: Engineering team maintains one playbook; Packmind MCP server lets Claude Code propose new standards or update existing ones during a session without leaving the editor.

**Key Features**:

| Capability | Details |
|------------|---------|
| Standards Creation | Create/update playbook entries via MCP tools |
| Multi-Agent Output | Generates CLAUDE.md, .cursor/rules, Copilot instructions from one source |
| Knowledge Ingestion | Pull context from GitHub, Slack, Jira, GitLab, Confluence, Notion via their MCP servers |
| Self-hosted | Docker/Kubernetes, Apache-2.0 CLI |

**Resources**:
- **GitHub**: https://github.com/PackmindHub/packmind
- **Demo use cases**: https://github.com/PackmindHub/demo-use-case-skills

> **Cross-ref**: Full tool evaluation in [third-party-tools.md, Engineering Standards Distribution](/lib/09-harness/claude-code-ultimate-guide/guide-ecosystem-third-party-tools/index#engineering-standards-distribution).
