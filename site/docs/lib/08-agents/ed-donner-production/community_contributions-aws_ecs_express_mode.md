---
title: "Deploying a container to AWS ECS Express Mode"
sourceId: "08-agents/ed-donner-production"
sourceTitle: "AI in Production"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "08-agents"
sourceUrl: "https://github.com/ed-donner/production"
entryUrl: "https://github.com/ed-donner/production/blob/daeb3dae34be3287842ea7faa3e6f4cba467028b/community_contributions/aws_ecs_express_mode.md"
sourceRel: "community_contributions/aws_ecs_express_mode.md"
rawUrl: "/raw/08-agents/ed-donner-production/community_contributions/aws_ecs_express_mode.md"
sourceSha256: "265b85600f34814aad516fade903b79ec9365212e33d63586cdfb1c8eeaee4ad"
pageSha256: "265b85600f34814aad516fade903b79ec9365212e33d63586cdfb1c8eeaee4ad"
contentMode: "local-full"
zh: ""
---

# Deploying a container to AWS ECS Express Mode

## Problem
The Week 1 Day 5 instructions say to use AWS App Runner to deploy the container. Unfortunately, AWS has deprecated App Runner and suggests
using ECS Express Mode as a replacement. ECS Express Mode is not as straightforward as App Runner and requires some additional infrastructure.

## Solution
1. As the AWS root user (*not* aiengineer), add two additional policies to the BroadAIEngineerAccess user group.
- AmazonECS_FullAccess
- AmazonVPCFullAccess

2. Create a default VPC using the AWS CLI. (I did this from the terminal in cursor.)
- `aws ec2 create-default-vpc`

3. As the aiengineer user, create an ECS Express Mode deployment. Keep defaults except for:
- Image URI (Use the Browse ECR images button to select image.)
- Container port: 8000
- Container health check path: /health
- Add CLERK_SECRET_KEY, CLERK_JWKS_URL, & OPENAI_API_KEY and their values as environment variables.
- Set CPU: 0.25 vCPU
- Set Memory: 0.5 GB
- Set Minimum number of tasks: 1
- Set Maximum number of tasks: 1

Many of these settings are under the "Additional configurations - optional" twistie.

The deployment takes 7-10 minutes to complete. It creates several objects including load balancers and elastic IPs, so you may want to use
something like [AWS Resource Explorer](https://docs.aws.amazon.com/resource-explorer/latest/userguide/welcome.html) to find and delete them. Deleting the deployment does *not* remove all resources.

I hope this helps!

[Katherine](https://github.com/ktstevenson)
