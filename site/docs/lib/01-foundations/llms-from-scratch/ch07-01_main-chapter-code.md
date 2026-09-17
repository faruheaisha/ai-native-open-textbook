---
title: "Chapter 7: Finetuning to Follow Instructions"
sourceId: "01-foundations/llms-from-scratch"
sourceTitle: "LLMs from Scratch"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "01-foundations"
sourceUrl: "https://github.com/rasbt/LLMs-from-scratch"
entryUrl: "https://github.com/rasbt/LLMs-from-scratch/blob/ef9fbc2f52bf9bbb6769f43e6d726bbba4aed03e/ch07/01_main-chapter-code/README.md"
sourceRel: "ch07/01_main-chapter-code/README.md"
rawUrl: "/raw/01-foundations/llms-from-scratch/ch07/01_main-chapter-code/README.md"
sourceSha256: "6c6551b7d792cc2a64d93815c1c3e2c2e0e08aff0f00d9e23edc2418c13b62f6"
pageSha256: "6c6551b7d792cc2a64d93815c1c3e2c2e0e08aff0f00d9e23edc2418c13b62f6"
contentMode: "local-full"
zh: ""
---

# Chapter 7: Finetuning to Follow Instructions

### Main Chapter Code

- [ch07.ipynb](https://github.com/rasbt/LLMs-from-scratch/blob/ef9fbc2f52bf9bbb6769f43e6d726bbba4aed03e/ch07/01_main-chapter-code/ch07.ipynb) contains all the code as it appears in the chapter
- [previous_chapters.py](https://github.com/rasbt/LLMs-from-scratch/blob/ef9fbc2f52bf9bbb6769f43e6d726bbba4aed03e/ch07/01_main-chapter-code/previous_chapters.py) is a Python module that contains the GPT model we coded and trained in previous chapters, alongside many utility functions, which we reuse in this chapter
- [gpt_download.py](https://github.com/rasbt/LLMs-from-scratch/blob/ef9fbc2f52bf9bbb6769f43e6d726bbba4aed03e/ch07/01_main-chapter-code/gpt_download.py) contains the utility functions for downloading the pretrained GPT model weights
- [exercise-solutions.ipynb](https://github.com/rasbt/LLMs-from-scratch/blob/ef9fbc2f52bf9bbb6769f43e6d726bbba4aed03e/ch07/01_main-chapter-code/exercise-solutions.ipynb) contains the exercise solutions for this chapter

### Optional Code

- [load-finetuned-model.ipynb](https://github.com/rasbt/LLMs-from-scratch/blob/ef9fbc2f52bf9bbb6769f43e6d726bbba4aed03e/ch07/01_main-chapter-code/load-finetuned-model.ipynb) is a standalone Jupyter notebook to load the instruction finetuned model we created in this chapter

- [gpt_instruction_finetuning.py](https://github.com/rasbt/LLMs-from-scratch/blob/ef9fbc2f52bf9bbb6769f43e6d726bbba4aed03e/ch07/01_main-chapter-code/gpt_instruction_finetuning.py) is a standalone Python script to instruction finetune the model as described in the main chapter (think of it as a chapter summary focused on the finetuning parts)

Usage:

```bash
python gpt_instruction_finetuning.py
```

```
matplotlib version: 3.9.0
tiktoken version: 0.7.0
torch version: 2.3.1
tqdm version: 4.66.4
tensorflow version: 2.16.1
--------------------------------------------------
Training set length: 935
Validation set length: 55
Test set length: 110
--------------------------------------------------
Device: cpu
--------------------------------------------------
File already exists and is up-to-date: gpt2/355M/checkpoint
File already exists and is up-to-date: gpt2/355M/encoder.json
File already exists and is up-to-date: gpt2/355M/hparams.json
File already exists and is up-to-date: gpt2/355M/model.ckpt.data-00000-of-00001
File already exists and is up-to-date: gpt2/355M/model.ckpt.index
File already exists and is up-to-date: gpt2/355M/model.ckpt.meta
File already exists and is up-to-date: gpt2/355M/vocab.bpe
Loaded model: gpt2-medium (355M)
--------------------------------------------------
Initial losses
   Training loss: 3.839039182662964
   Validation loss: 3.7619192123413088
Ep 1 (Step 000000): Train loss 2.611, Val loss 2.668
Ep 1 (Step 000005): Train loss 1.161, Val loss 1.131
Ep 1 (Step 000010): Train loss 0.939, Val loss 0.973
...
Training completed in 15.66 minutes.
Plot saved as loss-plot-standalone.pdf
--------------------------------------------------
Generating responses
100%|█████████████████████████████████████████████████████████| 110/110 [06:57<00:00,  3.80s/it]
Responses saved as instruction-data-with-response-standalone.json
Model saved as gpt2-medium355M-sft-standalone.pth
```

- [ollama_evaluate.py](https://github.com/rasbt/LLMs-from-scratch/blob/ef9fbc2f52bf9bbb6769f43e6d726bbba4aed03e/ch07/01_main-chapter-code/ollama_evaluate.py) is a standalone Python script to evaluate the responses of the finetuned model as described in the main chapter (think of it as a chapter summary focused on the evaluation parts)

Usage:

```bash
python ollama_evaluate.py --file_path instruction-data-with-response-standalone.json
```

```
Ollama running: True
Scoring entries: 100%|███████████████████████████████████████| 110/110 [01:08<00:00,  1.62it/s]
Number of scores: 110 of 110
Average score: 51.75
```

- [exercise_experiments.py](https://github.com/rasbt/LLMs-from-scratch/blob/ef9fbc2f52bf9bbb6769f43e6d726bbba4aed03e/ch07/01_main-chapter-code/exercise_experiments.py) is an optional scropt that implements the exercise solutions; for more details see [exercise-solutions.ipynb](https://github.com/rasbt/LLMs-from-scratch/blob/ef9fbc2f52bf9bbb6769f43e6d726bbba4aed03e/ch07/01_main-chapter-code/exercise-solutions.ipynb)
