---
title: "Optimizing Hyperparameters for Pretraining"
sourceId: "01-foundations/llms-from-scratch"
sourceTitle: "LLMs from Scratch"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "01-foundations"
sourceUrl: "https://github.com/rasbt/LLMs-from-scratch"
entryUrl: "https://github.com/rasbt/LLMs-from-scratch/blob/ef9fbc2f52bf9bbb6769f43e6d726bbba4aed03e/ch05/05_bonus_hparam_tuning/README.md"
sourceRel: "ch05/05_bonus_hparam_tuning/README.md"
rawUrl: "/raw/01-foundations/llms-from-scratch/ch05/05_bonus_hparam_tuning/README.md"
sourceSha256: "7e6d7596ceb3804100047a546c23ad7c9e36cc577c93460bdba7683034b6f110"
pageSha256: "7e6d7596ceb3804100047a546c23ad7c9e36cc577c93460bdba7683034b6f110"
contentMode: "local-full"
zh: ""
---

# Optimizing Hyperparameters for Pretraining

The [hparam_search.py](https://github.com/rasbt/LLMs-from-scratch/blob/ef9fbc2f52bf9bbb6769f43e6d726bbba4aed03e/ch05/05_bonus_hparam_tuning/hparam_search.py) script, based on the extended training function in [Appendix D: Adding Bells and Whistles to the Training Loop](https://github.com/rasbt/LLMs-from-scratch/blob/ef9fbc2f52bf9bbb6769f43e6d726bbba4aed03e/appendix-D/01_main-chapter-code/appendix-D.ipynb), is designed to find optimal hyperparameters via grid search.

>[!NOTE]
This script will take a long time to run. You may want to reduce the number of hyperparameter configurations explored in the `HPARAM_GRID` dictionary at the top.
