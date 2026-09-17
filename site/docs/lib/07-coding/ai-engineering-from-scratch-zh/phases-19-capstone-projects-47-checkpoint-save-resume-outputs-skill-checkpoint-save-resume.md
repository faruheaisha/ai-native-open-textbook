---
title: "AI 工程从零到一（中文）"
sourceId: "07-coding/ai-engineering-from-scratch-zh"
sourceTitle: "AI 工程从零到一（中文）"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "中文"
tier: 1
volume: "07-coding"
sourceUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh"
entryUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh/blob/109181ce68128c1bf27ec20867177007a8bace89/phases/19-capstone-projects/47-checkpoint-save-resume/outputs/skill-checkpoint-save-resume.md"
sourceRel: "phases/19-capstone-projects/47-checkpoint-save-resume/outputs/skill-checkpoint-save-resume.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch-zh/phases/19-capstone-projects/47-checkpoint-save-resume/outputs/skill-checkpoint-save-resume.md"
sourceSha256: "1da812db94b389144e5b206d83ae74bcd8d0fd4500ae38c96239418979d57194"
pageSha256: "1da812db94b389144e5b206d83ae74bcd8d0fd4500ae38c96239418979d57194"
contentMode: "local-full"
zh: ""
---

# AI 工程从零到一（中文）

## When to use

Any training run longer than the wallclock cap of the cluster, any run that must survive a node reboot, any model too large for a single payload.

## Payload shape

```python
{
  "schema": "ckpt.v1",
  "model": model.state_dict(),
  "optimizer": opt.state_dict(),
  "scheduler": sched.state_dict(),
  "state": {"step": int, "epoch": int, "batch_in_epoch": int, "losses": [float, ...]},
  "rng": {"python": ..., "numpy": ..., "torch_cpu": ..., "torch_cuda": ...},
  "wall_saved_at": time.time(),
}
```

## Atomic save

1. Write the payload to a unique temp file in the same directory as the target.
2. `os.replace(tmp, target)` to swap atomically.
3. Never write directly to the target name.

## Sharded layout

- `model.shard-NNN.pt` per shard, round robin on keys or split by parameter group.
- `meta.pt` carries optimizer, scheduler, train state, RNG, and the shard manifest.
- `index.json` carries `sha256` for every shard and for `meta.pt`.
- Loader verifies every hash before merging.

## Mid-epoch resume

- Save `(epoch, batch_in_epoch)` next to `step`.
- Restore RNG state before the first batch of the resumed epoch.
- Fast-forward the generator past consumed batches.

## Failure modes

- Cross-device rename: not atomic, lose the previous file. Put temp in same directory.
- Forgetting RNG: resumed loss diverges from baseline. Run the demo's assertion.
- Forgetting optimizer state: next step lurches. Same diff blows up.
- Pruning the wrong checkpoint: keep last K plus best.
