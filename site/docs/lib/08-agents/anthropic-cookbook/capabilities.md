---
title: "Claude Capabilities"
sourceId: "08-agents/anthropic-cookbook"
sourceTitle: "Claude Cookbooks"
sourceKind: "官方资料集"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "08-agents"
sourceUrl: "https://github.com/anthropics/anthropic-cookbook"
entryUrl: "https://github.com/anthropics/anthropic-cookbook/blob/a97b9a2dc300635f0c26b5e05d0b54bbe0279ee5/capabilities/README.md"
sourceRel: "capabilities/README.md"
rawUrl: "/raw/08-agents/anthropic-cookbook/capabilities/README.md"
sourceSha256: "c87bec7b8fed7d3a552fac9cf36996d2a23ee8d9348b894ce7d7f8d733ce25ca"
pageSha256: "c87bec7b8fed7d3a552fac9cf36996d2a23ee8d9348b894ce7d7f8d733ce25ca"
contentMode: "local-full"
zh: ""
---

# Claude Capabilities

Welcome to the Capabilities section of the Claude Cookbooks! This directory contains a collection of guides that showcase specific capabilities where Claude excels. Each guide provides an in-depth exploration of a particular capability, discussing potential use cases, prompt engineering techniques to optimize results, and approaches for evaluating Claude's performance.

## Guides

- **[Classification with Claude](https://github.com/anthropics/anthropic-cookbook/blob/a97b9a2dc300635f0c26b5e05d0b54bbe0279ee5/capabilities/classification/guide.ipynb)**: Discover how Claude can revolutionize classification tasks, especially in scenarios with complex business rules and limited training data. This guide walks you through data preparation, prompt engineering with retrieval-augmented generation (RAG), testing, and evaluation.

- **[Retrieval Augmented Generation with Claude](https://github.com/anthropics/anthropic-cookbook/blob/a97b9a2dc300635f0c26b5e05d0b54bbe0279ee5/capabilities/retrieval_augmented_generation/guide.ipynb)**: Learn how to enhance Claude's capabilities with domain-specific knowledge using RAG. This guide demonstrates how to build a RAG system from scratch, optimize its performance, and create an evaluation suite. You'll learn how techniques like summary indexing and re-ranking can significantly improve precision, recall, and overall accuracy in question-answering tasks.

- **[Retrieval Augmented Generation with Contextual Embeddings](https://github.com/anthropics/anthropic-cookbook/blob/a97b9a2dc300635f0c26b5e05d0b54bbe0279ee5/capabilities/contextual-embeddings/guide.ipynb)**: Learn how to use a new technique to improve the performance of your RAG system. In traditional RAG, documents are typically split into smaller chunks for efficient retrieval. While this approach works well for many applications, it can lead to problems when individual chunks lack sufficient context. Contextual Embeddings solve this problem by adding relevant context to each chunk before embedding. You'll learn how to use contextual embeddings with semantic search, BM25 search, and reranking to improve performance.

- **[Summarization with Claude](https://github.com/anthropics/anthropic-cookbook/blob/a97b9a2dc300635f0c26b5e05d0b54bbe0279ee5/capabilities/summarization/guide.ipynb)**: Explore Claude's ability to summarize and synthesize information from multiple sources. This guide covers a variety of summarization techniques, including multi-shot, domain-based, and chunking methods, as well as strategies for handling long-form content and multiple documents. We also explore evaluating summaries, which can be a balance of art, subjectivity, and the right approach!

- **[Text-to-SQL with Claude](https://github.com/anthropics/anthropic-cookbook/blob/a97b9a2dc300635f0c26b5e05d0b54bbe0279ee5/capabilities/text_to_sql/guide.ipynb)**: This guide covers how to generate complex SQL queries from natural language using prompting techniques, self-improvement, and RAG. We'll also explore how to evaluate and improve the accuracy of generated SQL queries, with evals that test for syntax, data correctness, row count, and more.

- **[Knowledge Graph Construction with Claude](https://github.com/anthropics/anthropic-cookbook/blob/a97b9a2dc300635f0c26b5e05d0b54bbe0279ee5/capabilities/knowledge_graph/guide.ipynb)**: Build a knowledge graph from unstructured text end-to-end — named entity recognition, relation extraction, entity resolution, and multi-hop querying — using structured outputs for schema-validated extraction and Claude-driven deduplication in place of string-similarity heuristics.

- **[Content Policy Enforcement with Claude](https://github.com/anthropics/anthropic-cookbook/blob/a97b9a2dc300635f0c26b5e05d0b54bbe0279ee5/capabilities/content_moderation/guide.ipynb)**: Turn a written content policy into rules a program can enforce. Claude compiles policy prose into validated JSON rules and extracts typed fields from each piece of content (text and images); a deterministic rule engine produces the verdict with a full audit trail. Covers ad creatives, marketplace listings, and community content.

## Getting Started

To get started with these guides, simply navigate to the desired guide's directory and follow the instructions provided in the `guide.ipynb` file. Each guide is self-contained and includes all the necessary code, data, and evaluation scripts to reproduce the examples and experiments.
