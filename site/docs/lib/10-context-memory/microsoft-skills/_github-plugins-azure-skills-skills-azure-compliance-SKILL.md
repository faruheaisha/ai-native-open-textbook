---
title: "Azure Compliance & Security Auditing"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-compliance/SKILL.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-compliance/SKILL.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-compliance/SKILL.md"
sourceSha256: "fcdadd24b113cbae8bfb9dccd2e836465b58dd68b07737e9083bb1d819d96896"
pageSha256: "fcdadd24b113cbae8bfb9dccd2e836465b58dd68b07737e9083bb1d819d96896"
contentMode: "local-full"
zh: ""
---

# Azure Compliance & Security Auditing

## Quick Reference

| Property | Details |
|---|---|
| Best for | Compliance scans, security audits, Key Vault expiration checks |
| Primary capabilities | Comprehensive Resources Assessment, Key Vault Expiration Monitoring |
| MCP tools | azqr, subscription and resource group listing, Key Vault item inspection |

## Prerequisites

- Authentication: user is logged in to Azure via `az login`
- Permissions to read resource configuration and Key Vault metadata

## Assessments

| Assessment | Reference |
|------------|-----------|
| Comprehensive Compliance (azqr) | [references/azure-quick-review.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-compliance-references-azure-quick-review) |
| Key Vault Expiration | [references/azure-keyvault-expiration-audit.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-compliance-references-azure-keyvault-expiration-audit) |
| Resource Graph Queries | [references/azure-resource-graph.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-compliance-references-azure-resource-graph) |

## MCP Tools

| Tool | Purpose |
|------|---------|
| `mcp_azure_mcp_extension_azqr` | Run azqr compliance scans |
| `mcp_azure_mcp_subscription_list` | List available subscriptions |
| `mcp_azure_mcp_group_list` | List resource groups |
| `keyvault_key_list` | List all keys in vault |
| `keyvault_key_get` | Get key details including expiration |
| `keyvault_secret_list` | List all secrets in vault |
| `keyvault_secret_get` | Get secret details including expiration |
| `keyvault_certificate_list` | List all certificates in vault |
| `keyvault_certificate_get` | Get certificate details including expiration |

## Assessment Workflow

1. Select scope (subscription or resource group) for Comprehensive Resources Assessment.
2. Run azqr and capture output artifacts.
3. Analyze Scan Results and summarize findings and recommendations.
4. Review Key Vault Expiration Monitoring output for keys, secrets, and certificates.
5. Classify issues and propose remediation or fix steps for each finding.

### Priority Classification

| Priority | Guidance |
|---|---|
| Critical | Immediate remediation required for high-impact exposure |
| High | Resolve within days to reduce risk |
| Medium | Plan a resolution in the next sprint |
| Low | Track and fix during regular maintenance |

## Error Handling

| Error | Message | Remediation |
|---|---|---|
| Authentication required | "Please login" | Run `az login` and retry |
| Access denied | "Forbidden" | Confirm permissions and fix role assignments |
| Missing resource | "Not found" | Verify subscription and resource group selection |

## Best Practices

- Run compliance scans on a regular schedule (weekly or monthly)
- Track findings over time and verify remediation effectiveness
- Separate compliance reporting from remediation execution
- Keep Key Vault expiration policies documented and enforced

## SDK Quick References

For programmatic Key Vault access, see the condensed SDK guides:

- **Key Vault (Python)**: [Secrets/Keys/Certs](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-compliance-references-sdk-azure-keyvault-py)
- **Secrets**: [TypeScript](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-compliance-references-sdk-azure-keyvault-secrets-ts) | [Rust](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-compliance-references-sdk-azure-keyvault-secrets-rust) | [Java](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-compliance-references-sdk-azure-security-keyvault-secrets-java)
- **Keys**: [.NET](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-compliance-references-sdk-azure-security-keyvault-keys-dotnet) | [Java](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-compliance-references-sdk-azure-security-keyvault-keys-java) | [TypeScript](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-compliance-references-sdk-azure-keyvault-keys-ts) | [Rust](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-compliance-references-sdk-azure-keyvault-keys-rust)
- **Certificates**: [Rust](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-compliance-references-sdk-azure-keyvault-certificates-rust)
