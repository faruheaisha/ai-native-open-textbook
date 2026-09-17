---
title: "Agents SDK Deployment Manager"
sourceId: "08-agents/openai-cookbook"
sourceTitle: "OpenAI Cookbook"
sourceKind: "官方资料集"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "08-agents"
sourceUrl: "https://github.com/openai/openai-cookbook"
entryUrl: "https://github.com/openai/openai-cookbook/blob/a0709e05a54d8dd1c4d9be3fc0a41526c3496c39/examples/agents_sdk/deployment_manager/README.md"
sourceRel: "examples/agents_sdk/deployment_manager/README.md"
rawUrl: "/raw/08-agents/openai-cookbook/examples/agents_sdk/deployment_manager/README.md"
sourceSha256: "5d09fafe36424f07215c147150514633ea912bbbe22d7b44e1fb60542805b5a8"
pageSha256: "5d09fafe36424f07215c147150514633ea912bbbe22d7b44e1fb60542805b5a8"
contentMode: "local-full"
zh: ""
---

# Agents SDK Deployment Manager

Local control-plane app for running and observing Agents SDK demo projects.

## Prerequisites

- `uv`
- `npm`
- Docker, when using the default `local-docker` target

## Run

```bash
make run
```

Open:

```text
http://127.0.0.1:8732
```

Vite builds the React UI from `frontend/` into `dist/`, and the Flask backend
serves `dist/` plus `/api/*`.

## Screenshots

### Deployments

![Deployments](/mirror/be/beb7f75fa0429a50297b49933eefdf2b1b5ed8f2.webp)

### App details

![App details](/mirror/ff/ff6ecb1c110ef35a0f48959e92d2ebb34bf1be1d.webp)

### Traces

![Traces](/mirror/6a/6aca2afabe5851883c474a2c6f12717001d56c85.webp)

## Scope

- Import a local Agents SDK project.
- Inspect entrypoints, dependencies, env vars, and sandbox usage.
- Create a local deployment record.
- Start and stop the app/orchestrator as a labeled Docker container by default.
- Generate or reuse an app-level Dockerfile for containerized deployment.
- Show deployment logs, traces, app events, and Docker container activity.
- Label sandbox containers with `agents-sdk.*` metadata so the manager can map a
  Docker container back to its deployment and run.

For Docker deployments, the default target builds an app Dockerfile and runs the
orchestrator with:

```bash
