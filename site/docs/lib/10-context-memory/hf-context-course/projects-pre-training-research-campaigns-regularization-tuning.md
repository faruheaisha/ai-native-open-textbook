---
title: "Regularization Tuning Campaign"
sourceId: "10-context-memory/hf-context-course"
sourceTitle: "The Context Course"
sourceKind: "系统课程"
licenseLabel: "仅引用"
lang: "英文"
tier: 1
volume: "10-context-memory"
sourceUrl: "https://github.com/huggingface/context-course"
entryUrl: "https://github.com/huggingface/context-course/blob/0448a7ca721a63a81531e1ba94f46f897c70645b/projects/pre-training/research/campaigns/regularization-tuning.md"
sourceRel: "projects/pre-training/research/campaigns/regularization-tuning.md"
rawUrl: "/raw/10-context-memory/hf-context-course/projects/pre-training/research/campaigns/regularization-tuning.md"
sourceSha256: "bed7dec476b18996da9f89ad83b0860339e2aefe83b400d00ddd75340c9da8be"
pageSha256: "bed7dec476b18996da9f89ad83b0860339e2aefe83b400d00ddd75340c9da8be"
contentMode: "local-full"
zh: ""
---

# Regularization Tuning Campaign

**Status**: Active

**Parent Master**: `765a36b0700b3a20d552f48b8ca2b75636aa3e69`

**Theme**: Systematic exploration of regularization hyperparameters to improve validation bpb.

## Experiments

### embedding-wd-001 (CANCELLED)
- **Hypothesis**: Increase embedding weight decay from 0.0005 to 0.001 to test whether stronger regularization on token embeddings improves validation bpb.
- **Change**: Embedding optimizer group `weight_decay = 0.001` (was 0.0005)
- **Result**: Job cancelled due to hanging at step 02348 (97.6%) during final evaluation phase.
- **Conclusion**: Hypothesis remains untested due to infrastructure issues.

## Notes

- The embedding weight decay experiment encountered a job hang during evaluation, not during training.
- This suggests the issue may be related to the evaluation phase or infrastructure rather than the training configuration itself.
- Consider retrying this experiment or investigating the evaluation phase bottleneck.
