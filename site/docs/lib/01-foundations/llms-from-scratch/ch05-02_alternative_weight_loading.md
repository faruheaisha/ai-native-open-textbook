---
title: "Alternative Approaches to Loading Pretrained Weights"
sourceId: "01-foundations/llms-from-scratch"
sourceTitle: "LLMs from Scratch"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "01-foundations"
sourceUrl: "https://github.com/rasbt/LLMs-from-scratch"
entryUrl: "https://github.com/rasbt/LLMs-from-scratch/blob/ef9fbc2f52bf9bbb6769f43e6d726bbba4aed03e/ch05/02_alternative_weight_loading/README.md"
sourceRel: "ch05/02_alternative_weight_loading/README.md"
rawUrl: "/raw/01-foundations/llms-from-scratch/ch05/02_alternative_weight_loading/README.md"
sourceSha256: "f4c226ff169e33c71e80d87baebbaa79002e6ea43a58607408a45c3480ad041c"
pageSha256: "f4c226ff169e33c71e80d87baebbaa79002e6ea43a58607408a45c3480ad041c"
contentMode: "local-full"
zh: ""
---

# Alternative Approaches to Loading Pretrained Weights

This folder contains alternative weight loading strategies in case the weights become unavailable from OpenAI.

- [weight-loading-pytorch.ipynb](https://github.com/rasbt/LLMs-from-scratch/blob/ef9fbc2f52bf9bbb6769f43e6d726bbba4aed03e/ch05/02_alternative_weight_loading/weight-loading-pytorch.ipynb): (Recommended) contains code to load the weights from PyTorch state dicts that I created by converting the original TensorFlow weights

- [weight-loading-hf-transformers.ipynb](https://github.com/rasbt/LLMs-from-scratch/blob/ef9fbc2f52bf9bbb6769f43e6d726bbba4aed03e/ch05/02_alternative_weight_loading/weight-loading-hf-transformers.ipynb): contains code to load the weights from the Hugging Face Model Hub via the `transformers` library

- [weight-loading-hf-safetensors.ipynb](https://github.com/rasbt/LLMs-from-scratch/blob/ef9fbc2f52bf9bbb6769f43e6d726bbba4aed03e/ch05/02_alternative_weight_loading/weight-loading-hf-safetensors.ipynb): contains code to load the weights from the Hugging Face Model Hub via the `safetensors` library directly (skipping the instantiation of a Hugging Face transformer model)
