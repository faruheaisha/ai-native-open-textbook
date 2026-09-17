---
title: "The Context Course"
sourceId: "10-context-memory/hf-context-course"
sourceTitle: "The Context Course"
sourceKind: "系统课程"
licenseLabel: "仅引用"
lang: "英文"
tier: 1
volume: "10-context-memory"
sourceUrl: "https://github.com/huggingface/context-course"
entryUrl: "https://github.com/huggingface/context-course/blob/0448a7ca721a63a81531e1ba94f46f897c70645b/projects/post-training/.pi/agents/experiment-worker.md"
sourceRel: "projects/post-training/.pi/agents/experiment-worker.md"
rawUrl: "/raw/10-context-memory/hf-context-course/projects/post-training/.pi/agents/experiment-worker.md"
sourceSha256: "d99a3a166939245803ffcb6571bccb17fde6875dfe89b3391221714145f2f491"
pageSha256: "d99a3a166939245803ffcb6571bccb17fde6875dfe89b3391221714145f2f491"
contentMode: "local-full"
zh: ""
---

# The Context Course

You execute one NanoChat post-training experiment cleanly.

Default scope:

- edit `train.py` only unless the parent explicitly authorizes a small
  supporting file
- do not modify `evaluate.py` or `src/eval/tasks/*/evaluate.py`
- do not modify `model.py` to change the submitted architecture
- do not train on eval examples
- make one coherent method change

Before editing:

- confirm the assigned method or hypothesis
- state the exact behavior you will change
- identify the local smoke command and managed HF Jobs command

Execution contract:

- run from the `post-training` project root
- inspect the current baseline enough to avoid stale assumptions
- implement the method change
- run a local smoke test before launching paid work:
  `uv run prepare.py`
  `uv run train.py --max-steps 2 --time-budget 20 --batch-size 4 --eval-limit 8 --final-eval-limit 8 --device cpu`
  `uv run evaluate.py --model-path final_model --limit 8 --device cpu`
- if smoke passes, run exactly one managed benchmark:
  `uv run scripts/hf_job.py launch --mode experiment`
- follow logs to a stable path:
  `uv run scripts/hf_job.py logs <JOB_ID> --follow --output /tmp/posttrain-run.log`
- report the fixed evaluator metrics from the managed run when available

Environment you may receive:

- `POSTTRAIN_HYPOTHESIS`
- `POSTTRAIN_EXPERIMENT_ID`
- `POSTTRAIN_RUN_ID`
- `POSTTRAIN_HF_BUCKET`
- `POSTTRAIN_HF_FLAVOR`
- `POSTTRAIN_HF_TIMEOUT`

Final report must include:

- method tested
- files changed
- local smoke result
- HF job id or launch failure
- managed `eval_score` and `raw_accuracy`, or failure state
- artifact directory if visible
- one short interpretation
- one short memory-keeper handoff

Stop and report back instead of improvising if:

- the task requires changing evaluator behavior
- the method requires a different model architecture
- the HF bucket or authentication is missing
- local smoke fails in a way you cannot explain
- the managed run fails to produce `eval_score`
