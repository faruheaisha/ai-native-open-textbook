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
entryUrl: "https://github.com/strands-agents/harness-sdk/blob/7bda6c70e71cd07279470268c3d3b3f4b36adf53/site/src/content/changelog/evals/v0.1.5.md"
sourceRel: "site/src/content/changelog/evals/v0.1.5.md"
rawUrl: "/raw/09-harness/strands-harness-sdk/site/src/content/changelog/evals/v0.1.5.md"
sourceSha256: "94a89de11299bb2417759d80175c86480275ecae3d884ed5a87ec336eafff1e5"
pageSha256: "94a89de11299bb2417759d80175c86480275ecae3d884ed5a87ec336eafff1e5"
contentMode: "local-full"
zh: ""
---

# Strands Harness SDK

## Major Features

### Response Relevance Evaluator - [PR#112](https://github.com/strands-agents/evals/pull/112)

The new `ResponseRelevanceEvaluator` measures how well an agent's response addresses the user's question. It uses a 5-level LLM-as-judge scoring system — *Not At All* (0.0), *Not Generally* (0.25), *Neutral/Mixed* (0.5), *Generally Yes* (0.75), and *Completely Yes* (1.0) — with a pass threshold at ≥0.5. Like other trace-level evaluators, it requires an `actual_trajectory` session and supports both sync and async evaluation.

```python
from strands_evals.evaluators import ResponseRelevanceEvaluator

evaluator = ResponseRelevanceEvaluator()
results = evaluator.evaluate(evaluation_data)

# results[0].score    -> 1.0  (for COMPLETELY_YES)
# results[0].test_pass -> True (score >= 0.5)
# results[0].reason   -> "The response directly answers the question."
# results[0].label    -> ResponseRelevanceScore.COMPLETELY_YES
```

### Conciseness Evaluator - [PR#115](https://github.com/strands-agents/evals/pull/115)

The new `ConcisenessEvaluator` assesses whether an agent's response is appropriately concise. It uses a 3-level scoring system: *Perfectly Concise* (1.0) for responses that deliver exactly what was asked, *Partially Concise* (0.5) for minor extra wording, and *Not Concise* (0.0) for verbose or repetitive content. The pass threshold is ≥0.5. Both evaluators accept an optional custom `model` and `system_prompt` for the LLM judge.

```python
from strands_evals.evaluators import ConcisenessEvaluator

evaluator = ConcisenessEvaluator()
results = evaluator.evaluate(evaluation_data)

# results[0].score    -> 0.0  (for NOT_CONCISE)
# results[0].test_pass -> False (score < 0.5)
# results[0].label    -> ConcisenessScore.NOT_CONCISE
```

### Automatic Retry with Exponential Backoff for Throttled Evaluations - [PR#107](https://github.com/strands-agents/evals/pull/107)

`Experiment.run_evaluations()` and `run_evaluations_async()` now automatically retry on throttling errors using [tenacity](https://github.com/jd/tenacity). Both task execution and evaluator execution are wrapped with exponential backoff (up to 6 attempts, 4s → 240s). Throttling is detected for `ModelThrottledException`, `EventLoopException`, and botocore `ClientError` with codes like `ThrottlingException` and `TooManyRequestsException`. Non-throttling errors are raised immediately without retrying. Additionally, one evaluator failing no longer prevents other evaluators from running on the same case.

```python
from strands_evals import Case, Experiment
from strands_evals.evaluators import OutputEvaluator, ConcisenessEvaluator

experiment = Experiment(
    cases=[Case(name="test", input="What is 2+2?", expected_output="4")],
    evaluators=[
        OutputEvaluator(rubric="Is the answer correct?"),
        ConcisenessEvaluator(),
    ],
)

# Throttling errors are retried automatically with exponential backoff.
# If one evaluator fails, the other still runs.
reports = experiment.run_evaluations(my_agent)
```

---

## Bug Fixes

* **Replace Deprecated Structured Output Methods** - [PR#67](https://github.com/strands-agents/evals/pull/67)
  Updated `OutputEvaluator` to call the agent with the `structured_output_model` parameter instead of the removed `structured_output()` and `structured_output_async()` methods. Without this fix, `OutputEvaluator` would fail on recent Strands SDK versions.
