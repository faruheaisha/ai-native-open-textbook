---
title: "Agents SDK Deployment Manager"
sourceId: "08-agents/openai-cookbook-docs"
sourceTitle: "openai-cookbook-docs"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "08-agents"
sourceUrl: "https://developers.openai.com/cookbook"
entryUrl: "https://developers.openai.com/cookbook"
sourceRel: "cookbook/examples/agents_sdk/deployment_manager/readme.md"
rawUrl: "/raw/08-agents/openai-cookbook-docs/cookbook/examples/agents_sdk/deployment_manager/readme.md"
sourceSha256: "36f3ed267c8d158e526a4e207e990a855acce060a5ebe200baa34af84e650421"
pageSha256: "36f3ed267c8d158e526a4e207e990a855acce060a5ebe200baa34af84e650421"
contentMode: "local-full"
zh: ""
---

# Agents SDK Deployment Manager

> For the complete documentation index, see [llms.txt](https://developers.openai.com/llms.txt). Markdown versions of documentation pages are available by appending `.md` to the page URL.

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

![Deployments](https://developers.openai.com/cookbook/assets/examples/agents_sdk/deployment_manager/docs/screenshots/deployments.png)

### App details

![App details](https://developers.openai.com/cookbook/assets/examples/agents_sdk/deployment_manager/docs/screenshots/app-details.png)

### Traces

![Traces](https://developers.openai.com/cookbook/assets/examples/agents_sdk/deployment_manager/docs/screenshots/traces.png)

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
