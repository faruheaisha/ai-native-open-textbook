---
title: "Troubleshooting Guide"
sourceId: "09-harness/ecc"
sourceTitle: "ECC —— Harness 性能优化系统"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/affaan-m/ECC"
entryUrl: "https://github.com/affaan-m/ECC/blob/928c1dea72f5c330442fc1f595563398b8f389f7/TROUBLESHOOTING.md"
sourceRel: "TROUBLESHOOTING.md"
rawUrl: "/raw/09-harness/ecc/TROUBLESHOOTING.md"
sourceSha256: "2f6f3e411e457a9053c7ebfafdea0d0ff5a5d9b1f4df1c20326223e1d90d6d68"
pageSha256: "2f6f3e411e457a9053c7ebfafdea0d0ff5a5d9b1f4df1c20326223e1d90d6d68"
contentMode: "local-full"
zh: ""
---

# Troubleshooting Guide

Common issues and solutions for Everything Claude Code (ECC) plugin.

## Table of Contents

- [Memory & Context Issues](#memory--context-issues)
- [Agent Harness Failures](#agent-harness-failures)
- [Hook & Workflow Errors](#hook--workflow-errors)
- [Installation & Setup](#installation--setup)
- [Performance Issues](#performance-issues)
- [Common Error Messages](#common-error-messages)
- [Getting Help](#getting-help)

---

## Memory & Context Issues

### Context Window Overflow

**Symptom:** "Context too long" errors or incomplete responses

**Causes:**
- Large file uploads exceeding token limits
- Accumulated conversation history
- Multiple large tool outputs in single session

**Solutions:**
```bash
# 1. Clear conversation history and start fresh
# Use Claude Code: "New Chat" or Cmd/Ctrl+Shift+N

# 2. Reduce file size before analysis
head -n 100 large-file.log > sample.log

# 3. Use streaming for large outputs
head -n 50 large-file.txt

# 4. Split tasks into smaller chunks
# Instead of: "Analyze all 50 files"
# Use: "Analyze files in src/components/ directory"
```

### Memory Persistence Failures

**Symptom:** Agent doesn't remember previous context or observations

**Causes:**
- Disabled continuous-learning hooks
- Corrupted observation files
- Project detection failures

**Solutions:**
```bash
# Check if observations are being recorded
ls ~/.claude/homunculus/projects/*/observations.jsonl

# Find the current project's hash id
python3 - <<'PY'
import json, os
registry_path = os.path.expanduser("~/.claude/homunculus/projects.json")
with open(registry_path) as f:
    registry = json.load(f)
for project_id, meta in registry.items():
    if meta.get("root") == os.getcwd():
        print(project_id)
        break
else:
    raise SystemExit("Project hash not found in ~/.claude/homunculus/projects.json")
PY

# View recent observations for that project
