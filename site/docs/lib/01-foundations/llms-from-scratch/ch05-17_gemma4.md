---
title: "Gemma 4"
sourceId: "01-foundations/llms-from-scratch"
sourceTitle: "LLMs from Scratch"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "01-foundations"
sourceUrl: "https://github.com/rasbt/LLMs-from-scratch"
entryUrl: "https://github.com/rasbt/LLMs-from-scratch/blob/ef9fbc2f52bf9bbb6769f43e6d726bbba4aed03e/ch05/17_gemma4/README.md"
sourceRel: "ch05/17_gemma4/README.md"
rawUrl: "/raw/01-foundations/llms-from-scratch/ch05/17_gemma4/README.md"
sourceSha256: "f2f6ce7dc738bfc82a342a428892f3e6a248ba60d71445bfd47eb61413655b59"
pageSha256: "f2f6ce7dc738bfc82a342a428892f3e6a248ba60d71445bfd47eb61413655b59"
contentMode: "local-full"
zh: ""
---

# Gemma 4

This directory contains a standalone, text-only Gemma 4 notebook built from the Gemma 3 reference notebook and adapted for the dense `google/gemma-4-E2B` and `google/gemma-4-E4B` checkpoints.

- [standalone-gemma4.ipynb](https://github.com/rasbt/LLMs-from-scratch/blob/ef9fbc2f52bf9bbb6769f43e6d726bbba4aed03e/ch05/17_gemma4/standalone-gemma4.ipynb) implements the shared Gemma 4 dense architecture in pure PyTorch and switches between the E2B and E4B reference configs via `CHOOSE_MODEL`.
