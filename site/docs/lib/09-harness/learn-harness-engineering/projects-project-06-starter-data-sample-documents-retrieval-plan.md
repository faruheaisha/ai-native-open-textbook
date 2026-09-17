---
title: "Retrieval Plan"
sourceId: "09-harness/learn-harness-engineering"
sourceTitle: "Learn Harness Engineering"
sourceKind: "课时教程"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/walkinglabs/learn-harness-engineering"
entryUrl: "https://github.com/walkinglabs/learn-harness-engineering/blob/77e7a3e21469dcbece2558086c8d91657abeaa40/projects/project-06/starter/data/sample-documents/retrieval-plan.md"
sourceRel: "projects/project-06/starter/data/sample-documents/retrieval-plan.md"
rawUrl: "/raw/09-harness/learn-harness-engineering/projects/project-06/starter/data/sample-documents/retrieval-plan.md"
sourceSha256: "6a801f3f5e3e67b3c30b5a413660b6bef74a808419a951b05cd14905c8d05ede"
pageSha256: "6a801f3f5e3e67b3c30b5a413660b6bef74a808419a951b05cd14905c8d05ede"
contentMode: "local-full"
zh: ""
---

# Retrieval Plan

## Overview

This document outlines the strategy for implementing text retrieval in the knowledge base application. The goal is to enable grounded question answering over imported documents without requiring an external LLM API.

## Chunking Approach

Documents are split into chunks using a paragraph-aware algorithm:
- Split on double newlines (paragraph boundaries)
- Merge short paragraphs until chunk reaches ~500 characters
- Each chunk gets a unique ID, document reference, and metadata

## Keyword Matching

The retrieval system uses keyword-based matching:
1. Tokenize the question into individual words
2. Filter out stop words (words shorter than 3 characters)
3. For each chunk, count how many question keywords appear in the content
4. Rank chunks by keyword overlap score
5. Return top 2 most relevant chunks as citations
