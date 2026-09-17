---
title: "Gemma 3 270M From Scratch"
sourceId: "01-foundations/llms-from-scratch"
sourceTitle: "LLMs from Scratch"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "01-foundations"
sourceUrl: "https://github.com/rasbt/LLMs-from-scratch"
entryUrl: "https://github.com/rasbt/LLMs-from-scratch/blob/ef9fbc2f52bf9bbb6769f43e6d726bbba4aed03e/ch05/12_gemma3/README.md"
sourceRel: "ch05/12_gemma3/README.md"
rawUrl: "/raw/01-foundations/llms-from-scratch/ch05/12_gemma3/README.md"
sourceSha256: "4067ae1ba28644e9a9ced45eca3c265a67013d37797df2f3888c39a51cdbdf57"
pageSha256: "4067ae1ba28644e9a9ced45eca3c265a67013d37797df2f3888c39a51cdbdf57"
contentMode: "local-full"
zh: ""
---

# Gemma 3 270M From Scratch

This [standalone-gemma3.ipynb](https://github.com/rasbt/LLMs-from-scratch/blob/ef9fbc2f52bf9bbb6769f43e6d726bbba4aed03e/ch05/12_gemma3/standalone-gemma3.ipynb) Jupyter notebook in this folder contains a from-scratch implementation of Gemma 3 270M. It requires about 2 GB of RAM to run. 

The alternative [standalone-gemma3-plus-kvcache.ipynb](https://github.com/rasbt/LLMs-from-scratch/blob/ef9fbc2f52bf9bbb6769f43e6d726bbba4aed03e/ch05/12_gemma3/standalone-gemma3-plus-kvcache.ipynb) notebook adds a KV cache for better runtime performance (but adds more code complexity). To learn more about KV caching, see my [Understanding and Coding the KV Cache in LLMs from Scratch](https://magazine.sebastianraschka.com/p/coding-the-kv-cache-in-llms) article.

| Model             | Mode              | Hardware        | Tokens/sec | GPU Memory (VRAM) |
| ----------------- | ----------------- | --------------- | ---------- | ----------------- |
| Gemma3Model 270M  | Regular           | Mac Mini M4 CPU | 8          | -                 |
| Gemma3Model 270M  | Regular compiled  | Mac Mini M4 CPU | 9          | -                 |
| Gemma3Model 270M  | KV cache          | Mac Mini M4 CPU | 130        | -                 |
| Gemma3Model 270M  | KV cache compiled | Mac Mini M4 CPU | 224        | -                 |
|                   |                   |                 |            |                   |
| Gemma3Model 270M  | Regular           | Mac Mini M4 GPU | 16         | -                 |
| Gemma3Model 270M  | Regular compiled  | Mac Mini M4 GPU | Error      | -                 |
| Gemma3Model 270M  | KV cache          | Mac Mini M4 GPU | 23         | -                 |
| Gemma3Model 270M  | KV cache compiled | Mac Mini M4 GPU | Error      | -                 |
|                   |                   |                 |            |                   |
| Gemma3Model 270M  | Regular           | Nvidia A100 GPU | 28         | 1.84 GB           |
| Gemma3Model 270M  | Regular compiled  | Nvidia A100 GPU | 128        | 2.12 GB           |
| Gemma3Model 270M  | KV cache          | Nvidia A100 GPU | 26         | 1.77 GB           |
| Gemma3Model 270M  | KV cache compiled | Nvidia A100 GPU | 99         | 2.12 GB           |

Below is a side-by-side comparison with Qwen3 0.6B as a reference model; if you are interested in the Qwen3 0.6B standalone notebook, you can find it [here](/lib/01-foundations/llms-from-scratch/ch05-11_qwen3).

<br>

<img src="https://sebastianraschka.com/images/LLMs-from-scratch-images/bonus/gemma3/gemma3-vs-qwen3.webp">

<br>

To learn more about the architecture differences and read about comparisons with other architectures, see my [The Big LLM Architecture Comparison: From DeepSeek-V3 to Kimi K2: A Look At Modern LLM Architecture Design](https://magazine.sebastianraschka.com/p/the-big-llm-architecture-comparison) article.
