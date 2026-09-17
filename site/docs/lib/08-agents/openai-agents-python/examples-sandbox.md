---
title: "Sandbox examples"
sourceId: "08-agents/openai-agents-python"
sourceTitle: "OpenAI Agents SDK（Python）"
sourceKind: "产品仓库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "08-agents"
sourceUrl: "https://github.com/openai/openai-agents-python"
entryUrl: "https://github.com/openai/openai-agents-python/blob/83c737fd0b8d9a53bd39fa2a0856070417bb0bd3/examples/sandbox/README.md"
sourceRel: "examples/sandbox/README.md"
rawUrl: "/raw/08-agents/openai-agents-python/examples/sandbox/README.md"
sourceSha256: "0d0f304ba335aad007d5917c1ee1cd582ddc5c12a459f62f4a9c84a00717327c"
pageSha256: "0d0f304ba335aad007d5917c1ee1cd582ddc5c12a459f62f4a9c84a00717327c"
contentMode: "local-full"
zh: ""
---

# Sandbox examples

These examples show how to run agents with an isolated workspace. Start with the small API examples when you want the smallest surface area, or use the tutorial scaffold when you want the shared layout for guided sandbox tutorials.

Most examples call a model through `Runner`, so set `OPENAI_API_KEY` in the repository-root `.env` file, in the example's `.env` file when it has one, or in your shell environment.

`sandbox_agent_with_tools.py` starts the repository's MCP v2 reference server and is intended to run with the locked development environment. The Agents SDK client itself supports both MCP v1 and v2.

## Small API examples

