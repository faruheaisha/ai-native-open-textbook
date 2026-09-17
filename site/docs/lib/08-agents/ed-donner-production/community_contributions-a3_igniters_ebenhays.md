---
title: "Digital Twin — Eben's Personal Assistant"
sourceId: "08-agents/ed-donner-production"
sourceTitle: "AI in Production"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "08-agents"
sourceUrl: "https://github.com/ed-donner/production"
entryUrl: "https://github.com/ed-donner/production/blob/daeb3dae34be3287842ea7faa3e6f4cba467028b/community_contributions/a3_igniters_ebenhays/README.md"
sourceRel: "community_contributions/a3_igniters_ebenhays/README.md"
rawUrl: "/raw/08-agents/ed-donner-production/community_contributions/a3_igniters_ebenhays/README.md"
sourceSha256: "d5d1d68d6def5e72d529c394fdf70c19695ceef1ce06b33bc03237e6d3480ece"
pageSha256: "d5d1d68d6def5e72d529c394fdf70c19695ceef1ce06b33bc03237e6d3480ece"
contentMode: "local-full"
zh: ""
---

# Digital Twin — Eben's Personal Assistant

An AI-powered digital twin for a personal website. Visitors can chat with a conversational assistant that responds as you, powered by Amazon Bedrock and grounded in your resume, notes, and personal context.

## Project Repository
https://github.com/ebenhays/digital-twin

## Deployment URL
https://dzuy82f0ics2k.cloudfront.net/

## Overview

The project consists of three parts:

- **Backend** — A FastAPI application that handles chat sessions, builds a rich system prompt from personal documents, and calls the Amazon Bedrock Converse API to generate responses.
- **Frontend** — A Next.js static site with a chat UI that sends messages to the backend API.
- **Infrastructure** — Terraform configuration that provisions the full AWS stack: Lambda, API Gateway, S3 and CloudFront.
