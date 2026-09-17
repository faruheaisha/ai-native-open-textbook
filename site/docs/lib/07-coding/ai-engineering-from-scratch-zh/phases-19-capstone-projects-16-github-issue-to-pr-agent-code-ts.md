---
title: "Lesson 16 - GitHub Issue-to-PR Agent (TypeScript webhook receiver)"
sourceId: "07-coding/ai-engineering-from-scratch-zh"
sourceTitle: "AI 工程从零到一（中文）"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "中文"
tier: 1
volume: "07-coding"
sourceUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh"
entryUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh/blob/109181ce68128c1bf27ec20867177007a8bace89/phases/19-capstone-projects/16-github-issue-to-pr-agent/code/ts/README.md"
sourceRel: "phases/19-capstone-projects/16-github-issue-to-pr-agent/code/ts/README.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch-zh/phases/19-capstone-projects/16-github-issue-to-pr-agent/code/ts/README.md"
sourceSha256: "b0d11e05424d6a396890868d5df3f8e9169143916740aa3befd415cf377e0f8b"
pageSha256: "b0d11e05424d6a396890868d5df3f8e9169143916740aa3befd415cf377e0f8b"
contentMode: "local-full"
zh: ""
---

# Lesson 16 - GitHub Issue-to-PR Agent (TypeScript webhook receiver)

TypeScript half of the capstone. Python side ships the agent loop and
dispatcher; YAML side ships the Actions workflow. This project is the GitHub
App webhook receiver: HMAC verify the raw body, route on event type, dispatch
a stub agent for `issues.opened`.

## Layout

```text
src/
  index.ts    entry: demo (default) or HTTP server (--serve)
  server.ts   Hono webhook receiver (POST /webhook)
  verify.ts   X-Hub-Signature-256 HMAC, timing-safe
  router.ts   event-type routing (ping, issues, pull_request)
  agent.ts    stub agent + audit log
  types.ts    payload + audit shapes
tests/
  verify.test.ts  signature pass, tampered, router pathing
```

## Run

```bash
npm install
npm run typecheck
npm test
npm start            # self-terminating demo (in-process replays)
npm run serve        # HTTP server on :8081
```

The HMAC secret is read from `GH_WEBHOOK_SECRET` (default `demo-shared-secret`
for the demo).
