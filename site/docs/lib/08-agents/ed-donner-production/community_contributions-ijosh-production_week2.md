---
title: "Week 2 – AI Digital Twin"
sourceId: "08-agents/ed-donner-production"
sourceTitle: "AI in Production"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "08-agents"
sourceUrl: "https://github.com/ed-donner/production"
entryUrl: "https://github.com/ed-donner/production/blob/daeb3dae34be3287842ea7faa3e6f4cba467028b/community_contributions/ijosh/production_week2.md"
sourceRel: "community_contributions/ijosh/production_week2.md"
rawUrl: "/raw/08-agents/ed-donner-production/community_contributions/ijosh/production_week2.md"
sourceSha256: "8e88766e5be83993fae3c1afd9d12785e8b9293ee441d0ebe978c801b89986b9"
pageSha256: "8e88766e5be83993fae3c1afd9d12785e8b9293ee441d0ebe978c801b89986b9"
contentMode: "local-full"
zh: ""
---

# Week 2 – AI Digital Twin

I modificed the AI Digital Twin application to be a production-ready, full-stack  that represents **Joshua Balogun** in real-time conversations.
This project combines a modern Next.js frontend with a FastAPI backend powered by AWS Bedrock and deploys to AWS using Lambda + API Gateway + S3 + CloudFront + Terraform.

Production URL: https://d36qx0izkd71ph.cloudfront.net/

<br />

## Core Features

- Conversational AI Digital Twin experience
- Session-based conversation memory
- Memory persistence to local files or S3
- Bedrock tool-calling loop with guarded execution
- Structured context injection from profile files
- Hidden reasoning sanitization in backend and frontend
- Optional lead capture + unknown-question logging tools
- Optional email dispatch via SendGrid
- Optional push notifications via Pushover
- Static frontend export optimized for S3 + CloudFront
- Terraform-based environment-aware infrastructure deployment
- Optional notifications via Pushover.
- Optional outbound email delivery via SendGrid.

## Repository

The complete application is available at:
https://github.com/iJoshy/digital-twin

See the README.md in the repository for detailed information about implementation, setup, and usage.
