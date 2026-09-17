---
title: "Adding Bells and Whistles to the Training Loop"
sourceId: "01-foundations/llms-from-scratch"
sourceTitle: "LLMs from Scratch"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "01-foundations"
sourceUrl: "https://github.com/rasbt/LLMs-from-scratch"
entryUrl: "https://github.com/rasbt/LLMs-from-scratch/blob/ef9fbc2f52bf9bbb6769f43e6d726bbba4aed03e/ch05/04_learning_rate_schedulers/README.md"
sourceRel: "ch05/04_learning_rate_schedulers/README.md"
rawUrl: "/raw/01-foundations/llms-from-scratch/ch05/04_learning_rate_schedulers/README.md"
sourceSha256: "9c8dabd2eb0fd805ba2f1e0bfb958b10b0456dd12d335025da3235d99dcbfda6"
pageSha256: "9c8dabd2eb0fd805ba2f1e0bfb958b10b0456dd12d335025da3235d99dcbfda6"
contentMode: "local-full"
zh: ""
---

# Adding Bells and Whistles to the Training Loop

The main chapter used a relatively simple training function to keep the code readable and fit Chapter 5 within the page limits. Optionally, we can add a linear warm-up, a cosine decay schedule, and gradient clipping to improve the training stability and convergence.

You can find the code for this more sophisticated training function in [Appendix D: Adding Bells and Whistles to the Training Loop](https://github.com/rasbt/LLMs-from-scratch/blob/ef9fbc2f52bf9bbb6769f43e6d726bbba4aed03e/appendix-D/01_main-chapter-code/appendix-D.ipynb).
