---
title: "Cloudflare Terraform Provider"
sourceId: "10-context-memory/openai-skills"
sourceTitle: "Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/openai/skills"
entryUrl: "https://github.com/openai/skills/blob/49f948faa9258a0c61caceaf225e179651397431/skills/.curated/cloudflare-deploy/references/terraform/README.md"
sourceRel: "skills/.curated/cloudflare-deploy/references/terraform/README.md"
rawUrl: "/raw/10-context-memory/openai-skills/skills/.curated/cloudflare-deploy/references/terraform/README.md"
sourceSha256: "a7070aaa31c8e229b2ebfca6fe66bcf6ead9cdf1ef6d7b494a556080253ec073"
pageSha256: "a7070aaa31c8e229b2ebfca6fe66bcf6ead9cdf1ef6d7b494a556080253ec073"
contentMode: "local-full"
zh: ""
---

# Cloudflare Terraform Provider

**Expert guidance for Cloudflare Terraform Provider - infrastructure as code for Cloudflare resources.**

## Core Principles

- **Provider-first**: Use Terraform provider for ALL infrastructure - never mix with wrangler.jsonc for the same resources
- **State management**: Always use remote state (S3, Terraform Cloud, etc.) for team environments
- **Modular architecture**: Create reusable modules for common patterns (zones, workers, pages)
- **Version pinning**: Always pin provider version with `~>` for predictable upgrades
- **Secret management**: Use variables + environment vars for sensitive data - never hardcode API tokens

## Provider Version

| Version | Status | Notes |
|---------|--------|-------|
| 5.x | Current | Auto-generated from OpenAPI, breaking changes from v4 |
| 4.x | Legacy | Manual maintenance, deprecated |

**Critical:** v5 renamed many resources (`cloudflare_record` → `cloudflare_dns_record`, `cloudflare_worker_*` → `cloudflare_workers_*`). See [gotchas.md](/lib/10-context-memory/openai-skills/skills-_curated-cloudflare-deploy-references-terraform-gotchas#v5-breaking-changes) for migration details.

## Provider Setup

### Basic Configuration

```hcl
terraform {
  required_version = ">= 1.0"
  
  required_providers {
    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "~> 5.15.0"
    }
  }
}

provider "cloudflare" {
  api_token = var.cloudflare_api_token  # or CLOUDFLARE_API_TOKEN env var
}
```

### Authentication Methods (priority order)

1. **API Token** (RECOMMENDED): `api_token` or `CLOUDFLARE_API_TOKEN`
   - Create: Dashboard → My Profile → API Tokens
   - Scope to specific accounts/zones for security
   
2. **Global API Key** (LEGACY): `api_key` + `api_email` or `CLOUDFLARE_API_KEY` + `CLOUDFLARE_EMAIL`
   - Less secure, use tokens instead
   
3. **User Service Key**: `user_service_key` for Origin CA certificates

## Quick Reference: Common Commands

```bash
terraform init          # Initialize provider
terraform plan          # Plan changes
terraform apply         # Apply changes
terraform destroy       # Destroy resources
