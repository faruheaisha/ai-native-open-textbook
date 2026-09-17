---
title: "Chapter 5: Pretraining on Unlabeled Data"
sourceId: "01-foundations/llms-from-scratch"
sourceTitle: "LLMs from Scratch"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "01-foundations"
sourceUrl: "https://github.com/rasbt/LLMs-from-scratch"
entryUrl: "https://github.com/rasbt/LLMs-from-scratch/blob/ef9fbc2f52bf9bbb6769f43e6d726bbba4aed03e/ch05/01_main-chapter-code/README.md"
sourceRel: "ch05/01_main-chapter-code/README.md"
rawUrl: "/raw/01-foundations/llms-from-scratch/ch05/01_main-chapter-code/README.md"
sourceSha256: "6c80d7570c325f610105db09971bf91d267d57feded14f8bc999bbab00280e5a"
pageSha256: "6c80d7570c325f610105db09971bf91d267d57feded14f8bc999bbab00280e5a"
contentMode: "local-full"
zh: ""
---

# Chapter 5: Pretraining on Unlabeled Data

### Main Chapter Code

- [ch05.ipynb](https://github.com/rasbt/LLMs-from-scratch/blob/ef9fbc2f52bf9bbb6769f43e6d726bbba4aed03e/ch05/01_main-chapter-code/ch05.ipynb) contains all the code as it appears in the chapter
- [previous_chapters.py](https://github.com/rasbt/LLMs-from-scratch/blob/ef9fbc2f52bf9bbb6769f43e6d726bbba4aed03e/ch05/01_main-chapter-code/previous_chapters.py) is a Python module that contains the `MultiHeadAttention` module and `GPTModel` class from the previous chapters, which we import in [ch05.ipynb](https://github.com/rasbt/LLMs-from-scratch/blob/ef9fbc2f52bf9bbb6769f43e6d726bbba4aed03e/ch05/01_main-chapter-code/ch05.ipynb) to pretrain the GPT model
- [gpt_download.py](https://github.com/rasbt/LLMs-from-scratch/blob/ef9fbc2f52bf9bbb6769f43e6d726bbba4aed03e/ch05/01_main-chapter-code/gpt_download.py) contains the utility functions for downloading the pretrained GPT model weights
- [exercise-solutions.ipynb](https://github.com/rasbt/LLMs-from-scratch/blob/ef9fbc2f52bf9bbb6769f43e6d726bbba4aed03e/ch05/01_main-chapter-code/exercise-solutions.ipynb) contains the exercise solutions for this chapter

### Optional Code

- [gpt_train.py](https://github.com/rasbt/LLMs-from-scratch/blob/ef9fbc2f52bf9bbb6769f43e6d726bbba4aed03e/ch05/01_main-chapter-code/gpt_train.py) is a standalone Python script file with the code that we implemented in [ch05.ipynb](https://github.com/rasbt/LLMs-from-scratch/blob/ef9fbc2f52bf9bbb6769f43e6d726bbba4aed03e/ch05/01_main-chapter-code/ch05.ipynb) to train the GPT model (you can think of it as a code file summarizing this chapter)
- [gpt_generate.py](https://github.com/rasbt/LLMs-from-scratch/blob/ef9fbc2f52bf9bbb6769f43e6d726bbba4aed03e/ch05/01_main-chapter-code/gpt_generate.py) is a standalone Python script file with the code that we implemented in [ch05.ipynb](https://github.com/rasbt/LLMs-from-scratch/blob/ef9fbc2f52bf9bbb6769f43e6d726bbba4aed03e/ch05/01_main-chapter-code/ch05.ipynb) to load and use the pretrained model weights from OpenAI
