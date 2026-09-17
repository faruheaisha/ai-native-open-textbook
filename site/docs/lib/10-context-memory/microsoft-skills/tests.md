---
title: "Skill Evaluation Test Harness"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/tests/README.md"
sourceRel: "tests/README.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/tests/README.md"
sourceSha256: "a5ca9efba72395a40f3e8b1cb6b6ddb99a3e772a265b5cd0553a9245b57250ec"
pageSha256: "a5ca9efba72395a40f3e8b1cb6b6ddb99a3e772a265b5cd0553a9245b57250ec"
contentMode: "local-full"
zh: ""
---

# Skill Evaluation Test Harness

## Quick Start

```bash
cd tests
pnpm install
pnpm harness --list                              # List available skills
pnpm harness azure-ai-projects-py --mock --verbose # Run evaluation
pnpm test                                        # Run unit tests
```

## Overview

A TypeScript test framework for evaluating AI-generated code against acceptance criteria defined in skill files. Powered by the [GitHub Copilot SDK](https://github.com/github/copilot-sdk).

**Workflow:**

1. Load acceptance criteria from `tests/scenarios/<skill>/acceptance-criteria.md`
2. Run test scenarios from `tests/scenarios/<skill>/scenarios.yaml`
3. Generate code using [GitHub Copilot SDK](https://github.com/github/copilot-sdk) (or mock responses)
4. Evaluate code against correct/incorrect patterns
5. Report results via console, markdown, or JSON

## Architecture

```
tests/
├── harness/
│   ├── types.ts              # Type definitions
│   ├── criteria-loader.ts    # Parses acceptance-criteria.md
│   ├── evaluator.ts          # Validates code against patterns
│   ├── copilot-client.ts     # Wraps Copilot SDK (with mock fallback)
│   ├── runner.ts             # Main CLI runner
│   ├── ralph-loop.ts         # Iterative improvement loop
│   ├── feedback-builder.ts   # LLM-actionable feedback generator
│   ├── index.ts              # Package exports
│   └── reporters/
│       ├── console.ts        # Pretty console output
│       └── markdown.ts       # Markdown report generation
│
├── scenarios/
