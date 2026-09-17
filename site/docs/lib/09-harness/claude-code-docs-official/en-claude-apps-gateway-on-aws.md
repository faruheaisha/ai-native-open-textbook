---
title: "Deploy Claude apps gateway on AWS"
sourceId: "09-harness/claude-code-docs-official"
sourceTitle: "claude-code-docs-official"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://code.claude.com/docs"
entryUrl: "https://code.claude.com/docs"
sourceRel: "en/claude-apps-gateway-on-aws.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/claude-apps-gateway-on-aws.md"
sourceSha256: "f2bfe2859aefd42acffcc4d8e61d3c3fb1572a24bcb3a05ea391a29b877422df"
pageSha256: "f2bfe2859aefd42acffcc4d8e61d3c3fb1572a24bcb3a05ea391a29b877422df"
contentMode: "local-full"
zh: ""
---

# Deploy Claude apps gateway on AWS

> A worked example of running Claude apps gateway on AWS: ECS Fargate or EKS, Amazon RDS for PostgreSQL, AWS Secrets Manager, and IAM-role auth to Amazon Bedrock.

  This page walks through one way to run Claude apps gateway on AWS. The configuration is a working example for customer-managed infrastructure rather than a supported production deployment; use it to see how the pieces fit together before adapting it to your own environment. For the platform-agnostic requirements, see the [deployment guide](https://code.claude.com/docs/en/claude-apps-gateway-deploy).

This example provisions Claude apps gateway on AWS with Amazon Bedrock as the model upstream, using either [Amazon ECS](https://aws.amazon.com/ecs/) on [AWS Fargate](https://aws.amazon.com/fargate/) or [Amazon EKS](https://aws.amazon.com/eks/) for compute. [Okta](https://www.okta.com/) is the example identity provider (IdP), but any OpenID Connect (OIDC) compliant IdP works; see [Identity provider setup](https://code.claude.com/docs/en/claude-apps-gateway-deploy#identity-provider-setup) for per-IdP details.

  Bedrock isn't the only Claude upstream on AWS. The gateway also supports Claude Platform on AWS, the Anthropic-operated Claude API with AWS authentication and AWS Marketplace billing, in place of Bedrock or alongside it. Its upstream entry, credentials, and IAM permissions differ from this page's Bedrock-scoped ones; the [Claude Platform on AWS upstream reference](https://code.claude.com/docs/en/claude-apps-gateway-config#claude-platform-on-aws) covers what changes, and the rest of this page applies unchanged.

## Architecture

  <img src="https://mintcdn.com/claude-code/PHweeRmDUYEKff49/images/claude-gateway-aws-architecture.svg?fit=max&auto=format&n=PHweeRmDUYEKff49&q=85&s=8599cc34aa28522cde208ee831439bb4" alt="Diagram of Claude apps gateway on AWS: Claude Code clients connect over HTTPS to an internal Application Load Balancer fronting the gateway (ECS Fargate or EKS), which runs in private subnets alongside an Amazon RDS for PostgreSQL instance for session state. The gateway signs users in via OIDC against the corporate IdP, reads secrets from AWS Secrets Manager, forwards model requests to Amazon Bedrock using its IAM role, and pulls its image from Amazon ECR at deploy." width="820" height="430" data-path="images/claude-gateway-aws-architecture.svg" />

The gateway runs as a private HTTPS endpoint on your network that developers sign in to through your IdP. Their Claude Code sessions reach Claude models on Amazon Bedrock through the gateway's IAM role, so no model credentials land on developer machines. The reference configuration provisions:

* **Amazon ECS on AWS Fargate** service or **Amazon EKS** Deployment running the gateway container
* **Amazon ECR** repository for the gateway image
* **Amazon RDS for PostgreSQL** instance in private subnets, not publicly accessible, for the gateway's [store](https://code.claude.com/docs/en/claude-apps-gateway-config#store)
* **AWS Secrets Manager** secrets for the JWT signing key, the OIDC client secret, and the Postgres URL
* **IAM role** with `bedrock:InvokeModel`, `bedrock:InvokeModelWithResponseStream`, and `bedrock:CountTokens`, attached as the ECS task role or bound via IAM Roles for Service Accounts (IRSA) on EKS
* **Internal Application Load Balancer** for HTTPS

## Prerequisites

The walkthrough creates the gateway's own resources, but it builds on network and identity infrastructure you already have. Before you start, you need:

* An AWS account with permission to create the [resources above](#architecture)
* The [AWS CLI v2](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html) installed and [authenticated](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-authentication.html), and [Docker](https://docs.docker.com/get-started/get-docker/) installed locally
* A [VPC](https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html) with at least two [private subnets](https://docs.aws.amazon.com/vpc/latest/userguide/configure-subnets.html) in different Availability Zones, with outbound internet access through a [NAT gateway](https://docs.aws.amazon.com/vpc/latest/userguide/vpc-nat-gateway.html); the internal load balancer needs subnets in two AZs, and the gateway needs egress to Bedrock and your IdP
