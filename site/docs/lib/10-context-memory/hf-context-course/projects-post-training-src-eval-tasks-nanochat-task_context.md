---
title: "NanoChat Task Context"
sourceId: "10-context-memory/hf-context-course"
sourceTitle: "The Context Course"
sourceKind: "系统课程"
licenseLabel: "仅引用"
lang: "英文"
tier: 1
volume: "10-context-memory"
sourceUrl: "https://github.com/huggingface/context-course"
entryUrl: "https://github.com/huggingface/context-course/blob/0448a7ca721a63a81531e1ba94f46f897c70645b/projects/post-training/src/eval/tasks/nanochat/task_context/README.md"
sourceRel: "projects/post-training/src/eval/tasks/nanochat/task_context/README.md"
rawUrl: "/raw/10-context-memory/hf-context-course/projects/post-training/src/eval/tasks/nanochat/task_context/README.md"
sourceSha256: "37bd88eb66f36e1014fd1f839a5332a811635bcaee6281b0ec7092b884f13d49"
pageSha256: "37bd88eb66f36e1014fd1f839a5332a811635bcaee6281b0ec7092b884f13d49"
contentMode: "local-full"
zh: ""
---

# NanoChat Task Context

The task uses one fixed local base model: `NanoChat`.

Useful files in a generated task directory:

- `model.py` defines the only allowed architecture.
- `prepare.py` creates the fixed train/eval data and base checkpoint.
- `train.py` is a starter nanochat-style masked SFT baseline with optional
  reward training. You may replace or extend it.
- `evaluate.py` is the fixed benchmark evaluator. It scores generative tasks by
  task-specific answer extraction and scores multiple-choice tasks from
  next-token logits over the available letters. Do not modify it.
- `timer.sh` prints the remaining task budget.

The best model must be saved as `final_model/config.json` and
`final_model/model.pt`. The evaluator rejects architecture substitutions.
