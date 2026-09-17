---
title: "DevOps/SRE CLAUDE.md Template"
sourceId: "09-harness/claude-code-ultimate-guide"
sourceTitle: "Claude Code Ultimate Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide"
entryUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/claude-md/devops-sre.md"
sourceRel: "examples/claude-md/devops-sre.md"
rawUrl: "/raw/09-harness/claude-code-ultimate-guide/examples/claude-md/devops-sre.md"
sourceSha256: "e3059ab05d31c7282913501d33bb7c2487d6d0774ca23e3a5fdd40b083614490"
pageSha256: "e3059ab05d31c7282913501d33bb7c2487d6d0774ca23e3a5fdd40b083614490"
contentMode: "local-full"
zh: ""
---

# DevOps/SRE CLAUDE.md Template

A CLAUDE.md configuration optimized for infrastructure projects and SRE workflows.

## Usage

Copy this content to your project's `CLAUDE.md` file and customize the sections marked with `[brackets]`.

---

## Template

```markdown
# DevOps/SRE Project Configuration

## Infrastructure Context

### Environment
- Cloud Provider: [AWS/GCP/Azure/On-prem]
- Kubernetes: [EKS/GKE/AKS/k3s/none]
- IaC Tool: [Terraform/Pulumi/CloudFormation/Ansible]
- CI/CD: [GitHub Actions/GitLab CI/Jenkins/ArgoCD]

### Service Map
- [service-1]: [description, critical path: yes/no]
- [service-2]: [description, critical path: yes/no]
- [database]: [PostgreSQL/MySQL/MongoDB, hosted where]

### Access Patterns
- Cluster access: [kubectl context name]
- Cloud CLI: [aws/gcloud/az profile name]
- Secrets: [Vault/SSM/Secrets Manager - never share values]

## FIRE Framework Defaults

Use the FIRE framework for all infrastructure issues:
- **F**irst Response: Clarify symptom, impact, recent changes
- **I**nvestigate: Systematic diagnosis with evidence
- **R**emediate: Propose options, wait for approval
- **E**valuate: Generate postmortem, prevention items

## Safety Rules

### Never Execute Without Approval
- `kubectl delete` or `kubectl scale down`
- `terraform destroy`
- Any production database writes
- IAM/security group modifications
- Any command in production namespace

### Always Require
- Rollback plan before changes
- Environment confirmation (prod vs staging)
- Impact assessment for scaling operations

## Response Preferences

### For Incidents
- Start with impact assessment
- Prioritize mitigation over root cause (initially)
- Provide exact commands, not just guidance
- Include timestamps in all actions

### For Code Review
- Focus on: security, resource limits, idempotency
- Flag: hardcoded values, missing error handling
- Suggest: monitoring/alerting additions

### For Documentation
- Format: Markdown with code blocks
- Style: Runbook format (numbered steps)
- Include: Prerequisites, rollback, verification steps

## Common Contexts

### Kubernetes Namespaces
- `production`: [critical services, approval required]
- `staging`: [test freely]
- `monitoring`: [Prometheus, Grafana]
- `ingress`: [nginx, cert-manager]

### Terraform Workspaces/Modules
- `modules/`: [shared infrastructure components]
- `environments/prod/`: [production, plan-only by default]
- `environments/staging/`: [safe to apply]

### Monitoring
- Metrics: [Prometheus/CloudWatch/Datadog URL]
- Logs: [ELK/CloudWatch/Loki URL]
- Alerts: [PagerDuty/OpsGenie integration]

## Team Conventions

### Commit Messages
- Format: [conventional commits / your format]
- Example: `fix(k8s): increase memory limit for payment-service`

### PR Requirements
- [ ] Terraform plan output included
- [ ] Affected services listed
- [ ] Rollback procedure documented

### Runbook Format
```
# [Runbook Title]
## Symptoms
## Prerequisites
## Steps
## Verification
## Rollback
## Escalation
```
```

---

## Customization Guide

### For Kubernetes-Heavy Teams

Add to "Common Contexts":
```markdown
### Critical Pods
- `payment-api`: Direct revenue impact, max 30s downtime
- `auth-service`: Blocks all authenticated requests
- `api-gateway`: Single point of entry

### Scaling Rules
- payment-api: min 3, max 10, scale on CPU > 70%
- auth-service: min 2, max 5, scale on connections
```

### For Terraform-Heavy Teams

Add section:
```markdown
## Terraform Conventions
- State backend: [S3 bucket / GCS bucket]
- Lock table: [DynamoDB table name]
- Module registry: [internal / Terraform registry]
- Required providers versions: [see versions.tf]

### Module Standards
- All resources tagged with: var.tags
- Naming: {project}-{environment}-{resource}
- Outputs: Always export ARN, ID, name
```

### For Multi-Cloud Teams

Add to "Environment":
```markdown
### Cloud Credentials
- AWS: Profile `company-prod` / `company-staging`
- GCP: Project `company-prod-123` / `company-staging-456`
- Azure: Subscription `prod-sub-id` / `staging-sub-id`

### Cross-Cloud Services
- DNS: [AWS Route53 / Cloudflare]
- CDN: [CloudFront / Cloud CDN]
- Secrets: [HashiCorp Vault - URL]
```

---

## Integration with Agents

Pair this CLAUDE.md with the DevOps/SRE agent:

```json
{
  "agents": {
    "sre": {
      "path": ".claude/agents/devops-sre.md",
      "model": "sonnet"
    }
  }
}
```

Then invoke with: `@sre investigate this pod crash`

---

## See Also

- [DevOps & SRE Guide](/lib/09-harness/claude-code-ultimate-guide/guide-ops-devops-sre): Complete FIRE framework documentation
- [DevOps Agent](/lib/09-harness/claude-code-ultimate-guide/examples-agents-devops-sre): Agent persona for infrastructure tasks
- [Security Hardening](/lib/09-harness/claude-code-ultimate-guide/guide-security-security-hardening/index): Security best practices
