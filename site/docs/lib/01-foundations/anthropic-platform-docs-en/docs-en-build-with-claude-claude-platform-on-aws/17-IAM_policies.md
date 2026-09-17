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
sourceRel: "docs/en/build-with-claude/claude-platform-on-aws.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/build-with-claude/claude-platform-on-aws.md"
sourceSha256: "0ff935251ef5bee607ae9d604d1c665269af87e8eda7c66c98362c1d5906779c"
pageSha256: "c8ede19a6bfffd31fd5c0d3a1da4ef472a8a68289e96cc09e20e6d0db9c56894"
contentMode: "local-full"
zh: ""
---

## IAM policies

Claude Platform on AWS integrates with AWS IAM for access control. You grant or deny access to specific API actions on specific workspaces using standard IAM policy syntax.

The SigV4 service name and IAM action namespace is `aws-external-anthropic`. Actions follow the pattern `aws-external-anthropic:<Action>` (for example, `aws-external-anthropic:CreateInference`).

### Example: deny batch inference

The following policy allows real-time inference while blocking batch processing:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "aws-external-anthropic:CreateInference",
        "aws-external-anthropic:CountTokens",
        "aws-external-anthropic:GetModel",
        "aws-external-anthropic:ListModels",
        "aws-external-anthropic:GetWorkspace"
      ],
      "Resource": "arn:aws:aws-external-anthropic:*:*:workspace/*"
    },
    {
      "Effect": "Allow",
      "Action": "aws-external-anthropic:ListWorkspaces",
      "Resource": "*"
    },
    {
      "Effect": "Deny",
      "Action": [
        "aws-external-anthropic:CreateBatchInference",
        "aws-external-anthropic:GetBatchInference",
        "aws-external-anthropic:ListBatchInferences"
      ],
      "Resource": "*"
    }
  ]
}
```

The `GetBatchInference` action authorizes both the batch metadata route and the batch results route. Denying it blocks both reads. For a Deny-only policy suitable for ZDR-sensitive workloads, see [Feature lockdown for a ZDR-sensitive workspace](https://platform.claude.com/docs/en/api/claude-platform-on-aws-iam-actions#feature-lockdown-for-a-zdr-sensitive-workspace).

  `ListWorkspaces` is account-scoped, so it appears in a separate Allow statement with `"Resource": "*"`. Specifying a workspace ARN on an account-scoped action has no effect (see [Provisioning automation](https://platform.claude.com/docs/en/api/claude-platform-on-aws-iam-actions#provisioning-automation)).

  This policy assumes AWS SigV4 authentication. If the principal authenticates with an API key, also add `aws-external-anthropic:CallWithBearerToken` to the `"Resource": "*"` Allow statement. `CallWithBearerToken` is a route-less authentication-layer action that does not bind to a workspace ARN. See [Per-customer workspace isolation](https://platform.claude.com/docs/en/api/claude-platform-on-aws-iam-actions#per-customer-workspace-isolation) for the two-statement pattern.

### Managed policies

AWS provides five managed policies (`AnthropicFullAccess`, `AnthropicReadOnlyAccess`, `AnthropicInferenceAccess`, `AnthropicLimitedAccess`, and `AnthropicSelfHostedEnvironmentAccess`) for common access patterns. For the actions each policy grants, the complete list of IAM actions, the route-to-action mapping, and additional policy examples, see [IAM actions for Claude Platform on AWS](https://platform.claude.com/docs/en/api/claude-platform-on-aws-iam-actions#managed-policies).
