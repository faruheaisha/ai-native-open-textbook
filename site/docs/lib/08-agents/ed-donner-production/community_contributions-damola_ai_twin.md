---
title: "Damola's AI Twin"
sourceId: "08-agents/ed-donner-production"
sourceTitle: "AI in Production"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "08-agents"
sourceUrl: "https://github.com/ed-donner/production"
entryUrl: "https://github.com/ed-donner/production/blob/daeb3dae34be3287842ea7faa3e6f4cba467028b/README.md"
zh: ""
---

# Damola's AI Twin
**Twin** is a full-stack “AI twin” chat app: a Next.js UI talks to a Python API that uses **Amazon Bedrock** for replies and stores **per-session conversation memory** (local JSON in dev, **S3** when deployed on AWS).

Dev Link - https://d17px7xkl9xub2.cloudfront.net/
## Stack
| Layer | Tech |
|--------|------|
| Frontend | Next.js 16, React 19, Tailwind 4, TypeScript (`frontend/`) |
| Backend | FastAPI, Mangum (Lambda), boto3 Bedrock runtime (`backend/`) |
| Cloud | Terraform: Lambda + API Gateway HTTP API, S3 static site + CloudFront, S3 memory bucket, optional custom domain (`terraform/`) |
## Flow
- Chat UI sends `POST /chat` (see `frontend/components/twin.tsx`), using `NEXT_PUBLIC_API_URL` or `http://localhost:8000` locally.
- API calls Bedrock (`BEDROCK_MODEL_ID`, default Nova Lite) and loads/saves history by `session_id` (`backend/server.py`).
- **Deploy**: `scripts/deploy.sh` builds the Lambda zip, then Terraform with S3 remote state and workspaces **dev / test / prod**. **Destroy**: `scripts/destroy.sh` and `.github/workflows/`.
- Lab notes: `docs/week2/`.
