---
title: "FitCheck AI — Resume Analyzer"
sourceId: "08-agents/ed-donner-production"
sourceTitle: "AI in Production"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "08-agents"
sourceUrl: "https://github.com/ed-donner/production"
entryUrl: "https://github.com/ed-donner/production/blob/daeb3dae34be3287842ea7faa3e6f4cba467028b/community_contributions/a3_igniters_ebenhays/week1day5_ebenhays.md"
sourceRel: "community_contributions/a3_igniters_ebenhays/week1day5_ebenhays.md"
rawUrl: "/raw/08-agents/ed-donner-production/community_contributions/a3_igniters_ebenhays/week1day5_ebenhays.md"
sourceSha256: "9a41c228e6f3303a732629b7ab82a83c76efb324cf818dab8b0187b99b0e612f"
pageSha256: "9a41c228e6f3303a732629b7ab82a83c76efb324cf818dab8b0187b99b0e612f"
contentMode: "local-full"
zh: ""
---

# FitCheck AI — Resume Analyzer

An AI-powered web app that scores how well your resume matches a job description and gives you specific, actionable suggestions to improve it.

## Features

- **Match Score** — 0–100 score showing alignment between your resume and the role
- **Missing Keywords** — Skills and requirements from the job description not found in your resume
- **Suggested Edits** — Concrete bullet-point rewrites to better target the position
- **Auth** — Sign-in required via Clerk before running an analysis

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 16, React 19, Tailwind CSS v4 |
| Backend API | FastAPI (Python), deployed as Vercel serverless function |
| AI | OpenAI GPT-4o (structured outputs) |
| Auth | Clerk |
| Deployment | Vercel |

## Project Repository
https://github.com/ebenhays/ai-resume-analyser

## Deployment URL
https://25tuj4ktib.eu-central-1.awsapprunner.com

### Prerequisites

- Node.js 18+
- Python 3.11+
- An [OpenAI API key](https://platform.openai.com/)
- A [Clerk](https://clerk.com/) application

### 1. Clone the repo

```bash
