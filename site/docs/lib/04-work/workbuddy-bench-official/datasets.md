---
title: "Datasets"
sourceId: "04-work/workbuddy-bench-official"
sourceTitle: "WorkBuddy Bench（腾讯官方评测集）"
sourceKind: "产品仓库"
licenseLabel: "限非商用"
lang: "英文"
tier: 3
volume: "04-work"
sourceUrl: "https://github.com/Tencent/workbuddy-bench"
entryUrl: "https://github.com/Tencent/workbuddy-bench/blob/625b2233093ae4f23e76be28c1f341d41cc70373/README.md"
zh: ""
---

# Datasets

The WorkBuddy Bench subsets are **not stored in this git repository**. They are
published as one `.tar.gz` archive per subset on HuggingFace and downloaded into
this directory on demand.

| Subset | Archive | Tasks | Approx. size |
|--------|---------|-------|--------------|
| Code | `wb-bench-code-v1.0.tar.gz` | 80 | ~196 MB |
| Web | `wb-bench-web-v1.0.tar.gz` | 70 | ~22 MB |
| Office | `wb-bench-office-v1.0.tar.gz` | 50 | ~10 MB |
| Security | `wb-bench-sec-v1.0.tar.gz` | 60 | ~479 MB |

HuggingFace repo: [`tencent/workbuddy-bench`](https://huggingface.co/datasets/tencent/workbuddy-bench)
(override with `WB_BENCH_HF_REPO`).

## Download

```bash
./scripts/dataset/fetch-dataset.sh code       # one subset
./scripts/dataset/fetch-dataset.sh code web   # several
./scripts/dataset/fetch-dataset.sh all        # all four
```

The script prefers `huggingface-cli` and falls back to `curl`/`wget`, verifies
each archive against the repo's `SHA256SUMS`, then extracts it here. Point it at
a different repo with `WB_BENCH_HF_REPO=org/name ./scripts/dataset/fetch-dataset.sh ...`.

## Layout after download

Each archive extracts to `datasets/wb-bench-<subset>-v1.0/`:

```
datasets/wb-bench-code-v1.0/
  dataset.toml
