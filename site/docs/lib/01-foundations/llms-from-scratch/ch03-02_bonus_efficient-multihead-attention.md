---
title: "More Efficient Multi-Head Attention Implementations"
sourceId: "01-foundations/llms-from-scratch"
sourceTitle: "LLMs from Scratch"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "01-foundations"
sourceUrl: "https://github.com/rasbt/LLMs-from-scratch"
entryUrl: "https://github.com/rasbt/LLMs-from-scratch/blob/ef9fbc2f52bf9bbb6769f43e6d726bbba4aed03e/ch03/02_bonus_efficient-multihead-attention/README.md"
sourceRel: "ch03/02_bonus_efficient-multihead-attention/README.md"
rawUrl: "/raw/01-foundations/llms-from-scratch/ch03/02_bonus_efficient-multihead-attention/README.md"
sourceSha256: "24fdbe3e796dec4132978d6dac5fd04980b82aa77e4e28072e3f04682bc2b33c"
pageSha256: "24fdbe3e796dec4132978d6dac5fd04980b82aa77e4e28072e3f04682bc2b33c"
contentMode: "local-full"
zh: ""
---

# More Efficient Multi-Head Attention Implementations

- [mha-implementations.ipynb](https://github.com/rasbt/LLMs-from-scratch/blob/ef9fbc2f52bf9bbb6769f43e6d726bbba4aed03e/ch03/02_bonus_efficient-multihead-attention/mha-implementations.ipynb) contains and compares different implementations of multi-head attention

### Summary

The figures below summarize the performance benchmarks (lower is better).

&nbsp;
#### Forward pass only

<a href="https://github.com/rasbt/LLMs-from-scratch/blob/ef9fbc2f52bf9bbb6769f43e6d726bbba4aed03e/ch03/02_bonus_efficient-multihead-attention/mha-implementations.ipynb"><img src="https://sebastianraschka.com/images/LLMs-from-scratch-images/bonus/mha-benchmark/1_forward-only.webp?1" width="500px"></a>

&nbsp;
#### Forward and backward pass

<a href="https://github.com/rasbt/LLMs-from-scratch/blob/ef9fbc2f52bf9bbb6769f43e6d726bbba4aed03e/ch03/02_bonus_efficient-multihead-attention/mha-implementations.ipynb"><img src="https://sebastianraschka.com/images/LLMs-from-scratch-images/bonus/mha-benchmark/2_forward-and-backward.webp?1" width="500px"></a>

&nbsp;
#### Forward and backward pass after compilation

<a href="https://github.com/rasbt/LLMs-from-scratch/blob/ef9fbc2f52bf9bbb6769f43e6d726bbba4aed03e/ch03/02_bonus_efficient-multihead-attention/mha-implementations.ipynb"><img src="https://sebastianraschka.com/images/LLMs-from-scratch-images/bonus/mha-benchmark/3_forward-and-backward-compiled.webp?1" width="500px"></a>
