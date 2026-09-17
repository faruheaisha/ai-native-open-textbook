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
sourceRel: "docs/en/manage-claude/cmek-aws-kms.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/manage-claude/cmek-aws-kms.md"
sourceSha256: "d711cf1c8c7c9dc1187204a515dedb48090191d4ad7b5d9aa5489070fb3d68f8"
pageSha256: "d711cf1c8c7c9dc1187204a515dedb48090191d4ad7b5d9aa5489070fb3d68f8"
contentMode: "local-full"
zh: ""
---

# Anthropic 平台文档（英文全量）

```bash Configure with the /claude-api skill in Claude Code
claude "/claude-api help me configure a customer-managed encryption key with AWS KMS"
```

This guide walks through configuring an [AWS KMS](https://aws.amazon.com/kms/) key as a [customer-managed encryption key (CMEK)](https://platform.claude.com/docs/en/manage-claude/cmek) for your Anthropic organization.

  Enabling CMEK is permanent. If your KMS key is deleted or disabled, Anthropic cannot recover the data encrypted under it. Review the [warnings and limitations](https://platform.claude.com/docs/en/manage-claude/cmek) before you begin.

  **Claude Platform on AWS:** On [Claude Platform on AWS](https://platform.claude.com/docs/en/build-with-claude/claude-platform-on-aws), your key policy grants access to an AWS service principal instead of Anthropic's IAM role, there is no separate validation step, and you register and attach the key in the Claude Console. Follow [Set up CMEK on Claude Platform on AWS](https://platform.claude.com/docs/en/manage-claude/cmek-aws-kms#claude-platform-on-aws) on this page instead of the steps in the next sections.

## Prerequisites

* An AWS account with permissions to create KMS keys and set key policies (`kms:CreateKey` and `kms:PutKeyPolicy`).
* An Anthropic Admin API key for your organization.
* The [AWS CLI](https://aws.amazon.com/cli/) installed and authenticated.

## Amazon Resource Name (ARN) for Anthropic

To have Anthropic use your encryption key, you must give Anthropic's IAM role a KMS key it can use for encrypting data. The ARN for Anthropic CMEK is:

```text wrap
arn:aws:iam::915198916910:role/anthropic-cmek-client-us
```

  Use only this published ARN. Never trust an identifier provided over email, chat, or any onboarding channel.

## Encryption key setup

    The key policy grants Anthropic's IAM role cross-account access. Three statements are required:

    1. **Account root admin:** the standard KMS pattern. Your account retains full admin control.
    2. **Anthropic encrypt and decrypt:** the `kms:Encrypt` and `kms:Decrypt` actions, which Anthropic uses to encrypt and decrypt the data keys that protect your workspace data (envelope encryption).
    3. **Anthropic describe:** the metadata read Anthropic performs at startup. It is granted separately because `DescribeKey` has no `EncryptionContext` parameter, so an `EncryptionContext` condition on this action would always deny.

    ```bash
    export YOUR_ACCOUNT=$(aws sts get-caller-identity --query Account --output text)

    aws kms create-key \
      --region &lt;region> \
      --description "Anthropic CMEK" \
      --key-usage ENCRYPT_DECRYPT \
      --policy "{
        \"Version\": \"2012-10-17\",
        \"Statement\": [
          {
            \"Sid\": \"AccountRootAdmin\",
            \"Effect\": \"Allow\",
            \"Principal\": {\"AWS\": \"arn:aws:iam::${YOUR_ACCOUNT\}:root\"\},
            \"Action\": \"kms:*\",
            \"Resource\": \"*\"
          \},
          \{
            \"Sid\": \"AllowAnthropicCMEKCrypto\",
            \"Effect\": \"Allow\",
            \"Principal\": \{\"AWS\": \"arn:aws:iam::915198916910:role/anthropic-cmek-client-us\"\},
            \"Action\": [\"kms:Encrypt\", \"kms:Decrypt\"],
            \"Resource\": \"*\",
            \"Condition\": \{
              \"StringEquals\": \{
                \"kms:EncryptionContext:anthropic:compartment_uuid\": [
                  \"00000000-0000-0000-0000-000000000000\",
