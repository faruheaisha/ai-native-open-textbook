---
title: "Program"
sourceId: "10-context-memory/hf-context-course"
sourceTitle: "The Context Course"
sourceKind: "系统课程"
licenseLabel: "仅引用"
lang: "英文"
tier: 1
volume: "10-context-memory"
sourceUrl: "https://github.com/huggingface/context-course"
entryUrl: "https://github.com/huggingface/context-course/blob/0448a7ca721a63a81531e1ba94f46f897c70645b/projects/inference/program.md"
sourceRel: "projects/inference/program.md"
rawUrl: "/raw/10-context-memory/hf-context-course/projects/inference/program.md"
sourceSha256: "d904163ff2fe52dca93e907245507961a2e11231c2ac1daa1e28bbae02db642b"
pageSha256: "d904163ff2fe52dca93e907245507961a2e11231c2ac1daa1e28bbae02db642b"
contentMode: "local-full"
zh: ""
---

# Program

Optimize local llama.cpp inference for speed.

The benchmark target is a GGUF model served through `llama-server`. Use the
local `huggingface-local-models` skill to find llama.cpp-compatible repos,
choose a quant, confirm exact `.gguf` filenames, and build portable
`--hf-repo` / `--hf-file` commands.

Start with:

```bash
uv run scripts/inspect_llama_toolchain.py
uv run scripts/resolve_hf_gguf.py --repo <owner/repo> --quant Q4_K_M
```

Then benchmark:

```bash
uv run scripts/benchmark_llama.py \
  --server-cmd "llama-server --hf-repo <owner/repo> --hf-file <file.gguf> -c 4096 --port 8080" \
  --append-tsv research/results.tsv
```

Improve one variable at a time: quant, context, backend acceleration, thread
count, GPU offload, batch sizing, cache type, or server concurrency. Do not
claim a speedup until the same benchmark has been run before and after the
change.
