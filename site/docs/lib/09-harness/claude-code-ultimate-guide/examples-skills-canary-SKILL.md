---
title: "Canary: Post-Deploy Monitoring"
sourceId: "09-harness/claude-code-ultimate-guide"
sourceTitle: "Claude Code Ultimate Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide"
entryUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/skills/canary/SKILL.md"
sourceRel: "examples/skills/canary/SKILL.md"
rawUrl: "/raw/09-harness/claude-code-ultimate-guide/examples/skills/canary/SKILL.md"
sourceSha256: "8a4fdfdd08187b555de1456a24f3af2e33a228a01be2c83302a6ca3029785edf"
pageSha256: "8a4fdfdd08187b555de1456a24f3af2e33a228a01be2c83302a6ca3029785edf"
contentMode: "local-full"
zh: ""
---

# Canary: Post-Deploy Monitoring

Watch a live application after deployment. Alert on errors and regressions. Compare against a pre-deploy baseline.

**Two modes:**
- `--baseline`: capture the current state BEFORE deploying
- *(default)*: monitor AFTER deploying and compare against baseline

## Instructions

### Phase 1: Setup

Parse the user's arguments and detect the deployment context.

```bash
# Detect current branch and recent deploy commit
git branch --show-current
git log --oneline -5

# Auto-detect platform from config files
[ -f fly.toml ]         && echo "PLATFORM: fly"
[ -f render.yaml ]      && echo "PLATFORM: render"
[ -f vercel.json ]      && echo "PLATFORM: vercel"
[ -f netlify.toml ]     && echo "PLATFORM: netlify"
[ -f Procfile ]         && echo "PLATFORM: heroku"
[ -f railway.toml ]     && echo "PLATFORM: railway"

# Check for health endpoint
curl -sf "${URL}/health" -w "\n%{http_code}" 2>/dev/null | tail -1
curl -sf "${URL}/api/health" -w "\n%{http_code}" 2>/dev/null | tail -1
```

Create the working directory:

```bash
mkdir -p .canary/baselines .canary/reports .canary/screenshots
```

---

### Phase 2: Baseline Capture (`--baseline` mode)

Run this BEFORE deploying to capture the current healthy state.

For each page to monitor, record:

1. **HTTP status**: is the page returning 200?
2. **Response time**: how long does it take to load?
3. **Content snapshot**: key text content to detect blank pages later

```bash
# For each page URL
for PAGE_PATH in "/" "/dashboard" "/settings" "/api/health"; do
  SLUG=$(echo "$PAGE_PATH" | tr '/' '_' | tr -d '?&=')
  RESULT=$(curl -sf -o /dev/null -w "%{http_code}|%{time_total}" "${BASE_URL}${PAGE_PATH}" 2>/dev/null)
  STATUS=$(echo "$RESULT" | cut -d'|' -f1)
  TIME_MS=$(echo "$RESULT" | awk -F'|' '{printf "%.0f", $2 * 1000}')
  echo "  ${PAGE_PATH}: HTTP ${STATUS}, ${TIME_MS}ms"
done
```

Save baseline to `.canary/baselines/baseline.json`:

```json
{
