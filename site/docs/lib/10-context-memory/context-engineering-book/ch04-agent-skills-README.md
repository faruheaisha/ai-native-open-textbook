---
title: "Agent skills for CLI workflows"
sourceId: "10-context-memory/context-engineering-book"
sourceTitle: "Context Engineering（Bonigarcia 教程）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/bonigarcia/context-engineering"
entryUrl: "https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/README.md"
zh: ""
---

# Agent skills for CLI workflows

This folder contains an example of an [Agent Skill](https://agentskills.io/) used to guide a CLI-capable agent through a workspace analysis task.

## Example

- `workspace-analyzer/`: A skill that helps the agent inspect a project tree, identify temporary files, and perform only the approved cleanup or reorganization steps.

## Usage

Agent skills are loaded by compatible agents from their configured skills directory. In this chapter, the skill is used as procedural context that narrows how a terminal agent should explore and modify the workspace.
