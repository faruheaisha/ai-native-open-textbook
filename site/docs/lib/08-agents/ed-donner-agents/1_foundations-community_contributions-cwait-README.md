---
title: "Week 1 extra: agent loop — bill split and tip"
sourceId: "08-agents/ed-donner-agents"
sourceTitle: "Ed Donner：AI Agents 实战课"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "08-agents"
sourceUrl: "https://github.com/ed-donner/agents"
entryUrl: ""
zh: ""
---

# Week 1 extra: agent loop — bill split and tip

This folder is a Week 1 extra exercise solution (see [`1_foundations/5_extra.ipynb`](https://github.com/ed-donner/agents/blob/8ceaf66c24643627c1e4806851736bdd444bdd4b/1_foundations/5_extra.ipynb)): an **agent loop built from scratch** with **todo tools** and a **safe `calculate` tool** so arithmetic is done in code (not guessed by the model). The scenario (bill + tip + split) is intentionally simple so the notebook stays focused on **demonstrating the agent loop**—tool schemas, dispatch, todos, and the driver loop—without extra domain noise.

## Problem

Given a restaurant bill, tip percentage, and number of people, the agent should report **how much each person pays** after tip, using the tools until the task is done.

## Setup

- Complete the course [setup](https://github.com/ed-donner/agents/blob/8ceaf66c24643627c1e4806851736bdd444bdd4b/1_foundations/setup/README.md) so `OPENAI_API_KEY` is in your environment (or `.env` at the repo root).
- Optional: set `OPENAI_MODEL` (defaults to `gpt-4o-mini` in the notebook).

## Run

Open `5_extra_bill_split_agent.ipynb` in Jupyter or Cursor and run all cells. The last cells reset state and run one demo prompt.

## Inspired by

[`1_foundations/5_extra.ipynb`](https://github.com/ed-donner/agents/blob/8ceaf66c24643627c1e4806851736bdd444bdd4b/1_foundations/5_extra.ipynb) — same loop shape (tool schemas → `handle_tool_calls` → loop until no tool calls).

## Next step
- Using the same setup but solving a problem worth using LLMs
