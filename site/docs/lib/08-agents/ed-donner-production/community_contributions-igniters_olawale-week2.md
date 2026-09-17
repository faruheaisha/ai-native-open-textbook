---
title: "Digital Twin on AWS"
sourceId: "08-agents/ed-donner-production"
sourceTitle: "AI in Production"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "08-agents"
sourceUrl: "https://github.com/ed-donner/production"
entryUrl: "https://github.com/ed-donner/production/blob/daeb3dae34be3287842ea7faa3e6f4cba467028b/community_contributions/igniters_olawale/week2.md"
sourceRel: "community_contributions/igniters_olawale/week2.md"
rawUrl: "/raw/08-agents/ed-donner-production/community_contributions/igniters_olawale/week2.md"
sourceSha256: "3defa3f82f597032b317ed37eea160556f9a8dd2b58b6612b8e4644a62f71db5"
pageSha256: "3defa3f82f597032b317ed37eea160556f9a8dd2b58b6612b8e4644a62f71db5"
contentMode: "local-full"
zh: ""
---

# Digital Twin on AWS

I built a personal digital twin (my own data and prompts) as a small serverless app on AWS (API, compute, storage, and CDN style delivery as in the course). I deployed it manually first to validate the stack end-to-end, then codified the infrastructure with Terraform (including workspaces/environments where applicable).

Finally I wired GitHub Actions for CI/CD push-based deploys, secrets/OIDC style AWS auth, and remote state so infrastructure and releases follow a repeatable, team-style workflow instead of one-off console steps.

## GitHub

[github.com/iamwales/digital-twin](https://github.com/iamwales/digital-twin)

## Live URL

[Digital Twin](https://dy0w0qymcv26e.cloudfront.net/)
