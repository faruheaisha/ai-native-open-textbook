---
title: "Land and Deploy"
sourceId: "09-harness/claude-code-ultimate-guide"
sourceTitle: "Claude Code Ultimate Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide"
entryUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/skills/land-and-deploy/SKILL.md"
sourceRel: "examples/skills/land-and-deploy/SKILL.md"
rawUrl: "/raw/09-harness/claude-code-ultimate-guide/examples/skills/land-and-deploy/SKILL.md"
sourceSha256: "7f74b3d3b2c859317cc1e8b31dcf9fdd90d3b88ca525f4d3facd7f006947ed72"
pageSha256: "7f74b3d3b2c859317cc1e8b31dcf9fdd90d3b88ca525f4d3facd7f006947ed72"
contentMode: "local-full"
zh: ""
---

# Land and Deploy

Complete landing pipeline: merge the PR, wait for CI, verify the deployment, run a health check.

Picks up where `/ship` left off. `/ship` creates the PR. This command merges it and verifies production.

**Non-interactive by default.** The user said "land it", so land it. Stop only for the critical readiness gate and hard blockers.

## Instructions

### Step 1: Pre-flight

```bash
# Verify GitHub CLI is authenticated
gh auth status

# Detect PR from current branch (or use argument if provided)
gh pr view --json number,state,title,url,mergeStateStatus,mergeable,baseRefName,headRefName
```

**Stop conditions:**
- GitHub CLI not authenticated → "Run `gh auth login` first"
- No PR exists → "No PR found for this branch. Run `/ship` first."
- PR already merged → "PR is already merged."
- PR is closed → "PR is closed. Reopen it first."

---

### Step 2: CI Status Check

```bash
# Check current CI status
gh pr checks --json name,state,status,conclusion

# Check for merge conflicts
gh pr view --json mergeable -q .mergeable
```

**Stop conditions:**
- Required checks FAILING → show failing checks, stop
- `mergeable` is `CONFLICTING` → "PR has merge conflicts. Resolve them and push before landing."
- Required checks PENDING → proceed to Step 3 (wait for CI)
- All checks passing → skip to Step 3.5 (readiness gate)

---

### Step 3: Wait for CI (if pending)

```bash
# Watch CI checks with 15-minute timeout
gh pr checks --watch --fail-fast
```

- CI passes → continue to Step 3.5
- CI fails → stop, show failures
- Timeout (15 min) → "CI has been running for 15 minutes. Investigate manually."

Record CI wait duration for the deploy report.

---

### Step 3.5: Pre-Merge Readiness Gate

**This is the one critical confirmation before an irreversible merge.** Collect all evidence, then get explicit approval.

#### Review staleness check

```bash
# How many commits since the last review in this branch?
git log --oneline $(git merge-base HEAD origin/main)..HEAD | wc -l

# What changed after any review was done?
git log --oneline -10
```

Staleness thresholds:
- 0–3 commits since review → CURRENT (green)
- 4+ commits, touching code → STALE (yellow, review may not reflect current code)
- No review found → NOT RUN (yellow)

#### Test results

```bash
# Run tests now (fast tests only)
npm test 2>/dev/null || pnpm test 2>/dev/null || \
  pytest --tb=short -q 2>/dev/null || \
  go test ./... 2>/dev/null

# Check exit code
echo "Tests exit code: $?"
```

Failing tests = BLOCKER. Cannot merge with failing tests.

#### Documentation check

```bash
# Were CHANGELOG and docs updated on this branch?
git diff --name-only $(git merge-base HEAD origin/main)...HEAD -- \
  README.md CHANGELOG.md ARCHITECTURE.md CONTRIBUTING.md CLAUDE.md VERSION
```

If CHANGELOG.md and VERSION were NOT modified and the diff includes new features → WARNING.

#### Readiness report

Present a summary and ask for explicit confirmation:

```
╔══════════════════════════════════════════════════════════╗
║              PRE-MERGE READINESS REPORT                  ║
╠══════════════════════════════════════════════════════════╣
║  PR: #NNN: [title]                                       ║
║  Branch: feature-branch → main                           ║
║                                                          ║
║  REVIEWS                                                 ║
║    Review:     CURRENT / STALE (N commits) / NOT RUN     ║
║                                                          ║
║  TESTS                                                   ║
║    Fast tests: PASS / FAIL (blocker)                     ║
║                                                          ║
║  DOCUMENTATION                                           ║
║    CHANGELOG:  Updated / NOT UPDATED (warning)           ║
║    VERSION:    Bumped / NOT BUMPED (warning)             ║
║                                                          ║
║  WARNINGS: N  |  BLOCKERS: N                             ║
╚══════════════════════════════════════════════════════════╝

Options:
  A) Merge (all checks green)
  B) Don't merge yet, address warnings first
  C) Merge anyway (I understand the risks)
```

If the user chooses B, list exactly what needs to be done and stop.

---

### Step 4: Merge the PR

```bash
# Merge (auto-detect method from repo settings, delete branch after)
gh pr merge --auto --delete-branch

# Fallback if auto-merge is not enabled
# gh pr merge --squash --delete-branch
```

Record the merge commit SHA and timestamp.

If merge fails with permission error → "You don't have merge permissions. Ask a maintainer to merge."

If merge queue is active, poll until merged:

```bash
# Poll every 30 seconds, timeout after 30 minutes
gh pr view --json state -q .state
```

---

### Step 5: Platform Detection

Detect how this project deploys so we know what to verify.

```bash
# Detect platform from config files
[ -f fly.toml ]         && echo "PLATFORM: fly"
[ -f render.yaml ]      && echo "PLATFORM: render"
[ -f vercel.json ] || [ -d .vercel ] && echo "PLATFORM: vercel"
[ -f netlify.toml ]     && echo "PLATFORM: netlify"
[ -f Procfile ]         && echo "PLATFORM: heroku"
[ -f railway.toml ]     && echo "PLATFORM: railway"

# Detect GitHub Actions deploy workflows
for f in .github/workflows/*.yml .github/workflows/*.yaml; do
  [ -f "$f" ] && grep -qiE "deploy|release|production|cd" "$f" 2>/dev/null && echo "DEPLOY_WORKFLOW: $f"
done

# Classify diff scope (frontend / backend / docs / config)
git diff --name-only $(git merge-base HEAD~1 origin/main)...HEAD | \
  awk '{
    if (/\.(css|scss|tsx|jsx|html|svg)$/ || /components|pages|public\//) f=1;
    if (/api\/|server\/|backend\/|\.(go|py|rb|java)$/) b=1;
    if (/README|CHANGELOG|docs\/|\.(md)$/) d=1;
    if (/\.env|config\/|\.toml$|\.yaml$/) c=1;
  } END {
    if (f) print "SCOPE_FRONTEND=true";
    if (b) print "SCOPE_BACKEND=true";
    if (d) print "SCOPE_DOCS=true";
    if (c) print "SCOPE_CONFIG=true";
  }'
```

**Decision tree:**
- Docs-only diff → skip deploy verification, go to Step 8
- No deploy workflow + no URL provided → ask user if this project has a web deploy
- Otherwise → proceed to Step 6

---

### Step 6: Wait for Deploy

**GitHub Actions deploy workflow:**

```bash
# Find the run triggered by the merge commit
gh run list --branch main --limit 10 --json databaseId,headSha,status,conclusion,workflowName

# Poll until complete (30s interval, 20 min timeout)
