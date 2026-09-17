---
title: "Qwen3.5 0.8B From Scratch"
sourceId: "01-foundations/llms-from-scratch"
sourceTitle: "LLMs from Scratch"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "01-foundations"
sourceUrl: "https://github.com/rasbt/LLMs-from-scratch"
entryUrl: "https://github.com/rasbt/LLMs-from-scratch/blob/ef9fbc2f52bf9bbb6769f43e6d726bbba4aed03e/ch05/16_qwen3.5/README.md"
sourceRel: "ch05/16_qwen3.5/README.md"
rawUrl: "/raw/01-foundations/llms-from-scratch/ch05/16_qwen3.5/README.md"
sourceSha256: "79b3e2e62abe67c204818c04c258fedb40156c84a6f012bfd2dfc231ade4a136"
pageSha256: "79b3e2e62abe67c204818c04c258fedb40156c84a6f012bfd2dfc231ade4a136"
contentMode: "local-full"
zh: ""
---

# Qwen3.5 0.8B From Scratch

This folder contains a from-scratch style implementation of [Qwen/Qwen3.5-0.8B](https://huggingface.co/Qwen/Qwen3.5-0.8B).

<img src="https://sebastianraschka.com/images/LLMs-from-scratch-images/bonus/qwen3.5/03.webp">

Qwen3.5 is based on the Qwen3-Next architecture, which I described in more detail in section [2. (Linear) Attention Hybrids](https://magazine.sebastianraschka.com/i/177848019/2-linear-attention-hybrids) of my [Beyond Standard LLMs](https://magazine.sebastianraschka.com/p/beyond-standard-llms) article

<a href="https://magazine.sebastianraschka.com/p/beyond-standard-llms"><img src="https://sebastianraschka.com/images/LLMs-from-scratch-images/bonus/qwen3.5/02.webp" width="500px"></a>

Note that Qwen3.5 alternates `linear_attention` and `full_attention` layers.  
The notebooks keep the full model flow readable while reusing the linear-attention building blocks from the [qwen3_5_transformers.py](https://github.com/rasbt/LLMs-from-scratch/blob/ef9fbc2f52bf9bbb6769f43e6d726bbba4aed03e/ch05/16_qwen3.5/qwen3_5_transformers.py), which contains the linear attention code from Hugging Face under an Apache version 2.0 open source license.

&nbsp;
## Files

- [qwen3.5.ipynb](https://github.com/rasbt/LLMs-from-scratch/blob/ef9fbc2f52bf9bbb6769f43e6d726bbba4aed03e/ch05/16_qwen3.5/qwen3.5.ipynb): Main Qwen3.5 0.8B notebook implementation.
- [qwen3.5-plus-kv-cache.ipynb](https://github.com/rasbt/LLMs-from-scratch/blob/ef9fbc2f52bf9bbb6769f43e6d726bbba4aed03e/ch05/16_qwen3.5/qwen3.5-plus-kv-cache.ipynb): Same model with KV-cache decoding for efficiency.
- [qwen3_5_transformers.py](https://github.com/rasbt/LLMs-from-scratch/blob/ef9fbc2f52bf9bbb6769f43e6d726bbba4aed03e/ch05/16_qwen3.5/qwen3_5_transformers.py): Some helper components from Hugging Face Transformers used for Qwen3.5 linear attention.
