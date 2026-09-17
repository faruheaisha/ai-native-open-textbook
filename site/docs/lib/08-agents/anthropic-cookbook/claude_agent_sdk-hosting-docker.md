---
title: "Tier 1 — Local Docker"
sourceId: "08-agents/anthropic-cookbook"
sourceTitle: "Claude Cookbooks"
sourceKind: "官方资料集"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "08-agents"
sourceUrl: "https://github.com/anthropics/anthropic-cookbook"
entryUrl: "https://github.com/anthropics/anthropic-cookbook/blob/a97b9a2dc300635f0c26b5e05d0b54bbe0279ee5/claude_agent_sdk/hosting/docker/README.md"
sourceRel: "claude_agent_sdk/hosting/docker/README.md"
rawUrl: "/raw/08-agents/anthropic-cookbook/claude_agent_sdk/hosting/docker/README.md"
sourceSha256: "44a8d6fe35a0464a5a30b8e53d45760ce1029a8d45abd5a7cdc1e2ae92d5864d"
pageSha256: "44a8d6fe35a0464a5a30b8e53d45760ce1029a8d45abd5a7cdc1e2ae92d5864d"
contentMode: "local-full"
zh: ""
---

# Tier 1 — Local Docker

Runs the shared image locally. Two paths:

## Ephemeral (no server)

One prompt, one process, then exit. Good for job-shaped work (batch processing,
one-off analysis) where there's no conversation to resume.

```bash
cd claude_agent_sdk/
docker build -f hosting/Dockerfile -t research-agent .
docker run --rm \
  -e ANTHROPIC_API_KEY="$ANTHROPIC_API_KEY" \
  -e PROMPT="What is the Claude Agent SDK?" \
  research-agent
```

## Hybrid (with a server)

Starts the FastAPI server and mounts `./sessions` at `/data` so conversations
survive container restarts.

```bash
cd claude_agent_sdk/hosting/docker/
docker compose up --build
```

Then, from another shell:

```bash
curl -N -X POST http://localhost:8000/sessions/demo-1/messages \
  -H 'Content-Type: application/json' \
  -d '{"prompt":"What are the latest AI agent trends?"}'

# Follow-up — the agent remembers the first turn:
curl -N -X POST http://localhost:8000/sessions/demo-1/messages \
  -H 'Content-Type: application/json' \
  -d '{"prompt":"Tell me more about the second one."}'

curl http://localhost:8000/health
```

Stop the container, `docker compose up` again, send another follow-up — the
agent still has context because `./sessions` persisted `/data`.
