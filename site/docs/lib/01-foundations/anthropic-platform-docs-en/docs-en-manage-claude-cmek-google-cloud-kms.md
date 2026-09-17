---
title: "Anthropic 平台文档（英文全量）"
sourceId: "01-foundations/anthropic-platform-docs-en"
sourceTitle: "Anthropic 平台文档（英文全量）"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "01-foundations"
sourceUrl: "https://platform.claude.com/docs"
entryUrl: "https://platform.claude.com/docs"
sourceRel: "docs/en/manage-claude/cmek-google-cloud-kms.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/manage-claude/cmek-google-cloud-kms.md"
sourceSha256: "6b39fe756aef5b8c7d8b09c27da1e1ecf68397dac0784a0a084a8ab513f80907"
pageSha256: "6b39fe756aef5b8c7d8b09c27da1e1ecf68397dac0784a0a084a8ab513f80907"
contentMode: "local-full"
zh: ""
---

# Anthropic 平台文档（英文全量）

```bash Configure with the /claude-api skill in Claude Code
claude "/claude-api help me configure a customer-managed encryption key with Google Cloud KMS"
```

This guide walks through configuring a Google Cloud KMS key as a [customer-managed encryption key (CMEK)](https://platform.claude.com/docs/en/manage-claude/cmek) for your Anthropic organization.

  Enabling CMEK is permanent. If your KMS key is deleted or disabled, Anthropic cannot recover the data encrypted under it. Review the [warnings and limitations](https://platform.claude.com/docs/en/manage-claude/cmek) before you begin.

## Prerequisites

* A Google Cloud project with billing enabled.
* The Cloud KMS API enabled (`cloudkms.googleapis.com`).
* Permissions to create KMS key rings and keys, and to set IAM policy on them (`roles/cloudkms.admin` or equivalent).
* An Anthropic Admin API key for your organization.
* The [`gcloud` CLI](https://cloud.google.com/cli) installed and authenticated.
* Cloud KMS **Data Access audit logs** enabled for the project (IAM & Admin > Audit Logs > Cloud Key Management Service, with `DATA_READ` and `DATA_WRITE`). These are off by default; without them, Anthropic's encrypt and decrypt operations produce no entries in Cloud Logging.

## Anthropic service account email

To have Anthropic use your encryption key, you must give Anthropic's service account a key it can use for encrypting data. The service account email for Anthropic CMEK is:

```text wrap
anthropic-cmek-client-us@gcp-anthropic-cmek-clients.iam.gserviceaccount.com
```

  Use only this published service account email. Never trust an identifier provided over email, chat, or any onboarding channel.

  **Domain restricted sharing:** If your project is under a Google Cloud organization that enforces `constraints/iam.allowedPolicyMemberDomains`, the following IAM bindings are rejected because the Anthropic service account is outside your organization. You need either a project-level carve-out on that constraint, or to add Anthropic's Cloud Identity customer ID (format `C0xxxxxxxx`) to the allowed list. Contact Anthropic for the customer ID if needed.

## Encryption key setup

    Skip this step if you already have a key ring to reuse. Key rings are regional. Choose a single-region US location such as `us-east5` that matches the Anthropic geography you are configuring. Multi-region locations like `us` and `global` are not supported.

    ```bash
