---
title: "DevOps Automation Plugin"
sourceId: "09-harness/claude-howto"
sourceTitle: "Claude How-To"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/luongnv89/claude-howto"
entryUrl: "https://github.com/luongnv89/claude-howto/blob/97bfb0685e03112ad39845889061d02cef6e534c/07-plugins/devops-automation/README.md"
sourceRel: "07-plugins/devops-automation/README.md"
rawUrl: "/raw/09-harness/claude-howto/07-plugins/devops-automation/README.md"
sourceSha256: "66ed78f7209fcb4523838da3a669bb40106e8932cdcc4d2bf62355c50b308473"
pageSha256: "66ed78f7209fcb4523838da3a669bb40106e8932cdcc4d2bf62355c50b308473"
contentMode: "local-full"
zh: ""
---

# DevOps Automation Plugin

Complete DevOps automation for deployment, monitoring, and incident response.

## Features

✅ Automated deployments
✅ Rollback procedures
✅ System health monitoring
✅ Incident response workflows
✅ Kubernetes integration

## Installation

```bash
/plugin install devops-automation
```

## What's Included

### Slash Commands
- `/deploy` - Deploy to production or staging
- `/rollback` - Rollback to previous version
- `/status` - Check system health
- `/incident` - Handle production incidents

### Subagents
- `deployment-specialist` - Deployment operations
- `incident-commander` - Incident coordination
- `alert-analyzer` - System health analysis

### MCP Servers
- Kubernetes integration

### Scripts
- `deploy.sh` - Deployment automation
- `rollback.sh` - Rollback automation
- `health-check.sh` - Health check utilities

### Hooks
- `pre-deploy.js` - Pre-deployment validation
- `post-deploy.js` - Post-deployment tasks

## Usage

### Deploy to Staging
```
/deploy staging
```

### Deploy to Production
```
/deploy production
```

### Rollback
```
/rollback production
```

### Check Status
```
/status
```

### Handle Incident
```
/incident
```

## Requirements

- Claude Code 2.1+
- Kubernetes CLI (kubectl)
- Cluster access configured

## Configuration

Set up your Kubernetes config:
```bash
export KUBECONFIG=~/.kube/config
```

## Example Workflow

```
User: /deploy production

Claude:
1. Runs pre-deploy hook (validates kubectl, cluster connection)
2. Delegates to deployment-specialist subagent
3. Runs deploy.sh script
4. Monitors deployment progress via Kubernetes MCP
5. Runs post-deploy hook (waits for pods, smoke tests)
6. Provides deployment summary

Result:
✅ Deployment complete
📦 Version: v2.1.0
🚀 Pods: 3/3 ready
⏱️  Time: 2m 34s
```

---

**Last Updated**: August 4, 2026
**Claude Code Version**: 2.1.220
**Sources**:
- https://code.claude.com/docs/en/plugins
- https://github.com/anthropics/claude-code/releases/tag/v2.1.131
- https://github.com/anthropics/claude-code/releases/tag/v2.1.138
- https://code.claude.com/docs/en/model-config
**Compatible Models**: Claude Fable 5, Claude Opus 5, Claude Sonnet 5, Claude Sonnet 4.6, Claude Opus 4.8, Claude Haiku 4.5
