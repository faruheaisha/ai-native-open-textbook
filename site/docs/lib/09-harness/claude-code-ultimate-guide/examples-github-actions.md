---
title: "GitHub Actions Workflows for Claude Code"
sourceId: "09-harness/claude-code-ultimate-guide"
sourceTitle: "Claude Code Ultimate Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide"
entryUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/github-actions/README.md"
sourceRel: "examples/github-actions/README.md"
rawUrl: "/raw/09-harness/claude-code-ultimate-guide/examples/github-actions/README.md"
sourceSha256: "bf4affdfd5f47b4502d7ea7b45c5e6c374eebd08da8d5d07c920d756809ab38f"
pageSha256: "bf4affdfd5f47b4502d7ea7b45c5e6c374eebd08da8d5d07c920d756809ab38f"
contentMode: "local-full"
zh: ""
---

# GitHub Actions Workflows for Claude Code

Ready-to-use GitHub Actions workflows that integrate Claude Code into your CI/CD pipeline.

## Prerequisites

1. **Install the Claude GitHub App** on your org/repo (required for Actions to comment on PRs/issues)
2. **Add API Key Secret**: In your repo, go to Settings → Secrets and variables → Actions → New repository secret
   - Name: `ANTHROPIC_API_KEY`
   - Value: Your Anthropic API key from [console.anthropic.com](https://console.anthropic.com)
3. **Copy Workflows**: Place these `.yml` files in `.github/workflows/` directory
4. **Test**: Open a test PR or issue to see them run

## Available Workflows

Externalized prompt, anti-hallucination protocol, and `/claude-review` on-demand trigger.

The review logic lives in `.github/prompts/code-review.md`, so you can iterate on criteria without touching the workflow YAML. The prompt enforces a verification step before every finding: Claude must confirm an issue with `Read`/`Grep` before reporting it.

**Features:**
- Triggers on PR open/sync/ready **and** `/claude-review` comment
- Externalized prompt: edit `code-review.md` to tune criteria for your stack
- Anti-hallucination protocol: no invented line numbers or unverified claims
- Structured output: `🔴 MUST FIX` / `🟡 SHOULD FIX` / `🟢 CAN SKIP` table + inline comments
- Read-only `allowed_tools` (no write access to repo)
- OAuth token support (no API key needed if Claude GitHub App is installed)

**Setup:**
```bash
# Copy both files into your repo
cp examples/github-actions/claude-code-review.yml .github/workflows/
mkdir -p .github/prompts
cp examples/github-actions/prompts/code-review.md .github/prompts/

# Add secret: CLAUDE_CODE_OAUTH_TOKEN (or ANTHROPIC_API_KEY)
# Install Claude GitHub App: https://github.com/apps/claude
```

**Customization:**
Edit `.github/prompts/code-review.md` to add your stack conventions:
```markdown
## Stack Context
- TypeScript strict mode, no `any`
- React Server Components, no `useEffect` for data fetching
- All DB writes must go through the repository layer
- New API routes require integration tests
```

**Blocking merge on findings:**
The `gate` job in this workflow reads the posted review, parses the `### 🔴 Must Fix (n)` count from the summary, and fails the job if `n > 0`. Add `gate` to your branch protection's required status checks to turn advisory findings into an actual merge block. Without that branch protection rule, the review still posts but nothing stops a maintainer from merging past it.

---

### 2. Code Review (Batched, `claude-code-review-batched.yml`)

For PRs above a file-count threshold (default 75), a single review pass either times out or spreads Claude's attention too thin across unrelated files. This workflow splits the diff into domain-scoped batches (migrations, backend-core, api-routes, frontend, tests-and-tooling), reviews each batch in a parallel matrix job, then synthesizes one final severity table.

**Features:**
- `check-size` job counts changed files and gates the rest of the workflow on the threshold
- Matrix `review-batch` job: one parallel run per domain, scoped via `append_system_prompt`
- `synthesis` job merges all batch comments into a single deduplicated table
- Same prompt file as the non-batched workflow (`.github/prompts/code-review.md`), no duplicated review criteria to maintain

**Setup:**
```bash
cp examples/github-actions/claude-code-review-batched.yml .github/workflows/

# Edit the `matrix.domain` globs to match your actual directory layout.
# The shipped ones (prisma/migrations, src/server/services, src/components...)
# are a generic starting point, not a fit for every stack.
```

Run this alongside `claude-code-review.yml`, not instead of it. Both trigger on the same PR events; the `check-size` job's threshold is what decides which one actually reviews, so keep `BATCH_THRESHOLD` consistent if you gate on file count elsewhere too.

---

### 3. Auto PR Review (`claude-pr-auto-review.yml`)

**Enhanced version** with comprehensive review criteria and smart filtering.

Creates a structured review with inline comments as soon as a PR opens or updates.

**Features:**
- Automatic code review on PR open/update
- 8 focus areas: Correctness, Security, Performance, Readability, Maintainability, Testing, Best Practices, Breaking Changes
- Priority-based feedback: 🔴 Critical, 🟡 Important, 🟢 Suggestion, 💡 Tip
- Smart file filtering (skips build artifacts, lock files)
- Skips draft PRs to save costs
- Summary review with risk assessment
- Error handling and fallback notifications
- Inline comments on specific lines

**Usage:**
```bash
# Copy the workflow file
cp examples/github-actions/claude-pr-auto-review.yml .github/workflows/

# Open a PR - Claude will automatically review it
```

**Customization:**
Add project-specific context by uncommenting the `append_system_prompt` section:
```yaml
append_system_prompt: |
  Project conventions:
  - Use TypeScript strict mode
  - Follow functional programming patterns
  - All functions must have JSDoc comments
  - Test coverage must be >80%
```

---

### 4. Security Review (`claude-security-review.yml`)

Runs a focused security scan and comments findings directly on the PR.

**Features:**
- Security-focused analysis on every PR
- Identifies potential vulnerabilities
- OWASP Top 10 considerations
- Posts findings as PR comments

**Configuration:**
```yaml
# Optional parameters in the workflow file:
exclude-directories: "docs,examples"    # Skip certain directories
claudecode-timeout: "20"                # Timeout in minutes
claude-model: "claude-3-5-sonnet-20240620"  # Model to use
```

**Usage:**
```bash
# Copy the workflow file
cp examples/github-actions/claude-security-review.yml .github/workflows/

# Every PR will be automatically scanned for security issues
```

---

### 5. Issue Triage (`claude-issue-triage.yml`)

When a new issue opens, Claude proposes labels/severity and posts a tidy triage comment.

**Features:**
- Automatic issue classification
- Label suggestions
- Severity assessment (low, medium, high, critical)
- Duplicate detection
- Markdown triage comment

**Auto-apply Labels (Optional):**
To automatically apply suggested labels, edit the workflow file and change:
```yaml
- name: Apply labels (optional)
  if: ${{ false }}  # Change to true to auto-apply labels
```

**Usage:**
```bash
# Copy the workflow file
cp examples/github-actions/claude-issue-triage.yml .github/workflows/

# Open a new issue - Claude will automatically triage it
```

## Multi-Model Review Setup

Running Claude alongside other automated reviewers (Gemini, Greptile, CodeRabbit) surfaces issues that any single model misses. The pattern: each service reviews independently, then Claude synthesizes the consensus.

**Why multi-model?**
Each model has blind spots. Points raised by 2+ independent reviewers are high-signal; unique catches from each model add coverage you'd otherwise miss.

### Recommended stack ($30/month flat)

| Service | Cost | Strength |
|---------|------|----------|
| **Claude Code Review** (this workflow) | Included in Anthropic plan | Deep reasoning, codebase-aware |
| **Gemini Code Assist** | $0 (included in Google Workspace) | Independent LLM, different training data |
| **Greptile** | ~$30/month flat | Cross-file context, dependency graphs |

**Alternative**: CodeRabbit Pro ($15/dev/month) adds interactive Q&A and sequence diagrams.

### Setup

**Step 1: Install Gemini Code Assist**

1. GitHub Marketplace → search "Gemini Code Assist"
2. Install and authorize on your repo
3. Gemini will automatically review new PRs (posts as `gemini-code-assist[bot]`)
4. Optional config via `.gemini/config.yaml`:
   ```yaml
   code_review:
     comment_severity_threshold: MEDIUM
     max_comments_per_review: 20
   ```

**Step 2: Install Greptile**

1. [greptile.com](https://greptile.com) → connect GitHub account
2. Select your repo, Greptile indexes the codebase (~5 min)
3. Configure in dashboard: target branches, focus paths
4. Reviews post as `greptile[bot]` comments on PRs
5. Copy `.greptile/config.json`, `.greptile/rules.md`, and `.greptile/files.json` from this directory to your repo root and fill in the placeholders. `rules.md` is where Greptile's cross-file RAG search earns its keep: business invariants that span multiple files (a state machine enforced in one service but not another, a scoping rule that must hold on every query against a sensitive table). Don't restate rules already covered by `.github/prompts/code-review.md` or `.coderabbit.yaml`, split the checklist across the three so each tool owns a distinct set.

**Step 3: Enable synthesis job**

In `claude-code-review.yml`, remove `false &&` from the synthesis job condition:

```yaml
# Before (disabled):
if: |
  false &&
  (github.event_name == 'pull_request' ...

# After (enabled):
if: |
  (github.event_name == 'pull_request' ...
```

**Step 4: Configure CodeRabbit (optional)**

Copy `.coderabbit.yaml` from this directory to your repo root. Edit `path_instructions` to match your stack.

### How the synthesis works

The `multi-reviewer-synthesis` job in `claude-code-review.yml`:

1. Waits 5 minutes after the Claude review (external bots post within 2-3 min)
2. Collects all reviews and comments via GitHub API
3. Skips silently if fewer than 2 reviewers have posted
4. Claude identifies consensus (same finding flagged by 2+ reviewers) vs. unique catches
5. Posts a structured synthesis comment on the PR

### Scaling to large PRs and repeated pushes

Two problems show up once a repo has real traffic: PRs that touch dozens of files in one go, and PRs that get pushed to five times before merge. Neither is solved by the base workflow above.

**Large PRs**: switch to `claude-code-review-batched.yml` above a file-count threshold (see workflow 2). Splitting the diff by domain keeps each batch focused instead of asking one pass to hold the whole PR in context.
