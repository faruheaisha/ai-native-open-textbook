---
title: "Quick Reference Guide"
sourceId: "10-context-memory/ai-engineering-hub"
sourceTitle: "AI Engineering Hub"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/patchy631/ai-engineering-hub"
entryUrl: "https://github.com/patchy631/ai-engineering-hub/blob/2c9b106168d4540b88e727e4aa316c06c856c2b7/hugging-face-skills/skills/hugging-face-paper-publisher/references/quick_reference.md"
sourceRel: "hugging-face-skills/skills/hugging-face-paper-publisher/references/quick_reference.md"
rawUrl: "/raw/10-context-memory/ai-engineering-hub/hugging-face-skills/skills/hugging-face-paper-publisher/references/quick_reference.md"
sourceSha256: "055eb6523985dc632b26573cfb16903fddd051101cd8e754e2b56d68f0a526fb"
pageSha256: "055eb6523985dc632b26573cfb16903fddd051101cd8e754e2b56d68f0a526fb"
contentMode: "local-full"
zh: ""
---

# Quick Reference Guide

## Essential Commands

### Paper Indexing
```bash
# Index from arXiv
python scripts/paper_manager.py index --arxiv-id "2301.12345"

# Check if exists
python scripts/paper_manager.py check --arxiv-id "2301.12345"
```

### Linking Papers
```bash
# Link to model
python scripts/paper_manager.py link \
  --repo-id "username/model" \
  --repo-type "model" \
  --arxiv-id "2301.12345"

# Link to dataset
python scripts/paper_manager.py link \
  --repo-id "username/dataset" \
  --repo-type "dataset" \
  --arxiv-id "2301.12345"

# Link multiple papers
python scripts/paper_manager.py link \
  --repo-id "username/model" \
  --repo-type "model" \
  --arxiv-ids "2301.12345,2302.67890"
```

### Creating Papers
```bash
# Standard template
python scripts/paper_manager.py create \
  --template "standard" \
  --title "Paper Title" \
  --output "paper.md"

# Modern template
python scripts/paper_manager.py create \
  --template "modern" \
  --title "Paper Title" \
  --authors "Author1, Author2" \
  --abstract "Abstract text" \
  --output "paper.md"

# ML Report
python scripts/paper_manager.py create \
  --template "ml-report" \
  --title "Experiment Report" \
  --output "report.md"

# arXiv style
python scripts/paper_manager.py create \
  --template "arxiv" \
  --title "Paper Title" \
  --output "paper.md"
```
