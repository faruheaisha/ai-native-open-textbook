---
title: "LLMs from Scratch"
landing: true
tier: 2
sourceId: "01-foundations/llms-from-scratch"
sourceTitle: "LLMs from Scratch"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "英文"
volume: "01-foundations"
sourceUrl: "https://github.com/rasbt/LLMs-from-scratch"
entryUrl: "https://github.com/rasbt/LLMs-from-scratch/blob/ef9fbc2f52bf9bbb6769f43e6d726bbba4aed03e/README.md"
sourceRel: ""
contentMode: "local-full"
zh: ""
---

# LLMs from Scratch

This repository contains the code for developing, pretraining, and finetuning a GPT-like LLM and is the official code repository for the book [Build a Large Language Model (From Scratch)](https://amzn.to/4fqvn0D).

## 课时

- [README.md](/lib/01-foundations/llms-from-scratch/setup.md)
- [Troubleshooting Guide](/lib/01-foundations/llms-from-scratch/troubleshooting.md)
- [list of exercise solutions](/lib/01-foundations/llms-from-scratch/appendix-C.md)
- **Bonus Material**
  - [Python Setup Tips](/lib/01-foundations/llms-from-scratch/setup-01_optional-python-setup-preferences.md)
  - [Installing Python Packages and Libraries Used in This Book](/lib/01-foundations/llms-from-scratch/setup-02_installing-python-libraries.md)
  - [Docker Environment Setup Guide](/lib/01-foundations/llms-from-scratch/setup-03_optional-docker-environment.md)
  - [Comparing Various Byte Pair Encoding (BPE) Implementations](/lib/01-foundations/llms-from-scratch/ch02-02_bonus_bytepair-encoder.md)
  - [Understanding the Difference Between Embedding Layers and Linear Layers](/lib/01-foundations/llms-from-scratch/ch02-03_bonus_embedding-vs-matmul.md)
  - [Dataloader Intuition With Simple Numbers](/lib/01-foundations/llms-from-scratch/ch02-04_bonus_dataloader-intuition.md)
  - [BPE From Scratch](/lib/01-foundations/llms-from-scratch/ch02-05_bpe-from-scratch.md)
  - [SimpleTokenizerV3 variant](/lib/01-foundations/llms-from-scratch/ch02-06_bonus_simple-tokenizer-v3.md)
  - [KV Cache](/lib/01-foundations/llms-from-scratch/ch04-03_kv-cache.md)
  - [Attention Alternatives](/lib/01-foundations/llms-from-scratch/ch04.md)
  - [Grouped-Query Attention](/lib/01-foundations/llms-from-scratch/ch04-04_gqa.md)
  - [Multi-Head Latent Attention](/lib/01-foundations/llms-from-scratch/ch04-05_mla.md)
  - [Sliding Window Attention](/lib/01-foundations/llms-from-scratch/ch04-06_swa.md)
  - [Gated DeltaNet](/lib/01-foundations/llms-from-scratch/ch04-08_deltanet.md)
  - [DeepSeek Sparse Attention (DSA)](/lib/01-foundations/llms-from-scratch/ch04-09_dsa.md)
  - [Cross-Layer KV Sharing](/lib/01-foundations/llms-from-scratch/ch04-10_kv-sharing.md)
  - [Mixture-of-Experts (MoE)](/lib/01-foundations/llms-from-scratch/ch04-07_moe.md)
  - [Alternative Weight Loading Methods](/lib/01-foundations/llms-from-scratch/ch05-02_alternative_weight_loading.md)
  - [Pretraining GPT on the Project Gutenberg Dataset](/lib/01-foundations/llms-from-scratch/ch05-03_bonus_pretraining_on_gutenberg.md)
  - [Adding Bells and Whistles to the Training Loop](/lib/01-foundations/llms-from-scratch/ch05-04_learning_rate_schedulers.md)
  - [Optimizing Hyperparameters for Pretraining](/lib/01-foundations/llms-from-scratch/ch05-05_bonus_hparam_tuning.md)
  - [Building a User Interface to Interact With the Pretrained LLM](/lib/01-foundations/llms-from-scratch/ch05-06_user_interface.md)
  - [Converting GPT to Llama](/lib/01-foundations/llms-from-scratch/ch05-07_gpt_to_llama.md)
  - [PyTorch Performance Tips for Faster LLM Training](/lib/01-foundations/llms-from-scratch/ch05-10_llm-training-speed.md)
  - [LLM Architectures](/lib/01-foundations/llms-from-scratch/ch05.md)
  - [Qwen3 Dense and Mixture-of-Experts (MoE) From Scratch](/lib/01-foundations/llms-from-scratch/ch05-11_qwen3.md)
  - [Gemma 3 From Scratch](/lib/01-foundations/llms-from-scratch/ch05-12_gemma3.md)
  - [Olmo 3 From Scratch](/lib/01-foundations/llms-from-scratch/ch05-13_olmo3.md)
  - [Tiny Aya From Scratch](/lib/01-foundations/llms-from-scratch/ch05-15_tiny-aya.md)
  - [Qwen3.5 From Scratch](/lib/01-foundations/llms-from-scratch/ch05-16_qwen3.5.md)
  - [Gemma 4 E2B and E4B From Scratch](/lib/01-foundations/llms-from-scratch/ch05-17_gemma4.md)
  - [Chapter 5 with other LLMs as Drop-In Replacement (e.g., Llama 3, Qwen 3)](/lib/01-foundations/llms-from-scratch/ch05-14_ch05_with_other_llms.md)
  - [Additional Experiments Finetuning Different Layers and Using Larger Models](/lib/01-foundations/llms-from-scratch/ch06-02_bonus_additional-experiments.md)
  - [Finetuning Different Models on the 50k IMDb Movie Review Dataset](/lib/01-foundations/llms-from-scratch/ch06-03_bonus_imdb-classification.md)
  - [Building a User Interface to Interact With the GPT-based Spam Classifier](/lib/01-foundations/llms-from-scratch/ch06-04_user_interface.md)
  - [Dataset Utilities for Finding Near Duplicates and Creating Passive Voice Entries](/lib/01-foundations/llms-from-scratch/ch07-02_dataset-utilities.md)
  - [Evaluating Instruction Responses Using the OpenAI API and Ollama](/lib/01-foundations/llms-from-scratch/ch07-03_model-evaluation.md)
  - [Building a User Interface to Interact With the Instruction-Finetuned GPT Model](/lib/01-foundations/llms-from-scratch/ch07-06_user_interface.md)
- [Appendix A: Introduction to PyTorch](/lib/01-foundations/llms-from-scratch/appendix-A.md)
  - [Appendix A: Introduction to PyTorch](/lib/01-foundations/llms-from-scratch/appendix-A-01_main-chapter-code.md)
  - [LLMs from Scratch](/lib/01-foundations/llms-from-scratch/appendix-A-02_setup-recommendations.md)
- [Appendix D: Adding Bells and Whistles to the Training Loop](/lib/01-foundations/llms-from-scratch/appendix-D.md)
- [Appendix E: Parameter-efficient Finetuning with LoRA](/lib/01-foundations/llms-from-scratch/appendix-E.md)
- [Chapter 1: Understanding Large Language Models](/lib/01-foundations/llms-from-scratch/ch01.md)
  - [Recommendations for Getting the Most Out of a Technical Book](/lib/01-foundations/llms-from-scratch/ch01-reading-recommendations.md)
- [Chapter 2: Working with Text Data](/lib/01-foundations/llms-from-scratch/ch02.md)
  - [Chapter 2: Working with Text Data](/lib/01-foundations/llms-from-scratch/ch02-01_main-chapter-code.md)
- [Chapter 3: Coding Attention Mechanisms](/lib/01-foundations/llms-from-scratch/ch03.md)
  - [Chapter 3: Coding Attention Mechanisms](/lib/01-foundations/llms-from-scratch/ch03-01_main-chapter-code.md)
  - [More Efficient Multi-Head Attention Implementations](/lib/01-foundations/llms-from-scratch/ch03-02_bonus_efficient-multihead-attention.md)
  - [Understanding PyTorch Buffers](/lib/01-foundations/llms-from-scratch/ch03-03_understanding-buffers.md)
- **ch04**
  - [Chapter 4: Implementing a GPT Model from Scratch To Generate Text](/lib/01-foundations/llms-from-scratch/ch04-01_main-chapter-code.md)
  - [Chapter 4: Implementing a GPT Model from Scratch To Generate Text](/lib/01-foundations/llms-from-scratch/ch04-02_performance-analysis.md)
- **ch05**
  - [Chapter 5: Pretraining on Unlabeled Data](/lib/01-foundations/llms-from-scratch/ch05-01_main-chapter-code.md)
  - [Memory-efficient Model Weight Loading](/lib/01-foundations/llms-from-scratch/ch05-08_memory_efficient_weight_loading.md)
  - [Extending the Tiktoken BPE Tokenizer with New Tokens](/lib/01-foundations/llms-from-scratch/ch05-09_extending-tokenizers.md)
  - **11_qwen3**
    - [Qwen3 From Scratch with Chat Interface](/lib/01-foundations/llms-from-scratch/ch05-11_qwen3-qwen3-chat-interface.md)
  - [Muon Optimizer](/lib/01-foundations/llms-from-scratch/ch05-18_muon.md)
- [Chapter 6: Finetuning for Classification](/lib/01-foundations/llms-from-scratch/ch06.md)
  - [Chapter 6: Finetuning for Classification](/lib/01-foundations/llms-from-scratch/ch06-01_main-chapter-code.md)
- [Chapter 7: Finetuning to Follow Instructions](/lib/01-foundations/llms-from-scratch/ch07.md)
  - [Chapter 7: Finetuning to Follow Instructions](/lib/01-foundations/llms-from-scratch/ch07-01_main-chapter-code.md)
  - [Chapter 7: Finetuning to Follow Instructions](/lib/01-foundations/llms-from-scratch/ch07-04_preference-tuning-with-dpo.md)
  - [Generating Datasets for Instruction Finetuning](/lib/01-foundations/llms-from-scratch/ch07-05_dataset-generation.md)
- **pkg**
  - [llms-from-scratch PyPI Package](/lib/01-foundations/llms-from-scratch/pkg-llms_from_scratch.md)
- **setup**
  - **01_optional-python-setup-preferences**
    - [Native pixi Python and package management](/lib/01-foundations/llms-from-scratch/setup-01_optional-python-setup-preferences-native-pixi.md)
    - [Native uv Python and package management](/lib/01-foundations/llms-from-scratch/setup-01_optional-python-setup-preferences-native-uv.md)
  - [AWS CloudFormation Template: Jupyter Notebook with LLMs-from-scratch Repo](/lib/01-foundations/llms-from-scratch/setup-04_optional-aws-sagemaker-notebook.md)

开始学习 → [Appendix A: Introduction to PyTorch](appendix-A-01_main-chapter-code.md)
