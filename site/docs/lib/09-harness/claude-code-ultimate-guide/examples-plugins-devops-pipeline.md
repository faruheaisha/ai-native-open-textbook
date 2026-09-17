---
title: "DevOps Pipeline Plugin"
sourceId: "09-harness/claude-code-ultimate-guide"
sourceTitle: "Claude Code Ultimate Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide"
entryUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/plugins/devops-pipeline/README.md"
sourceRel: "examples/plugins/devops-pipeline/README.md"
rawUrl: "/raw/09-harness/claude-code-ultimate-guide/examples/plugins/devops-pipeline/README.md"
sourceSha256: "aeb2e8bfee2f3138533b8bfca1404f1fdba88be36a6b963803fd149731d53066"
pageSha256: "aeb2e8bfee2f3138533b8bfca1404f1fdba88be36a6b963803fd149731d53066"
contentMode: "local-full"
zh: ""
---

# DevOps Pipeline Plugin

CI/CD automation, deployment, and infrastructure management.

## Install

```bash
bash install.sh
```

## Components

- **devops-sre agent**: Infrastructure and deployment specialist
- **/ship command**: Full deployment workflow
- **GitHub Actions workflow**: Automated CI/CD in your repo

## Quick Start

```bash
# Deploy to production
/ship --env production

# Check deployment status
!git log --oneline -5

# Configure CI/CD
# Review .github/workflows/claude-code-review.yml
```

## Features

✓ Automated deployments
✓ Infrastructure validation
✓ Rollback support
✓ Health monitoring
✓ Alert integration

---

See `guide/ops/devops-sre.md` for full documentation.
