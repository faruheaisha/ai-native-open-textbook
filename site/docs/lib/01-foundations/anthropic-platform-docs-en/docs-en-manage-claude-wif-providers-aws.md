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
sourceRel: "docs/en/manage-claude/wif-providers/aws.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/manage-claude/wif-providers/aws.md"
sourceSha256: "9d18c12a63196297f85c2e25dc7007d82d0b5c6465c6f1838f68ec529e34ba77"
pageSha256: "9d18c12a63196297f85c2e25dc7007d82d0b5c6465c6f1838f68ec529e34ba77"
contentMode: "local-full"
zh: ""
---

# Anthropic 平台文档（英文全量）

AWS workloads can authenticate to the Claude API without static API keys by exchanging an AWS-signed OIDC identity token. The recommended path calls the AWS STS [`GetWebIdentityToken`](https://docs.aws.amazon.com/STS/latest/APIReference/API_GetWebIdentityToken.html) API, which works anywhere the workload has AWS credentials: Lambda, EC2, ECS, and EKS. EKS workloads can alternatively use the [Kubernetes projected-token path](https://platform.claude.com/docs/en/manage-claude/wif-providers/aws#use-eks-projected-service-account-tokens), which has fewer configuration steps but only works inside a pod.

This guide shows both paths. For the underlying concepts (service accounts, federation issuers, and federation rules), see [Workload Identity Federation](https://platform.claude.com/docs/en/manage-claude/workload-identity-federation).

## Prerequisites

* Familiarity with [WIF concepts](https://platform.claude.com/docs/en/manage-claude/workload-identity-federation#concepts): service accounts, federation issuers, and federation rules.
* An AWS workload (EKS pod, ECS task, Lambda function, or EC2 instance) with an attached IAM role.
* The `aws` CLI or an AWS SDK available in the workload.
* Permission to create service accounts, federation issuers, and federation rules in the Claude Console for your Anthropic organization.

## Use STS web identity tokens (recommended)

The AWS STS `GetWebIdentityToken` API returns an OIDC token signed by AWS that asserts the caller's IAM identity. Because it uses the workload's ambient AWS credentials, the same integration covers Lambda, EC2, ECS, and EKS.

### Configure AWS

    This is an account-level flag, off by default. In the AWS console, open **IAM**, choose **Account settings**, and enable **Outbound web identity federation**. To enable it programmatically:

    ```bash
    python3 -c "import boto3; boto3.client('iam').enable_outbound_web_identity_federation()"
    ```

    If this is not enabled, calls to `GetWebIdentityToken` fail with `OutboundWebIdentityFederationDisabledException`.

    Attach this policy to the IAM role that your Lambda function, EC2 instance, or ECS task runs as:

    ```json
    \{
      "Version": "2012-10-17",
      "Statement": [
        \{
          "Effect": "Allow",
          "Action": ["sts:GetWebIdentityToken"],
          "Resource": "*"
        \}
      ]
    \}
    ```

    After enabling outbound federation, the **IAM > Account settings** page shows a **Get Token Issuer URL** field with a value of the form `https://<uuid>.tokens.sts.global.api.aws`. This URL is unique to your AWS account; copy it for the next step. To retrieve it programmatically:

    ```bash
    python3 -c "import boto3; print(boto3.client('iam').get_outbound_web_identity_federation_info())"
    ```

### Configure Anthropic

In the Claude Console, open **Settings → Workload identity**, click **Connect workload**, and select the **AWS** tile. The wizard walks you through registering the issuer, creating a service account, and creating a federation rule.

The wizard creates these resources for you. Use the following values whether you enter them in the wizard or send them to the [Admin API](https://platform.claude.com/docs/en/manage-claude/wif-admin-api):

**Federation issuer:** Register the per-account STS issuer URL you copied in the prior step. It exposes a public JWKS endpoint, so use discovery mode.

```json
{
  "name": "aws-sts",
  "issuer_url": "https://<uuid>.tokens.sts.global.api.aws",
  "jwks": { "type": "discovery" }
}
```
