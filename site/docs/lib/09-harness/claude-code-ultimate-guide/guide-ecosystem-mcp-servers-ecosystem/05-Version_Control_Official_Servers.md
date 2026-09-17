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
pageSha256: "ad65cc808c79589286bed3b6647db1f3db43cdd255a39e2a9e9b476e078a50a8"
contentMode: "local-full"
zh: ""
---

## Version Control (Official Servers)

These foundational MCP servers provide version control automation for all development workflows. **Official Anthropic servers** with guaranteed stability.

### Git MCP (Anthropic)

**Official Anthropic server** for Git repository interaction via Model Context Protocol. Provides programmatic access to Git operations with structured output and cross-platform safety.

**Repository**: [modelcontextprotocol/servers/git](https://github.com/modelcontextprotocol/servers/tree/main/src/git)
**License**: MIT
**Status**: Early development (API subject to change)
**Stars**: 88,957 (parent repo, verified 2026-07-27, was 77,908+)

**Use Cases**:
- **Automated commit workflows**: AI generates commit messages, stages changes, commits
- **Log analysis**: Filter commits by date, author, branch with structured output
- **Branch management**: Create feature branches, checkout, filter by SHA
- **Token-efficient diffs**: Control context lines for focused code reviews
- **Multi-repo automation**: Manage multiple repositories in monorepo setups

#### Key Features

| Tool | Description | Parameters |
|------|-------------|------------|
| `git_status` | Working tree status (staged, unstaged, untracked) | - |
| `git_log` | Commit history with advanced filtering | `max_count`, `skip`, `start_timestamp`, `end_timestamp`, `author` |
| `git_diff` | Diff between commits/branches | `target`, `source`, `context_lines` |
| `git_diff_unstaged` | Unstaged changes | `context_lines` |
| `git_diff_staged` | Staged changes | `context_lines` |
| `git_commit` | Create commit | `message` |
| `git_add` | Stage files/patterns | `files` |
| `git_reset` | Unstage files | `files` |
| `git_branch` | List/filter branches | `contains`, `not_contains` |
| `git_create_branch` | Create new branch | `name` |
| `git_checkout` | Switch branches/commits | `ref` |
| `git_show` | Show commit details | `revision` |

**Advanced Filtering** (`git_log`):
- **ISO 8601 dates**: `2024-01-15T14:30:25`
- **Relative dates**: `2 weeks ago`, `yesterday`, `last month`
- **Absolute dates**: `2024-01-15`, `Jan 15 2024`
- **Author filtering**: `--author="John Doe"`

#### Setup

**Installation (3 methods)**:

```bash
# Method 1: UV (recommended) - one-liner
uvx mcp-server-git --repository /path/to/repo

# Method 2: pip + Python module
pip install mcp-server-git
python -m mcp_server_git

# Method 3: Docker (sandboxed)
docker run -v /path/to/repo:/repo ghcr.io/modelcontextprotocol/mcp-server-git
```

**Claude Code Configuration** (`~/.claude.json`):

```json
{
  "mcpServers": {
    "git": {
      "command": "uvx",
      "args": ["mcp-server-git", "--repository", "/Users/you/projects/myrepo"]
    }
  }
}
```

**Multi-repo support**:

```json
{
  "mcpServers": {
    "git-main": {
      "command": "uvx",
      "args": ["mcp-server-git", "--repository", "/path/to/main-repo"]
    },
    "git-docs": {
      "command": "uvx",
      "args": ["mcp-server-git", "--repository", "/path/to/docs-repo"]
    }
  }
}
```

#### IDE Integrations

**One-click install buttons available for**:
- **Claude Desktop** (macOS/Windows/Linux)
- **VS Code** (Stable + Insiders)
- **Zed**
- **Zencoder**

See [official README](https://github.com/modelcontextprotocol/servers/tree/main/src/git#quickstart) for integration links.

#### Quality Score

| Criterion | Score | Notes |
|-----------|-------|-------|
| Maintenance | 10/10 | Anthropic-backed, active development |
| Documentation | 9/10 | Comprehensive README, examples, but early dev warnings |
| Tests | 8/10 | Automated CI, improving coverage |
| Performance | 8/10 | Fast (<100ms), structured output reduces tokens |
| Adoption | 8/10 | Official server, 89K+ stars (2026-07-27), wide IDE support |

#### Limitations & Workarounds

| Limitation | Workaround |
|------------|-----------|
| **Early development** (API changes) | Pin version in production, monitor releases |
| **No interactive rebase** (`-i` flag) | Use Bash tool for `git rebase -i` |
| **No reflog support** | Use Bash tool for `git reflog` |
| **No git bisect** | Use Bash tool for `git bisect` |
| **Single repo per instance** | Configure multiple MCP server instances |

#### Decision Matrix: Git MCP vs GitHub MCP vs Bash Tool

**When to use which tool**:

| Operation | Git MCP | GitHub MCP | Bash Tool | Justification |
|-----------|---------|------------|-----------|---------------|
| **Local commits** | ✅ Best | ❌ | ⚠️ OK | Structured output, cross-platform safe |
| **Branch management** | ✅ Best | ❌ | ⚠️ OK | `git_branch` filtering, SHA contains/excludes |
| **Diff/log analysis** | ✅ Best | ❌ | ⚠️ OK | `context_lines` control, token-efficient |
| **Staging files** | ✅ Best | ❌ | ⚠️ OK | Pattern matching (`git_add`), safer |
| **PR creation** | ❌ | ✅ Best | ⚠️ gh CLI | GitHub API, labels, assignees, reviewers |
| **Issue management** | ❌ | ✅ Best | ⚠️ gh CLI | GitHub-specific operations |
| **CI/CD status checks** | ❌ | ✅ Best | ⚠️ gh CLI | GitHub Actions integration |
| **Interactive rebase** | ❌ | ❌ | ✅ Best | Git MCP doesn't support `-i` flag |
| **Reflog recovery** | ❌ | ❌ | ✅ Best | Advanced Git operations |
| **Git bisect debugging** | ❌ | ❌ | ✅ Best | Complex debugging workflows |
| **Multi-tool pipelines** | ✅ | ✅ | ❌ | MCP servers compose with other MCP tools |

**Decision Tree**:

```
Is it a GitHub-specific operation (PRs, Issues, Actions)?
├─ YES → Use GitHub MCP
└─ NO → Is it a core Git operation (commit, branch, diff, log)?
    ├─ YES → Use Git MCP (structured, safe, token-efficient)
    └─ NO → Is it an advanced Git feature (rebase -i, reflog, bisect)?
        ├─ YES → Use Bash tool (flexibility)
        └─ NO → Default to Git MCP (safer, structured)
```

**Workflow Examples**:

| Workflow | Tool Chain | Justification |
|----------|-----------|---------------|
| **Feature development** | Git MCP (`git_create_branch` + `git_commit`) → GitHub MCP (PR) | Atomic, structured, full lifecycle |
| **Commit history analysis** | Git MCP (`git_log` with `start_timestamp: "2 weeks ago"`) | Token-efficient filtering, relative dates |
| **Code review preparation** | Git MCP (`git_diff` with `context_lines: 3`) | Focused context, reduced tokens |
| **Clean up commits (rebase)** | Bash tool (`git rebase -i HEAD~5`) | Interactive mode not in Git MCP |
| **Recover lost commits** | Bash tool (`git reflog`) | Reflog not exposed in Git MCP |
| **Bug hunting with bisect** | Bash tool (`git bisect start/good/bad`) | Bisect workflow not in Git MCP |
| **Automated release flow** | Git MCP (commit + tag) → GitHub MCP (create release) | Full automation, structured |

#### Resources

- **GitHub**: https://github.com/modelcontextprotocol/servers/tree/main/src/git
- **Parent Repo**: https://github.com/modelcontextprotocol/servers (88,957 stars, 2026-07-27)
- **MCP Inspector**: Debug tool support for live testing
- **Docker Hub**: `ghcr.io/modelcontextprotocol/mcp-server-git`
