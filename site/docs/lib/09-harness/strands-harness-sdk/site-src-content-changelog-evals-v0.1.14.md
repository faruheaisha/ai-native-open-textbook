---
title: "Strands Harness SDK"
sourceId: "09-harness/strands-harness-sdk"
sourceTitle: "Strands Harness SDK"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/strands-agents/harness-sdk"
entryUrl: "https://github.com/strands-agents/harness-sdk/blob/7bda6c70e71cd07279470268c3d3b3f4b36adf53/site/src/content/changelog/evals/v0.1.14.md"
sourceRel: "site/src/content/changelog/evals/v0.1.14.md"
rawUrl: "/raw/09-harness/strands-harness-sdk/site/src/content/changelog/evals/v0.1.14.md"
sourceSha256: "04d4865decaa97fd2438730f7c03127e4c717deb6e82f545f7fd07742cbe3bf4"
pageSha256: "04d4865decaa97fd2438730f7c03127e4c717deb6e82f545f7fd07742cbe3bf4"
contentMode: "local-full"
zh: ""
---

# Strands Harness SDK

### Major Features

#### Ground Truth Assertion Support for Goal Success Rate Evaluator — [PR#180](https://github.com/strands-agents/evals/pull/180)

The `GoalSuccessRateEvaluator` now supports a second evaluation mode: assertion-based evaluation. When `expected_assertion` is provided on the evaluation case, the judge LLM evaluates whether the agent’s behavior satisfies explicit success assertions rather than inferring goals from the conversation. This enables precise, reproducible evaluation with human-authored success criteria.

```python
from strands_evals import Case
from strands_evals.evaluators import GoalSuccessRateEvaluator

# Basic mode (existing) — judge infers goals from conversation
case_basic = Case(
    session_id="session-1",
    goal="Help user book a flight",
)

# Assertion mode (new) — judge evaluates against explicit criteria
case_assertion = Case(
    session_id="session-2",
    goal="Help user book a flight",
    expected_assertion="Agent confirmed departure city, destination, and date before searching for flights",
)

evaluator = GoalSuccessRateEvaluator()
```

Basic mode uses a Yes/No scoring rubric (Yes=1.0, No=0.0). Assertion mode uses SUCCESS/FAILURE scoring (SUCCESS=1.0, FAILURE=0.0).

#### Provider as Task Callable — [PR#183](https://github.com/strands-agents/evals/pull/183)

`TraceProvider` now exposes an `as_task()` method that returns a task callable, eliminating the need to write wrapper functions when running evaluations against traced sessions.

```python
from strands_evals.providers import TraceProvider

provider = TraceProvider(...)

# Before: manual wrapper
task = lambda case: provider.get_evaluation_data(case.session_id)

# After: built-in convenience
task = provider.as_task()
```
