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
entryUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh/blob/109181ce68128c1bf27ec20867177007a8bace89/phases/19-capstone-projects/48-distributed-fsdp-ddp/outputs/skill-distributed-fsdp-ddp.md"
sourceRel: "phases/19-capstone-projects/48-distributed-fsdp-ddp/outputs/skill-distributed-fsdp-ddp.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch-zh/phases/19-capstone-projects/48-distributed-fsdp-ddp/outputs/skill-distributed-fsdp-ddp.md"
sourceSha256: "60bdc7a3ed439cf8dc531c9746d0a67501947dae5f1c85d3fc8b031e6874cbd2"
pageSha256: "60bdc7a3ed439cf8dc531c9746d0a67501947dae5f1c85d3fc8b031e6874cbd2"
contentMode: "local-full"
zh: ""
---

# AI 工程从零到一（中文）

## When to use

The model fits on one device but you need more throughput (DDP). The model does not fit on one device (FSDP). Either case: a multi-rank training setup with the same code path.

## Bring up the process group

```python
os.environ["MASTER_ADDR"] = "127.0.0.1"
os.environ["MASTER_PORT"] = str(port)
dist.init_process_group(backend="gloo", rank=rank, world_size=world_size)
```

`gloo` is the CPU backend; `nccl` is the GPU backend. Both implement the same collective surface.

## Wrap the model

1. On rank 0, build the model from your seed.
2. Wrap it with the DDP shell.
3. The shell's `__init__` calls `dist.broadcast(p.data, src=0)` for every parameter and buffer.
4. After every `loss.backward()`, the trainer calls `sync_grads()`.
5. `sync_grads()` calls `dist.all_reduce(p.grad, op=SUM)` and `p.grad.div_(world_size)`.
6. Optimizer step on every rank with the same averaged gradient.

## Shard parameters (FSDP sketch)

1. Flatten each parameter, pad to a multiple of `world_size`.
2. Keep your shard locally; release the rest.
3. Before forward, `dist.all_gather(...)` to rebuild the full tensor on every rank.
4. After forward, drop the full tensor.

## Failure modes

- Skipping the broadcast: ranks start from different inits, diverge silently.
- Forgetting to divide after sum: gradients scaled by world_size, optimizer steps too big.
- Using cross-device rename for checkpoints: not atomic; same lesson 47 trap.
- Mixing CPU and CUDA tensors on the same collective: backend mismatch, run hangs.
