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
entryUrl: "https://github.com/openai/openai-cookbook/blob/a0709e05a54d8dd1c4d9be3fc0a41526c3496c39/README.md"
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

![Deployments](https://gh-proxy.com/https://raw.githubusercontent.com/openai/openai-cookbook/a0709e05a54d8dd1c4d9be3fc0a41526c3496c39/examples/agents_sdk/deployment_manager/docs/screenshots/deployments.png)

### App details

![App details](https://gh-proxy.com/https://raw.githubusercontent.com/openai/openai-cookbook/a0709e05a54d8dd1c4d9be3fc0a41526c3496c39/examples/agents_sdk/deployment_manager/docs/screenshots/app-details.png)

### Traces

![Traces](https://gh-proxy.com/https://raw.githubusercontent.com/openai/openai-cookbook/a0709e05a54d8dd1c4d9be3fc0a41526c3496c39/examples/agents_sdk/deployment_manager/docs/screenshots/traces.png)

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