| Example | Run | What it shows |
| --- | --- | --- |
| [`basic.py`](https://github.com/openai/openai-agents-python/blob/83c737fd0b8d9a53bd39fa2a0856070417bb0bd3/examples/sandbox/basic.py) | `uv run python examples/sandbox/basic.py` | Creates a sandbox session from a manifest, runs a `SandboxAgent`, and streams the result. |
| [`handoffs.py`](https://github.com/openai/openai-agents-python/blob/83c737fd0b8d9a53bd39fa2a0856070417bb0bd3/examples/sandbox/handoffs.py) | `uv run python examples/sandbox/handoffs.py` | Uses handoffs with sandbox-backed agents. |
| [`sandbox_agent_capabilities.py`](https://github.com/openai/openai-agents-python/blob/83c737fd0b8d9a53bd39fa2a0856070417bb0bd3/examples/sandbox/sandbox_agent_capabilities.py) | `uv run python examples/sandbox/sandbox_agent_capabilities.py` | Configures a sandbox agent with workspace capabilities. |
| [`sandbox_agent_with_tools.py`](https://github.com/openai/openai-agents-python/blob/83c737fd0b8d9a53bd39fa2a0856070417bb0bd3/examples/sandbox/sandbox_agent_with_tools.py) | `uv run python examples/sandbox/sandbox_agent_with_tools.py` | Combines sandbox capabilities with host-defined tools. |
| [`sandbox_agents_as_tools.py`](https://github.com/openai/openai-agents-python/blob/83c737fd0b8d9a53bd39fa2a0856070417bb0bd3/examples/sandbox/sandbox_agents_as_tools.py) | `uv run python examples/sandbox/sandbox_agents_as_tools.py` | Exposes sandbox agents as tools for another agent. |
| [`sandbox_agent_with_remote_snapshot.py`](https://github.com/openai/openai-agents-python/blob/83c737fd0b8d9a53bd39fa2a0856070417bb0bd3/examples/sandbox/sandbox_agent_with_remote_snapshot.py) | `uv run python examples/sandbox/sandbox_agent_with_remote_snapshot.py` | Starts from a remote sandbox snapshot. |
| [`memory.py`](https://github.com/openai/openai-agents-python/blob/83c737fd0b8d9a53bd39fa2a0856070417bb0bd3/examples/sandbox/memory.py) | `uv run python examples/sandbox/memory.py` | Runs one sandbox agent twice across a snapshot resume so it can read and write its own memory. |
| [`memory_s3.py`](https://github.com/openai/openai-agents-python/blob/83c737fd0b8d9a53bd39fa2a0856070417bb0bd3/examples/sandbox/memory_s3.py) | `source ~/.s3.env && uv run python examples/sandbox/memory_s3.py` | Runs sandbox memory across two fresh Docker sandboxes with S3-backed memory storage. |
| [`memory_multi_agent_multiturn.py`](https://github.com/openai/openai-agents-python/blob/83c737fd0b8d9a53bd39fa2a0856070417bb0bd3/examples/sandbox/memory_multi_agent_multiturn.py) | `uv run python examples/sandbox/memory_multi_agent_multiturn.py` | Shows separate memory layouts for two agents sharing one sandbox workspace. |
| [`shared_session_workdirs.py`](https://github.com/openai/openai-agents-python/blob/83c737fd0b8d9a53bd39fa2a0856070417bb0bd3/examples/sandbox/shared_session_workdirs.py) | `uv run python examples/sandbox/shared_session_workdirs.py` | Shares one live sandbox between trusted agents while Shell, `view_image`, and `apply_patch` resolve relative paths from each run's `cwd`. This is not confinement; use separate sessions for untrusted agents or compute isolation. |
| [`unix_local_pty.py`](https://github.com/openai/openai-agents-python/blob/83c737fd0b8d9a53bd39fa2a0856070417bb0bd3/examples/sandbox/unix_local_pty.py) | `uv run python examples/sandbox/unix_local_pty.py` | Exercises an interactive pseudo-terminal in a Unix-local sandbox. |
| [`unix_local_runner.py`](https://github.com/openai/openai-agents-python/blob/83c737fd0b8d9a53bd39fa2a0856070417bb0bd3/examples/sandbox/unix_local_runner.py) | `uv run python examples/sandbox/unix_local_runner.py` | Runs against the Unix-local sandbox backend directly. |

## Cloud backend examples

Cloud-provider examples live under [`extensions/`](/lib/08-agents/openai-agents-python/examples-sandbox-extensions). They cover E2B, Modal, and Daytona sandbox backends and require provider-specific credentials in addition to `OPENAI_API_KEY`.

## Tutorial scaffold

[`tutorials/`](https://github.com/openai/openai-agents-python/blob/83c737fd0b8d9a53bd39fa2a0856070417bb0bd3/examples/sandbox/tutorials/README.md) contains the shared helper code, Docker image, and folder conventions for guided sandbox tutorials. Tutorial folders are added in separate focused changes.

## Tutorials

| Example | What it does |
| --- | --- |
| [`sandbox_resume`](/lib/08-agents/openai-agents-python/examples-sandbox-tutorials-sandbox_resume) | Edits a workspace app and reuses a sandbox snapshot. |
| [`dataroom_qa`](/lib/08-agents/openai-agents-python/examples-sandbox-tutorials-dataroom_qa) | Answers questions over a mounted dataroom with source-backed responses. |
| [`dataroom_metric_extract`](/lib/08-agents/openai-agents-python/examples-sandbox-tutorials-dataroom_metric_extract) | Extracts structured financial metrics to CSV/JSONL. |
| [`repo_code_review`](/lib/08-agents/openai-agents-python/examples-sandbox-tutorials-repo_code_review) | Reviews a sample repo and writes finding, report, and patch artifacts. |
| [`vision_website_clone`](/lib/08-agents/openai-agents-python/examples-sandbox-tutorials-vision_website_clone) | Uses vision and a browser-review loop to clone a reference static website. |

## Workflow examples

| Example | What it does |
| --- | --- |
| [`healthcare_support`](/lib/08-agents/openai-agents-python/examples-sandbox-healthcare_support) | Runs a synthetic healthcare support workflow with a standard orchestrator, sandbox policy agent, memory, and human approvals. |

## Shared files

- [`docker/`](https://github.com/openai/openai-agents-python/blob/83c737fd0b8d9a53bd39fa2a0856070417bb0bd3/examples/sandbox/docker/README.md) contains Docker-specific helper examples.
- [`misc/`](https://github.com/openai/openai-agents-python/blob/83c737fd0b8d9a53bd39fa2a0856070417bb0bd3/examples/sandbox/misc/README.md) contains reusable support code and tiny reference tools used by several sandbox examples.
