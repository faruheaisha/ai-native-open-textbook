---
title: "Build a Large Language Model (From Scratch)"
sourceId: "01-foundations/llms-from-scratch"
sourceTitle: "LLMs from Scratch"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "01-foundations"
sourceUrl: "https://github.com/rasbt/LLMs-from-scratch"
entryUrl: "https://github.com/rasbt/LLMs-from-scratch/blob/ef9fbc2f52bf9bbb6769f43e6d726bbba4aed03e/README.md"
zh: ""
---

# Build a Large Language Model (From Scratch)

This repository contains the code for developing, pretraining, and finetuning a GPT-like LLM and is the official code repository for the book [Build a Large Language Model (From Scratch)](https://amzn.to/4fqvn0D).

<br>
<br>

<a href="https://amzn.to/4fqvn0D"><img src="https://sebastianraschka.com/images/LLMs-from-scratch-images/cover.jpg?123" width="250px"></a>

<br>

In [*Build a Large Language Model (From Scratch)*](http://mng.bz/orYv), you'll learn and understand how large language models (LLMs) work from the inside out by coding them from the ground up, step by step. In this book, I'll guide you through creating your own LLM, explaining each stage with clear text, diagrams, and examples.

The method described in this book for training and developing your own small-but-functional model for educational purposes mirrors the approach used in creating large-scale foundational models such as those behind ChatGPT. In addition, this book includes code for loading the weights of larger pretrained models for finetuning.

- Link to the official [source code repository](https://github.com/rasbt/LLMs-from-scratch)
- [Link to the book at Manning (the publisher's website)](http://mng.bz/orYv)
- [Link to the book page on Amazon.com](https://www.amazon.com/gp/product/1633437167)
- ISBN 9781633437166

<a href="http://mng.bz/orYv#reviews"><img src="https://sebastianraschka.com//images/LLMs-from-scratch-images/other/reviews.png" width="220px"></a>

<br>
<br>

To download a copy of this repository, click on the [Download ZIP](https://github.com/rasbt/LLMs-from-scratch/archive/refs/heads/main.zip) button or execute the following command in your terminal:

```bash
git clone --depth 1 https://github.com/rasbt/LLMs-from-scratch.git
```

<br>

(If you downloaded the code bundle from the Manning website, please consider visiting the official code repository on GitHub at [https://github.com/rasbt/LLMs-from-scratch](https://github.com/rasbt/LLMs-from-scratch) for the latest updates.)

<br>
<br>

# Table of Contents

Please note that this `README.md` file is a Markdown (`.md`) file. If you have downloaded this code bundle from the Manning website and are viewing it on your local computer, I recommend using a Markdown editor or previewer for proper viewing. If you haven't installed a Markdown editor yet, [Ghostwriter](https://ghostwriter.kde.org) is a good free option.

You can alternatively view this and other files on GitHub at [https://github.com/rasbt/LLMs-from-scratch](https://github.com/rasbt/LLMs-from-scratch) in your browser, which renders Markdown automatically.

<br>
<br>

> **Tip:**
> If you're seeking guidance on installing Python and Python packages and setting up your code environment, I suggest reading the [README.md](/lib/01-foundations/llms-from-scratch/setup) file located in the [setup](/lib/01-foundations/llms-from-scratch/setup) directory.

<br>
<br>

- [Troubleshooting Guide](https://github.com/rasbt/LLMs-from-scratch/blob/ef9fbc2f52bf9bbb6769f43e6d726bbba4aed03e/troubleshooting.md)

| Chapter Title                                              | Main Code (for Quick Access)                                                                                                    | All Code + Supplementary      |
|------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------|-------------------------------|
| [Setup recommendations](/lib/01-foundations/llms-from-scratch/setup) <br/>[How to best read this book](https://sebastianraschka.com/blog/2025/reading-books.html)                            | -                                                                                                                               | -                             |
| Ch 1: Understanding Large Language Models                  | No code                                                                                                                         | -                             |
| Ch 2: Working with Text Data                               | - [ch02.ipynb](https://github.com/rasbt/LLMs-from-scratch/blob/ef9fbc2f52bf9bbb6769f43e6d726bbba4aed03e/ch02/01_main-chapter-code/ch02.ipynb)<br/>- [dataloader.ipynb](https://github.com/rasbt/LLMs-from-scratch/blob/ef9fbc2f52bf9bbb6769f43e6d726bbba4aed03e/ch02/01_main-chapter-code/dataloader.ipynb) (summary)<br/>- [exercise-solutions.ipynb](https://github.com/rasbt/LLMs-from-scratch/blob/ef9fbc2f52bf9bbb6769f43e6d726bbba4aed03e/ch02/01_main-chapter-code/exercise-solutions.ipynb)               | [./ch02](/lib/01-foundations/llms-from-scratch/ch02)            |
| Ch 3: Coding Attention Mechanisms                          | - [ch03.ipynb](https://github.com/rasbt/LLMs-from-scratch/blob/ef9fbc2f52bf9bbb6769f43e6d726bbba4aed03e/ch03/01_main-chapter-code/ch03.ipynb)<br/>- [multihead-attention.ipynb](https://github.com/rasbt/LLMs-from-scratch/blob/ef9fbc2f52bf9bbb6769f43e6d726bbba4aed03e/ch03/01_main-chapter-code/multihead-attention.ipynb) (summary) <br/>- [exercise-solutions.ipynb](https://github.com/rasbt/LLMs-from-scratch/blob/ef9fbc2f52bf9bbb6769f43e6d726bbba4aed03e/ch03/01_main-chapter-code/exercise-solutions.ipynb)| [./ch03](/lib/01-foundations/llms-from-scratch/ch03)             |
| Ch 4: Implementing a GPT Model from Scratch                | - [ch04.ipynb](https://github.com/rasbt/LLMs-from-scratch/blob/ef9fbc2f52bf9bbb6769f43e6d726bbba4aed03e/ch04/01_main-chapter-code/ch04.ipynb)<br/>- [gpt.py](https://github.com/rasbt/LLMs-from-scratch/blob/ef9fbc2f52bf9bbb6769f43e6d726bbba4aed03e/ch04/01_main-chapter-code/gpt.py) (summary)<br/>- [exercise-solutions.ipynb](https://github.com/rasbt/LLMs-from-scratch/blob/ef9fbc2f52bf9bbb6769f43e6d726bbba4aed03e/ch04/01_main-chapter-code/exercise-solutions.ipynb) | [./ch04](/lib/01-foundations/llms-from-scratch/ch04)           |
| Ch 5: Pretraining on Unlabeled Data                        | - [ch05.ipynb](https://github.com/rasbt/LLMs-from-scratch/blob/ef9fbc2f52bf9bbb6769f43e6d726bbba4aed03e/ch05/01_main-chapter-code/ch05.ipynb)<br/>- [gpt_train.py](https://github.com/rasbt/LLMs-from-scratch/blob/ef9fbc2f52bf9bbb6769f43e6d726bbba4aed03e/ch05/01_main-chapter-code/gpt_train.py) (summary) <br/>- [gpt_generate.py](https://github.com/rasbt/LLMs-from-scratch/blob/ef9fbc2f52bf9bbb6769f43e6d726bbba4aed03e/ch05/01_main-chapter-code/gpt_generate.py) (summary) <br/>- [exercise-solutions.ipynb](https://github.com/rasbt/LLMs-from-scratch/blob/ef9fbc2f52bf9bbb6769f43e6d726bbba4aed03e/ch05/01_main-chapter-code/exercise-solutions.ipynb) | [./ch05](/lib/01-foundations/llms-from-scratch/ch05)              |
| Ch 6: Finetuning for Text Classification                   | - [ch06.ipynb](https://github.com/rasbt/LLMs-from-scratch/blob/ef9fbc2f52bf9bbb6769f43e6d726bbba4aed03e/ch06/01_main-chapter-code/ch06.ipynb)  <br/>- [gpt_class_finetune.py](https://github.com/rasbt/LLMs-from-scratch/blob/ef9fbc2f52bf9bbb6769f43e6d726bbba4aed03e/ch06/01_main-chapter-code/gpt_class_finetune.py)  <br/>- [exercise-solutions.ipynb](https://github.com/rasbt/LLMs-from-scratch/blob/ef9fbc2f52bf9bbb6769f43e6d726bbba4aed03e/ch06/01_main-chapter-code/exercise-solutions.ipynb) | [./ch06](/lib/01-foundations/llms-from-scratch/ch06)              |
| Ch 7: Finetuning to Follow Instructions                    | - [ch07.ipynb](https://github.com/rasbt/LLMs-from-scratch/blob/ef9fbc2f52bf9bbb6769f43e6d726bbba4aed03e/ch07/01_main-chapter-code/ch07.ipynb)<br/>- [gpt_instruction_finetuning.py](https://github.com/rasbt/LLMs-from-scratch/blob/ef9fbc2f52bf9bbb6769f43e6d726bbba4aed03e/ch07/01_main-chapter-code/gpt_instruction_finetuning.py) (summary)<br/>- [ollama_evaluate.py](https://github.com/rasbt/LLMs-from-scratch/blob/ef9fbc2f52bf9bbb6769f43e6d726bbba4aed03e/ch07/01_main-chapter-code/ollama_evaluate.py) (summary)<br/>- [exercise-solutions.ipynb](https://github.com/rasbt/LLMs-from-scratch/blob/ef9fbc2f52bf9bbb6769f43e6d726bbba4aed03e/ch07/01_main-chapter-code/exercise-solutions.ipynb) | [./ch07](/lib/01-foundations/llms-from-scratch/ch07)  |
| Appendix A: Introduction to PyTorch                        | - [code-part1.ipynb](https://github.com/rasbt/LLMs-from-scratch/blob/ef9fbc2f52bf9bbb6769f43e6d726bbba4aed03e/appendix-A/01_main-chapter-code/code-part1.ipynb)<br/>- [code-part2.ipynb](https://github.com/rasbt/LLMs-from-scratch/blob/ef9fbc2f52bf9bbb6769f43e6d726bbba4aed03e/appendix-A/01_main-chapter-code/code-part2.ipynb)<br/>- [DDP-script.py](https://github.com/rasbt/LLMs-from-scratch/blob/ef9fbc2f52bf9bbb6769f43e6d726bbba4aed03e/appendix-A/01_main-chapter-code/DDP-script.py)<br/>- [exercise-solutions.ipynb](https://github.com/rasbt/LLMs-from-scratch/blob/ef9fbc2f52bf9bbb6769f43e6d726bbba4aed03e/appendix-A/01_main-chapter-code/exercise-solutions.ipynb) | [./appendix-A](/lib/01-foundations/llms-from-scratch/appendix-A) |
| Appendix B: References and Further Reading                 | No code                                                                                                                         | [./appendix-B](https://github.com/rasbt/LLMs-from-scratch/blob/ef9fbc2f52bf9bbb6769f43e6d726bbba4aed03e/appendix-B/README.md) |
| Appendix C: Exercise Solutions                             | - [list of exercise solutions](/lib/01-foundations/llms-from-scratch/appendix-C)                                                                 | [./appendix-C](/lib/01-foundations/llms-from-scratch/appendix-C) |
| Appendix D: Adding Bells and Whistles to the Training Loop | - [appendix-D.ipynb](https://github.com/rasbt/LLMs-from-scratch/blob/ef9fbc2f52bf9bbb6769f43e6d726bbba4aed03e/appendix-D/01_main-chapter-code/appendix-D.ipynb)                                                          | [./appendix-D](/lib/01-foundations/llms-from-scratch/appendix-D)  |
| Appendix E: Parameter-efficient Finetuning with LoRA       | - [appendix-E.ipynb](https://github.com/rasbt/LLMs-from-scratch/blob/ef9fbc2f52bf9bbb6769f43e6d726bbba4aed03e/appendix-E/01_main-chapter-code/appendix-E.ipynb)                                                          | [./appendix-E](/lib/01-foundations/llms-from-scratch/appendix-E) |

<br>
&nbsp;

The mental model below summarizes the contents covered in this book.

<img src="https://sebastianraschka.com/images/LLMs-from-scratch-images/mental-model.jpg" width="650px">

<br>
&nbsp;

## Prerequisites

The most important prerequisite is a strong foundation in Python programming.
With this knowledge, you will be well prepared to explore the fascinating world of LLMs
and understand the concepts and code examples presented in this book.

If you have some experience with deep neural networks, you may find certain concepts more familiar, as LLMs are built upon these architectures.

This book uses PyTorch to implement the code from scratch without using any external LLM libraries. While proficiency in PyTorch is not a prerequisite, familiarity with PyTorch basics is certainly useful. If you are new to PyTorch, Appendix A provides a concise introduction to PyTorch. Alternatively, you may find my book, [PyTorch in One Hour: From Tensors to Training Neural Networks on Multiple GPUs](https://sebastianraschka.com/teaching/pytorch-1h/), helpful for learning about the essentials.

<br>
&nbsp;

## Hardware Requirements

The code in the main chapters of this book is designed to run on conventional laptops within a reasonable timeframe and does not require specialized hardware. This approach ensures that a wide audience can engage with the material. Additionally, the code automatically utilizes GPUs if they are available. (Please see the [setup](https://github.com/rasbt/LLMs-from-scratch/blob/main/setup/README.md) doc for additional recommendations.)

&nbsp;
## Video Course

[A 17-hour and 15-minute companion video course](https://www.manning.com/livevideo/master-and-build-large-language-models) where I code through each chapter of the book. The course is organized into chapters and sections that mirror the book's structure so that it can be used as a standalone alternative to the book or complementary code-along resource.

<a href="https://www.manning.com/livevideo/master-and-build-large-language-models"><img src="https://sebastianraschka.com/images/LLMs-from-scratch-images/video-screenshot.webp?123" width="350px"></a>

&nbsp;

## Companion Book / Sequel

[*Build A Reasoning Model (From Scratch)*](https://mng.bz/lZ5B), while a standalone book, can be considered as a sequel to *Build A Large Language Model (From Scratch)*.

It starts with a pretrained model and implements different reasoning approaches, including inference-time scaling, reinforcement learning, and distillation, to improve the model's reasoning capabilities.

Similar to *Build A Large Language Model (From Scratch)*, [*Build A Reasoning Model (From Scratch)*](https://mng.bz/lZ5B) takes a hands-on approach implementing these methods from scratch.

<a href="https://mng.bz/lZ5B"><img src="https://sebastianraschka.com/images/reasoning-from-scratch-images/cover.webp?123" width="120px"></a>

- [Amazon link](https://amzn.to/4aAKiFY)
- [Manning link](https://mng.bz/lZ5B)
- [GitHub repository](https://github.com/rasbt/reasoning-from-scratch)

<br>

&nbsp;
## Exercises

Each chapter of the book includes several exercises. The solutions are summarized in Appendix C, and the corresponding code notebooks are available in the main chapter folders of this repository (for example,  [./ch02/01_main-chapter-code/exercise-solutions.ipynb](https://github.com/rasbt/LLMs-from-scratch/blob/ef9fbc2f52bf9bbb6769f43e6d726bbba4aed03e/ch02/01_main-chapter-code/exercise-solutions.ipynb).

In addition to the code exercises, you can download a free 170-page PDF titled  [Test Yourself On Build a Large Language Model (From Scratch)](https://www.manning.com/books/test-yourself-on-build-a-large-language-model-from-scratch) from the Manning website. It contains approximately 30 quiz questions and solutions per chapter to help you test your understanding.

<a href="https://www.manning.com/books/test-yourself-on-build-a-large-language-model-from-scratch"><img src="https://sebastianraschka.com/images/LLMs-from-scratch-images/test-yourself-cover.jpg?123" width="150px"></a>

&nbsp;
## Bonus Material

Several folders contain optional materials as a bonus for interested readers:
- **Setup**
  - [Python Setup Tips](https://github.com/rasbt/LLMs-from-scratch/blob/ef9fbc2f52bf9bbb6769f43e6d726bbba4aed03e/setup/01_optional-python-setup-preferences/README.md)
  - [Installing Python Packages and Libraries Used in This Book](https://github.com/rasbt/LLMs-from-scratch/blob/ef9fbc2f52bf9bbb6769f43e6d726bbba4aed03e/setup/02_installing-python-libraries/README.md)
  - [Docker Environment Setup Guide](https://github.com/rasbt/LLMs-from-scratch/blob/ef9fbc2f52bf9bbb6769f43e6d726bbba4aed03e/setup/03_optional-docker-environment/README.md)

- **Chapter 2: Working With Text Data**
  - [Byte Pair Encoding (BPE) Tokenizer From Scratch](https://github.com/rasbt/LLMs-from-scratch/blob/ef9fbc2f52bf9bbb6769f43e6d726bbba4aed03e/ch02/05_bpe-from-scratch/bpe-from-scratch-simple.ipynb)
  - [Comparing Various Byte Pair Encoding (BPE) Implementations](https://github.com/rasbt/LLMs-from-scratch/blob/ef9fbc2f52bf9bbb6769f43e6d726bbba4aed03e/ch02/02_bonus_bytepair-encoder/README.md)
  - [Understanding the Difference Between Embedding Layers and Linear Layers](https://github.com/rasbt/LLMs-from-scratch/blob/ef9fbc2f52bf9bbb6769f43e6d726bbba4aed03e/ch02/03_bonus_embedding-vs-matmul/README.md)
  - [Dataloader Intuition With Simple Numbers](https://github.com/rasbt/LLMs-from-scratch/blob/ef9fbc2f52bf9bbb6769f43e6d726bbba4aed03e/ch02/04_bonus_dataloader-intuition/README.md)
  - [BPE From Scratch](https://github.com/rasbt/LLMs-from-scratch/blob/ef9fbc2f52bf9bbb6769f43e6d726bbba4aed03e/ch02/05_bpe-from-scratch/README.md)
  - [SimpleTokenizerV3 variant](https://github.com/rasbt/LLMs-from-scratch/blob/ef9fbc2f52bf9bbb6769f43e6d726bbba4aed03e/ch02/06_bonus_simple-tokenizer-v3/README.md)

- **Chapter 3: Coding Attention Mechanisms**
  - [Comparing Efficient Multi-Head Attention Implementations](https://github.com/rasbt/LLMs-from-scratch/blob/ef9fbc2f52bf9bbb6769f43e6d726bbba4aed03e/ch03/02_bonus_efficient-multihead-attention/mha-implementations.ipynb)
  - [Understanding PyTorch Buffers](https://github.com/rasbt/LLMs-from-scratch/blob/ef9fbc2f52bf9bbb6769f43e6d726bbba4aed03e/ch03/03_understanding-buffers/understanding-buffers.ipynb)

- **Chapter 4: Implementing a GPT Model From Scratch**
  - [FLOPs Analysis](https://github.com/rasbt/LLMs-from-scratch/blob/ef9fbc2f52bf9bbb6769f43e6d726bbba4aed03e/ch04/02_performance-analysis/flops-analysis.ipynb)
  - [KV Cache](https://github.com/rasbt/LLMs-from-scratch/blob/ef9fbc2f52bf9bbb6769f43e6d726bbba4aed03e/ch04/03_kv-cache/README.md)
  - [Attention Alternatives](/lib/01-foundations/llms-from-scratch/ch04#attention-alternatives)
    - [Grouped-Query Attention](https://github.com/rasbt/LLMs-from-scratch/blob/ef9fbc2f52bf9bbb6769f43e6d726bbba4aed03e/ch04/04_gqa/README.md)
    - [Multi-Head Latent Attention](https://github.com/rasbt/LLMs-from-scratch/blob/ef9fbc2f52bf9bbb6769f43e6d726bbba4aed03e/ch04/05_mla/README.md)
    - [Sliding Window Attention](https://github.com/rasbt/LLMs-from-scratch/blob/ef9fbc2f52bf9bbb6769f43e6d726bbba4aed03e/ch04/06_swa/README.md)
    - [Gated DeltaNet](https://github.com/rasbt/LLMs-from-scratch/blob/ef9fbc2f52bf9bbb6769f43e6d726bbba4aed03e/ch04/08_deltanet/README.md)
    - [DeepSeek Sparse Attention (DSA)](https://github.com/rasbt/LLMs-from-scratch/blob/ef9fbc2f52bf9bbb6769f43e6d726bbba4aed03e/ch04/09_dsa/README.md)
    - [Cross-Layer KV Sharing](https://github.com/rasbt/LLMs-from-scratch/blob/ef9fbc2f52bf9bbb6769f43e6d726bbba4aed03e/ch04/10_kv-sharing/README.md)
  - [Mixture-of-Experts (MoE)](https://github.com/rasbt/LLMs-from-scratch/blob/ef9fbc2f52bf9bbb6769f43e6d726bbba4aed03e/ch04/07_moe/README.md)

- **Chapter 5: Pretraining on Unlabeled Data**
  - [Alternative Weight Loading Methods](https://github.com/rasbt/LLMs-from-scratch/blob/ef9fbc2f52bf9bbb6769f43e6d726bbba4aed03e/ch05/02_alternative_weight_loading/README.md)
  - [Pretraining GPT on the Project Gutenberg Dataset](https://github.com/rasbt/LLMs-from-scratch/blob/ef9fbc2f52bf9bbb6769f43e6d726bbba4aed03e/ch05/03_bonus_pretraining_on_gutenberg/README.md)
  - [Adding Bells and Whistles to the Training Loop](https://github.com/rasbt/LLMs-from-scratch/blob/ef9fbc2f52bf9bbb6769f43e6d726bbba4aed03e/ch05/04_learning_rate_schedulers/README.md)
  - [Optimizing Hyperparameters for Pretraining](https://github.com/rasbt/LLMs-from-scratch/blob/ef9fbc2f52bf9bbb6769f43e6d726bbba4aed03e/ch05/05_bonus_hparam_tuning/README.md)
  - [Building a User Interface to Interact With the Pretrained LLM](https://github.com/rasbt/LLMs-from-scratch/blob/ef9fbc2f52bf9bbb6769f43e6d726bbba4aed03e/ch05/06_user_interface/README.md)
  - [Converting GPT to Llama](https://github.com/rasbt/LLMs-from-scratch/blob/ef9fbc2f52bf9bbb6769f43e6d726bbba4aed03e/ch05/07_gpt_to_llama/README.md)
  - [Memory-efficient Model Weight Loading](https://github.com/rasbt/LLMs-from-scratch/blob/ef9fbc2f52bf9bbb6769f43e6d726bbba4aed03e/ch05/08_memory_efficient_weight_loading/memory-efficient-state-dict.ipynb)
  - [Extending the Tiktoken BPE Tokenizer with New Tokens](https://github.com/rasbt/LLMs-from-scratch/blob/ef9fbc2f52bf9bbb6769f43e6d726bbba4aed03e/ch05/09_extending-tokenizers/extend-tiktoken.ipynb)
  - [PyTorch Performance Tips for Faster LLM Training](https://github.com/rasbt/LLMs-from-scratch/blob/ef9fbc2f52bf9bbb6769f43e6d726bbba4aed03e/ch05/10_llm-training-speed/README.md)
  - [LLM Architectures](/lib/01-foundations/llms-from-scratch/ch05#llm-architectures-from-scratch)
    - [Llama 3.2 From Scratch](https://github.com/rasbt/LLMs-from-scratch/blob/ef9fbc2f52bf9bbb6769f43e6d726bbba4aed03e/ch05/07_gpt_to_llama/standalone-llama32.ipynb)
    - [Qwen3 Dense and Mixture-of-Experts (MoE) From Scratch](https://github.com/rasbt/LLMs-from-scratch/blob/ef9fbc2f52bf9bbb6769f43e6d726bbba4aed03e/ch05/11_qwen3/README.md)
    - [Gemma 3 From Scratch](https://github.com/rasbt/LLMs-from-scratch/blob/ef9fbc2f52bf9bbb6769f43e6d726bbba4aed03e/ch05/12_gemma3/README.md)
    - [Olmo 3 From Scratch](https://github.com/rasbt/LLMs-from-scratch/blob/ef9fbc2f52bf9bbb6769f43e6d726bbba4aed03e/ch05/13_olmo3/README.md)
    - [Tiny Aya From Scratch](https://github.com/rasbt/LLMs-from-scratch/blob/ef9fbc2f52bf9bbb6769f43e6d726bbba4aed03e/ch05/15_tiny-aya/README.md)
    - [Qwen3.5 From Scratch](https://github.com/rasbt/LLMs-from-scratch/blob/ef9fbc2f52bf9bbb6769f43e6d726bbba4aed03e/ch05/16_qwen3.5/README.md)
    - [Gemma 4 E2B and E4B From Scratch](https://github.com/rasbt/LLMs-from-scratch/blob/ef9fbc2f52bf9bbb6769f43e6d726bbba4aed03e/ch05/17_gemma4/README.md)
  - [Chapter 5 with other LLMs as Drop-In Replacement (e.g., Llama 3, Qwen 3)](https://github.com/rasbt/LLMs-from-scratch/blob/ef9fbc2f52bf9bbb6769f43e6d726bbba4aed03e/ch05/14_ch05_with_other_llms/README.md)
- **Chapter 6: Finetuning for classification**
  - [Additional Experiments Finetuning Different Layers and Using Larger Models](https://github.com/rasbt/LLMs-from-scratch/blob/ef9fbc2f52bf9bbb6769f43e6d726bbba4aed03e/ch06/02_bonus_additional-experiments/README.md)
  - [Finetuning Different Models on the 50k IMDb Movie Review Dataset](https://github.com/rasbt/LLMs-from-scratch/blob/ef9fbc2f52bf9bbb6769f43e6d726bbba4aed03e/ch06/03_bonus_imdb-classification/README.md)
  - [Building a User Interface to Interact With the GPT-based Spam Classifier](https://github.com/rasbt/LLMs-from-scratch/blob/ef9fbc2f52bf9bbb6769f43e6d726bbba4aed03e/ch06/04_user_interface/README.md)
- **Chapter 7: Finetuning to follow instructions**
  - [Dataset Utilities for Finding Near Duplicates and Creating Passive Voice Entries](https://github.com/rasbt/LLMs-from-scratch/blob/ef9fbc2f52bf9bbb6769f43e6d726bbba4aed03e/ch07/02_dataset-utilities/README.md)
  - [Evaluating Instruction Responses Using the OpenAI API and Ollama](https://github.com/rasbt/LLMs-from-scratch/blob/ef9fbc2f52bf9bbb6769f43e6d726bbba4aed03e/ch07/03_model-evaluation/README.md)
  - [Generating a Dataset for Instruction Finetuning](https://github.com/rasbt/LLMs-from-scratch/blob/ef9fbc2f52bf9bbb6769f43e6d726bbba4aed03e/ch07/05_dataset-generation/llama3-ollama.ipynb)
  - [Improving a Dataset for Instruction Finetuning](https://github.com/rasbt/LLMs-from-scratch/blob/ef9fbc2f52bf9bbb6769f43e6d726bbba4aed03e/ch07/05_dataset-generation/reflection-gpt4.ipynb)
  - [Generating a Preference Dataset With Llama 3.1 70B and Ollama](https://github.com/rasbt/LLMs-from-scratch/blob/ef9fbc2f52bf9bbb6769f43e6d726bbba4aed03e/ch07/04_preference-tuning-with-dpo/create-preference-data-ollama.ipynb)
  - [Direct Preference Optimization (DPO) for LLM Alignment](https://github.com/rasbt/LLMs-from-scratch/blob/ef9fbc2f52bf9bbb6769f43e6d726bbba4aed03e/ch07/04_preference-tuning-with-dpo/dpo-from-scratch.ipynb)
  - [Building a User Interface to Interact With the Instruction-Finetuned GPT Model](https://github.com/rasbt/LLMs-from-scratch/blob/ef9fbc2f52bf9bbb6769f43e6d726bbba4aed03e/ch07/06_user_interface/README.md)

More bonus material from the [Reasoning From Scratch](https://github.com/rasbt/reasoning-from-scratch) repository:

- **Qwen3 (From Scratch) Basics**
  - [Qwen3 Source Code Walkthrough](https://github.com/rasbt/reasoning-from-scratch/blob/main/chC/01_main-chapter-code/chC_main.ipynb)
  - [Optimized Qwen3](https://github.com/rasbt/reasoning-from-scratch/tree/main/ch02/03_optimized-LLM)

- **Evaluation**
  - [Verifier-Based Evaluation (MATH-500)](https://github.com/rasbt/reasoning-from-scratch/tree/main/ch03)
  - [Multiple-Choice Evaluation (MMLU)](https://github.com/rasbt/reasoning-from-scratch/blob/main/chF/02_mmlu)
  - [LLM Leaderboard Evaluation](https://github.com/rasbt/reasoning-from-scratch/blob/main/chF/03_leaderboards)
  - [LLM-as-a-Judge Evaluation](https://github.com/rasbt/reasoning-from-scratch/blob/main/chF/04_llm-judge)
- **Inference Scaling**
  - [Self-Consistency](https://github.com/rasbt/reasoning-from-scratch/blob/main/ch04/01_main-chapter-code/ch04_main.ipynb)
  - [Self-Refinement](https://github.com/rasbt/reasoning-from-scratch/blob/main/ch05/01_main-chapter-code/ch05_main.ipynb)

- **Reinforcement Learning** (RL)
  - [RLVR with GRPO From Scratch](https://github.com/rasbt/reasoning-from-scratch/blob/main/ch06/01_main-chapter-code/ch06_main.ipynb)

<br>
&nbsp;

## Questions, Feedback, and Contributing to This Repository

I welcome all sorts of feedback, best shared via the [Manning Forum](https://livebook.manning.com/forum?product=raschka&page=1) or [GitHub Discussions](https://github.com/rasbt/LLMs-from-scratch/discussions). Likewise, if you have any questions or just want to bounce ideas off others, please don't hesitate to post these in the forum as well.

Please note that since this repository contains the code corresponding to a print book, I currently cannot accept contributions that would extend the contents of the main chapter code, as it would introduce deviations from the physical book. Keeping it consistent helps ensure a smooth experience for everyone.

&nbsp;
